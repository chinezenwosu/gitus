var React = require("react")
var ReposData = require("./ReposData")
var Paginator = require("./Paginator")
var toQueryString = require("../helpers/string").toQueryString
var apiUrl = 'https://api.github.com/search/repositories'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      queries: {
        stars: '<10',
        topic: 'ruby',
        fork: true,
      },
      page: 1,
      per_page: 10,
      repos: []
    }

    this.setPageQuery = this.setPageQuery.bind(this)
    this.fetchRepos = this.fetchRepos.bind(this)
  }

  componentWillMount() {
    this.fetchRepos()
  }

  fetchRepos() {
    var query = toQueryString(this.state.queries)
    var clientId = process.env.GITHUB_CLIENT_ID
    var clientSecret = process.env.GITHUB_CLIENT_SECRET

    console.log(`${apiUrl}${query}&page=${this.state.page}&per_page=3&client_id=${clientId}&client_secret=${clientSecret}`)
    fetch(`${apiUrl}${query}&page=${this.state.page}&per_page=3`)
      .then(res => res.json())
      .then(repos => {console.log(repos); this.setState({ repos: repos.items })})
  }

  setPageQuery(page) {
    this.setState({ page }, () => {
      this.fetchRepos()
    })
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
        <Paginator page={this.state.page} setPageQuery={this.setPageQuery} />
      </div>
    )
  }
}

module.exports = App