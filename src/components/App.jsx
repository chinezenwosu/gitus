var React = require("react")
var ReposData = require("./ReposData")
var Paginator = require("./Paginator")
var Filter = require("./Filter")
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
        language: 'ruby'
      },
      searchWord: '',
      page: 1,
      per_page: 10,
      repos: [],
      message: '',
      disableNext: false
    }

    this.setPageQuery = this.setPageQuery.bind(this)
    this.fetchRepos = this.fetchRepos.bind(this)
  }

  componentWillMount() {
    this.fetchRepos(this.state.page)
  }

  fetchRepos(page) {
    var query = toQueryString(this.state.searchWord, this.state.queries)
    var clientId = process.env.GITHUB_CLIENT_ID
    var clientSecret = process.env.GITHUB_CLIENT_SECRET

    console.log(`${apiUrl}${query}&page=${page}&per_page=3&client_id=${clientId}&client_secret=${clientSecret}`)
    fetch(`${apiUrl}${query}&page=${page}&per_page=10&client_id=${clientId}&client_secret=${clientSecret}`)
      .then(res => res.json())
      .then(repos => {
        if (repos.items) {
          console.log('users', repos.items)
          this.setState({ disableNext: false, page, repos: repos.items, message: '' })
        } else {
          this.setState({ disableNext: true, message: 'There are no more results' })
        }
      })
  }

  setPageQuery(page) {
    this.fetchRepos(page)
  }

  render() {
    var repos = this.state.repos || []
    var message = this.state.message
    var page = this.state.page
    var disableNext = this.state.disableNext

    return (
      <div>
        { message && <p>{ message }</p> }
        <Filter />
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
        <Paginator page={page} disableNext={disableNext} setPageQuery={this.setPageQuery} />
      </div>
    )
  }
}

module.exports = App