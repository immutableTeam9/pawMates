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
import { addDoc, collection, getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export async function firebaseSignUp(email, pwd, nickName, petInfo) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pwd);
    await updateProfile(auth.currentUser, { displayName: nickName });
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
    console.error(error);
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
