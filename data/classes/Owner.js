// owner class

export default class Owner {
    constructor(id, email, password, firstname, lastname, fullName, phone, street, houseNr, apartment, city, zip, county, country) {
        this.id = id;
        this.email = email;
        this.firstName = firstname;
        this.lastName = lastname;
        this.fullName = fullName;
        this.phone = phone;
        this.street = street;
        this.houseNr = houseNr;
        this.apartment = apartment;
        this.city = city;
        this.zip = zip;
        this.county = county;
        this.country = country;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    // get address string
    getAddress() {
        return `${this.street} ${this.houseNr}${this.apartment ? `, ${this.apartment}` : ''}, ${this.zip} ${this.city}`;
    }
    toJSON() {
        return {
            id: this.id,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            fullName: this.fullName,
            phone: this.phone,
            street: this.street,
            houseNr: this.houseNr,
            apartment: this.apartment,
            city: this.city,
            zip: this.zip,
            county: this.county,
            country: this.country
        }
    }

    static fromJSON(json) {
        return new Owner(json.id, json.email, json.firstName, json.lastName, json.fullName, json.phone, json.street, json.houseNr, json.apartment, json.city, json.zip, json.county, json.country);
    }
}
