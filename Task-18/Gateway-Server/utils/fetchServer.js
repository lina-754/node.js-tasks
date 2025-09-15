
const fetchPOSTREQUEST = async (url, body) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'username': process.env.USERNAME_SERVER,
                'password': process.env.PASSWORD_SERVER
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        return data

    } catch (error) {
        console.log(error);
    }
}

const fetchGETREQUEST = async (url) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'username': process.env.USERNAME_SERVER,
                'password': process.env.PASSWORD_SERVER
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};


const fetchDELETEREQUEST = async (url) => {
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'username': process.env.USERNAME_SERVER,
                'password': process.env.PASSWORD_SERVER
            }
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error);
    }
};


module.exports = { fetchPOSTREQUEST ,fetchGETREQUEST ,fetchDELETEREQUEST  }