import React from 'react'
import './index.scss'

import logo from '../../images/logo.png'

function Header() {
  return (
    <div className="app-header">
      <button className="menu-toggle">
        <span />
        <span />
        <span />
      </button>
      <a href="/">
        <img src={logo} className="app-logo" alt="Babylon Health" />
      </a>
      <div className="user-icon">NU</div>
    </div>
  )
}

export default Header
