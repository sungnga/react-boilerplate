import * as firebase from 'firebase';

// Your web app's Firebase configuration
var config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};
// Initialize Firebase
firebase.initializeApp(config);

const database = firebase.database();


// child_added
// database.ref('expenses').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val())
// })

// child_changed
// database.ref('expenses').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val())
// })

// child_removed
// database.ref('expenses').on('child_removed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val())
// })

// Subscribe to changes to the database
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

// Transform Firebase data to an array using forEach()
// database.ref('expenses')
//     .once('value')
//     .then((snapshot) => {
//         const expenses = [];

//         snapshot.forEach((childSnapshot) => {
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             })
//         })
//         console.log(expenses)
//     })

// database.ref('expenses').push({
//     description: 'water bill',
//     note: '',
//     amount: 34.67,
//     createdAt: 0
// })

// Firebase does not have array data structure. It has object data structure
// .push() method generates a unique id identifier as a key. You can store an object as the value for this key
// database.ref('notes').push({
//     title: 'Course Topics',
//     body: 'React Native, Angular, Python'
// })

// database.ref().on('value', (snapshot) => {
//     const val = snapshot.val()
//     console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`)
// }, (e) => {
//         console.log('Cannot fetch data', e)
// })

// The .on() method allows us to listen for something over and over again
// 1st arg: the value event we're making the request
// 2nd arg: this callback function runs when the value comes back
// 3rd arg: a function that subscribes to any errors coming back
// With the .on() method, this callback runs every time the data changes. This callback gets re-executed
// The .on() method returns the callback function. We can assign this return to a variable: const onValueChange = database.ref().on(event, callback)
// We can then reference this callback anywhere else we like
// Unlike with promises, which can only ever be resolved or rejected a single time with a single value
// We have access to the data via snapshot. Call .val() on the snapshot to extract the data
// The .on() method subscribes to the changes made to the db
// To unsubscribe: database.ref().off()
// const onValueChange = database.ref()
//     .on('value', (snapshot) => {
//         console.log(snapshot.val(), (e) => {
//         console.log('error with data fetching', e)
//     })
// })

// With .once() request, we do get an argument back
// Unlike setting, updating, and removing, we requested some data and the data is available to us. This data is known as a snapshot
// On this snapshot, we have access to our data
// We can extract the object by using snapshot.val(). It returns the data we requested
// database.ref()
//     .once('value')
//     .then((snapshot) => {
//         const val = snapshot.val()
//         console.log(val)
//     })
//     .catch((e) => { 
//         console.log('Error fetching data', e)
//     })

// database.ref().set({
//     name: 'Nga La',
//     age: 99,
//     stressLevel: 6,
//     job: {
//         title: 'Software developer',
//         company: 'Google'
//     },
//     isSingle: true,
//     location: {
//         city: 'San Francisco',
//         country: 'United States'
//     }
// }).then(() => {
//     console.log('Data is saved')
// }).catch((e) => {
//     console.log('This failed.', e)
// })

// Change the stressLevel to a 9
// Change job.company to Amazon
// Change location.city to Seattle
// database.ref().update({
//     stressLevel: 9,
//     'job/company': 'Amazon',
//     'location/city': 'Seattle'
// })

// database
//     .ref('isSingle')
//     .remove()
//     .then(() => {
//         console.log('Successfully removed');
//     })
//     .catch((e) => {
//         console.log('Did not remove: ', e);
//     });



// =============
// NOTES
// =============

// FIREBASE
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

// Subscribe to a change made to the database
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