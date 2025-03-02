import httpClient from '../httpClient';
import { Token, User } from './types';

export const AuthService = {
    async login({ username, password }: User): Promise<Token> {
        const response = await httpClient.post('/auth/token/',
            {
                "username": username,
                "password": password
            }
        );
        return response.data;
    },

    async registerUser({ username, password }: User) {
        const response = await httpClient.post('/auth/register/',
            {
                "username": username,
                "password": password
            }
        );
        return response.data;
    }
}