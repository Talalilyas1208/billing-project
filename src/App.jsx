import { useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  FacebookAuthProvider,
  sendEmailVerification,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { auth } from "./firebase";
import "./index.css";
import { useRef } from "react";
import "./App.css";

const db = getFirestore();

export default function App() {
  const [user, setUser] = useState(() => {
    const savingUser = localStorage.getItem("activeUser");
    return savingUser ? JSON.parse(savingUser) : null;
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [verificationSent, setVerificationSent] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log(currentUser);
      currentUser.reload;

      if (currentUser && currentUser.emailVerified) {
        const checkuid = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(checkuid);
        let previousLogin = null;
        if (userDoc.exists()) {
          previousLogin = userDoc.data().lastLogin || null;
        }
        await setDoc(
          checkuid,
          {
            lastLogin: new Date().toISOString(),
          },
          { merge: true },
        );

        const userData = {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName || "User",
          lastSeen: previousLogin,
        };

        setUser(userData);
        localStorage.setItem("activeUser", JSON.stringify(userData));
      } else {
        setUser(null);
        localStorage.removeItem("activeUser");
      }
    });
    return () => unsubscribe();
  }, []);

  const validate = () => {
    if (!email || !password) {
      setError("Email and Password are required.");
      return false;
    }
     const isValidEmail = email.includes('@') && email.split('@')[1].includes('.');

  if (!isValidEmail) {
    setError("Please enter a valid email address.");
    return false;
  }

    if (!isLoginMode && (!displayName || !phoneNumber)) {
      setError("Please fill in all fields to register.");
      return false;
    }
    return true;
  };

  const handleAuth = async () => {
    if (!validate()) return;
    setError("");
    setLoading(true);

    try {
      if (isLoginMode) {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
        if (!userCredential.user.emailVerified) {
          setError("Please verify your email before logging in.");
          await signOut(auth);
        }
      } else {
        const data = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
          displayName
        );
        await updateProfile(data.user, { displayName });
        await sendEmailVerification(data.user);

        await setDoc(doc(db, "users", data.user.uid), {
          displayName,
          phoneNumber,
          email,
          uid: data.user.uid,
        });

        setVerificationSent(true);
      }
    } catch (err) {
     setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  function getSimpleDate(lastLogin) {
    if (!lastLogin) return "First time logging in!";

    const now = new Date();
    const loginDate = new Date(lastLogin);

    const diffInMs = now - loginDate;

    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays > 1 && diffInDays < 7) return `${diffInDays} days ago`;

    return loginDate.toLocaleDateString();
  }
  const socialLogin = async (providerType) => {
    const provider =
      providerType === "google"
        ? new GoogleAuthProvider()
        : new FacebookAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    signOut(auth);
    setUser(null);
    localStorage.removeItem("activeUser");
    setVerificationSent(false);
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 text-gray-800 font-sans">
      <div className="bg-white p-8 rounded-xl w-full max-w-sm shadow-xl border border-gray-200">
        {verificationSent ? (
          <div className="text-center space-y-5 py-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Verify your email
            </h2>
            <p className="text-gray-600 text-sm">
              We've sent a verification link to <br />
              <span className="font-semibold ">{email}</span>.
            </p>
            <p className="text-xs text-gray-400">
              Please check your inbox (and spam folder) to activate your
              account.
            </p>
            <button
              onClick={() => {
                setVerificationSent(false);
                setIsLoginMode(true);
              }}
              className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Go to Login
            </button>
          </div>
        ) : user ? (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl font-bold mx-auto"></div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Welcome, {user.displayName}!
              </h2>
              <p className="text-gray-500 text-sm">{user.email}</p>
              <p className="text-xs text-blue-500 mt-2 font-medium">
                Last login: {getSimpleDate(user.lastSeen)}
              </p>
            </div>
            <div className="pt-4 border-t border-gray-100">
              <button
                onClick={handleLogout}
                className="bg-red-50 text-red-600 border border-red-200 p-2 w-full rounded-lg hover:bg-red-600 hover:text-white transition font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="text-center mb-2">
              <h1 className="text-2xl font-black text-gray-900">
                {isLoginMode ? "Welcome Back" : "Create Account"}
              </h1>
            </div>

            {error && (
              <div className="text-red-600 text-xs text-center bg-red-50 p-3 rounded-lg border border-red-100">
                {error}
              </div>
            )}

            {!isLoginMode && (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  onChange={(e) => setDisplayName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </>
            )}
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleAuth}
              disabled={loading}
              className={`p-3 rounded-lg font-bold text-white shadow-md transition transform active:scale-95 ${
                isLoginMode
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading
                ? "Processing..."
                : isLoginMode
                  ? "Login"
                  : "Register Now"}
            </button>

            <button
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                setError("");
              }}
              className="text-sm text-gray-600  transition"
            >
              {isLoginMode ? "Don't have an account? " : "Already registered? "}
              <span className="font-bold underline">
                {isLoginMode ? "Sign Up" : "Login"}
              </span>
            </button>

            <div className="relative flex py-3 items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase tracking-widest">
                or
              </span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => socialLogin("google")}
                className="border border-gray-300 p-2 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 text-sm font-medium transition"
              >
                Google
              </button>
              <button
                onClick={() => socialLogin("facebook")}
                className="border border-gray-300 p-2 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 text-sm font-medium transition"
              >
                Facebook
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
