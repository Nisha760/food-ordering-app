import React, { useRef } from 'react';
import styles from '../../styles/SideBar.module.css';
import { MdFastfood } from 'react-icons/md'
import { useDispatch } from 'react-redux';
import { setCurrentDisplayData } from '../../redux/actions/data';


function SideBar({ options }) {
    const optionRef = useRef() ;
    const dispatch = useDispatch() ;
    const handleClick = (e) => {
        // console.log(e.currentTarget.innerText)
        dispatch(setCurrentDisplayData(e.currentTarget.innerText))
    }

    return (
        <div className={styles.container}>
            {
                options.map((ele) => {
                    return (
                        <div key={ele} name={ele} className={styles.item} onClick={handleClick}>
                            <div>
                                <MdFastfood/>
                            </div>
                            {ele}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SideBar