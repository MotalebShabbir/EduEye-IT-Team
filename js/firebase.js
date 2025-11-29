// firebase.js - Complete setup for EduEye Team

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";

// Your Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRMv86DqW9x6xwSC51c-GnzUVYt-Rvvnk",
  authDomain: "edueye-it-team.firebaseapp.com",
  projectId: "edueye-it-team",
  storageBucket: "edueye-it-team.firebasestorage.app",
  messagingSenderId: "170559915414",
  appId: "1:170559915414:web:47195fee655e1f69d809b7",
};

// Initialize App IMMEDIATELY
let firebaseApp;
let auth;
let db;
let storage;
let googleProvider;

try {
  firebaseApp = initializeApp(firebaseConfig);
  auth = getAuth(firebaseApp);
  db = getFirestore(firebaseApp);
  storage = getStorage(firebaseApp);
  googleProvider = new GoogleAuthProvider();
  console.log("✓ Firebase initialized successfully");
} catch (error) {
  console.error("✗ Firebase initialization error:", error);
}

// ===================================
// Core exports
// ===================================
export {
  firebaseApp,
  auth,
  db,
  storage,
  googleProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  setDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  ref,
  uploadBytes,
  getDownloadURL,
};

// ===================================
// Auth Helper Functions
// ===================================

export async function signInWithGooglePopup() {
  if (!auth) throw new Error("Firebase not initialized");
  return signInWithPopup(auth, googleProvider);
}

export async function createUserWithEmail({ email, password, displayName }) {
  if (!auth) throw new Error("Firebase not initialized");
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    await updateProfile(cred.user, { displayName });
  }
  return cred.user;
}

export async function signInWithEmail({ email, password }) {
  if (!auth) throw new Error("Firebase not initialized");
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signOutUser() {
  if (!auth) throw new Error("Firebase not initialized");
  return signOut(auth);
}

export function onAuthChanged(callback) {
  if (!auth) throw new Error("Firebase not initialized");
  return onAuthStateChanged(auth, callback);
}

// ===================================
// Firestore Helper Functions
// ===================================

export async function addDocToCollection(collectionPath, data) {
  if (!db) throw new Error("Firestore not initialized");
  const colRef = collection(db, collectionPath);
  return addDoc(colRef, data);
}

export async function getDocAt(docPath) {
  if (!db) throw new Error("Firestore not initialized");
  const docRef = doc(db, docPath);
  return getDoc(docRef);
}

export async function setDocAt(docPath, data, merge = true) {
  if (!db) throw new Error("Firestore not initialized");
  const docRef = doc(db, docPath);
  return setDoc(docRef, data, { merge });
}

export async function getCollectionDocs(collectionPath, constraints = []) {
  if (!db) throw new Error("Firestore not initialized");
  const colRef = collection(db, collectionPath);
  const q = constraints.length > 0 ? query(colRef, ...constraints) : colRef;
  return getDocs(q);
}

export async function updateDocAt(docPath, data) {
  if (!db) throw new Error("Firestore not initialized");
  const docRef = doc(db, docPath);
  return updateDoc(docRef, data);
}

export async function deleteDocAt(docPath) {
  if (!db) throw new Error("Firestore not initialized");
  const docRef = doc(db, docPath);
  return deleteDoc(docRef);
}

export function listenToCollection(collectionPath, callback, constraints = []) {
  if (!db) throw new Error("Firestore not initialized");
  const colRef = collection(db, collectionPath);
  const q = constraints.length > 0 ? query(colRef, ...constraints) : colRef;
  return onSnapshot(q, callback);
}

// ===================================
// Storage Helper Functions
// ===================================

export async function uploadFileToStorage(filePath, file) {
  if (!storage) throw new Error("Storage not initialized");
  const fileRef = ref(storage, filePath);
  return uploadBytes(fileRef, file);
}

export async function getFileDownloadURL(filePath) {
  if (!storage) throw new Error("Storage not initialized");
  const fileRef = ref(storage, filePath);
  return getDownloadURL(fileRef);
}
