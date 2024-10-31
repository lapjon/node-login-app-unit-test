const { changePassword } = require('./login');
const { addUser, users } = require('./user');

describe("Change password functionality", () => {
    beforeEach(() => {
        users.length = 0; // Återställ användare före varje test
        addUser("testuser", "Password1");
    });
    // Test 1 - Verify password change functionality
    test("should change password successfully with correct old password", () => {
        expect(changePassword("testuser", "Password1", "NewPass123")).toBe(true);
        expect(users[0].password).toBe("NewPass123");
    });
    // Test 2 - Verify unable to password change if password is incorrect
    test("should throw error if old password is incorrect", () => {
        expect(() => changePassword("testuser", "WrongPassword", "NewPass123")).toThrow("Old password is incorrect");
    });
    // Test 3 - Verify new password cannot be same as old password
    test("should throw error if new password is same as old password", () => {
        expect(() => changePassword("testuser", "Password1", "Password1")).toThrow("New password cannot be same as old password");
    });
    // Test 4 - Verify new password cannot be same as old password
    test("should throw error if new password does not meet security requirements", () => {
        expect(() => changePassword("testuser", "Password1", "pass")).toThrow("Password does not match requirements");
    });
});