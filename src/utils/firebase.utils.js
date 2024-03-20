import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
}
    from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB8d7SHCb6-FVqx3Pr8loRX39IWBkA8HCs",
    authDomain: "crwn-clothing-db-5699d.firebaseapp.com",
    projectId: "crwn-clothing-db-5699d",
    storageBucket: "crwn-clothing-db-5699d.appspot.com",
    messagingSenderId: "549152425362",
    appId: "1:549152425362:web:f894b57958313b55b12d4b"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const gooleProvider = new GoogleAuthProvider();
gooleProvider.getCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signWithGooglePopup = () => signInWithPopup(auth, gooleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {

    if(!userAuth) return;

    const userDoRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDoRef);

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDoRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
    return userDoRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
}
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);