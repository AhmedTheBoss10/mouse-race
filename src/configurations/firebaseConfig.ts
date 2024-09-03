import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCBXAPwpUfu4vbK_wynHqwcPp3N5SN08G0",
  authDomain: "mouse-race-game.firebaseapp.com",
  projectId: "mouse-race-game",
  storageBucket: "mouse-race-game.appspot.com",
  messagingSenderId: "578246163036",
  appId: "1:578246163036:web:8e53e9d88447b0db038499",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
