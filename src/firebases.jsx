// Inside firebase.js
import { getFirestore } from "firebase/firestore";

// ... your existing config and app initialization
export const db = getFirestore(app); // Add and export this