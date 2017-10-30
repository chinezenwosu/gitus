var React = require("react")
var ReposData = require("./ReposData")

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = { repos: [] }
  }

  componentWillMount() {
    fetch('https://api.github.com/search/repositories?q=stars')
      .then(res => res.json())
      .then(repos => this.setState({ repos: repos.items }))
  }

  render() {
    var repos = this.state.repos

    return (
      <div>
        <table>
          <thead>
            <tr>
              <td>Github User</td>
              <td>Github Repo</td>
              <td>Number of stars</td>
            </tr>
          </thead>
          <ReposData repos={repos} />
        </table>
      </div>
    )
  }
}

module.exports = App