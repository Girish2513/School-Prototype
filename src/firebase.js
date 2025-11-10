import { initializeApp, getApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDlwNgEWhrJJcOIhCzL8Wd5ynsxXCiFx4k",
  authDomain: "navodaya-admin.firebaseapp.com",
  databaseURL: "https://navodaya-admin-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "navodaya-admin",
  storageBucket: "navodaya-admin.appspot.com",
  messagingSenderId: "8561057767",
  appId: "1:8561057767:web:52218e79b632c1e1be2742"
};

// ✅ Prevent “Firebase App named '[DEFAULT]' already exists” error
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// ✅ Connect Realtime Database properly
export const db = getDatabase(app);
