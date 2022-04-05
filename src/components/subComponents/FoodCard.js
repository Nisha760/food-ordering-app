import React, { cloneElement, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collection, where, getDocs, query, addDoc, updateDoc, doc } from 'firebase/firestore';
import img from '../../images/SmartQ Logo.png'
import { addToCart } from '../../redux/actions/cart';
import styles from '../../styles/FoodCard.module.css';
import CheckBoxContainer from './CheckBoxContainer';
import { db } from '../../utils/firebase.config';

const options = ["a", "b", "c"]

function FoodCard({ category, fooddescription, foodid, foodname, imageurl, price, submenu }) {
    const cart = useSelector(state => state.cart);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const data = useSelector(state => state.data);
    const buttonDivRef = useRef();
    const [addOns, setAddOns] = useState(false);
    const [checked, setChecked] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(price);

    const cartInfoRef = collection(db, "cartInfo");


    useEffect(() => {
        let addOnsPrice = 0;
        checked.forEach((ele) => {
            addOnsPrice += data.completeData.submenu[ele].price;
            // console.log(data.completeData.submenu[ele])
        })
        setTotalPrice(((addOnsPrice + price) * quantity).toFixed(2))
        // console.log(checked)
    }, [checked, quantity])

    // useEffect(()=>{
    //     console.log(cart)
    //     // console.log("black") ;
    // }, [cart])



    const handleAddOns = () => {
        setAddOns(prev => !prev);
    }

    const handleAddItem = async () => {
        if (user.name !== null) {


            dispatch(addToCart(
                {
                    name: foodname,
                    description: fooddescription,
                    quantity: quantity,
                    totalPrice: totalPrice,
                    addOns: checked
                }
            ));

            const q = query(cartInfoRef, where("name", '==', foodname));
            console.log()

            const querySnapshot = await getDocs(q);
            console.log(querySnapshot)
            if (querySnapshot.empty) {
                const addedData = await addDoc(cartInfoRef, {
                    name: foodname,
                    description: fooddescription,
                    quantity,
                    totalPrice,
                    addOns: checked,
                    userName: user.name
                })
                // console.log(add)
            } else {
                console.log("found");

                querySnapshot.forEach(async (d) => {
                    console.log(d.data());
                    console.log(d.id);
                    const dataRef = doc(db, "cartInfo", d.id);
                    console.log(dataRef);
                    // updateDoc()
                    await updateDoc(dataRef, {
                        quantity,
                        totalPrice,
                        addOns: checked
                    })
                })

            }
        } else {
            const ele = document.getElementById('ask-login-popup');
            ele.style.display = "block";
            setTimeout(() => {
                ele.style.display = "none"
            }, 2000)
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <div className={styles.img}>
                    <img src={imageurl}></img>
                </div>
                <div className={styles.textInfo}>
                    <div>
                        <h4>{foodname}</h4>
                        <div>
                            {fooddescription}

                        </div>

                        {
                            submenu !== undefined
                                ? <>
                                    {
                                        addOns && <CheckBoxContainer setTotalPrice={setTotalPrice} setChecked={setChecked} options={submenu} name="submenu" />
                                    }
                                    <button className={styles.addOns} onClick={handleAddOns}>
                                        Add-ons
                                    </button>
                                </>
                                : null
                        }

                    </div>
                    <div className={styles.price}>
                        ${price}
                    </div>
                </div>

            </div>
            <div className={styles.selectors}>
                <div>
                    Quantity
                    <input type='number' min='1' value={quantity} onChange={(e) => { setQuantity(e.target.value) }}></input>
                </div>

                {/* <div>
                    Session
                    <select>
                        <option value="0">select session</option>
                    </select>
                </div> */}

                <div>
                    Sub Total
                    <div>
                        ${totalPrice}
                    </div>
                </div>

                <div ref={buttonDivRef} className={styles.button}>
                    {
                        user.name !== null
                            ? <button onClick={handleAddItem}>
                                Add Item
                            </button>

                            : <a href='#login'>
                                <button onClick={handleAddItem}>
                                    Add Item
                                </button>
                            </a>
                    }

                </div>

            </div>
        </div>
        // <></>
    )
}

export default FoodCard