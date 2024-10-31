const { addUser, getUser, users } = require('./user');

describe("User functionality", () => {
    beforeEach(() => {
        // Reset user list before each test
        users.length = 0;
    });
    // Test 1 - Verify create user functionality
    test("should add a new user", () => {
        const newUser = addUser("testuser", "Password1");
        expect(newUser.username).toBe("testuser");
    });
    // Test 2 - Verify "user is already taken" error
    test("should not add user with existing username", () => {
        addUser("testuser", "Password1");
        expect(() => addUser("testuser", "Password1")).toThrow("Username is already taken");
    });

      // Test 3 - Very "User does not exist" error
      test("should return undefined if user does not exist", () => {
        const retrievedUser = getUser("nonexistentuser");
        expect(retrievedUser).toBeUndefined();
    });
  
      // Test 6 - Should throw error for empty username
      test("should throw error if username is empty", () => {
        expect(() => addUser("", "Password1")).toThrow("Username cannot be empty");
    });
    
});