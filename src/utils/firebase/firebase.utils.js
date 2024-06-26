import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword,
signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, 
  setDoc, collection, writeBatch,
  query, getDocs} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDg83JGk3ceob5swv-xWxUXIc8UL3TmVCI",
  authDomain: "e-commerce-db-102bd.firebaseapp.com",
  projectId: "e-commerce-db-102bd",
  storageBucket: "e-commerce-db-102bd.appspot.com",
  messagingSenderId: "940688032589",
  appId: "1:940688032589:web:0b3398ffe9f4e4d55dad04",
  measurementId: "G-Q0ZEMETMCH"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async(collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach(object => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
    
  });
  await batch.commit();
  console.log('done');
};

export const getCategoriesAndDocuments = async() => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    
    return acc;
  },{});
  
    return categoryMap;
}

/*
{
  hats: {
    title: 'Hats',
    items: [
      {},
      {}
    ]
  },
  sneakers: {
    title: 'Sneakers',
    items: [
      {},
      {}
    ]
  }
}
 */

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
 
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
      console.log(additionalInformation);
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  return userDocRef;

};

export const createAuthUserWithEmailAndPassword = async (email,password) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email,password) => {
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => 
{onAuthStateChanged(auth, callback)}