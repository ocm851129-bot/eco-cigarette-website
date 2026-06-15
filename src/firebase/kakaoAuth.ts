import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from './config'

const REST_KEY    = import.meta.env.VITE_KAKAO_REST_KEY as string
const REDIRECT_URI = window.location.origin

/* 팝업으로 authorization code 획득 */
function openKakaoPopup(): Promise<string> {
  return new Promise((resolve, reject) => {
    const w = 500, h = 700
    const l = Math.round((screen.width  - w) / 2)
    const t = Math.round((screen.height - h) / 2)

    const url =
      `https://kauth.kakao.com/oauth/authorize` +
      `?client_id=${REST_KEY}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&response_type=code`

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
        if (href.startsWith(REDIRECT_URI)) {
          const params = new URLSearchParams(popup.location.search)
          const code   = params.get('code')
          const error  = params.get('error_description') || params.get('error')

          clearInterval(check)
          popup.close()

          if (code)  resolve(code)
          else       reject(new Error(error || '인증 코드를 받지 못했습니다.'))
        }
      } catch {
        // 카카오 도메인 cross-origin 오류 → 무시
      }
    }, 300)
  })
}

/* code → access_token 교환 */
async function getAccessToken(code: string): Promise<string> {
  const res = await fetch('https://kauth.kakao.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    body: new URLSearchParams({
      grant_type:   'authorization_code',
      client_id:    REST_KEY,
      redirect_uri: REDIRECT_URI,
      code,
    }),
  })

  if (!res.ok) throw new Error('카카오 토큰 교환 실패')
  const data = await res.json()
  if (data.error) throw new Error(data.error_description || data.error)
  return data.access_token
}

/* 카카오 로그인 메인 함수 */
export async function signInWithKakao(): Promise<void> {
  if (!REST_KEY || REST_KEY.includes('여기에')) {
    throw new Error('카카오 REST API 키가 설정되지 않았습니다.')
  }

  // 1. 팝업으로 code 획득
  const code = await openKakaoPopup()

  // 2. code → access_token
  const accessToken = await getAccessToken(code)

  // 3. 사용자 정보 요청
  const res = await fetch('https://kapi.kakao.com/v2/user/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!res.ok) throw new Error('카카오 사용자 정보 요청 실패')

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

  // 4. Firebase Auth 연동
  const dummyPw = `Kakao!${kakaoId}#Eco2024`

  try {
    await signInWithEmailAndPassword(auth, kakaoEmail, dummyPw)
  } catch {
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
