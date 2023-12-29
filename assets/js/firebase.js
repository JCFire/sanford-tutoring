import params from "@params";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const app = initializeApp(params);
const analytics = getAnalytics(app);