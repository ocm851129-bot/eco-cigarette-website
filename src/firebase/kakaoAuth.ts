import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from './config'

declare global {
  interface Window {
    Kakao: any
    kakaoAuthCallback: (result: any) => void
  }
}

function loadKakaoSDK(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Kakao) { resolve(); return }
    const script = document.createElement('script')
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js'
    script.onload  = () => {
      window.Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY)
      resolve()
    }
    script.onerror = reject
    document.head.appendChild(script)
  })
}

export async function signInWithKakao(): Promise<void> {
  await loadKakaoSDK()

  const kakaoUser: any = await new Promise((resolve, reject) => {
    window.Kakao.Auth.login({
      success: async (_authObj: any) => {
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: (res: any) => resolve(res),
          fail: reject,
        })
      },
      fail: reject,
    })
  })

  const kakaoId   = kakaoUser.id
  const kakaoName = kakaoUser.kakao_account?.profile?.nickname || '카카오 사용자'
  const kakaoEmail =
    kakaoUser.kakao_account?.email || `kakao_${kakaoId}@kakao-user.com`

  // Firebase에 카카오 유저 등록 또는 로그인
  const dummyPw = `KakaoUser!${kakaoId}#Eco`

  try {
    // 기존 유저 로그인 시도
    await signInWithEmailAndPassword(auth, kakaoEmail, dummyPw)
  } catch {
    // 없으면 신규 생성
    const { user } = await createUserWithEmailAndPassword(auth, kakaoEmail, dummyPw)
    await updateProfile(user, {
      displayName: kakaoName,
      photoURL: kakaoUser.kakao_account?.profile?.profile_image_url || null,
    })
    await setDoc(doc(db, 'users', user.uid), {
      name: kakaoName,
      email: kakaoEmail,
      kakaoId: String(kakaoId),
      provider: 'kakao',
      points: 0,
      createdAt: serverTimestamp(),
    })
  }
}
