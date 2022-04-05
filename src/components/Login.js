import React, { useEffect, useState } from 'react';
import styles from '../styles/Login.module.css'
import { auth, db } from '../utils/firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { query, where, doc, getDocs, collection } from 'firebase/firestore'
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserName } from '../redux/actions/user';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfoRef = collection(db, 'userInfo');

  useEffect(()=>{
    let name = localStorage.getItem('name') ;
    if(name)
    {
      updateUserName(name)
      navigate('/')
    }
  }, [])

  const login = async () => {
    try {
      signInWithEmailAndPassword(auth, email, password);
      
      const q = query(userInfoRef, where('email', '==', email))
      const userSnapshot = await getDocs(q);
      
      let username;
      userSnapshot.forEach(async (d) => {
        username = d.data().name;
      })
      dispatch(updateUserName(username));
      localStorage.setItem("name", username) ;
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={styles.loginContainer}>
      <div className={styles.wrapper}>
        <div className={styles.inputContainer}>
          <label>Email</label>
          <input type='email' onChange={(e) => { setEmail(e.target.value) }}></input>
        </div>

        <div className={styles.inputContainer}>
          <label>Password</label>
          <input type='password' onChange={(e) => { setPassword(e.target.value) }} />
        </div>
        <div className={styles.button}>
          <button onClick={login}>Login</button>
          <div>New User?</div>
          <Link to='/signup'>
            <button>Create Your Free account</button>
          </Link>
        </div>

      </div>


    </div>
  )
}

export default Login