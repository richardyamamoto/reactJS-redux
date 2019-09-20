# Briefing

This application has the objective to be a consult material in the future. We are using ReactJS, Architecture Flux and Redux.

---

## Dependencies file and Configuration file

- Start with `yarn init -y`
- Paste this [package.json]() inside your app root folder and run `yarn`
- Then run `yarn eslint --init`
- Delete _package-json_ created by _npm_
- Run `yarn` again

---

## Routes

- Install react-router-dom with `yarn add react-router-dom`
- Create `routes.js` inside src
  - src/routes.js
- Then `import { Switch, Route } from 'react-router-dom'`
  - Switch allow the application to call one route at a time

### Create Pages - Part I

- Inside src create a folder named pages
  - src/pages
- Inside pages each page has a folder with it's self index.js
  - src/pages/Home/index.js
  - src/pages/Cart/index.js
- Create a Stateless component inside of each index.js

## Continuing Routes
**routes.js**

- Import the pages inside `routes.js`
    - `import Home from './pages/Home'`
    - `import Cart from './pages/Cart'`
- The function `Routes(){}` will return the `Switch` component outside the block
and the `Routes` component inside

```js
export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/cart" component={Cart} />
    </Switch>
  );
}
```
- The Route to Home page **must** have the `exact` propertie

**App.js**

- Import the BrowserRouter and the Routes
  - `import { BrowserRouter } from 'react-router-dom'`
  - `import Routes from './routes'`
- The function `App(){}` will return the `BrowserRouter` component with `Routes`
component inside
```js
function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}
```

---
## Global Styles

- Install the `styled-components` running `yarn add styled-components`
- Inside src create a folder named `styles` with a file named `global.js`
  - src/styles/global.js
- Import createGlobalStyle
  - `import { createGlobalStyle } from 'styled-components'`
  - `export default createGlobalStyle``;`

[global.js](https://gist.github.com/richardyamamoto/bb2b8df5b71507bb26e7f62a862cdb70)

---
## Components - Header

- Create a folder named `components` inside `src`
  - src/components
- Inside `components` each component need to have a folder with index.js and styles.js
  - src/components/header/index.js
  - src/components/header/styles.js

**index.js**

- The `function Header(){}` will return the `Container` component
- Inside `Container` put an `img` with the logo
- Import the component Link from react-router-dom
  - `import { Link } from 'react-router-dom'`
    - The Link will handle the navigation

**App.js**

- `import Header from './components/Header';`
- Put the `Header` inside the function return

[Header - index.js](https://gist.github.com/richardyamamoto/d9129142072c0d788ce44a1f57012d49)

---
### Icons

- Install react-icons `yarn add react-icons`
  - `import { MdShoppingBasket } from 'react-icons/md';`


## Polished
- Librarie that handles colors
- `yarn add polished`
  - `import { darken } from 'polished`
    - put this way on CSS `${darken(0.03, "#7159c1")}`

---
## Json Server
- Install running `yarn global add json-server` or install it local `yarn add json-server -D`
- To turn things easier, create a script to run json-server
  - `json: "json-server -p 3333 -w"`

---
## Axios
It help us to consume API
- Install running `yarn add axios`

---
## Format currency

To format currency we use a native lib called `Intl`. First create a folder/file in `src/util/index.js`. Exemple:

```js
export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});
```
to use it, import the renamed function `import {formatPrice} from '../../util''` an use as a function `formatPrice()`

---
## Redux
- To start we install redux and react-redux `yarn add redux react-redux`,
After installation, create a folder/file inside src `src/store/index.js`. The initial configuration of Redux is going to happen inside this file.

- Import a function called `createStore`:
`import { createStore } from 'redux'` and put it into a constant named store.

```js
import { createStore } from 'redux';

const store = createStore();

export default store;
```
- on App.js

```js
import { Provider } from 'react-redux';
import store from './store'
```

- The component Provider goes outside all the other components and inside it there is a parameter called store that goes store.

```js

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes />
        <GlobalStyle />
      </BrowserRouter>
    </Provider>
  );
}
```
- It will occur an error due to lack of the function of the reducer, to solve this problem and organize better our application.
- Inside `src/store` create a folder called `modules` and inside modules a folder `cart` and a file named `reducer.js`
  - `src/store/module/cart/reducer.js`
- In `reducer.js` create a function as the following example
- The function must return the state.

```js
export default function cart(){
  return [];
}
```
- Inside `src/modules` create `rootReducer.js` to manage all the reducer modules, using the `combineReducers` from redux, here is an exemple

```js
import { combineReducers } from 'redux';

import cart from './cart/reducer';

export default combineReducers({
  cart,
});
```
---
## Add Products to Cart

- Inside `page/Home/index.js`
- `import { connect } from 'react-redux';`
 -  The connect returns another function and we call it by passing the name of the component.
- At `src/pages/Home/index.js`, cut the `export default` and put on the end of the file, but the export going to be like this:
```js
export default connect()(Home)
```
- Always that we want to modify something at state, we are going to throw an `Action`.
  - Action is an object with type and the content we want.
- On this exemple the action going to be called when clicked on the button of the product and the function will receive the product as parameter.

```js
onClick={() => this.handleAddProduct(product)}
```
- All component that we connect with Redux receive a propertie called `dispatch`. It throw an `action` to Redux and all the reducers going to listen this dispatch.
- This is how the function that handle the `dispatch()` looks like:

```js
handleAddProduct = product => {
    const { dispatch } = this.props;

    dispatch({
      type: 'ADD_TO_CART',
      product,
    });
  };
```
- The action dispatched has an object shape, and the attribute **type** is obligatory.
- On `src/store/modules/cart/reducer.js`
- This redeucer and all the others (if their exists) are going to receive the dispatch, and to treat this situation we use Switch Case conditional flux controller.

```js
export default function cart(state = [], action) {
  console.log(state);
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.product];
    default:
      return state;
  }
}

```
- The parameter state is the previous `state` and the `action` contents all the action dispatched.
- Because of the way Redux works and all the reducers listen to the actions, the switch case `default` returns the previus state in case of the action do not match with any case.
- To make another component recover the action dispatched, import the `connect`
  - `import { connect } from 'react-redux`
  - Cut the `export default` and put it on the end of the component
- But here we have something diferent. The `connect()` receive as a parameter the state.
- For exemple:

```js
export default connect(state => ({
  cartSize: state.cart.length,
}))(Header);
```
