import React, { useEffect, useState } from 'react'
import styles from '../../styles/CheckBoxContainer.module.css'

const CheckBoxContainer = ({options, name, setChecked}) =>{
    

    // useEffect(()=>{
    //     // console.log(checked) ;
    // }, [checked])

    const handleChecked = (e)=>{
        if(e.target.checked)
        {
            setChecked(prev=>{
                return [...prev, e.target.value] ;
            })
        }else{
            setChecked(prev=>{
                const newState = prev.filter((ele)=> ele !== e.target.value) ;
                return newState ;
            })
        }
    }
    return (
        <div className={styles.container} onClick={handleChecked}>
            {
                options.map((ele)=>{
                    return (
                        <div key={ele} >
                            <label htmlFor={ele}>{ele}</label>
                            <input id={ele} type="checkbox" value={ele} name={name}></input>
                        </div>    
                    )
                })
            }
        </div>
    )
}

export default CheckBoxContainer ;