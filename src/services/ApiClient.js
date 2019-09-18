import RestClient from 'react-native-rest-client';

export default class ApiClient extends RestClient {
    constructor() {
        super('https://lreypjgj1c.execute-api.ap-southeast-2.amazonaws.com', {
            headers: { 'x-api-key': '6PSJVe1Jr733JRzxP0uAe3TuqBxRqlbE9f4ua8Wf' }
        });
    }

    getDepartures(optionalParameters) {
        return this.GET("/dev/transportation", optionalParameters);
    }
}