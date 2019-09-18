

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Button,
    Text
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker';
import TransportationService from '../services/TransportationService';
import moment from 'moment';

const transportModes = [
    { label: 'Train', value: 0 },
    { label: 'Bus', value: 1 }
];

searchInitState = () => {
    return {
        departureStartDateTime: undefined,
        departureEndDateTime: undefined,
        transportMode: transportModes[0].value,
        loading: undefined,
        message: '',
        departureDtError: false
    };
};

export default class SearchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = searchInitState();
        this._service = new TransportationService();
    }

    reset = () => {
        this.setState(searchInitState());
    }

    search = () => {
        this.props.updateResult([]);
        this.props.updateLoadingStatus(true);
        this.setState({message: this.state.transportMode})
        this._service.getDepartures(
            this.state.departureStartDateTime,
            this.state.departureEndDateTime,
            this.state.transportMode).then(res => {
                this.props.updateResult(res.searchResults, res.isError);
                this.props.updateLoadingStatus(false);
            });
    }

    validateDeparture = () => {
        if (this.state.departureEndDateTime && this.state.departureStartDateTime && (moment(this.departureStartDateTime) > moment(this.state.departureEndDateTime))) {
            this.setState({departureDtError: true});
        }
    }

    setDeparture = (dateTime, isStart) => {
        if (isStart) {
            this.setState({departureStartDateTime: dateTime});
        } else {
            this.setState({departureEndDateTime: dateTime});
        }
        this.validateDeparture();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.date}>
                    <DatePicker
                        style={styles.dateFilter}
                        date={this.state.departureStartDateTime}
                        mode="datetime"
                        placeholder="select departure start time"
                        format="YYYY-MM-DD HH:mm"
                        androidMode="spinner"
                        minDate={new Date()}
                        onDateChange={(date) => { this.setDeparture(date, true) }}
                    />
                    <View style={styles.spacer}></View>
                    <DatePicker
                        style={styles.dateFilter}
                        date={this.state.departureEndDateTime}
                        mode="datetime"
                        placeholder="select departure end time"
                        format="YYYY-MM-DD HH:mm"
                        androidMode="spinner"
                        minDate={new Date()}
                        onDateChange={(date) => { this.setDeparture(date, false) }}
                    />
                </View>
                {
                    this.state.departureDtError &&
                    <Text style={{color: 'red'}}>Departure start should not be greater then Departure end</Text>
                }

                <View style={styles.spacer}></View>

                <RadioForm
                    key={this.state.transportMode}
                    radio_props={transportModes}
                    initial={this.state.transportMode}
                    formHorizontal={true}
                    onPress={(value) => { this.setState({ transportMode: value }) }} />
                <View style={styles.spacer}></View>

                <View style={styles.submit}>
                    <View style={styles.submitBtn}>
                        <Button title="Reset" onPress={this.reset} />
                    </View>
                    <View style={styles.submitBtn}>
                        <Button title="Search" onPress={this.search} />
                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        alignItems: 'center'
    },
    spacer: {
        marginTop: 10,
    },
    dateFilter: {
        width: 250
    },
    submit: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    submitBtn: {
        alignSelf: 'stretch',
        width: '30%',
        marginHorizontal: 10
    }
});


