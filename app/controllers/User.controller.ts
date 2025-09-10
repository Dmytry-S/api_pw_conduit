import { APIRequestContext } from "@playwright/test";


export class User {
    request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async loginUser(token: string, user: { email: string; password: string}) {
        const response = await this.request.post(`/api/users/login`, {
            headers: {
                authorization: `Token ${token}`,
            },
            data: { user },
        });
        return response;
    }

    async updateUser(
        token: string,
        data: { 
                email: string,
                username: string,
                bio: string,
                image?: string,
            }
          ) {
        const response = await this.request.put(`/api/user`, {
            headers: {
                authorization: `Token ${token}`,
            },
            data: data,
        });
        return response;
    }
}
