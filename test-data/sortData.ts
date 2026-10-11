export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

export const sortCases: {
    option: SortOption;
    expectedFirstProduct: string;
}[] = [
    {
        option: 'az',
        expectedFirstProduct: 'Sauce Labs Backpack'
    },
    {
        option: 'za',
        expectedFirstProduct: 'Test.allTheThings() T-Shirt (Red)'
    },
    {
        option: 'lohi',
        expectedFirstProduct: 'Sauce Labs Onesie'
    },
    {
        option: 'hilo',
        expectedFirstProduct: 'Sauce Labs Fleece Jacket'
    }
];
