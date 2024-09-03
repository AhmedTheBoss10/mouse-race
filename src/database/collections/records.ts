import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
} from 'firebase/firestore'
import { db } from '../../configurations/firebaseConfig'
import { Record } from 'interfaces/leaderboard'

const recordsCollection = collection(db, 'records')

export function createRecord(username: string, time: number) {
  return addDoc(recordsCollection, { username, time })
}

export async function getTop3Records() {
  const top3Query = query(recordsCollection, orderBy('time', 'asc'), limit(3))
  const querySnapshot = await getDocs(top3Query)

  const top3Records = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Record[]

  return top3Records
}
