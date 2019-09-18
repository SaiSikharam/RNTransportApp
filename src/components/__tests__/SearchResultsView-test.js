import 'react-native';
import React from 'react';
import SearchResultsView from '../SearchResultsView';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import expectExport from 'expect';

const mockResults = [
    {
        "typeId": 1,
        "departureTime": "2024-07-07T13:50:00.000Z",
        "route": "624",
        "name": "Queen Victoria Market",
        "latitude": -37.806718,
        "longitude": 144.9574589,
        "hasMyKiTopUp": true
    },
    {
        "typeId": 1,
        "departureTime": "2024-07-07T18:50:00.000Z",
        "route": "625",
        "name": "Carlton Gardens",
        "latitude": -37.8049684,
        "longitude": 144.9572112,
        "hasMyKiTopUp": true
    }
];

it('renders correctly with results', () => {
    renderer.create(<SearchResultsView results={mockResults} />);
});

it('renders correctly with empty results', () => {
    renderer.create(<SearchResultsView results={[]} />);
});