import React from 'react';

function searchGithub(query) {
  return fetch(
    `https://api.github.com/search/repositories?q=${query}:javascript&sort=stars&order=desc`
  )
    .then(resp => resp.json())
    .then(json => json.items);
}

export default class SearchForRepos extends React.Component {
  state = {
    query: ''
  };

  inputRef = React.createRef();

  search = e => {
    e.preventDefault();
    this.setState({ query: this.inputRef.current.value });
  };

  render() {
    const { query } = this.state;
    return (
      <div>
        <form onSubmit={this.search}>
          <input
            placeholder="Search Github for repos"
            type="text"
            ref={this.inputRef}
          />
          <button type="submit" onClick={this.search}>
            Submit
          </button>
          <h2>Search Github</h2>
          {/* {query && <GithubReposComponent search={query} />} */}
          {query && <GithubReposFunction search={query} />}
        </form>
        <br />
        <hr />
      </div>
    );
  }
}

class GithubReposComponent extends React.Component {
  state = {
    data: []
  };

  componentDidMount() {
    searchGithub(this.props.search).then(data => this.setState({ data }));
  }

  componentDidUpdate(prevProps) {
    if (this.props.search !== prevProps.search) {
      searchGithub(this.props.search).then(data => this.setState({ data }));
    }
  }

  render() {
    const { data } = this.state;

    return (
      <ul>
        {data.map(item => (
          <li key={item.id} style={{ listStyle: 'none' }}>
            <a href={item.html_url}>{item.name}</a>
          </li>
        ))}
      </ul>
    );
  }
}

function useCutomEffect(search) {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    searchGithub(search).then(data => setData(data));
  }, [search]);

  return data;
}

function GithubReposFunction({ search }) {
  const data = useCutomEffect(search);

  return (
    <ul>
      {data.map(item => (
        <li key={item.id} style={{ listStyle: 'none' }}>
          <a href={item.html_url}>{item.name}</a>
        </li>
      ))}
    </ul>
  );
}
