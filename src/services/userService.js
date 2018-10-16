import { authHeader } from './auth-header';

export const userService = {
    login,
    logout,
    fetchPhrase,
    fetchPrivatePhrase,
    createUser
};

function login(payload) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload.info)
    };

    return fetch(`${payload.url}`, requestOptions)
        .then(handleResponse)
        .then(user => {
            
            if (user.access_token) {
                
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        }) 
} 

function logout() {
    localStorage.removeItem('user');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
            if (response.status === 401) {               
            const error = data
            return error;
        }
        return data;
    });
}

function fetchPhrase(payload){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }
    return fetch(`${payload.url}`, requestOptions)
            .then(response =>{
                return response.text()
            })
};

function fetchPrivatePhrase(payload){
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    }
    return fetch(`${payload.url}`, requestOptions)
            .then(response =>{ 
                if (response.status === 401) {
                    let res = "No tiene autorización"
                    return res
                    }
                return response.text()
            })
            
};

function createUser(payload){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload.info)
    }
    return fetch(`${payload.url}`, requestOptions)
      
}