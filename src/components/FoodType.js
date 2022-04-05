import React from 'react'
import { useSelector } from 'react-redux'
import styles from '../styles/FoodType.module.css'
import FoodCard from './subComponents/FoodCard'

function FoodType() {
  const data = useSelector(state=>state.data) ;
  // console.log(data.currentDisplayData) ;

  return (
    <div className={styles.container}>
      {/* <div className={styles.category}>
        
      </div> */}

      <div className={styles.foodContainer}>

        {
          data.currentDisplayData.map((ele)=>{
            return (
              <FoodCard 
              key={ele.foodid}
              category={ele.category}
              fooddescription = {ele.fooddescription}
              foodid = {ele.foodid}
              foodname = {ele.foodname}
              imageurl = {ele.imageurl}
              price = {ele.price}
              submenu = {ele.submenu}
              /> 
            )
          })
        }
           
      </div>
    </div>
  )
}

export default FoodType