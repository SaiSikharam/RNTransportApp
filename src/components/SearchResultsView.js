

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList
} from 'react-native';
import { ListItem } from 'react-native-elements';
import moment from 'moment';



export default class SearchResultsView extends Component {
    renderItem = ({ item }) => (
        <ListItem
            title={`${item.route != undefined ? item.route + ' ' : ''}${item.name}`}
            subtitle={this.formatDate(item.departureTime)}
            bottomDivider
        />
    )

    formatDate = (dateTime) => {
        return moment(dateTime).format('D MMM YYYY, HH:mm:ss');
    }

    keyExtractor = (item, index) => index.toString()

    render() {
        return (
            <View>
                <FlatList
                    data={this.props.results}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        
    },
});


