import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { API_ENDPOINT } from '../../config'
import './index.scss'

class UserSelect extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: null,
    }
  }

  componentDidMount() {
    fetch(`${API_ENDPOINT}/users/${this.props.userId}`)
      .then(res => res.json())
      .then(json => {
        this.setState({ user: json })
      })
      .catch(() => {
        this.setState({ user: null })
      })
  }

  render() {
    const { user } = this.state
    if (!user) return null

    return (
      <div className="user-select">
        <img className="avatar" src={user.avatar} alt="Avatar" />
        <span className="name">
          {user.firstName} {user.lastName}
        </span>
        <a className="link" href="https://www.babylonhealth.com/">
          Change
        </a>
      </div>
    )
  }
}

UserSelect.propTypes = {
  userId: PropTypes.number.isRequired,
}

export default UserSelect
