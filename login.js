const { getUser, isValidPassword } = require('./user');

function login(username, password) {
    const user = getUser(username);
    if (!user) {
        throw new Error("Wrong username");
    }
    if (user.password !== password) {
        throw new Error("Wrong password");
    }
    return true;
}

function changePassword(username, oldPassword, newPassword) {
    const user = getUser(username);
    if (!user) {
        throw new Error("User does not exist");
    }
    if (user.password !== oldPassword) {
        throw new Error("Old password is incorrect");
    }
    if (oldPassword === newPassword) {
        throw new Error("New password cannot be same as old password");
    }
    if (!isValidPassword(newPassword)) {
        throw new Error("Password does not match requirements");
    }

    user.password = newPassword;
    return true;
}

module.exports = { login, changePassword };