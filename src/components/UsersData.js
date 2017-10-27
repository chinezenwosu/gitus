var React = require("react")

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  getUsersBody(users) {
    var userList = users.map(user => {
      return (
        <tr key={user.login}>
          <td>{user.login}</td>
          <td>Dummy</td>
        </tr>
      )
    })

    return userList
  }

  render() {
    var users = this.props.users

    return (
      <tbody>
        {this.getUsersBody(users)}
      </tbody>
    )
  }
}

module.exports = App