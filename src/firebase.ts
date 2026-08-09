import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  projectId: "gen-lang-client-0214630999",
  appId: "1:608074832527:web:5500156f15c46f1621eefa",
  apiKey: "AIzaSyBaQVHSo84ghuJmtIJU4YZ4BaAXdlpLUXk",
  authDomain: "gen-lang-client-0214630999.firebaseapp.com",
  storageBucket: "gen-lang-client-0214630999.firebasestorage.app",
  messagingSenderId: "608074832527",
  measurementId: "",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, "ai-studio-visualsitebuilde-2b987b9d-3fa4-419b-ae0f-e1d4fc6168a3");

export const getConfigDoc = async () => {
  const configRef = doc(db, 'app', 'config');
  const snap = await getDoc(configRef);
  return { snap, configRef };
};
