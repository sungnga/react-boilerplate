import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import LoadingPage from './components/LoadingPage';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
// import './playground/firebase-101'

const store = configureStore();
//console.log(store.getState());

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.querySelector('#app'));
        hasRendered = true;
    }
};

ReactDOM.render(<LoadingPage />, document.querySelector('#app'));

// When user is logged in, redirect to the dashboard page and connect them to the expenses
// When user is logged out, redirect to the login page
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        //console.log('uid', user.uid)
        store.dispatch(login(user.uid));
        renderApp();
        // If history location starts out at root directory, redirect to dashboard
        if (history.location.pathname === '/') {
            history.push('/dashboard');
        }

        // console.log('log in')
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');

        // console.log('log out')
    }
});

// ------------------------------------
// CHALLENGES: FIREBASE AUTHENTICATION
// ------------------------------------

// GOAL: CREATE A LOGIN PAGE
// 1. Create LoginPage component with "Login" button
// 2. Add snapshot test for LoginPage
// 3. Show Login component at root of app -> /
// 4. Show ExpenseDashboardPage at -> /dashboard

// GOAL: CREATE PUBLIC ONLY ROUTE
// 1. Create PublicRoute (copy PrivateRoute)
// 2. Redirect to /dashboard if logged in
// 3. Render component if not logged in
// 4. Use it for the LoginPage

// ===========================
// NOTES
// ===========================

// ---------------------------
// FIREBASE 101
// ---------------------------
// Documenation: firebase.google.com -> reference tab

// Create a Firebase Project:
// - On firebase website dashboard, click create a project
// - Name your project
// - Back to dashboard, click 'connect firebase to a WEB app'
// - Set rules to be able to READ and WRITE files
// - Create a firebase folder in the src directory. Then create a firebase.js file in the firebase folder
// - Copy the provided firebase configuration code to the firebase.js file
// - Install firebase: npm i firebase
// - Import firebase module in the firebase.js file: import * as firebase from 'firebase';
// - To test that firebase database is connected to the app, run this:
// firebase.database().ref().set({
//     name: 'Nga La'
// });
// - Visit firebase website and go to database tab. The data should show up

// Writing to the Database:
//  - The database can store primitive values and objects
//  - To access the Firebase database: firebase.database()
//  - Assign the database to a variable: const database = firebase.database()
//  - Use .ref() method to access the root of the database
//  - Pass in a property name to .ref() to access that specific property: database.ref('age')
//  - Use .set() method to set new or existing properties
//  - If you set objects/values without passing anything into ref, you will override the existing properties in the database: database.ref().set('Will override existing db')
//  - To update a property value, reference the property name in the ref, then set the value: database.ref('location/city').set('Seattle')

// Promises with Firebase:
//  - There are many methods that can be called on reference (ref)
//  - .set() is a method used to set values. It returns a promise
//  - Since it returns a promise, we can chain on .then() and .catch() methods to resolve or catch the error

// Removing Data from Firebase:
//  - Use .remove() method on ref to remove specific property
//  - Make sure to pass the property name you want to delete into .ref(). If you don't specify a name, it will wipe the entire database
//  - database.ref('age').remove()
//  - Another way to delete a property is to set the new value to 'null'. Data at this location and all child location will be deleted
//  - database.ref('age').set(null)
//  - But calling .remove() is more explicit

// Updating Data:
//  - Use .update() method on ref to update the database
//  - Update() supports promises. So you can chain on .then() and .catch() methods
//  - You can do multiple updates with a single .update() call
//  - Unlike .set(), .update() expects an object to be passed in
//  - With update, not only can you update properties that are already exist, you can also add on new properties
//  - Inside the update object, you can set a property value to null to delete that property
//  - To update a child location inside a property, wrap the path around a quote: 'location/city': 'New York'

// Reading data from Firebase:
// - .once() and .on() are two methods used to fetch data

