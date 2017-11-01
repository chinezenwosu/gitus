var React = require("react")

class Paginator extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      search: false,
      language: false,
      stars: false,
      topic: false,
      starsDropdown: {
        show: false,
        key: 'Equal to',
        value: '='
      },
      queries: {
        search: '',
        stars: '',
        topic: '',
        language: ''
      },
      starsInput: ''
    }

    this.getFilters = this.getFilters.bind(this)
    this.setQuery = this.setQuery.bind(this)
    this.showDropdown = this.showDropdown.bind(this)
    this.hideDropdown = this.hideDropdown.bind(this)
    this.searchRepos = this.searchRepos.bind(this)
  }

  getFilters() {
    return [
      {text: 'Search word', state: 'search', input: {type: 'text'}},
      {text: 'Language', state: 'language', input: {type: 'text'}},
      {text: 'Topic', state: 'topic', input: {type: 'text'}},
      {
        text: 'No. of Stars',
        state: 'stars',
        dropdown: true,
        options: [
          {
            key: 'Equal to',
            value: '='
          },
          {
            key: 'Less than',
            value: '<'
          },
          {
            key: 'Greater than',
            value: '>'
          }
        ],
        input: {
          type: 'number'
        }
      }
    ]
  }

  toggleFilter(state) {
    this.setState(prevState => {
      return { [state]: !prevState[state] }
    }, () => {
      if (this.state[state]) {
        this[state].focus()
        this.showDropdown(`${state}Dropdown`)
      }
    })
  }

  showDropdown(state) {
    if (this.state[state] && !this.state[state].show) {
      this.setState(prevState => {
        return { [state]: Object.assign(prevState[state], { show: true }) }
      })
    }
  }

  hideDropdown(state) {
    if (this.state[state] && this.state[state].show) {
      this.setState(prevState => {
        return { [state]: Object.assign(prevState[state], { show: false }) }
      })
    }
  }

  setQuery(state, value) {
    value.show = this.state[state].show
    this.setState({ [state]: value })
  }

  searchRepos() {
    var queries = this.state.queries
    if (this.state.starsDropdown.value !== '=') {
      queries.stars = `${this.state.starsDropdown.value}${queries.stars}`
    }
    this.props.searchRepos(queries)
  }

  onChange(event, inputState) {
    this.setState({ queries: Object.assign(this.state.queries, {[inputState]: event.target.value}) })
  }

  render() {
    var filterDom = this.getFilters().map(filter => {
      var extraInfo
      var dropdownState = `${filter.state}Dropdown`
      var inputState = `${filter.state}`

      if (filter.dropdown) {
        extraInfo = (
          <div className='dropdown'>
            <span>{this.state[dropdownState].key}</span>
            { 
              filter.input &&
              <input
                value={this.state.queries[inputState]}
                onChange={(event) => this.onChange(event, inputState)}
                type={filter.input.type}
                onFocus={() => this.showDropdown(dropdownState)}
                ref={(input) => this[filter.state] = input}
              />
            }
            {
              this.state[dropdownState].show &&
              <div className='dropdown-options'>
                {
                  filter.options.filter(opt => opt.key !== this.state[dropdownState].key).map(option => {
                    return <div key={option.key} id={option.value} onMouseDown={() => this.setQuery(dropdownState, option)}>{option.key}</div>
                  })
                }
              </div>
            }
          </div>
        )
      } else {
        extraInfo = (
          <div>
            {
              filter.input &&
              <input
                value={this.state.queries[inputState]}
                onChange={(event) => this.onChange(event, inputState)}
                onBlur={() => !this.state.queries[inputState] && this.toggleFilter(filter.state)}
                type={filter.input.type}
                ref={(input) => this[filter.state] = input}
              />
            }
          </div>
        )
      }

      return (
        <div tabIndex={1} key={filter.state} onFocus={() => this.showDropdown(dropdownState)} className='filter-container' onBlur={() => this.hideDropdown(dropdownState)}>
          <div onClick={() => this.toggleFilter(filter.state)} className={this.state[filter.state] ? 'filter enabled' : 'filter'}>
            {filter.text}
          </div>
          {this.state[filter.state] && extraInfo}
        </div>
      )
    })

    var resultsEmpty = Object.keys(this.state.queries).every(key => !this.state.queries[key])

    return (
      <header>
        <p>Search by one or more of these categories</p>
        <div className='filters'>
          {filterDom}
          <button disabled={resultsEmpty || this.props.disableSearchButton} className='search-button' onClick={this.searchRepos}>Search</button>
        </div>
      </header>
    )
  }
}

module.exports = Paginator