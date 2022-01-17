import React, {useState,} from 'react'
import {Typography, Button } from '@material-ui/core'
import { Redirect, Link } from 'react-router-dom'

import {auth} from '../firebase'
import { GoogleAuthProvider, signInWithPopup, getAuth, signInWithRedirect } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth';

import { firebaseCreateBasicUser, firebaseCreateTeacherUser, firebaseFindUserExistsByEmail } from '../utils/firebaseFunctions'

const SignUpScreen = () => {
    let auth = getAuth()
    // setPersistence(auth, inMemoryPersistence)
    const provider = new GoogleAuthProvider()
    const [render, reRender] = useState(0)
    const [user] = useAuthState(auth)

    

    const handleSignUp = async () => {
        await signInWithRedirect(auth, provider) 
        auth = getAuth()
        
        // on sign up 
        //      1) check if user is logging on and already has account, if yes, exit
        // const userHasAccount = firebaseFindUserExistsByEmail(auth.currentUser.email)
        //      2) is user is new, create new account, student default
        // if (userHasAccount) {
            // takes care of situation where user is logging in and not signing up
            //     alert(`Hello ${auth.currentUser.name}`)
            //     return
            // } 
        firebaseCreateBasicUser({name: auth.currentUser.name, email: auth.currentUser.email, photo_url: auth.currentUser.photoURL}) // when user signs up, creates default student account
        reRender(num => num + 1)
    }

    return (
        <div>
            {
                // when user is logged in
                auth.currentUser &&
                <Redirect to="/profile" />
            }
            {
                /// when user is not logged in
                !auth.currentUser &&
                <div className="signup">
                    <div className="container">
                        <Typography variant='h2' className='header'>Please log in with Google</Typography>
                        <Typography variant='body1' className='note'>or go back to the test page by clicking <Link to="/test">here</Link></Typography>
                        <Button variant="contained" className='login-button' onClick={handleSignUp} >Sign In with Google</Button>
                    </div>
                </div>
            }
        </div>
    )

}


export default SignUpScreen;