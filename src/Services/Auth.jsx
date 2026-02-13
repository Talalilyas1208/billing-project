import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  sendEmailVerification, 
  signInWithPopup, 
  GoogleAuthProvider, 
  FacebookAuthProvider,
  signOut 
} from "firebase/auth";
import { auth } from "../firebase/firebase";


const User = (user) => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName || "User",
});

export const loginWithEmail = async (email, password) => {
  const res = await signInWithEmailAndPassword(auth, email, password);
  return User(res.user);
};

export const registerWithEmail = async (email, password, displayName) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(res.user, { displayName });
  await sendEmailVerification(res.user);
  return res.user;
};

export const loginWithSocial = async (type) => {
  const provider = type === "google" ? new GoogleAuthProvider() : new FacebookAuthProvider();

  const res = await signInWithPopup(auth, provider);
  

  return User(res.user); 
};

export const logoutUser = async () => {
  await signOut(auth);
};