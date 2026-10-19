export type LoginTestData =
    | {
        testName: string;
        username: string;
        password: string;
        expectedType: 'URL';
        expectedURL: string;
    }
    | {
        testName: string;
        username: string;
        password: string;
        expectedType: 'Text';
        expectedError: string;
    };


export const validUser = {
    testName: 'login with valid credentials',
    username: 'standard_user',
    password: 'secret_sauce',
    expectedURL: 'https://www.saucedemo.com/inventory.html',
    expectedType: 'URL'
} satisfies LoginTestData;  // Sprawdza zgodność, zachowując bardziej precyzyjny typ obiektu. W tescie auth.setup był problem z polem expected

export const lockedUser: LoginTestData = {
    testName: 'login with locked user',
    username: 'locked_out_user',
    password: 'secret_sauce',
    expectedError: 'Epic sadface: Sorry, this user has been locked out.',
    expectedType: 'Text'
};

export const emptyUsername: LoginTestData = {
    testName: 'login with empty username',
    username: '',
    password: 'secret_sauce',
    expectedError: 'Epic sadface: Username is required',
    expectedType: 'Text'
};

export const emptyPassword: LoginTestData = {
    testName: 'login with empty password',
    username: 'standard_user',
    password: '',
    expectedError: 'Epic sadface: Password is required',
    expectedType: 'Text'
};