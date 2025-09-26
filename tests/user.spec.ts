import { expect } from '@playwright/test';
import { test } from './fixtures';
import { updatedBio, userPassword } from '../utils/user-data';
import { Users } from '../app/controllers/Users.controller'; 

test('USER-001, Login user, Should be logged in', 
    { tag: ['@user', '@login'],
      annotation: {
        type: 'description',
        description: 'Login user',
      },
    },
    async ({ request, newUser }) => {
      const user = new Users(request);
      const response = await user.loginUser(newUser.token, { email: newUser.userEmail, password: userPassword });
      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.user.email).toBe(newUser.userEmail);
      expect(body.user.username).toBe(newUser.userName);
});

test.skip('USER-002, Update user, should be updated', 
    { tag: ['@user', '@update'],
      annotation: {
        type: 'description',
        description: 'Update user',
      },
    },
    async ({ request, newUser }) => {
      const user = new Users(request);
      const response = await user.updateUser(
          newUser.token, 
          {
              email: newUser.userEmail,
              username: newUser.userName,
              bio: updatedBio,
              image: 'https://example.com/profile.jpg',
          }
          );
      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.user.bio).toBe(updatedBio);
});
