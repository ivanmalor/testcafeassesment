const fetch = require("isomorphic-unfetch");

export class RestClient {
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
    }

    getDevices() {
        let url = '/devices';
        let config = {
            method: 'GET'
        }
        return this.request(url, config);
    }
}