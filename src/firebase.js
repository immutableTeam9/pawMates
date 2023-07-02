// firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { addDoc, collection, getFirestore, query, where } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export async function firebaseSignUp(email, pwd, nickName, userImage, petInfo) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pwd);
    await updateProfile(auth.currentUser, { displayName: nickName, photoURL: userImage });
    await savePetInfo(petInfo, userCredential.user.uid);
  } catch (error) {
    console.error(error);
  }
}

async function savePetInfo(petInfo, uid) {
  const petData = { ...petInfo, ownerId: uid };
  const collectionRef = collection(db, 'petInfo');
  await addDoc(collectionRef, petData);
}

export async function firebaseSignIn(email, pwd) {
  try {
    return await signInWithEmailAndPassword(auth, email, pwd);
  } catch (error) {
    console.log(error);
  }
}

export async function firebaseSignOut() {
  await signOut(auth);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

export async function modifyProfile(nickName, userImage) {
  await updateProfile(auth.currentUser, { displayName: nickName, photoURL: userImage });
}

export function getPostsByUser(userId) {
  const postsRef = collection(db, 'posts');
  const q = query(postsRef, where('userId', '==', 'userId'));
  return q;
}

export default app;
