const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve({
        //     name: 'Andy',
        //     age: 66
        // })
        reject('Something went wrong!')
    }, 3000)
})

console.log('before')

promise.then((data) => {
    console.log('1', data)
}).catch((error) => {
    console.log('error: ', error)
})

console.log('after')
