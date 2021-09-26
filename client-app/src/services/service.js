const baseUrl = `http://localhost:49764`;
const productAPI = baseUrl + '/api/product/';

export const productService = {
    getAll,
    get,
    create,
    update,
    delete: _delete
};

function fetchData(apiUrl, method, jsonData) {
    return fetch(apiUrl, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body:jsonData
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
    });
}

function getAll() {
    return fetchData(productAPI, 'GET', null);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetch(productAPI + id, { method: 'DELETE' });
}

function get(id) {
    return fetchData(productAPI + id, 'GET', null);
}

function create(jsonData) {
    return fetchData(productAPI, 'POST', jsonData);

}

function update(id, jsonData) {
    return fetchData(productAPI + id, 'PUT', jsonData);
}
