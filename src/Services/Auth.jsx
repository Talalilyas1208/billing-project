import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
const User = (user, token) => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName || "User",
  metadata: user.metadata,
  token: token 
});
export const loginWithEmail = async (email, password) => {
  const data = await signInWithEmailAndPassword(auth, email, password);
  const token = await data.user.getIdToken();
  return User(data.user, token);
};
export const registerWithEmail = async (email, password, displayName) => {
  const data = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(data.user, { displayName });
  await data.user.getIdToken(); 
  await sendEmailVerification(data.user);
  return data.user;
};
export const loginWithSocial = async (type) => {
  const provider =
    type === "google" ? new GoogleAuthProvider() : new FacebookAuthProvider();
    const data = await signInWithPopup(auth, provider);
     const token = await data.user.getIdToken();

  return User(data.user, token);
};

export const logoutUser = async () => {
  await signOut(auth);
};