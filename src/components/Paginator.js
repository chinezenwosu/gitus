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
      <div>
        <table>
          <thead>
            <tr>
              <td>Page {this.props.page}</td>
              <td onClick={() => this.goToPage(-1)}><button disabled={this.props.page < 2}>Previous</button></td>
              <td onClick={() => this.goToPage(1)}><button>Next</button></td>
            </tr>
          </thead>
        </table>
      </div>
    )
  }
}

module.exports = Paginator