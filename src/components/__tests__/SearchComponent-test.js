import 'react-native';
import React from 'react';
import SearchComponent from '../SearchComponent';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import expectExport from 'expect';

it('renders correctly', () => {
  renderer.create(<SearchComponent />);
});
