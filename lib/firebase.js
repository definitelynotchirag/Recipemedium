import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// Perfectly fine to expose public firebase keys to the front-end
const firebaseConfig = {


  apiKey: "AIzaSyCj-GIgO2wkWXaNnk2NzrSapXoAp0T8lRk",
  authDomain: "xxxxx-13207.firebaseapp.com",
  projectId: "xxxxx-13207",
  storageBucket: "xxxxx-13207.appspot.com",
  messagingSenderId: "150083977816",
  appId: "1:150083977816:web:2734fad39d9b160880402d",
  measurementId: "G-49CTP9T7TH"
};

// Next in deveopment can call this method twice -> Firebase must be initialized only once. Therefore, the below syntax
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;

export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const increment = firebase.firestore.FieldValue.increment;

// Helper functions

/**
 * Gets a users/{uid} document with username
 * @param {string} username
 */

export async function getUserWithUsername(username) {
  const usersRef = firestore.collection("users");
  const query = usersRef.where("username", "==", username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

/**
 * Converts a firestore document to JSON
 * @param {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  try {
    const data = doc.data();
    return {
      ...data,
      createdAt: data?.createdAt.toMillis() || 0,
      updatedAt: data?.updatedAt.toMillis() || 0,
    };
  } catch (err) {
    console.log(err);
  }
}
