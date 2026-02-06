import { useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile, sendEmailVerification 
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import "./index.css";
import "./App.css";
import "./App.css"
import "./index.css"

export default function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState(""); 
  const [phoneNumber, setPhoneNumber] = useState(""); 
  const [extraData, setExtraData] = useState(null);  

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      console.log(currentUser)
      if (currentUser) {
       
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setExtraData(docSnap.data());
        }
      } else {
        setExtraData(null);
      }
      setUser({
          ...result.user,
          displayName: displayName
        });
    });
    return () => unsubscribe();
  }, []);

  const validateInputs = (isSignUp = false) => {
    if (!email.trim() || !password.trim()) {
      setError("Please fill in email and password.");
      return false;
    }
    if (isSignUp && (!displayName.trim() || !phoneNumber.trim())) {
      setError("Please provide Name and Phone Number for registration.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  const getTimeLabel = (lastSignIn) => {
    if (!lastSignIn) return "Never";
    const lastDate = new Date(lastSignIn);
    const now = new Date();
    const diffInMs = now - lastDate;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return "This Week";
    return lastDate.toLocaleDateString();
  };

  const performAuth = async (authFunction, isSignUp = false) => {
    setError("");
    setLoading(true);
    try {
      const result = await authFunction();
      if (isSignUp && result.user) {
        await updateProfile(result.user, { displayName: displayName });
        await setDoc(doc(db, "users", result.user.uid), {
          phoneNumber: phoneNumber,
          displayName: displayName,
          email: email,
        });
      }
    } catch (err) {
      if (err.code === "auth/invalid-credential") {
        setError("Invalid email or password.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    if (!validateInputs()) return;
    performAuth(() => signInWithEmailAndPassword(auth, email, password));
    
  };

  const handleSignUp = () => {
    if (!validateInputs(true)) return;
    performAuth(() => createUserWithEmailAndPassword(auth, email, password), true);
  };

  const handleGoogle = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    performAuth(() => signInWithPopup(auth, provider));
  };

  const handleFacebook = () => {
    const provider = new FacebookAuthProvider();
    performAuth(() => signInWithPopup(auth, provider));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg w-full max-w-sm shadow-md border border-gray-100">
        {!user ? (
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-bold text-center text-gray-800">Welcome</h1>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded text-sm text-center">
                {error}
              </div>
            )}

            {/* Registration specific fields */}
            <input
              type="text"
              placeholder="Full Name"
              className="border p-2 rounded outline-none focus:border-blue-500"
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="border p-2 rounded outline-none focus:border-blue-500"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              className="border p-2 rounded outline-none focus:border-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="border p-2 rounded outline-none focus:border-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleLogin}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded font-semibold transition disabled:opacity-50"
            >
              {loading ? "Processing..." : "Login"}
            </button>

            <button
              onClick={handleSignUp}
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded font-semibold transition disabled:opacity-50"
            >
              Sign Up
            </button>

            <div className="text-center text-gray-400 text-sm">or</div>

            <button
              onClick={handleGoogle}
              className="border border-gray-300 p-2 rounded flex items-center justify-center gap-2 hover:bg-gray-50 transition"
            >
              Sign in with Google
            </button>

            <button
              onClick={handleFacebook}
              className="border border-gray-300 p-2 rounded flex items-center justify-center gap-2 hover:bg-gray-50 transition"
            >
              Sign in with Facebook
            </button>
          </div>
        ) : (
          <div className="text-center">
            
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Hi, {user.displayName || "User"}!
              </h2>
              <p className="text-gray-500 mb-2">{user.email}</p>
              {extraData?.phoneNumber && (
                <p className="text-blue-600 text-sm font-medium">
                  📞 {extraData.phoneNumber}
                </p>
              )}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6 text-xs text-left text-gray-600">
              <p><strong>Last Login:</strong> {getTimeLabel(user.metadata.lastSignInTime)}</p>
            </div>

            <button
              onClick={() => signOut(auth)}
              className="bg-red-500 hover:bg-red-600 text-white p-2 w-full rounded font-semibold transition shadow-sm"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}