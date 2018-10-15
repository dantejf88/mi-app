import { authHeader } from './auth-header';

export const userService = {
    login,
    logout,
    getAll,
    fetchPhrase,
    fetchPrivatePhrase
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

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/data`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                
                logout();
               
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
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
