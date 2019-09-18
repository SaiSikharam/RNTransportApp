import ApiClient from "./ApiClient";
import moment from 'moment';

export default class TransportationService {
    constructor() {
        this._client = new ApiClient;
    }

    getDepartures(departureStartTime, departureEndTime, tranportMode) {
        let result = {
            searchResults: [],
            isError: true,
            message: undefined
        };
        let optionalParams = {
        };
        if (departureStartTime) {
            optionalParams.departureTimeMin = moment.utc(departureStartTime).toISOString();
        }
        if (departureEndTime) {
            optionalParams.departureTimeMax = moment.utc(departureEndTime).toISOString();
        }
        if (tranportMode != undefined) {
            optionalParams.typeId = tranportMode;
        }
        return this._client.getDepartures(optionalParams).then((response) => {
            if (response.statusCode == 200) {
                result.isError = false;
                result.searchResults = response.result.transportation.modes;
            } 
            result.message = response.message;
            return result;
        }).catch((error) => {
            result.message = "Request failed. Err: " + JSON.stringify(error);
            return result;
        });
    }
}