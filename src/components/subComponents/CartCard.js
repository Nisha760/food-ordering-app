import React, { useEffect } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { collection, doc, deleteDoc, query, getDoc, where, getDocs } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItem } from '../../redux/actions/cart';
import styles from '../../styles/cart.module.css'
import { db } from '../../utils/firebase.config';


function CartCard({ name, description, quantity, totalPrice, addOns }) {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const userRef = collection(db, "cartInfo");
    // const d

    const handleDelete = async () => {
        dispatch(deleteItem(name))

        const q = query(userRef, where("name", "==", name));
        const docSnap = await getDocs(q);
        docSnap.forEach(async (d) => {
            const deleteDataRef = doc(db, "cartInfo", d.id);
            await deleteDoc(deleteDataRef);
            console.log("deleted");

        })
    }
    return (

        <div className={styles.cartCard}>
            <div className={styles.delete}>
                <AiFillDelete onClick={handleDelete} />
            </div>
            <div className={styles.name}>
                {name}
            </div>
            <div className={styles.description}>
                {description}
            </div>
            <div className={styles.addOns}>
                <div>
                    Extras:
                </div>
                {addOns.map(ele => {
                    return <div key={ele}>{ele}</div>

                })}
            </div>
            <div className={styles.totalPrice}>
                Total: ${totalPrice}
            </div>
            <div className={styles.quantity}>
                Qty: {quantity}
            </div>
        </div>
    )
}

export default CartCard