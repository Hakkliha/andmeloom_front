// owner class

export default class Owner {
    constructor(id, email, password, firstname, lastname, fullName, phone, street, houseNr, apartment, city, zip, county, country) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
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
        return `${this.firstname} ${this.lastname}`;
    }

    // get address string
    getAddress() {
        return `${this.street} ${this.houseNr}${this.apartment ? `, ${this.apartment}` : ''}, ${this.zip} ${this.city}`;
    }
    toJSON() {
        return {
            id: this.id,
            email: this.email,
            firstname: this.firstname,
            lastname: this.lastname,
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
}
