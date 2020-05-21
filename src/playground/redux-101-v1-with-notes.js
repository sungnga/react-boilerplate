import {createStore} from 'redux'

// Action generators are functions that return action objects
// We can destructor the properties and set default values in the function argument
const incrementCount = ({incrementBy = 1} = {}) => ({
    type: 'INCREMENT',
    incrementBy
})

const decrementCount = ({decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy
})

const resetCount = () => ({
    type: 'RESET'
})

const setCount = ({count}) => ({
    type: 'SET',
    count
})

// Make a store
// The createStore function expects a function to be the 1st arg
// This function gets called everytime a .dispatch() is made to the store
// Based on the action type, we can make meaningful changes to the state
// 1st arg: the current state. With default state value
// 2nd arg: the action type that gets passed in
const store = createStore((state = { count: 0 }, action) => {
    // To handle the dispatch action, we're using a switch statement
    // We're switching what we do based off of a particular value. In this case, it's the action data type value
    // Inside the curly braces we can define the various cases we want to handle. In our case, we want to handle the action type
    switch (action.type) {
        // Case when action.type is equal to 'INCREMENT'
        // After the colon, we provide what we want to do
        // Return the updated state object
        case 'INCREMENT':
            // const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
            return {
                count: state.count + action.incrementBy
            }
        // Case when action.type is equal to 'DECREMENT'
        case 'DECREMENT':
            // const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1
            return {
                count: state.count - action.decrementBy
            }
        case 'RESET':
            return {
                count: 0
            };
        case 'SET':
            return {
                count: action.count
            }
        // Setup the default case, when the other cases don't run
        // Return the current state
        default: 
            return state
    }
})


// Use store.subscribe() method to do something when the store changes
// The return value of subscribe is a function that we can call later
const unsubscribe = store.subscribe(() => {
    console.log('starting:', store.getState())
})

// The .dispatch() method sends an action object to the store
store.dispatch(incrementCount())

// Unsubscribe to the state changes at this point
// unsubscribe()

store.dispatch(incrementCount({incrementBy: 5}))

store.dispatch(resetCount())

store.dispatch(decrementCount({decrementBy: 10}))

store.dispatch(decrementCount())

store.dispatch(setCount({count: 400}))