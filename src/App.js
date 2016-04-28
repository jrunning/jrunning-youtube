import React from 'react';
import SearchContainer from './SearchContainer';

export default function App() {
  const onSearch = (...args) => console.log(...args);
  return <SearchContainer onSearch={onSearch} />;
}
