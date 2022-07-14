import Animal from "./classes/Animal";
import Owner from "./classes/Owner";
import Appointment from "./classes/Appointment";

// create 10 owners
const owners = [
    new Owner(1, "x@x.com", "123456", "John", "Doe", "John Doe", "123456789", "Street 1", "1", "1", "City 1", "12345", "County 1", "Country 1"),
    new Owner(2, "lol12@ernits.com", "123456", "John", "Doe", "John Doe", "123456789", "Street 1", "1", "1", "City 1", "12345", "County 1", "Country 1"),
    new Owner(3, "lol23@ernits.com", "123456", "John", "Doe", "John Doe", "123456789", "Street 1", "1", "1", "City 1", "12345", "County 1", "Country 1"),
    new Owner(4, "lol34@ernits.com", "123456", "John", "Doe", "John Doe", "123456789", "Street 1", "1", "1", "City 1", "12345", "County 1", "Country 1"),
    new Owner(5, "lol45@ernits.com", "123456", "John", "Doe", "John Doe", "123456789", "Street 1", "1", "1", "City 1", "12345", "County 1", "Country 1"),
    new Owner(6, "lol56@ernits.com", "123456", "John", "Doe", "John Doe", "123456789", "Street 1", "1", "1", "City 1", "12345", "County 1", "Country 1"),
    new Owner(7, "lol67@ernits.com", "123456", "John", "Doe", "John Doe", "123456789", "Street 1", "1", "1", "City 1", "12345", "County 1", "Country 1"),
    new Owner(8, "lol78@ernits.com", "123456", "John", "Doe", "John Doe", "123456789", "Street 1", "1", "1", "City 1", "12345", "County 1", "Country 1"),
    new Owner(9, "lol89@ernits.com", "123456", "John", "Doe", "John Doe", "123456789", "Street 1", "1", "1", "City 1", "12345", "County 1", "Country 1"),
    new Owner(10, "lol90@ernits.com", "123456", "John", "Doe", "John Doe", "123456789", "Street 1", "1", "1", "City 1", "12345", "County 1", "Country 1")];

