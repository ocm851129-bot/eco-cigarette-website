import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from './config'

/* Kakao OAuth 팝업으로 access_token 획득 */
function openKakaoPopup(jsKey: string, redirectUri: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const w = 500, h = 700
    const l = Math.round((screen.width  - w) / 2)
    const t = Math.round((screen.height - h) / 2)

    const url =
      `https://kauth.kakao.com/oauth/authorize` +
      `?client_id=${jsKey}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
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
        if (href.startsWith(window.location.origin)) {
          // hash에서 access_token 추출
          const hash   = new URLSearchParams(popup.location.hash.substring(1))
          const token  = hash.get('access_token')
          const errMsg = hash.get('error_description')

          clearInterval(check)
          popup.close()

          if (token)  resolve(token)
          else        reject(new Error(errMsg || '토큰을 받지 못했습니다.'))
        }
      } catch {
        // 카카오 도메인에 있는 동안 cross-origin 오류 → 무시
      }
    }, 300)
  })
}

/* 카카오 로그인 메인 함수 */
export async function signInWithKakao(): Promise<void> {
  const jsKey      = import.meta.env.VITE_KAKAO_JS_KEY as string
  const redirectUri = window.location.origin  // 슬래시 없음

  if (!jsKey || jsKey.includes('여기에')) {
    throw new Error('카카오 JavaScript 키가 설정되지 않았습니다.')
  }

  // 1. 팝업으로 access_token 획득
  const accessToken = await openKakaoPopup(jsKey, redirectUri)

  // 2. 카카오 사용자 정보 요청
  const res = await fetch('https://kapi.kakao.com/v2/user/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!res.ok) throw new Error('카카오 사용자 정보를 가져오지 못했습니다.')

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

  // 3. Firebase Auth 로그인 또는 신규 가입
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
