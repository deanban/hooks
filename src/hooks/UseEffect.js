import React from 'react';

const FakeAPI = {
  count: 0,
  fakeFetch() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.count += 1;
        resolve(this.count);
      }, 1000);
    });
  },
  subscribeToApi(cb) {
    this.interval = setInterval(() => {
      this.count += 1;
      cb(this.count);
    }, 1000);
  },
  unSubscribeFromApi() {
    clearInterval(this.interval);
    this.reset();
  },
  reset() {
    this.count = 0;
  }
};

export default class UseEffect extends React.Component {
  state = {
    project: 'Foo'
  };
}
