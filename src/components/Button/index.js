import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './index.scss'

function Button(props) {
  const buttonClasses = classNames('button', {
    round: props.round === 'true',
    active: props.active === 'true',
  })

  return (
    <button className={buttonClasses} {...props}>
      {props.children}
    </button>
  )
}

Button.propTypes = {
  active: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default Button
