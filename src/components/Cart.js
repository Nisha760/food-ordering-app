import React, { useEffect } from 'react';
import styles from '../styles/cart.module.css';
import { TiShoppingCart } from 'react-icons/ti';
import { collection, query, doc, where, deleteDoc, getDocs, getDoc} from 'firebase/firestore'
import CartCard from './subComponents/CartCard';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/actions/cart';
import { db } from '../utils/firebase.config';


function Cart() {
  const cart = useSelector(state => state.cart);
  const user = useSelector(state=>state.user) ;
  const dispatch = useDispatch();

  const userCollectionRef = collection(db, "cartInfo") ;

  useEffect(() => {
    console.log(cart)
  }, [cart])
  const handleDelete = async() => {
    dispatch(clearCart());

    const q = query(userCollectionRef, where('userName', '==', user.name)) ;
    const userDocSnapshot = await getDocs(q) ;

    userDocSnapshot.forEach(async (d)=>{
      const dataRef = doc(db, 'cartInfo', d.id) ;
      await deleteDoc(dataRef) ;
    })
    
  }
  return (
    <div>
      <div className=''>
        <div className={styles.heading}>
          Cart Summary

        </div>

        {

          cart.length === 0
            ? (
              <div className={styles.emptyCart}>
                <div>
                  <TiShoppingCart />
                  <div>
                    Your cart is empty
                  </div>
                </div>

              </div>
            )
            :
            (
              <div className={styles.cartItemContainer}>
                {
                  cart.length !== 0 &&
                  <div className={styles.clearCart}>
                    <button onClick={handleDelete}>
                      Clear Cart
                    </button>
                  </div>

                }

                {
                  cart.map((ele) => {
                    return (
                      <CartCard 
                      key={ele.name}
                      name={ele.name}
                      description={ele.description} 
                      quantity={ele.quantity} 
                      totalPrice={ele.totalPrice} 
                      addOns={ele.addOns}
                      />
                    )
                  })
                }
              </div>
            )
        }


      </div>

    </div>
  )
}

export default Cart;