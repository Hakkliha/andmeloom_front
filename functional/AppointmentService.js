import api from './api';

class AppointmentService {
    getList() {
        return api.get('/appointments');
    }

    getAppointmentsDetail(id) {
        return api.get(`/appointments/${id}`);
    }

    getAppointmentsByUser(id) {
        return api.get(`/appointments/userId?userId=${id}`);
    }

    postAppointments(data) {
        return api.post(`/appointments`, data);
    }

    putAppointments(data) {
        return api.put('/appointments', data);
    }

    deleteAppointments(id) {
        return api.delete(`/appointments/${id}`);
    }
}

export default new AppointmentService();
