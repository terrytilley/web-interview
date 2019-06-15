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
      <img src={logo} className="app-logo" alt="Babylon Health" />
      <div className="user-icon">NU</div>
    </div>
  )
}

export default Header
