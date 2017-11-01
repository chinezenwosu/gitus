var React = require("react")

class Paginator extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 1
    }

    this.goToPage = this.goToPage.bind(this)
  }

  goToPage(count) {
    var newCount = this.props.page + count
    this.props.setPageQuery(newCount)
  }

  render() {
    var repos = this.state.repos

    return (
      <div className='paginator'>
        <div className='page'>Page {this.props.page}</div>
        <div>
          <button className='previous' onClick={() => this.goToPage(-1)} disabled={this.props.page < 2}>Previous</button>
          <button className='next' onClick={() => this.goToPage(1)} disabled={this.props.disableNext}>Next</button>
        </div>
      </div>
    )
  }
}

module.exports = Paginator