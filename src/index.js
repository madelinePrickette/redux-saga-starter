import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.jsx';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'; // import the saga middleware
import logger from 'redux-logger';
import {takeEvery, put} from 'redux-saga/effects'; // import this for the watcherSaga
// takeEvery listens for actions
import axios from 'axios';

const elementList = (state = [], action) => { // this 'SET_ELEMENTS' is recieving the yield put({ type: 'SET_ELEMENTS', payload: response.data })
    switch (action.type) {
        case 'SET_ELEMENTS':
            return action.payload;
        default:
            return state;
    }
};    

function* fetchElements() { // worker saga, runs every time 'FETCH_ELEMENTS'
    // paste your axios here

    // axios.get('/api/element').then(response => {
    //   dispatch({ type: 'SET_ELEMENTS', payload: response.data });
    // })
    //   .catch(error => {
    //     console.log('error with element get request', error);
    //   });

    // rewrite using generator syntax

    try { // try this code. if it breaks... 

        //yield put({type: 'SHOW_LOADING'}) loading spinner yayyyy
        let response = yield axios.get('/api/element'); // move on when this is successful. gets replaces of .then
        yield put({ type: 'SET_ELEMENTS', payload: response.data }) // this put means dispatch 
        // this is the end of the saga
        // the catch is not handled here
        //yield put({type: 'HIDE_LOADING'})

    } catch(err) { // catch this error. This is error handling
        console.error('error in GET ELEMENTS', err)
    }
} // all done! This is how a get is rewritten

function* addElement() { 
    // axios post to server request
    // we need a way to access the action payload data.

    try{ // we need a try otherwise the error will break everything because it throws it up to the top
        yield axios.post('/api/element', {name: action.payload}) // we dont really need response because its 'OK'
        yield put({type: 'FETCH_ELEMENTS'}) // this uses FETCH_ELEMENTS for the watcher. this is a dispatch
    } catch(err) {
        console.error('error in POST GENERATOR FUNCTION', err)
    }
    // here the add element triggers the fetch element
}




// this is the saga that will watch for actions from dispatches
function* watcherSaga() { 
    yield takeEvery('FETCH_ELEMENTS', fetchElements) // this says every action that has FETCH_ELEMENTS run the saga function fetchElements
    yield takeEvery('ADD_ELEMENT', addElement) // this triggers the post generator function
}


const sagaMiddleware = createSagaMiddleware(); // instantiate in order to use

// This is creating the store
// the store is the big JavaScript Object that holds all of the information for our application
const storeInstance = createStore(
    // This function is our first reducer
    // reducer is a function that runs every time an action is dispatched
    combineReducers({
        elementList,
    }),
    applyMiddleware(sagaMiddleware, logger), // assembly line worker they help but dont get in the way
);

sagaMiddleware.run(watcherSaga); // start the engine

ReactDOM.render(
    <Provider store={storeInstance}>
        <App/>
    </Provider>, 
    document.getElementById('root')
);

registerServiceWorker();
