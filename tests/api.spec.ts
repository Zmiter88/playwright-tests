import { test, expect } from '@playwright/test';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

test('GET /posts/1 returns a post', async ({ request }) => {
    const response = await request.get(
        'https://jsonplaceholder.typicode.com/posts/1'
    );

     expect(response.status()).toBe(200);

    const post = await response.json();
    console.log(post);

     expect(post.id).toBe(1)
     expect(post.userId).toBe(1)
     expect(post.title).not.toBe('');
     expect(typeof post.body).toBe('string')
});


test('POST /posts creates a post', async ({ request }) => {
    const response = await request.post(
        'https://jsonplaceholder.typicode.com/posts',
        {
            data: {
                title: 'My first API test',
                body: 'Learning Playwright API',
                userId: 1
            }
        }
    );

    expect(response.status()).toBe(201);
    const post = await response.json();
    console.log(post);
    expect(post.title).toBe('My first API test');
});

test('GET /posts returns a list of posts', async ({ request }) => {
    const response = await request.get(
        'https://jsonplaceholder.typicode.com/posts'
    );

     expect(response.status()).toBe(200);

    const posts: Post[] = await response.json();

     expect(posts.length).toBeGreaterThan(0);
     expect(posts[0].id).toBe(1);
     
     const userPosts = posts.filter(post => post.userId === 1);
     expect(userPosts.length).toBeGreaterThan(0);
     expect(userPosts.every(post => post.userId === 1)).toBe(true);

     const userPostTitles = posts.map(post => post.title);
     console.log(userPostTitles);
     expect(userPostTitles.length).toBeGreaterThan(0);
});

test('GET /posts returns a list of posts - 2', async ({ request }) => {
    const response = await request.get(
        'https://jsonplaceholder.typicode.com/posts'
    );

     expect(response.status()).toBe(200);

    const posts: Post[] = await response.json();
    const userPosts = posts.filter(post => post.userId === 1);
    const titles = userPosts.map(post => post.title);
    expect (userPosts).toHaveLength(10);
    expect (titles.every(title => typeof(title) === 'string' && (title.length > 0))).toBe(true);
});
