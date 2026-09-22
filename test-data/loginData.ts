export const validUser = {
    username: 'standard_user',
    password: 'secret_sauce',
    expected: 'https://www.saucedemo.com/inventory.html',
    expectedType: 'URL'
};

export const lockedUser = {
    username: 'locked_out_user',
    password: 'secret_sauce',
    expected: 'Epic sadface: Sorry, this user has been locked out.',
    expectedType: 'Text'
};