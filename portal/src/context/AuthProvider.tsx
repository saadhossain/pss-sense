import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import { app } from '../config/firebase.config';
import { UserInfoType, UserType } from '../types/UserType';
//get the default file
interface Props {
    children: ReactNode;
}

export interface DataContextType {
    createUser: any;
    googleLogin: any;
    updateUser: any;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    processing: boolean;
    setProcessing: Dispatch<SetStateAction<boolean>>;
    userLogin: any;
    user: any;
    logOut: any;
    passwordReset: any
}

export const DataContext = createContext<DataContextType | null>(null);
const DataProvider: React.FC<Props> = ({ children }) => {
    //Get the firebase auth
    const auth = getAuth(app);
    //Create a Provider for google login
    const googleProiver = new GoogleAuthProvider();
    //Loading state
    const [loading, setLoading] = useState(true);

    //Processing state
    const [processing, setProcessing] = useState(false);
    //Get user from the auth state and set to state
    const [user, setUser] = useState<UserInfoType>();
    //Create a new user using email and password
    const createUser = (email: string, password: string) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    //Create a User using Google Account
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProiver)
    }
    //Update User Profile after registration
    const updateUser = (fullName: string, profileImage: string) => {
        setLoading(true)
        //Update info on authentication also
        const currentUser = auth.currentUser;

        if (currentUser) {
            return updateProfile(currentUser, {
                displayName: fullName,
                photoURL: profileImage
            })
        }
    }
    //User Password Reset
    const passwordReset = (email: string) => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }
    //User login
    const userLogin = (email: string, password: string) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    //User Logout
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }
    //Get user from auth 
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser: any) => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => unSubscribe()
    }, [auth])
    const dataInfo = { createUser, googleLogin, updateUser, loading, setLoading, userLogin, user, logOut, passwordReset, processing, setProcessing }
    return (
        <DataContext.Provider value={dataInfo}>{children}</DataContext.Provider>
    );
};

export default DataProvider;
