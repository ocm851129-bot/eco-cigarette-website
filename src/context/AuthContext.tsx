import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import {
  onAuthStateChanged, signInWithEmailAndPassword,
  createUserWithEmailAndPassword, signOut, updateProfile,
} from 'firebase/auth'
import type { User } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../firebase/config'

interface AuthCtx {
  user: User | null
  loading: boolean
  login: (email: string, pw: string) => Promise<void>
  signup: (email: string, pw: string, name: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthCtx | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]       = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => { setUser(u); setLoading(false) })
    return unsub
  }, [])

  async function signup(email: string, pw: string, name: string) {
    const { user } = await createUserWithEmailAndPassword(auth, email, pw)
    await updateProfile(user, { displayName: name })
    await setDoc(doc(db, 'users', user.uid), {
      name, email, points: 0,
      createdAt: serverTimestamp(),
    })
  }

  async function login(email: string, pw: string) {
    await signInWithEmailAndPassword(auth, email, pw)
  }

  async function logout() {
    await signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
