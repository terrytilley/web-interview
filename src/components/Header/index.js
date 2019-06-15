import React from 'react'
import './index.scss'

import logo from '../../images/logo.png'

function Header() {
  return (
    <div className="app-header">
      <img src={logo} className="app-logo" alt="Babylon Health" />
    </div>
  )
}

export default Header
