import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from './config'

const JS_KEY      = import.meta.env.VITE_KAKAO_JS_KEY as string
const REDIRECT_URI = window.location.origin

/* 팝업으로 access_token 즉시 획득 (코드 교환 불필요) */
function openKakaoPopup(): Promise<string> {
  return new Promise((resolve, reject) => {
    const w = 500, h = 700
    const l = Math.round((screen.width  - w) / 2)
    const t = Math.round((screen.height - h) / 2)

    // response_type=token → URL 해시에 access_token 직접 반환
    const url =
      `https://kauth.kakao.com/oauth/authorize` +
      `?client_id=${JS_KEY}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&response_type=token`

    const popup = window.open(
      url, 'kakaoLogin',
      `width=${w},height=${h},top=${t},left=${l},scrollbars=yes`
    )

    if (!popup) {
      reject(new Error('팝업이 차단됐습니다. 팝업 차단을 해제해주세요.'))
      return
    }

    const check = setInterval(() => {
      try {
        if (popup.closed) {
          clearInterval(check)
          reject(new Error('로그인이 취소됐습니다.'))
          return
        }

        const href = popup.location.href

        // 리다이렉트 후 우리 도메인에 돌아왔을 때
        if (href.startsWith(REDIRECT_URI)) {
          // access_token은 URL 해시(#)에 있음
          const hash  = new URLSearchParams(popup.location.hash.substring(1))
          // 에러는 쿼리스트링(?)에 있음
          const query = new URLSearchParams(popup.location.search)

          clearInterval(check)
          popup.close()

          const token = hash.get('access_token')
          const error = query.get('error_description') || query.get('error')

          if (token) resolve(token)
          else reject(new Error(error || '카카오 토큰을 받지 못했습니다.'))
        }
      } catch {
        // 카카오 도메인 cross-origin 오류 → 무시
      }
    }, 300)
  })
}

/* 카카오 로그인 메인 함수 */
export async function signInWithKakao(): Promise<void> {
  if (!JS_KEY || JS_KEY.includes('여기에')) {
    throw new Error('카카오 JavaScript 키가 설정되지 않았습니다.')
  }

  // 1. 팝업으로 access_token 획득 (토큰 교환 없음)
  const accessToken = await openKakaoPopup()

  // 2. 카카오 사용자 정보 요청
  const res = await fetch('https://kapi.kakao.com/v2/user/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.msg || '카카오 사용자 정보 요청 실패')
  }

  const kakaoUser = await res.json()

  const kakaoId    = String(kakaoUser.id)
  const kakaoName  = kakaoUser.kakao_account?.profile?.nickname
                  || kakaoUser.properties?.nickname
                  || '카카오 사용자'
  const kakaoEmail = kakaoUser.kakao_account?.email
                  || `kakao_${kakaoId}@kakao-user.com`
  const kakaoPhoto = kakaoUser.kakao_account?.profile?.profile_image_url
                  || kakaoUser.properties?.profile_image
                  || null

  // 3. Firebase Auth 연동
  const dummyPw = `Kakao!${kakaoId}#Eco2024`

  try {
    // 기존 유저 → 로그인
    await signInWithEmailAndPassword(auth, kakaoEmail, dummyPw)
  } catch {
    // 신규 유저 → 생성
    const { user } = await createUserWithEmailAndPassword(auth, kakaoEmail, dummyPw)
    await updateProfile(user, { displayName: kakaoName, photoURL: kakaoPhoto })
    await setDoc(doc(db, 'users', user.uid), {
      name:      kakaoName,
      email:     kakaoEmail,
      kakaoId,
      provider:  'kakao',
      photoURL:  kakaoPhoto,
      points:    0,
      createdAt: serverTimestamp(),
    })
  }
}
