import { initialData } from "../states/data";

const dataReducer = (state = initialData, action) => {
    switch (action.type) {
        case "fetch data":
            return {
                ...state,
                completeData: action.payload
            }
        case "set current display data":
            {

                const value = action.payload.toLowerCase();

                const filteredArr = state.completeData.menu.filter((ele) => {
                    if (ele.category.toLowerCase().includes(value))
                        return true;
                    if (ele.fooddescription.toLowerCase().includes(value))
                        return true;
                    if (ele.foodname.toLowerCase().includes(value))
                        return true;
                    return false;
                })
                return {
                    ...state,
                    currentDisplayData: filteredArr
                }
            }
        default:
            return state
    }
}

export { dataReducer };