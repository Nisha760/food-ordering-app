import React, { useRef } from 'react';
import { MdOutlineSearch } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDisplayData } from '../../redux/actions/data';


function SearchBar() {
    const searchRef = useRef() ;
    const dispatch = useDispatch() ;
    const data = useSelector(state=>state.data) ;
    const handleSearch = ()=>{
        const value = searchRef.current.value.toLowerCase() ;
        // const filteredArr = data.completeData.menu.filter((ele)=>{
        //     if(ele.category.toLowerCase().includes(value))
        //         return true ;
        //     if(ele.fooddescription.toLowerCase().includes(value))
        //         return true ;
        //     if(ele.foodname.toLowerCase().includes(value))
        //         return true ;
        //     return false ;
        // })
        dispatch(setCurrentDisplayData(value)) ;
    }
    return (
        <>
            <input type='text' ref={searchRef} placeholder='Search Item'></input>
            <div onClick={handleSearch}>
                <MdOutlineSearch />
            </div>

        </>
    )
}


export default SearchBar;