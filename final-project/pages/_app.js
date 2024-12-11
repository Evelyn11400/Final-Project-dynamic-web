import { useCallback, useEffect, useState } from "react";
import Header from "../components/header/index";
import { initializeApp } from "firebase/app";
import "../global.css";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "final-project-dynamic-web.firebaseapp.com",
  projectId: "final-project-dynamic-web",
  storageBucket: "final-project-dynamic-web.firebasestorage.app",
  messagingSenderId: "296400377340",
  appId: "1:296400377340:web:85a0482cfb613ad6f34e79",
};
export default function App({ Component, pageProps }) {
  const [appInitialized, setAppInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInformation, setUserInformation] = useState(null);
  const [error, setError] = useState(null);

  const createUserFunction = useCallback(
    (e) => {
      e.preventDefault();
      const email = e.currentTarget.email.value;
      const password = e.currentTarget.password.value;
      const auth = getAuth();

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setIsLoggedIn(true);
          setUserInformation(user);
          setError(null);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorMessage);
        });
    },
    [setError, setIsLoggedIn, setUserInformation]
  );

  const loginUserFunction = useCallback((e) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsLoggedIn(true);
        setUserInformation(user);
        setError(null);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
  });

  const logoutUserFunction = useCallback(() => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUserInformation(null);
        setIsLoggedIn(false);
      })
      .catch(
        (error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorMessage);
        },
        [setError, setIsLoggedIn, setUserInformation, signOut]
      );
  });

  useEffect(() => {
    initializeApp(firebaseConfig);
    setAppInitialized(true);
  }, []);

  useEffect(() => {
    if (appInitialized) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserInformation(user);
          setIsLoggedIn(true);
        } else {
          setUserInformation(null);
          setIsLoggedIn(false);
        }
        setIsLoading(false);
      });
    }
  }, [appInitialized]);

  if (isLoading) return null;

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} logoutUserFunction={logoutUserFunction} />
      <Component
        {...pageProps}
        createUserFunction={createUserFunction}
        isLoggedIn={isLoggedIn}
        loginUserFunction={loginUserFunction}
        userInformation={userInformation}
      />
    </div>
  );
}
