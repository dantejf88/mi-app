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

module.exports = fetchPhrase;