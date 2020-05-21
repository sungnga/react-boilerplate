//
// ES6 OBJECT DESTRUCTURING
//
// We can destructure objects
// We can pull things off of objects and create separate variables for those values
// What is destructuring do?
// It allows us to create local variables, to rename them, to set default values for them
// All of this comes from the object define
// This is a very handy syntax we can use, including function arguments

const person = {
    name: 'Nga',
    age: 10990,
    location: {
        city: 'San Francisco',
        temp: 767
    }
}

// Extracting specific properties off of the person object
// Set default value on destructure object
// Rename and set default value for name
const {name: firstName = 'Anonymous', age} = person
console.log(`${firstName} is ${age}`)

// Extracting city and temp properties off of the location object that is inside the person object
// Renaming the destructure variable
// NOTE: once you reassign the variable name to something else, the original name is no longer available
const {city, temp: temperature} = person.location
console.log(`It's ${temperature} in ${city}`)


const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday',
    publisher: {
        name: 'Penguin'
    }
}
const {name: publisherName = 'Self-Published'} = book.publisher
console.log(publisherName)



//
// ES6 ARRAY DESTRUCTURING
//
// Just like object destructuring allows us to pull properties off of an object, array destructuring allows us to pull items off an array

const address = ['123 S June Street', 'San Francisco', 'California', '98034']

// For object destructuring, we use curly braces
// For array destructuring, we use square brackets
// And then we pick the thing that we want to destructure: the address
// What goes inside the square bracket is an ordered list of variable names
// These variable names is matching up by the position of the array
// You don't need to destructure all items in the array. Make sure to use commas to identify the position
// Like objects, you can set default values
const [, cityName, state = 'Seattle', zip] = address
console.log(`You are in ${state}`)

const item = ['coffee (hot)', '$2.00', '$2.50', '$3.00']
const [itemName, , medium, large] = item
console.log(`A medium ${itemName} costs ${medium}`)