import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { collection, getDocs, where, query, doc } from 'firebase/firestore';
import '../styles/home.css'
import Cart from './Cart';
import FoodType from './FoodType';
import SideBar from './subComponents/SideBar';
import { fetchDataActionCreator, setCurrentDisplayData } from '../redux/actions/data';
import { db } from '../utils/firebase.config';
import { addToCart } from '../redux/actions/cart';


function Home() {
    const data = useSelector(state => state.data);
    const user = useSelector(state => state.user);
    const cart = useSelector(state=>state.cart);
    const dispatch = useDispatch();

    const [options, setOptions] = useState([]);
    const userRef = collection(db, "cartInfo");

    // useEffect(()=>{
    //     dispatch(updateUserName) ;
    // })
    
    useEffect(() => {
        console.log(user) ;
        async function fetchData() {
            const res = await axios.get('/data.json');
            const optionArr = Object.keys(res.data.extras.categories);
            const index = optionArr.indexOf("Pizza");
            optionArr.splice(index, 1);
            optionArr.unshift("Pizza");
            setOptions(optionArr);
            // console.log(res.data) ;
            dispatch(fetchDataActionCreator(res.data));

            const q = query(userRef, where('userName', '==', user.name)) ;
            const cartSnapshot = await getDocs(q) ;
            cartSnapshot.forEach(async(d)=>{
                // console.log(d.data().name) ;
                const {name, description, quantity, totalPrice, addOns} = d.data() ;
                console.log(name, description) ;
                dispatch(addToCart({
                    name, 
                    description,
                    quantity,
                    totalPrice,
                    addOns
                }))
            })
            
        }

        fetchData();
        console.log(cart)

    }, [user.name])


    useEffect(() => {
        console.log(data);
        if (data.completeData !== '') {
            dispatch(setCurrentDisplayData());
        }
    }, [data.completeData]);
    return (
        <div className='home-container'>
            <h1>Build Your Menu</h1>

            <div className='main'>
                <nav className='side-nav'>
                    <SideBar options={options} />
                </nav>
                <div className='food-type'>
                    <FoodType />
                </div>
                <div className='cart'>
                    <Cart />
                </div>
            </div>
        </div>
    )
}


export default Home;