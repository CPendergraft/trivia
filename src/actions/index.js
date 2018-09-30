export const REQUEST_TRIVIALIST = 'REQUEST_TRIVIALIST';
export const RECEIVE_TRIVIALIST = 'RECEIVE_TRIVIALIST';
export const SELECT_TRIVIALIST = 'SELECT_TRIVIALIST';
export const INVALIDATE_TRIVIALIST = 'INVALIDATE_TRIVIALIST';
export const SELECT_ITEM = 'SELECT_ITEM';
export const SELECT_INDEX = 'SELECT_INDEX';
export const SELECT_UPVOTE = 'SELECT_UPVOTE';
export const SELECT_DIFFICULTY = 'SELECT_DIFFICULTY';



export const selectedTrivia = trivialist => ({
    type: SELECT_TRIVIALIST,
    trivialist
});

export const invalidateTrivialist = trivialist => ({
    type: INVALIDATE_TRIVIALIST,
    trivialist
});

export const requestTrivialist = trivialist => ({
    type: REQUEST_TRIVIALIST,
    trivialist
});

export const receiveTrivialist = (trivialist, json) => (


    {
        type: RECEIVE_TRIVIALIST,
        trivialist,
        posts:json,
        receivedAt: Date.now()
    }
);


export const fetchTrivialistEasy = trivialist => dispatch => {
    dispatch(requestTrivialist(trivialist))
    return fetch(`https://opentdb.com/api.php?amount=20&category=11&difficulty=easy&type=multiple`)
        .then(response => response.json())
        .then(json => dispatch(receiveTrivialist(trivialist, json)))
};
export const fetchTrivialistMed = trivialist => dispatch => {
    dispatch(requestTrivialist(trivialist))
    return fetch(`https://opentdb.com/api.php?amount=20&category=11&difficulty=medium&type=multiple`)
        .then(response => response.json())
        .then(json => dispatch(receiveTrivialist(trivialist, json)))
};
export const fetchTrivialistHard = trivialist => dispatch => {
    dispatch(requestTrivialist(trivialist))
    return fetch(`https://opentdb.com/api.php?amount=20&category=11&difficulty=hard&type=multiple`)
        .then(response => response.json())
        .then(json => dispatch(receiveTrivialist(trivialist, json)))
};

export const shouldFetchTrivialist = (state, trivialist) => {
    const posts = state.postsByTrivia[trivialist];
    if (!posts) {
        return true
    }
    if (posts.isFetching) {
        return false
    }
    return posts.didInvalidate
};
export const shouldFetchUpvote = (state, upvote) => {
    const valid = state.upvote
    if (!valid) {
        return true
    }
    if (valid.isFetching) {
        return false
    }
    return valid.didInvalidate
};

export const fetchEasyTrivialistIfNeeded = trivialist => (dispatch, getState) => {
    if (shouldFetchTrivialist(getState(), trivialist)) {
        return dispatch(fetchTrivialistEasy(trivialist))
    }
};

export const fetchMediumTrivialistIfNeeded = trivialist => (dispatch, getState) => {
    if (shouldFetchTrivialist(getState(), trivialist)) {
        return dispatch(fetchTrivialistMed(trivialist))
    }
};

export const fetchHardTrivialistIfNeeded = trivialist => (dispatch, getState) => {
    if (shouldFetchTrivialist(getState(), trivialist)) {
        return dispatch(fetchTrivialistHard(trivialist))
    }
};

export const fetchHardUpvoteIfNeeded = upvote => (dispatch, getState) => {
    if (shouldFetchUpvote(getState(), upvote)) {
        return dispatch(selectUpvote(upvote))
    }
};

export const selectItem = selectedItem => ({
    type: SELECT_ITEM,
    selectedItem
});

export const selectIndex = selectedIndex => ({
    type: SELECT_INDEX,
    selectedIndex
});

export const selectUpvote = upvote => ({
    type: SELECT_UPVOTE,
    upvote
});

export const selectDifficulty = difficulty => ({
    type: SELECT_DIFFICULTY,
    difficulty
});

