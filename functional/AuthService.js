import api from './api';
import TokenService from './TokenService';

class AuthService {
    login(username, password) {
        return api
            .post('/auth/signin', {
                username,
                password
            })
            .then(response => {
                if (response.data.token) {
                    TokenService.setUser(response.data);
                }

                return response.data;
            });
    }

    logout() {
        TokenService.removeUser();
    }

    register(username, email, password) {
        return api.post('/auth/signup', {
            username,
            email,
            password
        });
    }

    getCurrentUser() {
        return TokenService.getUser();
    }

    isAuthenticated() {
        return !!TokenService.getLocalAccessToken();
    }

    getUserRole() {
        if (this.isAuthenticated()) {
            return TokenService.getUserRole();
        }
    }
}

export default new AuthService();
