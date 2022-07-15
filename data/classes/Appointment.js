export default class Appointment {
    constructor(id, datetime, owner, animal) {
        this.id = id;
        this.datetime = datetime;
        this.owner = owner;
        this.animal = animal;
    }

    getDateTimeISO() {
        return this.datetime.toISOString();
    }
    toJSON() {
        return {
            id: this.id,
            datetime: this.getDateTimeISO(),
            owner: this.owner.id,
            animal: this.animal.id
        };
    }
    static fromJSON(json) {
        return new Appointment(json.id, new Date(json.datetime), json.owner, json.animal);
    }
}
