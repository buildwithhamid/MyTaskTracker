import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";
import type { UserCredential } from "firebase/auth";
import { doc, setDoc, } from "firebase/firestore";
import { auth, db } from "../firebase";

export async function loginUser(email: string, password: string): Promise<UserCredential> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error: any) {
    console.error("Login error:", error.message);
    throw new Error(error.message);
  }
}

export async function signupUser(email: string, password: string, username: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store user info in Firebase
    await setDoc(doc(db, "users", user.uid),{
      uid: user.uid,
      email: user.email,
      username: username,
      createdAt: new Date().toISOString()
    })
    return userCredential;
  } catch (error: any) {
    console.error("Signup error:", error.message);
    throw new Error(error.message);
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error("Logout error:", error.message);
    throw new Error(error.message);
  }
}