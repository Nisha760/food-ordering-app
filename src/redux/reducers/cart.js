import { initialCart } from "../states/cart";

const cartReducer = (state = initialCart, action) => {
    switch (action.type) {
        case 'add to cart':
            {
                const index = state.findIndex(o=>o.name === action.payload.name) ;
                if(index !== -1)
                {
                    // const newState = state ;
                    state.splice(index, 1) ;
                    console.log("newstate")
                    return [...state, action.payload];
                }
                return [...state, action.payload] ;
            } ;
        case 'clear cart':
            return [] ;
        case 'delete item': {
            const index = state.findIndex(o=>o.name === action.payload) ;
            state.splice(index, 1) ;
            console.log(state) ;
            // return state ;
            //above statement does not work because we are simply changing the state directly and returning 
            //it, so react does not know when to rerender

            return [...state]
        }
        default:
            return state ;
    }
}

export { cartReducer } ;