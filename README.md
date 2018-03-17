### About ###
- This is a test project to learn React.
- Displays security breaches happened today in history.
- Data source: https://haveibeenpwned.com/api/v2/breaches


### Run locally ###
- Open a bash window and navigate to repository root
- `npm start`
- App available at `http://localhost:3000`


### TODOs ###
- Render out hyper links in description
- Handle `App.js error` display
- Display for no breach day
- Better way to update date / month and refresh breaches?
- Unit tests around date calculations.

### References ###
- Quick start: https://reactjs.org/docs/add-react-to-a-new-app.html
- Import / Export / Default: https://hackernoon.com/import-export-default-require-commandjs-javascript-nodejs-es6-vs-cheatsheet-different-tutorial-example-5a321738b50f
- Lifecycle: https://reactjs.org/docs/react-component.html

### Tools ###
- React dev tool https://reactjs.org/blog/2015/09/02/new-react-developer-tools.html#installation

### Issues Experienced ###
- "Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops."
  - Cause: In `render` method, called a method containing `setState`. This caused a re-render and resulted in a loop.
  - Fix 1: Move the method call out of `render` to `componentDidMount`
- "Unhandled Rejection (TypeError): Cannot read property 'state' of undefined"
  - Cause 1: Attempted to access `this.state` in a `forEach` loop.
  - Fix 1: Use a local variable
- State is not updated after calling `setState`
  - Cause: `setState` call is not guaranteed to be synchronous.
  - Fix: Access updated state in a callback method.
