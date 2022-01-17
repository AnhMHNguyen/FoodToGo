import React, { useState, createContext, useContext } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { auth } from '../../../firebase';

const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

  // const auth = getAuth();
  // const firestore = getFirestore();
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  const onLogin = (email, password) => {
    console.log({email})
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        setCurrentUser(user);
        setIsLoading(false);
        console.log(user);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
    })
  }

  const onRegister = (email, password, displayName) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        setDoc(doc(firestore, "users", user.uid), {
          email,
          displayName,
          createdAt: new Date(),
          photoURL: "https://res.cloudinary.com/ds4m4cban/image/upload/v1642150999/images/jimmieshop/avatar_h3hqra.jpg"
        });
        setIsLoading(false);
        setCurrentUser(user);
      }).catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  }

  const onLogout = () => {
    setCurrentUser(null);
    signOut(auth);
  }

  const getUserInfo = async () => {
    // const snapshot = await getDoc(doc(firestore, "users", currentUser.uid));
    // if (snapshot.exists()) {
    //   console.log("Document data:", snapshot.data());
    // } else {
    //   // doc.data() will be undefined in this case
    //   console.log("No such document!");
    // }
  }

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!currentUser,
        user: currentUser,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
        getUserInfo,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export const useAuth = () => useContext(AuthenticationContext);
