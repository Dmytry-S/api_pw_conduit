import { expect } from '@playwright/test';
import { test } from './fixtures';
import { updatedBio, userName } from '../../utils/user-data';
import { User } from '../../app/controllers/User.controller'; // Add this import for User class

test('Login user', async ({ request, token, email, password }) => {
    const user = new User(request);
    const response = await user.loginUser(token, { email, password });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.user.email).toBe(email);
    expect(body.user.username).toBe(userName);
});

test('Update user', async ({ request, token, email }) => {
    const user = new User(request);
    const response = await user.updateUser(
        token, 
        {
            email: email,
            username: userName,
            bio: updatedBio,
        }
        );
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.user.bio).toBe(updatedBio);
});
