# Create React Context Data

---

[![npm version](https://badge.fury.io/js/create-react-context-data.svg)](//npmjs.com/package/create-react-context-data)

**Simple approach to avoid repeating boilerplate for React Context and Provider.**

Every time we need create a new Context (and its Provider) inside a project, we repeat the same boilerplate logics to handle its data and the actions related to it.

> create-react-context-data provides a handy function to immediately create Context and Provider for you.

All you need to do is define your reducer function and the actions you need to handle your data.
Under the hood the package uses the useReducer hook and bind the dispatch function to all the actions.

### Installation

```bash
npm install create-react-context-data
```

### Basic Usage

Every time you need to create a new Context, you can create a file
and use the createReactDataContext function provided by the package.

You need to provide a reducer, the actions and the initial state.
The function will return your Context and Provide which can be exported
from the file and imported wherever you need them.

```javascript
//import the createReactDataContext function inside your new Context file
import createReactDataContext from 'create-react-context-data';

// import or define your reducer, actions and initial state

export const { Context, Provider } = createReactDataContext(
  reducer,
  actions,
  initialState
);
```

### Full Example

First of all, you need to create a file for the Context you want to create.
For this example, we'll use ItemContext.js

```javascript
// #1 import the createReactDataContext function
import createReactDataContext from 'create-react-context-data';

// #2 define your reducer function
const itemReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'CREATE_ITEM':
      return { ...state, items: [...state.items, payload] };
    case 'DELETE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== payload),
      };
    default:
      return state;
  }
};

// #3 define your actions

// dispatch is provided by default by create-react-context-data
const createItem = (dispatch) => (newItem) => {
  dispatch({ type: 'CREATE_ITEM', payload: newItem });
};

const deleteItem = (dispatch) => (id) => {
  dispatch({ type: 'DELETE_ITEM', payload: id });
};

const myActions = { createItem, deleteItem };

const initialState: { items: [] };

//#3 call the  createReactDataContext function
const { Context, Provider } = createReactDataContext(
  itemReducer,
  myActions,
  initialState
);

//#4 export them to be available elsewhere
export { Context, Provider };
```

Once the Context and The Provider have been exported, they can be used as follows:

**Provider**
In App.js we want to use the Provider to wrap the other components

---

```javascript
// Import and rename the provider with a suitable name to prevent collision with other providers
import { Provider as ItemProvider } from './context/ItemContext';

function App() {
  return (
    <div className="App">
      <ItemProvider>{/* ... all your other components */}</ItemProvider>
    </div>
  );
}
```

**Context**

---

```javascript
import React, { useContext } from 'react';
// Import and rename the context with a suitable name to prevent collision with other contexts
import { Context as ItemContext } from '../context/ItemContext';

// You can now access the Context as you would normally do
const ToDoList = () => {
  const { state } = useContext(ItemContext);
  const { items } = state;
  if (!items || !items.length) return null;
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
};
```
