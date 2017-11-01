var React = require("react")
var ReposData = require("./ReposData")
var Paginator = require("./Paginator")
var Filter = require("./Filter")
var toQueryString = require("../helpers/string").toQueryString
var apiUrl = 'https://api.github.com/search/repositories'
var perPage = 10

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      queries: {
        search: '',
        stars: '',
        topic: '',
        language: ''
      },
      page: 1,
      per_page: 10,
      repos: [],
      message: '',
      disableNext: false,
      loading: false
    }

    this.setPageQuery = this.setPageQuery.bind(this)
    this.fetchRepos = this.fetchRepos.bind(this)
    this.searchRepos = this.searchRepos.bind(this)
  }

  fetchRepos(page) {
    var query = toQueryString(this.state.queries)
    var clientId = process.env.GITHUB_CLIENT_ID
    var clientSecret = process.env.GITHUB_CLIENT_SECRET

    this.setState({ loading: true })
    fetch(`${apiUrl}${query}&page=${page}&per_page=${perPage}&client_id=${clientId}&client_secret=${clientSecret}`)
      .then(res => res.json())
      .then(repos => {
        if (repos.items) {
          this.setState({ loading: false, disableNext: false, page, repos: repos.items, message: '' })
        } 
        if (!repos.items || repos.items.length === 0) {
          this.setState({ loading: false, disableNext: true, repos: [], message: 'There are no results.' })
        }
      })
  }

  setPageQuery(page) {
    this.fetchRepos(page)
  }

  searchRepos(queries) {
    this.setState({ queries }, function() {
      this.fetchRepos(1)
    })
  }

  render() {
    var repos = this.state.repos || []
    var message = this.state.message
    var page = this.state.page
    var loading = this.state.loading
    var disableNext = this.state.disableNext

    var results = <div className='loader' />
    if (!loading) {
      results = (
        <div className='results'>
          <table className='results-table'>
            <thead>
              <tr>
                <td className='sn'>S/N</td>
                <td className='repo-user'>Github User</td>
                <td className='repo-link'>Github Repo</td>
                <td>No of stars</td>
              </tr>
            </thead>
            <ReposData repos={repos} page={page} perPage={perPage} />
          </table>
          <Paginator page={page} disableNext={disableNext} setPageQuery={this.setPageQuery} />
        </div>
      )
    }

    return (
      <div>
        <Filter repoEmpty={repos.length === 0} searchRepos={this.searchRepos} disableSearchButton={loading} />
        <div className='body'>
          { message && <p className='no-results'>{ message }</p> }
          { repos.length === 0 && !loading && <div className='no-results'>Please click on one or more of the search filters above to search for repositories.</div> }
          { repos.length === 0 && !loading && <div className='no-results mobile'>Please use a desktop browser to view this page.</div> }
          { repos.length === 0 && loading && <div className='loader' /> }
          { repos.length > 0 && results }
        </div>
      </div>
    )
  }
}

module.exports = App