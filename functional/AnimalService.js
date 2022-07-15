import api from './api';

class AnimalService {
    getList() {
        return api.get('/animals');
    }

    getListSearch(searchParam) {
        return api.get(`/animals/search?name=${searchParam}`);
    }

    getAnimalDetail(id) {
        return api.get(`/animals/${id}`);
    }

    getAnimalsByUser(id) {
        return api.get(`/animals/userId?userId=${id}`);
    }

    postAnimal(data) {
        return api.post('/animals', {data});
    }

    putAnimal(data) {
        return api.put('/animals', {data});
    }

    deleteAnimal(id) {
        return api.delete(`/animals/${id}`);
    }
}

export default new AnimalService();
