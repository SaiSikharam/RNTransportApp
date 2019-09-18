import React, { Component } from 'react';
import { View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import moment from 'moment';

export default class MapResultsView extends Component {
    render() {

        return (
            <View >
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={{ width: '100%', height: "70%", marginBottom: 130 }}
                    region={{
                        latitude: -37.8049684,
                        longitude: 144.9572112,
                        latitudeDelta: 0.5,
                        longitudeDelta: 0.5,
                    }}>
                    {
                        this.props.results.map((marker, index) => (
                            <Marker key={index}
                             coordinate={{
                                latitude: marker.latitude,
                                longitude: marker.longitude,
                            }}
                            title={marker.name}
                            description={moment(marker.departureTime).format('D MMM YYYY, HH:mm:ss')} />
                        ))}
                </MapView>
            </View>
        );
    }
}