import { ADD_TO_CONTACT_LIST, DELETE_TO_CONTACT_LIST, FETECH_CONTACT_LIST, UPDATE_TO_CONTACT_LIST } from "./constants";

const initialState:any[] = [];

function reducer(state=initialState, actions:any) {
    
    switch (actions.type) {
        case ADD_TO_CONTACT_LIST:
            return [
                ...state,
                actions.data
            ]
        case UPDATE_TO_CONTACT_LIST:
            return state.map((data) => {
                if (data.name === actions.name) {
                  return actions.data;
                }
                return data;
            });
        case DELETE_TO_CONTACT_LIST:
            return [
                ...state.filter((data)=>data.name!=actions.name)
            ]
        case FETECH_CONTACT_LIST:
            return [
                ...state,
                actions.data
            ]
        default:
            return state
    }
}

export {reducer}