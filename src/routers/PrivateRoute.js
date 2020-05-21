import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

// PRIVATE ONLY ROUTE
// We're setting up a PrivateRoute. It's just a wrapper around Route
// The whole point of using it is to add some conditional logic in
// It allows us to determine if the user is authenticated or not
// Then we can take the correct action, either rendering the private stuff(components) or redirect them to a public page

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
export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => (
    <Route
        {...rest}
        component={(props) =>
            isAuthenticated ? (
                <div>
                    <Header />
                    <Component {...props} />
                </div>
            ) : (
                <Redirect to='/' />
            )
        }
    />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);
