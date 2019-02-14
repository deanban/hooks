import React from 'react';
import UseState from './hooks/UseState';
import UseEffect from './hooks/UseEffect';
import SearchForRepos from './hooks/CustomHooks';
import FancyTodosApp from './hooks/FancyTodos';

export default () => (
  <div
    style={{
      margin: '20px auto',
      padding: '20px',
      width: '200',
      textAlign: 'center'
    }}
  >
    <UseState />
    <UseEffect />
    <SearchForRepos />
    <FancyTodosApp />
  </div>
);
