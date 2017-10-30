var React = require("react")

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  getReposBody(repos) {
    var repoList = repos.map(repo => {
      return (
        <tr key={repo.owner.login}>
          <td>{repo.owner.login}</td>
          <td><a href={repo.html_url} target='_blank'>{repo.html_url}</a></td>
          <td>{repo.stargazers_count}</td>
        </tr>
      )
    })

    return repoList
  }

  render() {
    var repos = this.props.repos

    return (
      <tbody>
        {this.getReposBody(repos)}
      </tbody>
    )
  }
}

module.exports = App