// The .once() method:
//  - Use .once() method on ref
//  - With .once() request, we do get an argument back
//  - Unlike setting, updating, and removing, we requested some data and the data is available to us. This data is known as a snapshot
//  - On this snapshot, we have access to our data
//  - We can extract the object by using snapshot.val(). It returns the data we requested
//  - To read only specific data in the db, pass in the path to ref: .ref('location/city')
// database.ref('location/city')
//     .once('value')
//     .then((snapshot) => {
//         const val = snapshot.val()
//         console.log(val)
//     })
//     .catch((e) => {
//         console.log('Error fetching data', e)
//     })

// The .on() subscription method:
//  - The .on() method listens for data changes at a particular location
//  - There are 4 events we can listen to for data changes:
//  - value event, child_added event, child_removed event, child_changed event
//  - The .on() method allows us to listen for something over and over again
//  - 1st arg: the value event we're making the request
//  - 2nd arg: this callback function runs when the value comes back
//  - 3rd arg: a function that subscribes to any errors coming back
//  - With the .on() subscription, this callback runs every time the data changes. This callback gets re-executed
//  - The .on() method returns the callback function. We can assign this return to a variable: const onValueChange = database.ref().on(event, callback)
//  - We can then reference this callback anywhere else we like
//  - Unlike with promises, which can only ever be resolved or rejected a single time with a single value
//  - We have access to the data via snapshot. Call .val() on the snapshot to extract the data
//  - The .on() method subscribes to the changes made to the db
//  - To unsubscribe: database.ref().off()
// const onValueChange = database.ref()
//     .on('value', (snapshot) => {
//         console.log(snapshot.val(), (e) => {
//         console.log('error with data fetching', e)
//     })
// })

// Array Data in Firebase:
//  - Firebase does not have array data structure. It has object data structure
//  - .push() method generates a unique id identifier as a key. You can store an object as the value for this key
//  - Here, a new object is generated with a unique id inside the notes tree
// database.ref('notes').push({
//     title: 'Course Topics',
//     body: 'React Native, Angular, Python'
// })
// database.ref('notes/-Klsdjfiewjrn3kre').remove()

// Transform Firebase data to an array using forEach():
// database.ref('expenses')
//     .once('value')
//     .then((snapshot) => {
//         const expenses = [];
//
//         snapshot.forEach((childSnapshot) => {
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             })
//         })
//         console.log(expenses)
//     })

// Subscribe to a change made to the database:
// database.ref('expenses')
//     .on('value', (snapshot) => {
//         const expenses = [];
//         snapshot.forEach((childSnapshot) => {
//             expenses.push({
//                 id: childSnapshot,
//                 ...childSnapshot
//             })
//         })
//         console.log(expenses)
//     })

// ---------------------------
// FIREBASE AUTHENTICATION
// ---------------------------
// On project dashboard page in Firebase website, click the Authentication tab
// Select the Sign-in method tab and enable Google authentication

// SETUP AUTHENTICAION FUNCTIONALITY:
// Resource: firebase.google.com/docs/ -> reference tab -> firebase.auth
// In firebase.js file: create an instance of a Provider
// A Provider is a way to provide authentication. We will use a Google provider
// const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
// Export this googleAuthProvider as a named export
// Next we first need to check the authentication state of a user. In app.js file:
// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//         console.log('log in')
//     } else {
//         console.log('log out')
//     }
// })
// Create a startLogin action:
// Pass in the googleAuthProvider to .signInWithPopup()
// export const startLogin = () => {
//     return () => {
//         return firebase.auth().signInWithPopup(googleAuthProvider)
//     }
// }
// Dispatch the action in LoginPage.js file when a user clicks the Login button:
// import { connect } from 'react-redux';
// import { startLogin } from '../actions/auth';
// export const LoginPage = ({startLogin}) => (
//     <div>
//         <button onClick={startLogin}>Login</button>
//     </div>
// )
// const mapDispatchToProps = (dispatch) => ({
//     startLogin: () => dispatch(startLogin())
// })
// export default connect(undefined, mapDispatchToProps)(LoginPage)

