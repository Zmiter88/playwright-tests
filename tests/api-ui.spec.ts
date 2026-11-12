import { test, expect } from '@playwright/test';
import { randomUUID } from 'node:crypto';
import { CookieConsentHelper } from '../helpers/cookieConsent';
import { automationExerciseBaseURL } from '../config/config';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface Product {
    id: number;
    name: string;
    price: string;
    brand: string;
    category: {
        usertype: {
            usertype: string;
        };
        category: string;
    };
}

interface ProductsResponse {
    responseCode: number;
    products: Product[];
}

test('API + UI: display a post', async ({ request, page }) => {
    // 1. API: pobieramy dane
    const response = await request.get(
        'https://jsonplaceholder.typicode.com/posts/1'
    );

    expect(response.status()).toBe(200);

    const post: Post = await response.json();

    expect(post.title.length).toBeGreaterThan(0);
    expect(post.userId).toBe(1);

    // 2. UI: wyświetlamy pobrane dane w przeglądarce. page.setContent() tworzy prostą stronę HTML z pobranymi danymi.
    await page.setContent(`
        <h1>${post.title}</h1>
        <p>${post.body}</p>
    `);
    

    // 3. UI: sprawdzamy, czy dane są widoczne
    await expect(
        page.getByRole('heading', { name: post.title })
    ).toBeVisible();

    await expect(
        page.getByText(post.body)
    ).toBeVisible();
});

test('API plus UI', async ({request, page}) => {
    const response = await request.get('https://automationexercise.com/api/productsList');

    expect(response.status()).toBe(200);
    const responseBody: ProductsResponse = await response.json();
    console.log(responseBody.products[0]);
    expect(responseBody.products.length).toBeGreaterThan(0);
    expect(responseBody.products[0].name).toBe('Blue Top');
    expect(responseBody.products[0].category.category).toBe('Tops');

    await page.goto('https://automationexercise.com/');
    const consentButton = page.locator('.fc-button-label')
    .filter({ hasText: /^Consent$/ });  // /^Consent$/ }) ogranicza dopasowanie do elementów, których tekst to dokładnie Consent. Znaki ^ i $ oznaczają początek i koniec tekstu.
    await consentButton.click();
    // sekcja wszystkich produktów
    const productsSection = page.locator('.features_items');
    // sekcja pojedynczego produktu, filtrowana po nazwie
    const productCard = productsSection.locator('.product-image-wrapper')
    .filter({hasText: responseBody.products[0].name});
    const productPrice = productCard.locator('.productinfo').getByText(responseBody.products[0].price);
    await expect(productPrice).toHaveText(responseBody.products[0].price);
    const addToCartButton = productCard.locator('.productinfo').locator('.add-to-cart');
    await expect(addToCartButton).toBeVisible();
    await addToCartButton.click();
    const confirmationMessage = page.getByText('Added!');
    await expect(confirmationMessage).toBeVisible();
});

test('Api plus UI - product details', async ({request, page}) => {
    const response = await request.get('https://automationexercise.com/api/productsList');
    expect(response.status()).toBe(200);
    const responseBody: ProductsResponse = await response.json();
    const product = responseBody.products[1];
    console.log(product);
    expect(responseBody.products.length).toBeGreaterThan(1);
    expect(product.name).toBe('Men Tshirt');
    expect(product.category.category).toBe('Tshirts');

    await page.goto('https://automationexercise.com/')
    const consentButton = page.locator('.fc-button-label')
    .filter({ hasText: /^Consent$/ });  
    await consentButton.click();
    const productsSection = page.locator('.features_items');
    const productCard = productsSection.locator('.product-image-wrapper')
    .filter({hasText: product.name});
    const viewProductButton = productCard.getByRole('link', {name: 'View Product'});
    await viewProductButton.click();
    await expect(page).toHaveURL('https://automationexercise.com/product_details/2');
    const productInfo = page.locator('.product-information');
    const productName = productInfo.getByRole('heading', {name: product.name});
    await expect(productName).toHaveText(product.name);
    const productPrice = productInfo.getByText(product.price);
    await expect(productPrice).toHaveText(product.price);
    const productBrand = productInfo.getByText(product.brand);
    await expect(productBrand).toContainText(product.brand);
    const productCategory = productInfo.getByText(product.category.category);
    await expect(productCategory).toHaveText(product.category.category);
})


test('API mock - display mocked product', async ({page}) => {
    const mockedProducts = {
    responseCode: 200,
    products: [
        {
            id: 999,
            name: 'Test Product',
            price: 'Rs. 999',
            brand: 'Test Brand',
            category: {
                usertype: {
                    usertype: 'Women'
                },
                category: 'Tops'
            }
        }
    ]
};

await page.route('https://automationexercise.com/api/productsList', async route => {
    await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockedProducts)
    });
});

await page.goto('https://automationexercise.com/');
const result = await page.evaluate(async () => {
const response = await fetch('https://automationexercise.com/api/productsList');
return await response.json();
});

console.log(result.products[0].name);

await expect(result.products[0].name).toBe('Test Product');
});




