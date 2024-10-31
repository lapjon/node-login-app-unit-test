class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

const users = [];

function addUser(username, password) {

    if (!username || username.trim() === "") {
        throw new Error("Username cannot be empty");
    }

    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        throw new Error("Username is already taken");
    }
    
    if (!isValidPassword(password)) {
        throw new Error("Password does not match requirements");
    }

    const newUser = new User(username, password);
    users.push(newUser);
    return newUser;
}

function getUser(username) {
    return users.find(user => user.username === username);
}

function isValidPassword(password) {
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
}

module.exports = { User, addUser, getUser, isValidPassword, users };