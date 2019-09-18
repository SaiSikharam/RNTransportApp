

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Button
} from 'react-native';
import SearchResultsView from './SearchResultsView';
import MapResultsView from './MapResultsView';




export default class ResultsView extends Component {

    state = {
        mapButtonTitle: '',
        hideMap: true
    }

    toggleMapView = () => {
        this.setState({hideMap: !this.state.hideMap});
    }



    render() {
        const searchResults = this.props.searchResults;
        return (
            <View>
                {
                    searchResults.length > 0 &&
                    <Button title={this.state.hideMap ? "Show Map" : "Hide Map"} onPress={this.toggleMapView} />
                }
                {
                    this.state.hideMap ?
                    <SearchResultsView results={searchResults} /> :
                    <MapResultsView results={searchResults} />
                }
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

    },
});


