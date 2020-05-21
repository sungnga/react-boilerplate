import { login, logout } from '../../actions/auth';

// Test login action
test('should setup login action object', () => {
    const uid = 'kldsfjsdkfj3068405';
    const action = login(uid);
    expect(action).toEqual({
        type: 'LOGIN',
        uid
    });
});

// Test logout action
test('should setup logout action object', () => {
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT'
    });
});