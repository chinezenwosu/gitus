var React = require("react")

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  getReposBody(repos) {
    var repoList = repos.map((repo, index) => {
      return (
        <tr key={index}>
          <td className='sn'>{((this.props.page - 1) * this.props.perPage) + index + 1}</td>
          <td className='repo-user'><a href={repo.owner.html_url} target='_blank'>{repo.owner.login}</a></td>
          <td className='repo-link'><a href={repo.html_url} target='_blank'>{repo.html_url}</a></td>
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