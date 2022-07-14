export default class Animal {
    constructor(id, name, gender, species, breed, age, weight, chipNr, owner) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.species = species;
        this.breed = breed;
        this.age = age;
        this.weight = weight;
        this.chipNr = chipNr;
        this.owner = owner;
    }

    // method to convert age Date object to age string with years, months and days
    getAge() {
        const ageInMilliseconds = Date.now() - this.age.getTime();
        const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365));
        // subtract years from ageInMilliseconds to get months
        const ageInMonths = Math.floor((ageInMilliseconds - ageInYears * 1000 * 60 * 60 * 24 * 365) / (1000 * 60 * 60 * 24 * 30));
        // subtract months from ageInMilliseconds to get days
        const ageInDays = Math.floor((ageInMilliseconds - ageInYears * 1000 * 60 * 60 * 24 * 365 - ageInMonths * 1000 * 60 * 60 * 24 * 30) / (1000 * 60 * 60 * 24));
        return `${ageInYears} years, ${ageInMonths} months, ${ageInDays} days`;
    }

    // method to convert weight number to string with kilograms and grams
    getWeight() {
        const weightInKilograms = this.weight / 1000;
        const weightInGrams = this.weight % 1000;
        return `${weightInKilograms} kilograms, ${weightInGrams} grams`;
    }

    // get age date string
    getAgeISO() {
        return this.age.toISOString().slice(0,10);
    }

    // convert this object to JSON
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            gender: this.gender,
            species: this.species,
            breed: this.breed,
            age: this.getAgeISO(),
            weight: this.weight,
            chipNr: this.chipNr,
            owner: this.owner.id
        }
    }
}
