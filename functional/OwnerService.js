import api from './api';

class OwnerService {
    getList() {
        return api.get('/users?firstName=&lastName=');
    }

    getListSearch(searchParam) {
        return api.get(`/users?firstName=${searchParam || ''}&lastName=${searchParam || ''}`);
    }

    getOwnerDetail(id) {
        return api.get(`/users/${id}`);
    }

    postOwner(data) {
        return api.post('/users', {data});
    }

    putOwner(data) {
        data['fullName'] = `${data['firstName']} ${data['lastName']}`;
        return api.put('/users', {data});
    }

    deleteOwner(id) {
        return api.delete(`/users/${id}`);
    }
}

export default new OwnerService();
