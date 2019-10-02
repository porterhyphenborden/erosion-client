import TokenService from '../services/token-service'
import config from '../config'

const ErosionApiService = {
    getMapByID(id) {
        return fetch(`${config.API_ENDPOINT}/maps/${id}`, {
            method: 'GET',
            headers: {
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    getLayoutByMapID(id) {
        return fetch(`${config.API_ENDPOINT}/maps/${id}/layout`, {
            method: 'GET',
            headers: {
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    getScores() {
        return fetch(`${config.API_ENDPOINT}/scores`, {
            method: 'GET',
            headers: {
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    getUserScores() {
        return fetch(`${config.API_ENDPOINT}/users/ID/scores`, {
            method: 'GET',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    postScore(score) {
        return fetch(`${config.API_ENDPOINT}/scores`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(score),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },

}

export default ErosionApiService