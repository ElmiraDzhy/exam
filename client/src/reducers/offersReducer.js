import ACTION from '../actions/actionTypes';

const initialState = {
    offers: [],
    isFetching: false,
    error: null,
}

export default function (state = initialState, action){
    switch(action.type){
        case ACTION.GET_ALL_OFFERS_REQUEST: {
            return {
                ...state,
                isFetching: true,
            };
        }

        case ACTION.GET_ALL_OFFERS_SUCCESS: {
            return {
                ...state,
                offers: action.data,
                isFetching: false,
            };
        }

        case ACTION.GET_ALL_OFFERS_ERROR: {
            return {
                ...state,
                error: action.data,
                isFetching: false,
            };
        }

        default: {
            return {
                ...state
            };
        }
    }
}