// create 10 animals with random data
const animals = [
    new Animal(1, "Andre", "M", "Purple grenadier", "Uraeginthus granatina", new Date("2022-06-09"), 95.508, "ca339e177f96a5abdca44ac3f62a188e712bb8495fdb557c8d14c5a680d65cdd", owners[0]),
    new Animal(2, "Beatrisa", "F", "Kangaroo, black-faced", "Macropus fuliginosus", new Date("1998-03-04"), 10.542, "ca339e177f96a5abdca44ac3f62a188e712bb8495fdb557c8d14c5a680d65cdd", owners[1]),
    new Animal(3, "Arvin", "M", "Common pheasant", "Phasianus colchicus", new Date("2017-12-18"), 45.29, "ca339e177f96a5abdca44ac3f62a188e712bb8495fdb557c8d14c5a680d65cdd", owners[2]),
    new Animal(4, "Rosie", "F", "Gull, herring", "unavailable", new Date("1995-01-08"), 45.346, "ca339e177f96a5abdca44ac3f62a188e712bb8495fdb557c8d14c5a680d65cdd", owners[3]),
    new Animal(5, "Pablo", "M", "Southern white-crowned shrike", "Eurocephalus anguitimens", new Date("2001-01-03"), 32.375, "ca339e177f96a5abdca44ac3f62a188e712bb8495fdb557c8d14c5a680d65cdd", owners[4]),
    new Animal(6, "Whitaker", "M", "Zorro, common", "Dusicyon thous", new Date("2018-01-01"), 88.919, "ca339e177f96a5abdca44ac3f62a188e712bb8495fdb557c8d14c5a680d65cdd", owners[5]),
    new Animal(7, "Guntar", "M", "Hare, arctic", "Lepus arcticus", new Date("2018-01-01"), 3.356, "ca339e177f96a5abdca44ac3f62a188e712bb8495fdb557c8d14c5a680d65cdd", owners[6]),
    new Animal(8, "Garv", "M", "Rattlesnake, horned", "Crotalus cerastes", new Date("2018-01-01"), 75.462, "ca339e177f96a5abdca44ac3f62a188e712bb8495fdb557c8d14c5a680d65cdd", owners[7]),
    new Animal(9, "Cullen", "M", "Buffalo, african", "Snycerus caffer", new Date("2018-01-01"), 53.748, "ca339e177f96a5abdca44ac3f62a188e712bb8495fdb557c8d14c5a680d65cdd", owners[8]),
    new Animal(10, "Cornie", "M", "Urial", "Ovis orientalis", new Date("2018-01-01"), 14.188, "ca339e177f96a5abdca44ac3f62a188e712bb8495fdb557c8d14c5a680d65cdd", owners[9]),
    new Animal(11, "Mendel", "M", "Vulture, black", "Aegypius tracheliotus", new Date("2018-01-01"), 70.604, "ca339e177f96a5abdca44ac3f62a188e712bb8495fdb557c8d14c5a680d65cdd", owners[0]),
    new Animal(12, "Tye", "M", "Painted stork", "Mycteria leucocephala", new Date("2018-01-01"), 79.333, "ca339e177f96a5abdca44ac3f62a188e712bb8495fdb557c8d14c5a680d65cdd", owners[1]),
    new Animal(13, "Dwain", "M", "Warthog", "Phacochoerus aethiopus", new Date("2018-01-01"), 13.431, "ca339e177f96a5abdca44ac3f62a188e712bb8495fdb557c8d14c5a680d65cdd", owners[0]),
    new Animal(14, "Katy", "F", "Urial", "Ovis orientalis", new Date("2018-01-01"), 6.913, "ca339e177f96a5abdca44ac3f62a188e712bb8495fdb557c8d14c5a680d65cdd", owners[2]),
    new Animal(15, "Ive", "M", "Oriental short-clawed otter", "Aonyx cinerea", new Date("2018-01-01"), 3.86, "ca339e177f96a5abdca44ac3f62a188e712bb8495fdb557c8d14c5a680d65cdd", owners[3]),
    new Animal(16, "Penni", "F", "White stork", "Ciconia ciconia", new Date("2018-01-01"), 64.544, "ca339e177f96a5abdca44ac3f62a188e712bb8495fdb557c8d14c5a680d65cdd", owners[4]),
    new Animal(17, "Jaymee", "F", "Seal, common", "Phoca vitulina", new Date("2018-01-01"), 58.635, "ca339e177f96a5abdca44ac3f62a188e712bb8495fdb557c8d14c5a680d65cdd", owners[1]),
    new Animal(18, "Adlai", "M", "Southern sea lion", "Otaria flavescens", new Date("2018-01-01"), 8.382, "ca339e177f96a5abdca44ac3f62a188e712bb8495fdb557c8d14c5a680d65cdd", owners[5]),
    new Animal(19, "Alyson", "F", "Blue waxbill", "Uraeginthus angolensis", new Date("2018-01-01"), 87.377, "ca339e177f96a5abdca44ac3f62a188e712bb8495fdb557c8d14c5a680d65cdd", owners[6]),
    new Animal(20, "Katharine", "F", "Savanna fox", "Dusicyon thous", new Date("2018-01-01"), 74.663, "ca339e177f96a5abdca44ac3f62a188e712bb8495fdb557c8d14c5a680d65cdd", owners[6])];

const appointments = [
    new Appointment(1, new Date("2020-01-01T05:30:00.000Z"), animals[0].owner, animals[0]),
    new Appointment(2, new Date("2020-01-02T06:30:00.000Z"), animals[1].owner, animals[1]),
    new Appointment(3, new Date("2020-01-01T07:30:00.000Z"), animals[2].owner, animals[2]),
    new Appointment(4, new Date("2020-01-01T08:30:00.000Z"), animals[3].owner, animals[3])];

export {animals, owners, appointments};
