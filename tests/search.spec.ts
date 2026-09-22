import { test, expect } from '@playwright/test';

const searchCases = [
    {
        searchText: 'backpack',
        expectedProduct: 'Backpack'
    },
    {
        searchText: 'bike',
        expectedProduct: 'Bike Light'
    },
    {
        searchText: 'shirt',
        expectedProduct: 'T-Shirt'
    }
];

for (const searchCase of searchCases) {

    test(`search - ${searchCase.searchText}`, async () => {
        console.log(searchCase.searchText);
        console.log(searchCase.expectedProduct);
    });

}