class TokenService {
    constructor() {
        this.key = "user";
    }

    getLocalAccessToken() {
        return this.getUser()?.token;
    }

    updateLocalAccessToken(token) {
        let user = this.getUser();
        user.token = token;
        localStorage.setItem(this.key, JSON.stringify(user));
    }

    getUser() {
        return JSON.parse(localStorage.getItem(this.key));
    }

    setUser(user) {
        localStorage.setItem(this.key, JSON.stringify(user));
    }

    removeUser() {
        localStorage.removeItem(this.key);
    }

    getUserRole() {
        return  this.getUser()?.roles[0];
    }
}

export default new TokenService();
