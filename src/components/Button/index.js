import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './index.scss'

function Button(props) {
  const buttonClasses = classNames('button', {
    disabled: props.disabled,
    round: props.round === 'true',
    active: props.active === 'true',
    'full-width': props.fullwidth === 'true',
  })

  return (
    <button className={buttonClasses} {...props}>
      {props.children}
    </button>
  )
}

Button.propTypes = {
  disabled: PropTypes.bool,
  active: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default Button
