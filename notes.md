generator function syntax cannot use arrows! => NO
they cannot be anonymous functions

function* name() {
    
}

MVC

Model - redux (gets data knows data)
View - react (flags that it needs data basically asks)
Controller - redux saga (does the work to get the data)

seperates tasks across files to clean things up

CRUD verbs are for saga action names, and SET is strictly for reducers becuse it WILL BREAK IF THEY ARE THE SAME!!!

saga action name for GET: 'FETCH_ELEMENTS' ----> reducer name: 'SET_ELEMENTS'
saga action name for POST: 'ADD_ELEMENTS' -----> get saga action is then called 'FETCH_ELEMENTS' *not the SET_ELEMENTS itself*

we are seperating out concerns throughout the app