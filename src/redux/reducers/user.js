import { user } from "../states/user";

const userReducer = (state = user, action) => {
    switch (action.type) {
        case 'update user name':
            return {
                ...state,
                name: action.payload
            };
        default:
            return state;
    }
}

export { userReducer } ;