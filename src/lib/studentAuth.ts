import {
  browserLocalPersistence,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { auth, db } from "../firebase";

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export async function signInWithGoogle() {
  await setPersistence(
    auth,
    browserLocalPersistence
  );

  const result = await signInWithPopup(
    auth,
    googleProvider
  );

  const user = result.user;

  /*
   * Create or update the user's ELEVIT profile.
   *
   * The document ID is the Firebase UID.
   */
  await setDoc(
    doc(db, "users", user.uid),
    {
      uid: user.uid,
      displayName: user.displayName || "",
      email: user.email || "",
      photoURL: user.photoURL || "",
      lastLoginAt: serverTimestamp(),
    },
    {
      merge: true,
    }
  );

  return user;
}

export async function signOutStudent() {
  await signOut(auth);
}