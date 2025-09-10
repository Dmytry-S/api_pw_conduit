import { test as base, expect } from '@playwright/test';
import { userName, userPassword, userEmail } from '../../utils/user-data';

type Fixtures = {
    token: string;
    email: string;
    password: string;
}

export const test = base.extend<Fixtures>({
    token: async ({ request }, use) => {
        const response = await request.post('/api/users/', 
            {
                data: {
                    user: { 
                        email: userEmail, 
                        password: userPassword, 
                        username: userName, 
                    }
                },
            }
        );
        expect(response.status()).toBe(200);
        const token = (await response.json()).user.token;
        expect(token).toBeDefined();
        
        await use(token);
    },
    email: async ({}, use) => {
        await use(userEmail);
    },
    password: async ({}, use) => {
        await use(userPassword);
    }
});

test.afterEach(async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
})
