import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { AiOutlineLogout } from 'react-icons/ai'
import img from '../images/SmartQ Logo.png'
import SearchBar from './subComponents/SearchBar';
import { auth } from '../utils/firebase.config'
import { updateUserName } from '../redux/actions/user';
import { clearCart } from '../redux/actions/cart';
import { setCurrentDisplayData } from '../redux/actions/data';
function Header() {
    const user = useSelector(state => state.user);
    const data = useSelector(state => state.data);
    const dispatch = useDispatch();
    const navigate = useNavigate() ;
    useEffect(() => {
        let name = localStorage.getItem('name')
        // if(name)
        // {
        //     dispatch(updateUserName(name));
        //     console.log("hey") ;
        // }
        if(name)
        {
            dispatch(updateUserName(name));
            console.log(user)
            navigate('/')
        }

        console.log(data.currentDisplayData)
    }, [])

    const handleLogout = async () => {
        try {
            const signedout = await signOut(auth);
            console.log(signedout);
            dispatch(updateUserName(null));
            dispatch(clearCart());
            dispatch(setCurrentDisplayData());
            localStorage.clear() ;
        } catch (error) {
            console.log(error.message);
        }

    }
    return (
        <>

            <div className='search'>
                <SearchBar />
            </div>

            {
                user.name !== null
                    ? <div className='user-info-container'>
                        <div className='user-name'>
                            Hi, {user.name}
                        </div>
                        <div className='logout'>
                            <AiOutlineLogout onClick={handleLogout} />
                        </div>
                    </div>
                    : (
                        <div id='login' className='login-container'>
                            <Link to='/login' className='login'>
                                <div>
                                    Login
                                </div>
                            </Link>
                            <div id='ask-login-popup' className='ask-login-popup'>
                                Login first to continue !!
                            </div>
                        </div>

                    )
            }



            {/* <div>
                {user.name ? user.name}
            </div> */}
        </>
    )
}

export default Header;