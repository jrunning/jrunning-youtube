import React, { Component } from 'react';
import SearchFormContainer from 'SearchFormContainer';

export default class App extends Component {
  render() {
    const onSearch = (...args) => console.log(...args);
    return <SearchFormContainer onSearch={onSearch}/>;
  }
}
