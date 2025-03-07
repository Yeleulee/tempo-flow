import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCxRZBJMilV_34uiR9dN_4MuBtD3f4Ak7k",
  authDomain: "tempoflow-ai.firebaseapp.com",
  projectId: "tempoflow-ai",
  storageBucket: "tempoflow-ai.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef",
  // Enable email/password authentication
  authProviders: ["password", "google.com"],
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("email");
googleProvider.addScope("profile");
