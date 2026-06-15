import {
  collection, getDocs, addDoc,
  query, orderBy, where, onSnapshot, serverTimestamp,
} from 'firebase/firestore'
import type { QuerySnapshot, DocumentData } from 'firebase/firestore'
import { db } from './config'

/* ── 배너 ── */
export const getBanners = () =>
  getDocs(query(collection(db, 'banners'), orderBy('order', 'asc')))
    .then(s => s.docs.map(d => ({ id: d.id, ...d.data() })))

export const subscribeBanners = (cb: (data: DocumentData[]) => void) =>
  onSnapshot(query(collection(db, 'banners'), orderBy('order', 'asc')), (s: QuerySnapshot) =>
    cb(s.docs.filter(d => d.data().active).map(d => ({ id: d.id, ...d.data() })))
  )

/* ── 수거함 위치 ── */
export const getBoxes = () =>
  getDocs(collection(db, 'collection_boxes'))
    .then(s => s.docs.map(d => ({ id: d.id, ...d.data() })))

/* ── 포인트 신청 ── */
export const submitPointRequest = (data: {
  uid: string; name: string; phone: string;
  address: string; quantity: number; note: string;
}) => addDoc(collection(db, 'point_requests'), {
  ...data,
  status: 'pending',
  createdAt: serverTimestamp(),
})

export const getUserRequests = (uid: string) =>
  getDocs(query(
    collection(db, 'point_requests'),
    where('uid', '==', uid),
    orderBy('createdAt', 'desc')
  )).then(s => s.docs.map(d => ({ id: d.id, ...d.data() })))

/* ── 앱 링크 ── */
export const getAppLinks = () =>
  getDocs(collection(db, 'app_links'))
    .then(s => {
      const links: Record<string, string> = {}
      s.docs.forEach(d => { links[d.id] = d.data().url })
      return links
    })