test('API mock - displays server error', async ({ page }) => {

    const apiResponse = {
        responseCode: 500,
        message: 'Internal Server Error'
    }; 

    await page.route('**/api/account', async route => {
    await route.fulfill({
        status: apiResponse.responseCode,
        contentType: 'application/json',
        body: JSON.stringify(apiResponse)
    });
});

    await page.goto('https://example.com');

    await page.setContent(`
        <html>
            <body>
                <h1>My Account</h1>
                <p id="message"></p>

                <script>
                    async function loadAccount() {
                        const response = await fetch('/api/account');

                        const message = document.querySelector('#message');

                        if (!response.ok) {
                            message.textContent = 'Something went wrong. Please try again.';
                            return;
                        }

                        const data = await response.json();
                        message.textContent = 'Balance: ' + data.balance;
                    }

                    loadAccount();
                </script>
            </body>
        </html>
    `);

    await expect(page.getByText('Something went wrong. Please try again.')).toBeVisible();
    });



    test('API mock', async ({ page }) => {

    const mockedProducts = {
        products:
        [
            {
            id: 999,
            name: 'Mock Product',
            price: 'Rs.999'
            }
     
        ]
}

    await page.route('**/api/productsList', async route => {
    await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockedProducts)
    });
    });
    await page.goto('https://automationexercise.com/');
 

const result = await page.evaluate(async () => {
const response = await fetch('/api/productsList');
return await response.json();
 });
 expect(result.products[0].name).toBe('Mock Product');
});



interface CreateAccountResponse {
  responseCode: number;
  message: string;
}

interface GetUserDetailResponse {
    responseCode?: number;
    message: string;
}

test('Create account in API -> Validate in UI -> Validate backend in API', async ({ page, request }) => {
    // tworzenie konta przez API
  const email = `patryk-${randomUUID()}@example.com`;
  const password = 'secret';
  const createAccountResponse = await request.post(`${automationExerciseBaseURL}/api/createAccount`, 
    {
      multipart: {
            name: 'Patryk',
            email: email,
            password: password,
            firstname: 'Patryk',
            lastname: 'Test',
            address1: 'ul. Havla',
            country: 'Poland',
            state: 'Pomorskie',
            city: 'Gdansk',
            zipcode: '80-177',
            mobile_number: '12345'
        }
    }
  );
  const createAccountResponseBody: CreateAccountResponse = await createAccountResponse.json();
  console.log(createAccountResponseBody);
expect(createAccountResponse.status()).toBe(200);
expect(createAccountResponseBody.responseCode).toBe(201);

// logowanie sie poprzez UI

await page.goto(`${automationExerciseBaseURL}/login`);
// warunkowe klikniecie cookies
const cookieConsentHelper = new CookieConsentHelper(page);
await cookieConsentHelper.acceptCookies();
await expect(page.getByRole('heading', {name: 'Login to your account'})).toBeVisible();
const emailLocator = page.locator('[data-qa="login-email"]');
await emailLocator.fill(email);
const passwordLocator = page.getByPlaceholder('Password')
await passwordLocator.fill(password);
await page.getByRole('button', {name: 'Login'}).click();
// sprawdzenie poprawnośc zalogowania
await expect(page.getByText('Logged in as Patryk')).toBeVisible();
await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
// usuniecie konta przez UI
const deleteLocator = page.getByRole('link', {name: 'Delete Account'});
await expect(deleteLocator).toBeVisible();
await deleteLocator.click();
await expect(page.getByText('Account Deleted!')).toBeVisible();
//sprawdzenie czy rzeczywsicie konto sie usuneło poprzez api
const getUserResponse = await request.get(
    `${automationExerciseBaseURL}/api/getUserDetailByEmail`,
    {
        params: {
            email: email
        }
    }
);

const getUserResponseBody: GetUserDetailResponse = await getUserResponse.json();

console.log(getUserResponseBody);

expect(getUserResponse.status()).toBe(200);
expect(getUserResponseBody.responseCode).toBe(404);
expect(getUserResponseBody.message).toBe('Account not found with this email, try another email!');
});


test('Product search and verification of results - API - UI - API', async ({ page, request }) => {
    // pobranie produktów poprzez API
    const getProductListResponse = await request.get(`${automationExerciseBaseURL}/api/productsList`);
    const getProductListResponseBody: ProductsResponse = await getProductListResponse.json();
    expect(getProductListResponse.status()).toBe(200);
    expect(getProductListResponseBody.responseCode).toBe(200);
    const products = getProductListResponseBody.products;
    expect(products.length).toBeGreaterThan(0);
    // losowy produkt
    const randomIndex = Math.floor(Math.random() * products.length);
    const selectedProduct = products[randomIndex];

    // wyszukanie produktu poprzez UI
    await page.goto(`${automationExerciseBaseURL}/products`);
    // warunkowe klikniecie cookies
    const cookieConsentHelper = new CookieConsentHelper(page);
    await cookieConsentHelper.acceptCookies();
    const searchProductFormLocator = page.getByPlaceholder('Search Product');
    await searchProductFormLocator.fill(selectedProduct.name);
    const searchButton = page.locator('#submit_search');
    await searchButton.click();
    await expect(page.getByRole('heading', {name: 'Searched Products'})).toBeVisible();
    const productsSection = page.locator('.features_items');
    const productCard = productsSection.locator('.product-image-wrapper')
    .filter({hasText: selectedProduct.name});
    await expect(productCard).toBeVisible();

    // ponowna weryfikacja wyszukiwania poprzez API
      const searchProductResponse = await request.post(`${automationExerciseBaseURL}/api/searchProduct`, 
    {
      form: {
            search_product: selectedProduct.name 
      }
    }
);
    const searchProductResponseBody: ProductsResponse = await searchProductResponse.json();
    expect(searchProductResponse.status()).toBe(200);
    expect(searchProductResponseBody.responseCode).toBe(200);
    expect(
    searchProductResponseBody.products.some(product => product.name === selectedProduct.name)).toBe(true);
});