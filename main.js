const readline = require('readline');
const { addUser, users, User } = require('./user');
const { login, changePassword } = require('./login');
const fs = require('fs');


// Adds users from JSON file when program runs 

fs.readFile('./users.json', 'utf8', (err, data) => {
    if (err) {
        console.log("Could not read user data: ${err.message}");
    } else {
        try {
            const userArray = JSON.parse(data);
            userArray.forEach(userObj => {
                users.push(new User(userObj.username, userObj.password));
            });
        } catch (error) {
            console.log("Error parsing user data: ${error.message}");
        }
    }
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showMenu() {
    console.log("1. Create new user");
    console.log("2. Log in");
    console.log("3. Change password");
    console.log("4. Quit");
    
    rl.question("Choose an option: ", (userInput) => {
        switch (userInput) {
            case "1":
                createUser();
                break;
            case "2":
                loginUser();
                break;
            case "3":
                changeUserPassword();
                break;
            case "4":
                rl.close();
                break;
            default:
                console.log("Invalid option");
                showMenu();
        }
    });
}

function createUser() {
    rl.question("Enter username: ", (username) => {
        try {
            if (!username || username.trim() === "") {
                throw new Error("Username cannot be empty");
            }

            rl.question("Enter password: ", (password) => {
                if (!password || password.trim() === "") {
                    console.log("Password cannot be empty");
                    return showMenu();
                }

                try {
                    const newUser = addUser(username, password);
                    console.log("User created: ", newUser);
                } catch (error) {
                    console.log(error.message);
                }
                showMenu();
            });

        } catch (error) {
            console.log(error.message);
            showMenu();
        }
    });
}

function loginUser() {
    rl.question("Enter username: ", (username) => {
        rl.question("Enter password: ", (password) => {
            try {
                const success = login(username, password);
                if (success) {
                    console.log("Logged in successfully");
                }
            } catch (error) {
                console.log(error.message);
            }
            showMenu();
        });
    });
}

function changeUserPassword() {
    rl.question("Enter username: ", (username) => {
        rl.question("Enter old password: ", (oldPassword) => {
            rl.question("Enter new password: ", (newPassword) => {
                try {
                    const success = changePassword(username, oldPassword, newPassword);
                    if (success) {
                        console.log("Password has changed");
                    }
                } catch (error) {
                    console.log(error.message);
                }
                showMenu();
            });
        });
    });
}

showMenu();