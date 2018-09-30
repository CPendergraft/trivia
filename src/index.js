import React from 'react';
import {  render } from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';


import MainApp from "./pages/MainApp";


const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(...middleware)
)

render(
    <Provider store={store} >

        <BrowserRouter>
            <MainApp />
        </BrowserRouter>

    </Provider>
    ,
    document.getElementById('root')
)


