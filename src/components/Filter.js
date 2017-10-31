var React = require("react")

class Paginator extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      search: false,
      language: false,
      stars: false,
      forked: false
    }

    this.getFilters = this.getFilters.bind(this)
  }

  getFilters() {
    return [
      {text: 'Search word', state: 'search'},
      {text: 'Language', state: 'language'},
      {text: 'No. of Stars', state: 'stars'},
      {text: '+ Forked Repos', state: 'forked'}
    ]
  }

  toggleFilter(state) {
    this.setState(prevState => {
      return { [state]: !prevState[state] }
    })
  }

  render() {
    var filterDom = this.getFilters().map(filter => {
      return (
        <div onClick={() => this.toggleFilter(filter.state)} className={this.state[filter.state] ? 'enabled' : ''}>
          {filter.text}
        </div>
      )
    })

    return (
      <header>
        {filterDom}
      </header>
    )
  }
}

module.exports = Paginator