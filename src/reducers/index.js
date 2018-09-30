import { combineReducers } from 'redux'
import {
    SELECT_ITEM, INVALIDATE_TRIVIALIST,
    REQUEST_TRIVIALIST, RECEIVE_TRIVIALIST, SELECT_TRIVIALIST, SELECT_DIFFICULTY, SELECT_INDEX,
} from '../actions'


const selectedTrivia = (state = 'reactjs', action) => {
    switch (action.type) {
        case SELECT_TRIVIALIST:
            return action.trivialist
        default:
            return state
    }
}
const selectItem = (state , action) => {

    return {...state, selectedItem: action.selectedItem}
}
const selectIndex = (state , action ) => {


    return {...state, selectedIndex: action.selectedIndex}
}
const selectUpvote = (state , action) => {

    return {...state, upvote: action.upvote}
}
const selectDifficulty = (state , action) => {

    return {...state, difficulty: action.difficulty}
}

const posts = (state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) => {
    switch (action.type) {
        case INVALIDATE_TRIVIALIST:
            return {
                ...state,
                didInvalidate: true
            }
        case REQUEST_TRIVIALIST:
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            }
        case RECEIVE_TRIVIALIST:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: action.posts.results,
                lastUpdated: action.receivedAt
            }
        default:
            return state
    }
}

const postsByTrivia = (state = { }, action) => {
    switch (action.type) {
        case INVALIDATE_TRIVIALIST:
        case RECEIVE_TRIVIALIST:
        case REQUEST_TRIVIALIST:
            return {
                ...state,
                [action.trivialist]: posts(state[action.trivialist], action)
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    postsByTrivia,
    posts,
    selectItem,
    selectIndex,
    selectUpvote,
    selectDifficulty,
    selectedTrivia

})

export default rootReducer