export async function getStaticPathsOwner() {
    const response = await fetch('http://localhost:8080/api/auth/signin', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({
            username: "irw", password: "kakajunn123"
        }) // body data type must match "Content-Type" header
    });
    const credentials = await response.json();
    console.log(credentials.token);
    const allOwners = await fetch('http://localhost:8080/api/users/owner_ids', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.token
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer'
    });
    const allOwnersList = await allOwners.json();
    const paths = allOwnersList.map(id => ({
        params: {
            id: id.toString(),
        },
    }));
    return {
        paths, fallback: false,
    };
}

export async function getStaticPathsAnimal() {
    const response = await fetch('http://localhost:8080/api/auth/signin', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({
            username: "irw", password: "kakajunn123"
        }) // body data type must match "Content-Type" header
    });
    const credentials = await response.json();
    console.log(credentials.token);
    const allAnimals = await fetch('http://localhost:8080/api/animals/animal_ids', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.token
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer'
    });
    const allAnimalsList = await allAnimals.json();
    const paths = allAnimalsList.map(id => ({
        params: {
            id: id.toString(),
        }
    }
    ));
    return {
        paths, fallback: false,
    }
}

export async function getStaticPathsAppointment() {
    const response = await fetch('http://localhost:8080/api/auth/signin', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({
            username: "irw", password: "kakajunn123"
        }) // body data type must match "Content-Type" header
    });
    const credentials = await response.json();
    console.log(credentials.token);
    const allAppointments = await fetch('http://localhost:8080/api/appointments/appointment_ids', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.token
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer'
    });
    const allAppointmentsList = await allAppointments.json();
    const paths = allAppointmentsList.map(id => ({
        params: {
            id: id.toString(),
        }
    }
    ));
    return {
        paths, fallback: false,
    }
}
