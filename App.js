/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import SearchComponent from './src/components/SearchComponent';
import ResultsView from './src/components/ResultsView';

export default class App extends Component {
  state = {
    searchResults: [],
    loading: false,
    loadingFailed: undefined,
  }

  updateResult = (results, hasError) => {
    this.setState({ searchResults: results });
    this.setState({ loadingFailed: hasError });
  }

  updateLoadingStatus = (status) => {
    if (status == true) {
      this.setState({
        loadingFailed: undefined,
      })
    }
    this.setState({ loading: status });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Transport App</Text>
        <SearchComponent updateResult={this.updateResult} updateLoadingStatus={this.updateLoadingStatus} />
        <View style={styles.spacer}></View>
        {
          this.state.loading &&
          <ActivityIndicator color="#2296F3" size="large"></ActivityIndicator>
        }

        {
          this.state.loadingFailed &&
          <Text>Failed to load data. Please try again. </Text>
        }

        {
          (this.state.loadingFailed == false && this.state.searchResults.length == 0) &&
          <Text>No results matching search criteria. Please try by changing the search criteria.</Text>
        }

        {
          !this.state.loading &&
          <ResultsView searchResults={this.state.searchResults} />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    margin: 20
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  spacer: {
    marginTop: 10,
  },
});