// A RECAP ON AUTHENTICATION SETUP:
// Create a LoginPage component and wire that up in Route
// Setup a provider (google) in firebase.js. This allows us to setup firebase to authenticate with google
// If we're using google auth provider, we also need to enable that over in the firebase dashboard
// Then we need to pass this provider into a function, into signInWithPopup()
// That is what triggers the popup, shows your google accounts, and allows you to pick one
// Over inside of app.js, we use onAuthStateChanged(). This allows us to run this function every single time the authentication state changed, including when we first load the application

// STEPS FOR WIRING UP THE LOGOUT BUTTON TO REDUX STORE:
// Create a button tag in a component
// Import the action (startLogout). Need to create this action
// Setup connect() to connect to Redux store
// With connect() set up, we now have access to dispatch
// Setup mapDispatchToProps to dispatch the action
// Grab the prop (startLogout) and attach it to onClick event in button tag
// To do this, destructure the prop name, startLogout and pass it in to Header component. Then pass this prop name to onClick event

// REDIRECTING LOGIN AND LOGOUT:
// We need to create browser history
// Install the router history library: npm i history
// history is a Javascript library that lets you easily manage session history anywhere Javascript runs. History abstracts away the differences in various environment and provides a minimal API that lets you manage history stack, navigation, confirm navigation, and persist state between session
// In AppRouter.js file import: import {createBrowserHistory} from 'history';
// To create a history: const history = createBrowserHistory();
// The <BrowserRouter> already has a built-in history, but we want to use our own history
// We can then export our history to use anywhere else: export const history = createHistory();
// We need to switch from using <BrowserRouter> to regular <Router> and pass in the history to the Router: <Router history={history}>
// In the app.js file import the named export history
// To navigate users between pages, use: history.push(). .push() method takes a path name
// When a user is logged out redirect them to login page: history.push('/')
// Login/logout redirect code:
// // When user is logged in, redirect to the dashboard page and connect them to the expenses
// // When user is logged out, redirect to the login page
// let hasRendered = false;
// const renderApp = () => {
//     if (!hasRendered) {
//         ReactDOM.render(jsx, document.querySelector('#app'));
//         hasRendered = true;
//     }
// }
// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//         store.dispatch(startSetExpenses()).then(() => {
//             renderApp();
//             // If history location starts out at root directory, redirect to dashboard
//             if (history.location.pathname === '/') {
//                 history.push('/dashboard')
//             }
//         });
//         console.log('log in')
//     } else {
//         renderApp();
//         history.push('/');
//         console.log('log out')
//     }
// })

// THE AUTH REDUCER
// We need to create a new reducer to keep track whether a user is logged in by storing a user's uid
// Create auth.js file in reducers folder:
//  - Create the reducer
//  - This auth reducer handles the login and logout actions
// In the auth.js actions file:
//  - Create the LOGIN and LOGOUT actions
//  - The LOGIN action takes in the uid of the user
// Now that we have the reducer and the actions in place, we need to connect the reducer to the Redux store and dispatch LOGIN AND LOGOUT actions when appropriate
// To connect to the store, in the configureStore.js file in store folder:
//  - Import: import authReducer from '../reducers/auth';
//  - Add on the auth reducer object to the combineReducers: {auth: authReducer}
// Now we need to dispatch login and logout actions in app.js file
//  - Import: import { login, logout } from './actions/auth';
//  - Dispatch LOGIN action when the user is logged in: store.dispatch(login(user.uid));
//  - Dispatch LOGOUT action when the user is logged out: store.dispatch(logout());

