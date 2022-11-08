// Import the functions you need from the SDKs you need
import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

export const app: FirebaseApp = initializeApp(firebaseConfig);