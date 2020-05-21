import React from 'react'
import ReactDOM from 'react-dom'

// Regular stateless component
const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
)

// Create an HOC
const withAdminWarning = (WrappedComponent) => {
    // This returns the HOC
    // The HOC renders the new stuff AND the regular component (WrappedComponent)
    // To render the wrapped component, just create an instance of it
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info. Please don't share!</p>}
            <WrappedComponent {...props}/>
        </div>
    )
}

// This function gets called with Info component that gets passed in: withAdminWarning(Info)
// It returns a new component and stores it in a componet variable name: const AdminInfo. AdminInfo is the HOC
const AdminInfo = withAdminWarning(Info)

// ReactDOM.render(<AdminInfo isAdmin={true} info="These are the details" />, document.querySelector('#app'))

// ANOTHER HOC
// requireAuthentication HOC
const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? <WrappedComponent {...props} /> : <p>Please log in to view the info</p>}
        </div>
    )
}

const AuthInfo = requireAuthentication(Info)

ReactDOM.render(<AuthInfo isAuthenticated={true} info="These are the details" />, document.querySelector('#app'))


// ==================
// NOTES
// ==================

// Higher Order Component (HOC)
//  - A higher order component is a React component (HOC) that renders another component (regular component)
//  - The goal of a HOC is to reuse code
//  - Render hijacking
//  - Prop manipulation
//  - Abstract state

// TO CREATE A HIGHER ORDER COMPONENT:
// 1. Create a regular function
//  - const withAdminWarning = () => {..}
// 2. Pass in a wrapped component
//  - const withAdminWarning = (WrappedComponent) => {..}
//  - This function has access to a regular component(the wrapped component)
// 3. This function returns a new component. AND THIS NEW COMPONENT IS THE HOC
//  - The HOC renders the new stuff AND the regular component (WrappedComponent)
//  - To render the wrapped component, just create an instance of it: <WrappedComponent />
//  - Can pass in any props this wrapped component has using the spread operator: <WrappedComponent {...props}/>
// 4. Now render the HOC instance and pass in any props you want
//  - ReactDOM.render(<AdminInfo isAdmin={true}/>, ...)