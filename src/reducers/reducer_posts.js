import {FETCH_POSTS, FETCH_POST, DELETE_POST} from "../actions";
import _ from 'lodash';

export default function(state= {}, action) {
    switch(action.type) {
        case FETCH_POSTS:
            return _.mapKeys(action.payload.data, 'id');
        case FETCH_POST:
            // const post = action.payload.data;
            // const newState = { ...state };
            // newState[post.id] = post;
            // return newState;

            // Following statement is exactly identical to above commented code
            return {...state, [action.payload.id]: action.payload.data};
        case DELETE_POST:
            // It will return a new state without deleted post
            return _.omit(state, action.payload);
        default:
            return state;
    }
}