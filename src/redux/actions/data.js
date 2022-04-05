const fetchDataActionCreator = (data) => {
    return {
        type: "fetch data",
        payload: data
    }
}

const setCurrentDisplayData = (foodType = "Pizza")=>{
    return {
        type: "set current display data",
        payload: foodType
    }
}


export { fetchDataActionCreator, setCurrentDisplayData };