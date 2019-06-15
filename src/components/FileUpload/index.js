import React from 'react'

import './index.scss'

function FileUpload(props) {
  return <input type="file" className="file-input" {...props} />
}

export default FileUpload
