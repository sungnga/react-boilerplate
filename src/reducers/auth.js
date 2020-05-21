// This auth reducer handles the login and logout actions
// Pass in the default state as an object
// Also pass in the action. This is the action that is getting dispatch
// If there's no login or logout action, this reducer returns the current state value
export default (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                uid: action.uid
            };
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
};