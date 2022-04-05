import { combineReducers } from "redux";
import { dataReducer } from "./reducers/data"; 
import { cartReducer } from "./reducers/cart";
import { userReducer } from "./reducers/user";


const rootReducer = combineReducers({
    data: dataReducer, 
    cart: cartReducer, 
    user: userReducer
})


export { rootReducer };