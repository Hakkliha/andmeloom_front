export default class Appointment {
    constructor(id, datetime, owner, animal) {
        this.id = id;
        this.appointmentDate = datetime;
        this.owner = owner;
        this.animal = animal;
    }

    getDateTimeISO() {
        return new Date(this.appointmentDate).toISOString();
    }
    toJSON() {
        return {
            id: this.id,
            appointmentDate: this.getDateTimeISO(),
            owner: this.owner.id,
            animal: this.animal.id
        };
    }
    static fromJSON(json, owner, animal) {
        return new Appointment(json.id, new Date(json.appointmentDate), owner, animal);
    }
}
