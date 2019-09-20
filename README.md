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
- Install running `yarn add axios`