// PRIVATE ONLY ROUTE
// We're setting up a PrivateRoute component. It's just a wrapper around Route
// The whole point of using it is to add some conditional logic in
// It allows us to determine if the user is authenticated or not
// Then we can take the correct action, either rendering the private stuff(components) or redirect them to a public page
// This PrivateRoute component gets used in the AppRouter.js file
//
// Destructuring the props:
//  - the isAuthenticated came from mapStateToProps
//  - component came from <PrivateRoute component={..} /> instance when it was defined in app.js file. We're renaming this props to Component here
//  - ...rest the rest operator is grabbing the rest of the props to make sure they correctly get down to Route. You can name it whatever you want
// Inside <Route /> instance:
//  - pass in all the props
//  - here, we're defining our own component prop
//  - we're setting up some conditional logic inside this function
//  - first thing, let's get all of the props that were passed to Route (props). We want to pass those through to the individual component
// The condition:
//  - if the user is authenticated, we want some jsx rendered to the screen
//  - to do this, use/create a <Component /> instance and pass in all the props
//  - if the user is not authenticated, we want to redirect them
//  - React-router-dom gives us a way to do that via a component called Redirect. Import this component in
//  - Just use/create the <Redirect /> instance and give the path name to the 'to' prop
// import React from 'react';
// import { connect } from 'react-redux';
// import { Route, Redirect } from 'react-router-dom';
// import Header from '../components/Header';
// export const PrivateRoute = ({
//     isAuthenticated,
//     component: Component,
//     ...rest
// }) => (
//     <Route
//         {...rest}
//         component={(props) =>
//             isAuthenticated ? (
//                 <div>
//                     <Header />
//                     <Component {...props} />
//                 </div>
//             ) : (
//                 <Redirect to='/' />
//             )
//         }
//     />
// );
// const mapStateToProps = (state) => ({
//     isAuthenticated: !!state.auth.uid
// });
// export default connect(mapStateToProps)(PrivateRoute);

// PRIVATE FIREBASE DATA
// We want to have the user expenses to live inside that particular uid
// To get the uid... we need to access the current state using getState
// When using thunk actions, async actions, we also have access to getState method
// We can call getState() to get the current state
// // NOTE: a portion of the code from startAddExpense action in expenses.js
// // 2nd arg: getState
// return (dispatch, getState) => {
//     const uid = getState().auth.uid
//     return database
//         .ref(`users/${uid}/expenses`)
//         ...
// }

// Setting up Firebase database rules:
// {
//     "rules": {
//     ".read": false,
//     ".write": false,
//     "users": {
//         "$user_id": {
//         ".read": "$user_id === auth.uid",
//         ".write": "$user_id === auth.uid"
//         }
//     }
//     }
// }

// DATA VALIDATION IN FIREBASE: SETTING RULES
// {
//     "rules": {
//       ".read": false,
//       ".write": false,
//       "users": {
//         "$user_id": {
//           ".read": "$user_id === auth.uid",
//           ".write": "$user_id === auth.uid",
//           "expenses": {
//             "$expense_id": {
//               ".validate": "newData.hasChildren(['description', 'note', 'createdAt', 'amount'])",
//               "description": {
//                 ".validate": "newData.isString() && newData.val().length > 0"
//               },
//               "note": {
//                 ".validate": "newData.isString()"
//               },
//               "createdAt": {
//                 ".validate": "newData.isNumber()"
//               },
//               "amount": {
//                 ".validate": "newData.isNumber()"
//               },
//               "$other": {
//                     ".validate": false
//                   }
//             }
//           },
//           "$other": {
//             ".validate": false
//           }
//         }
//       }
//     }
// }

// AUTHORIZED DOMAINS
// We need to enable authorized domain for the host that we deploy our app, which is Heroku
// In the firebase project dashboard, go to Authentication tab
// Then go to the Sign-In Method tab, scroll to the Authorized domain section
// Click the 'Add Domain' button
// Paste in the Heroku URL of our project: ngala-expensify-app.herokuapp.com

// BABEL POLYFILL
// Older browsers might not support modern features and methods of JS we use in our app
// Babel-polyfill gives us access to a wider range of browsers in terms of what our application supports
// www.browserstack.com allows you to simulate your website on any operating system
// Install: npm i babel-polyfill
// Configure in webpack.config.js file. Add babel-polyfill at the beginning of the entry point:
// entry: ['babel-polyfill', './src/app.js'],
