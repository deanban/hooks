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

  render() {
    const { project } = this.state;
    return (
      <div>
        <br />
        <br />
        <hr />
        <button
          onClick={() =>
            this.setState({ project: project === 'Foo' ? 'Bar' : 'Foo' })
          }
        >
          Change Project
        </button>
        {/* <UseEffectComponent project={project} /> */}
        <UseEffectFunction project={project} />
      </div>
    );
  }
}

class UseEffectComponent extends React.Component {
  state = {
    timeOnProject: 0
  };

  componentDidMount() {
    FakeAPI.subscribeToApi(timeOnProject => {
      this.setState({ timeOnProject });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.project !== prevProps.project) {
      FakeAPI.unSubscribeFromApi();
      this.setState({ timeOnProject: 0 });
      FakeAPI.subscribeToApi(timeOnProject => {
        this.setState({ timeOnProject });
      });
    }
  }

  componentWillUnmount() {
    FakeAPI.unSubscribeFromApi();
  }

  render() {
    const { project } = this.props;
    return (
      <div>
        <h2>Project: {project}</h2>
        <h3>Time on Project: {this.state.timeOnProject}</h3>
      </div>
    );
  }
}

function UseEffectFunction(props) {
  const { project } = props;
  const [timeOnProject, setTimeOnProject] = React.useState(0);

  React.useEffect(
    //first argument is the effect that has to run first
    () => {
      FakeAPI.subscribeToApi(timeOnProject => {
        setTimeOnProject(timeOnProject);
      });
      //cleanup
      return () => {
        FakeAPI.unSubscribeFromApi();
        setTimeOnProject(0);
      };
    },
    [project]
  );

  return (
    <div>
      <h2>Project: {project}</h2>
      <h3>Time on Project: {timeOnProject}</h3>
      <br />
      <hr />
    </div>
  );
}
