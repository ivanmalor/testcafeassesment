const fetch = require("isomorphic-unfetch");

class RestClient {
    constructor() {
        this.basePath = 'http://localhost:3000'
    }

    async request(endpoint = '', options = {}) {
        const url = this.basePath + endpoint;

        let headers = {
            'Content-Type': 'application/json'
        }

        let config = {
            ...options,
            ...headers
        }
        let res = await fetch(url, config);
        if (res.ok) {
            return await res.json();
        }
        throw new Error(res);
    }

    getDevices() {
        let url = '/devices';
        let options = {
            method: 'GET'
        }
        return this.request(url, options);
    }

    updateDevice(id, body) {
        let url = `/devices/${id}`;
        let options = {
            method: 'PUT',
            body: JSON.stringify(body)
        }
        return this.request(url, options)
    }

    deleteDevice(id) {
        let url = `/devices/${id}`;
        let options = {
            method: 'DELETE'
        }
        return this.request(url, options);
    }
}

export default new RestClient();