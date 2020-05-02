import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyA_PhqX57d5J2iacBgjOdBbUq2k9lvUNgw",
  authDomain: "crwn-db-sk.firebaseapp.com",
  databaseURL: "https://crwn-db-sk.firebaseio.com",
  projectId: "crwn-db-sk",
  storageBucket: "crwn-db-sk.appspot.com",
  messagingSenderId: "740299050297",
  appId: "1:740299050297:web:3a59e08fd8716e05d1ece8",
};
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
