import { test as base, expect } from '@playwright/test';
import { userEmail, userName, userPassword } from '../../utils/user-article-data';

type Fixtures = {
    token: string;
}

export const test = base.extend<Fixtures>({
    token:async({ request }, use) => {
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

});
