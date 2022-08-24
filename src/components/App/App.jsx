import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function App() {
  const dispatch = useDispatch();
  const elements = useSelector(store => store.elementList)
  const [newElement, setNewElement] = useState('');

  const getElements = () => { // removing this axios get. still trigget this wil useEffect

      dispatch({ // replace the entire axios with just a simple dispatch. redux holds the axios request.
        type: 'FETCH_ELEMENTS' // if you need to get elements somewhere else, just use the same type
      }) // redux saga watches for actions in the watcherSaga

  }

  useEffect(() => {
    getElements();
  }, []);

  const addElement = () => {

    dispatch({
      type: 'ADD_ELEMENT',
      payload: newElement
    })
    // clear inputs go here
  }


  return (
    <div>
      <h1>Atomic Elements</h1>

      <ul>
        {elements.map(element => (
          <li key={element}>
            {element}
          </li>
        ))}
      </ul>

      <input 
        value={newElement} 
        onChange={evt => setNewElement(evt.target.value)} 
      />
      <button onClick={addElement}>Add Element</button>
    </div>
  );
}


export default App;
