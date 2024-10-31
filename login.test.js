const { login, changePassword } = require('./login');
const { addUser, getUser, users } = require('./user');

describe("Login functionality", () => {
    beforeEach(() => {
        users.length = 0;
        addUser("testuser", "Password1");
    });
    // Test 1 - Verify change password functionality
    test("change password when all conditions are met", () => {
        expect(changePassword("testuser", "Password1", "ValidPassword123")).toBe(true);
        expect(login("testuser", "ValidPassword123")).toBe(true);
    });

    
    // Test 2 - Verify login functionality 
    test("login with correct credentials", () => {
        const result = login("testuser", "Password1");
        expect(result).toBe(true);
    });
    // Test 3 - Verify incorrect password
    test("throw error on wrong password", () => {
        expect(() => login("testuser", "wrongpassword")).toThrow("Wrong password");
    });
    // Test 4 - Verify invalid password
    test("throw error for invalid password", () => {
        expect(() => addUser("newuser", "123")).toThrow("Password does not match requirements");
   });
    
   
});