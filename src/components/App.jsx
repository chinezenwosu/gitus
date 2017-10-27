var React = require("react")
var UsersData = require("./UsersData")

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = { users: [] }
  }

  componentWillMount() {
    fetch('https://api.github.com/users')
      .then(res => res.json())
      .then(users => this.setState({ users }))
  }

  render() {
    var users = this.state.users

    
    return (
      <div>
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Number of stars</td>
            </tr>
          </thead>
          <UsersData users={users} />
        </table>
      </div>
    )
  }
}

module.exports = App