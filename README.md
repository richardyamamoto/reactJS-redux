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
  - `src/pages`
- Inside `pages` each page has a folder with itself `index.js`
  - `src/pages/Home/index.js`
  - `src/pages/Cart/index.js`
- Create a Stateless component inside of each `index.js`

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
- The Route to Home page **must** have the `exact` property

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

[Documentation](https://www.styled-components.com/docs)

- Install the `styled-components` running `yarn add styled-components`
- Inside `src`create a folder named `styles` with a file named `global.js`
  - `src/styles/global.js`
- Import createGlobalStyle
  - `import { createGlobalStyle } from 'styled-components'`
  - `export default createGlobalStyle``;`

[global.js](https://gist.github.com/richardyamamoto/bb2b8df5b71507bb26e7f62a862cdb70)

---
## Components - Header

The components can be reused by all the other pages.

- Create a folder named `components` inside `src`
  - `src/components`
- Inside `components` each component need to have a folder with `index.js` and `styles.js`
  - `src/components/header/index.js`
  - `src/components/header/styles.js`

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

[Documentation](https://react-icons.netlify.com/#/)

- Install react-icons `yarn add react-icons`
  - `import { MdShoppingBasket } from 'react-icons/md';`


## Polished

[Documentation](https://polished.js.org/docs/)

Librarie that handles colors.

- `yarn add polished`
  - `import { darken } from 'polished`
    - put this way on CSS `${darken(0.03, "#7159c1")}`

---
## Json Server

[Documentation](https://github.com/typicode/json-server)

- Install running `yarn global add json-server` or install it local `yarn add json-server -D`
- To turn things easier, create a script to run json-server
  - `json: "json-server -p 3333 -w"`

---
## Axios

[Documentation](https://github.com/axios/axios)

It help us to consume API
- Install running `yarn add axios`

---
## Format currency

[Documentation](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat)

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

[Documentation](https://redux.js.org/basics/basic-tutorial)

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
- All component that we connect with Redux receive a property called `dispatch`. It throw an `action` to Redux and all the reducers going to listen this dispatch.
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

## Reactotron

[Documentation](https://github.com/infinitered/reactotron)

- Install the integration `yarn add reactotron-react-js reactotron-redux`
- Create a folder and file `src/config/ReactotronConfig.js`

```js
import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';

if (process.env.NODE_ENV === 'development') {
  const tron = Reactotron.configure()
    .use(reactotronRedux())
    .connect();

  tron.clear();

  console.tron = tron;
}
```
- This will allow us to use `console.tron.log()`
- The Eslint will complain about that, just put the rule exception `'no-console': ['error', {allow: ['tron']}]`
- At `src/store/modules/index.js` we are going to create:

```js
import { createStore } from 'redux';

import rootReducer from './modules/rootReducer';

const enhancer =
  process.env.NODE_ENV === 'development' ? console.tron.createEnhancer() : null;

const store = createStore(rootReducer, enhancer);

export default store;
```

- The `enhancer` is the next parameter of `createStore()`
- After that, import the ReactotronConfig at the **App.js**
  - `import './config/ReactotronConfig'`
    - It must be imported before the `store` importation.
- Reactotron allow us to monitor the `actions` and more than that, we can use the
**State** functionality to:
  - Create subscriptions and turn things a lot easier.
    - Exemple: `cart` will subscribe the Cart reducer.
  - Take snapshots from the current state.

---
## Add Product on the Cart List

- First on `src/pages/cart/index.js` import the connect
  - `import { connect } from 'react-redux'`
  - Cut the `export default` and paste at the end of the file
    - `export default connect()(Cart)`
- Before the connect exportation, there is a function called `mapStateToProps()`
  - This function is going to receive our state information and map it on a property shape.
```js
const mapStateToProps = state => ({
  cart: state.cart,
});
```
- The function `Cart` will receive the cart state by unstructured parameter
  - `function Cart({ cart }) {...}`
  - The cart will reach us in array format, so we can map it.
- Then cut the entire `tr` tag and put into a `.map`

```js
{cart.map(product => (
  <tr>
  ...
  </tr>
))}
```
- Each product will return the informations.

## Immer to treat duplicated products

[Documentation](https://immerjs.github.io/immer/docs/introduction)

The basic idea is that you will apply all your changes to a temporary draftState, which is a proxy of the currentState.

- To install run `yarn add immer`
- First on `src/store/modules/cart/reducer.js` import the `produce`
  - `import produce from 'immer'`

- Now on the return of the Switch case, instead of using the rest operator like we did before, the immer allow us to "mutate" the state.
- In the return goes the `produce()` and the first parameter is the current `state` and the second one is the `draft` that will suffer the changes.
- Create a const `productIndex` and it will receive the draft (a copy of the state)
- Search for the product by index using `.findIndex(p =>())`

```js
return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.product.id);
        if (productIndex >= 0) {
          draft[productIndex].amount += 1;
        } else {
          draft.push({
            ...action.product,
            amount: 1,
          });
        }
      });
```
- If productIndex is bigger or equals 0, it means that the product already exists in the list.
- So we catch the product position in the array and pick the `amount` attribute and sum 1.
- Else we use rest operator to push all the new product infomation plus the default amount that is 1 and it will change the `cartSize`.

---
## Remove Product from Cart

- On `src/pages/cart/index.js`.
- To remove the product from cart, we have to use the `dispatch` property from Redux.
- On the Delete button we are going to trigger the action.
  - `<MdDelete onClick={() => dispatch({ type: 'REMOVE_FROM_CART', id: product.id })}>`
- The action must have a `type` as obligatory attribute and we are going to pass the product id directly from the action
- Now on the `src/store/modules/cart/reducer.js`
- We create a new case and treat the exclusion

```js
case 'REMOVE_FROM_CART':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);
        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });
```

---
## Refactoring Actions

Actions are vinculated with their modules, a smart way to organize it is creating a file inside the module with all the actions.

- On `src/store/modules/cart` create `actions.js`.
- Inside `actions.js` export functions that were used on Home and Cart page.

```js
export function addToCart(product) {
  return {
    type: '@cart/ADD',
    product,
  };
}

export function removeFromCart(id) {
  return {
    type: '@cart/REMOVE',
    id,
  };
}
```

- We changed the type to a better identification on Reactotron.
- After that import this action on Home and Cart page.
  - `import * as CartActions from '../../store/modules/cart/actions'`.
    -  Using the `*` we can import all the functions at once.
- To make the application less verbal, we can use a function called `mapDispatchToProps`
  - It makes `dispatch` a property, so we can use it directly as a parameter of the function Component or unstructure it to use on the Stateful components.
- The `mapDispatchToProps` use a function from Redux called `bindActionCreator` that must be imported.
  - `import { bindActionCreator } from 'redux'`.
- This function waits for the Actions imported as a first parameter.

```js
const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);
```

- On `connect` we put the `mapDispatchToProps` as a second parameter.
  - Obs.: If there is no `mapStateToProps`, the first parameter must be `null`.

```js
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
```

- Do this steps on the Home and Cart page

- The Stateless component should looks like

```js
function Cart({ cart, removeFromCart }) {
  ...
  <button type="button">
    <MdDelete
      size={20}
      color="#7159c1"
      onClick={() => removeFromCart(product.id)}
    />
  </button>
  ...
}
```
- The Stateful component methods should looks like

```js
handleAddProduct = product => {
  const { addToCart } = this.props;
  addToCart(product);
};
```

---
## Changing Product Amount

- On `src/store/modules/cart/actions.js`
- Create the update action

```js
export function updateAmount(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT',
    id,
    amount,
  };
}
```
- Then on `src/pages/Cart/index.js`
- Create two functions, `increment()` and `decrement()`
- The `increment` must receive as parameter the product
  - Then we call the `updateAmount(product.id, product.amount + 1)`
- The `decrement` is the oposite.

```js
function increment(product) {
    updateAmount(product.id, product.amount + 1);
}
```
- To trigger the function put it on the button

```js
<button type="button">
  <MdAddCircleOutline
    size={20}
    color="#7159c1"
    onClick={() => increment(product)}
  />
</button>
```

- The action does not have the obligation to validate the update.
- Now on `src/store/modules/cart/reducer.js`

```js
case '@cart/UPDATE_AMOUNT': {
      if (action.amount <= 0) {
        return state;
      }
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);
        if (productIndex >= 0) {
          draft[productIndex].amount = Number(action.amount);
        }
      });
    }
```

---
## Calculating Subtotal and Total

There is a lot of ways to make it do, but to save resources we are going to calculate on `mapStateToProps`

- On `src/pages/cart/index.js`

```js
const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })),
  total: formatPrice(
    state.cart.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0)
  ),
});
```
- The cart reducer is an array so we can map it.
- Copy all the product information and add the subtotal attribute.
- Use the `formatPrice()` (we used before to fromat currency).
- The total is a new virtual state
  - We are using the `reduce()` that is a native function of JavaScript. The first parameter is a function that will agroup the values and the second is the start value.
- The `total` must be placed on the function component parameter as a new property.

---
## Showing Quantities

The page home there is a div inside each button that display the amount of each item that was included in the cart. So to turn this counter dynamic

- Using the `mapStateToProps()` at `src/pages/home/index.js`

```js
const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;

    return amount;
  }, {}),
});
```
- Create a object propertie called `amount` and we are going to `reduce` the cart state to a single value (the amount).
- The method `reduce()` waits for the first parameter a variable to alocate the value and a second one that is the object to go through.
- `amount[product.id]` is a easy way to find the product by the primaryKey.
- the array indexed by the `id` will receive the amout of the product

---
## Redux Saga

[Documentation](https://github.com/redux-saga/redux-saga)

The Redux Saga, allow us to intercept the Actions and make asyncronus requests causing side effects.
- Install using `yarn add redux-saga`
- create at `sagas.js` inside `src/store/modules/cart`
  - `src/store/modules/cart/sagas.js`
- Create a `function* addToCart(action)`. This function instead of receive the whole product, it will only wait for the id of the product, but first we have to change the `src/pages/home/index.js` the `handleAddProduct()` and put the id instead of the whole product.
  - `function*` the asterisk means that it is a `generator`, think that is analog to a `async/await` function.
- After that the `sagas.js` should looks like:

```js
function* addToCart({ id }) {}
```
- Then import the api at services.
  -`import api from '../../../services/api'`
- But the redux-saga does not allow us to use the `api.get()` as usually. We have to import the method `call` to consume asyncronous functions.
  - `import { call } from 'redux-saga/effects'`
- The method `call()` waits for the firs parameter, the function that we want to use then separeted by comma the other parameters of the function.
- It should looks like this:

```js
import { call } from 'redux-saga/effects';
import api from '../../../services/api';

function* addToCart({ id }) {
  const response = yield call(api.get, `/products/${id}`);
}
```

- `yield` is a reserved word analog to `await`.
- After that we have to change our reducer, because they are triggered by our action `'@cart/ADD`. So inside `src/store/modules/actions.js` make the following changes:

```js
export function addToCartRequest(id) {
  return {
    type: '@cart/ADD_REQUEST',
    id,
  };
}

export function addToCartSuccess(product) {
  return {
    type: '@cart/ADD_SUCCESS',
    product,
  };
}
```
- At `src/pages/home/index.js` we have make some changes too `handleAddProduct()`

```js
handleAddProduct = id => {
    const { addToCartRequest } = this.props;
    addToCartRequest(id);
};
```
- To dispatch an Action from redux-saga we use the method `put`
- To wait for all changes we use the method `all`
- Then to put listeners we use the `takeLatest` (it is better used if the user click more than once. The redux-saga abort the first request and just conclude the latest one)
  - `import { call, put, all, takeLatest } from 'redux-saga/effects'`

- The first parameter of `takeLatest()` is which action we want to listen and the second is which function we are going to dispatch.
- It should looks like this:

```js
import { call, put, all, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';

import { addToCartSuccess } from './actions';

function* addToCart({ id }) {
  const response = yield call(api.get, `/products/${id}`);

  yield put(addToCartSuccess(response.data));
}

export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
```
- We are going to unificate the sagas as we did with Reducers
- At `src/store/modules/` create `rootSaga.js`
- Inside `rootSaga.js` import the method `all` from `redux-saga/effects`
- Then create a generator function called `rootSaga()` that returns a list of all the sagas

```js
import { all } from 'redux-saga/effects';

import cart from './cart/sagas';

export default function* rootSaga() {
  return yield all([cart]);
}
```

- Now on `src/store/index.js`

```js
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const enhancer =
  process.env.NODE_ENV === 'development'
    ? compose(
        console.tron.createEnhancer(),
        applyMiddleware(sagaMiddleware)
      )
    : applyMiddleware(sagaMiddleware);

const store = createStore(rootReducer, enhancer);
sagaMiddleware.run(rootSaga);

export default store;
```
- The `applyMiddleware` let us add the middleware to our reducers and intercept the actions.
- The `compose` from Redux let us merge the configurations.

---

## Reactotron + Saga

[Documentation](https://github.com/infinitered/reactotron/blob/master/docs/plugin-redux-saga.md)

- To install run `yarn add reactotron-redux-saga`
- First at `src/config/ReactotronConfig.js`
  - `import reactotronSaga from 'reactotron-redux-saga'`
- Below the `.use(reactotronRedux())` put the `.use(reactotronSaga())`

```js
import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';

if (process.env.NODE_ENV === 'development') {
  const tron = Reactotron.configure()
    .use(reactotronRedux())
    .use(reactotronSaga())
    .connect();

  tron.clear();

  console.tron = tron;
}
```

- Now on `src/store/index.js` this are the changes

```js
const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;

const sagaMiddleware = createSagaMiddleware({
  sagaMonitor,
});
```

## Separating Actions

- First we are going to controll the product amount at sagas.
- Inside `src/store/module/cart/reducer.js`
- At `case '@cart/ADD_SUCCESS':` delete the treatment of product, it should looks like this:

```js
case '@cart/ADD_SUCCESS':
  return produce(state, draft => {
    const { product } = action;
    draft.push(product);
  });
```
- Then in `src/store/modules/cart/sagas.js`

- create a `const data = {}` that will receive the response of api, and create a attribute amount for product object and the price formatted

```js
const data = {
    ...response.data,
    amount: 1,
    priceFormatted: formatPrice(response.data.price),
  };
```

- After that we want to verify if the product already exists in the cart.
- To access the cart state we are going to import the methos `select` from `redux-saga/effects`
  - `import { select } from 'redux-saga/effects'`
- The method `select()` receive as parameter the state from reducers

```js
import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { formatPrice } from '../../../util';

import { addToCartSuccess, updateAmount } from './actions';

function* addToCart({ id }) {
  const productExists = yield select(state => {
    return state.cart.find(product => product.id === id);
  });

  if (productExists) {
    const amount = productExists.amount + 1;

    yield put(updateAmount(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);
    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };

    yield put(addToCartSuccess(data));
  }
}
export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
```
- The file should looks like above
---

## Consult Stock on Add

To consult the stock, remember that in the JSON file there is an array of objects with the stock, so the firts thing to do is to call the api and consume this objects

- Create a const that will receive the api
- Then verify if the amount of the existent product plus one won't overpass the stock amount.
```js
function* addToCart({ id }) {
  const productExists = yield select(state => {
    return state.cart.find(product => product.id === id);
  });

  const stock = yield call(api.get, `/stock/${id}`);
  const stockAmount = stock.data.amount;
  const currentAmount = productExists ? productExists.amount : 0;
  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    console.tron.warn('ERRO');
    return;
  }

  if (productExists) {
    yield put(updateAmount(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);
    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };

    yield put(addToCartSuccess(data));
  }
}
```
## Toastify

[Documentation][https://github.com/fkhadra/react-toastify]

React-Toastify allow you to add notification to your app with ease.
- Install using `yarn add react-toastify`
- At **App.js** import
  - `import { ToastContainer } from 'react-toastify'`
- Then put the component inside the return
  - The component has the propertie `autoClose` that waits for the time to close
- At **global.js** (global style) import the visual of the toast
  - `import 'react-toastify/dist/ReactToastify.css'`
- Then on saga import
  - `import { toast } from 'react-toastify'`
