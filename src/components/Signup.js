import React, { useEffect, useState } from 'react';
import { collection, addDoc } from 'firebase/firestore'
import { useNavigate, Link } from 'react-router-dom';
import styles from '../styles/Login.module.css'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../utils/firebase.config'
import { useDispatch } from 'react-redux';
import { updateUserName } from '../redux/actions/user';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const userInfoRef = collection(db, 'userInfo');
    const dispatch = useDispatch();



    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            dispatch(updateUserName(name));
            localStorage.setItem('name', name) ;
            navigate('/');
            await addDoc(userInfoRef, {
                name,
                email
            })
            console.log(user)
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div className={styles.loginContainer}>

            <div className={styles.wrapper}>
                <div className={styles.inputContainer}>
                    <label>Your Name</label>
                    <input type='text' onChange={(e) => { setName(e.target.value) }}></input>
                </div>
                <div className={styles.inputContainer}>
                    <label>Email</label>
                    <input type='email' onChange={(e) => { setEmail(e.target.value) }}></input>
                </div>

                <div className={styles.inputContainer}>
                    <label>Password</label>
                    <input type='password' onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <div className={styles.button}>
                    <button onClick={register}>Register</button>
                    <div>Already have an account?</div>
                    <Link to='/login'>
                        <button>Sign In</button>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Signup;