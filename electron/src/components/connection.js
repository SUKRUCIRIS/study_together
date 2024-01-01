import React from 'react'

import PropTypes from 'prop-types'

import './connection.css'

const Connection = (props) => {
  return (
    <div className={`connection-connection ${props.rootClassName} `}>
      <svg viewBox="0 0 1024 1024" className="connection-connect-icon">
        <path
          d="M320 192c0-106.039 85.961-192 192-192s192 85.961 192 192c0 106.039-85.961 192-192 192s-192-85.961-192-192zM768.078 448h-35.424l-199.104 404.244 74.45-372.244-96-96-96 96 74.45 372.244-199.102-404.244h-35.424c-127.924 0-127.924 85.986-127.924 192v320h768v-320c0-106.014 0-192-127.922-192z"
          className=""
        ></path>
      </svg>
      <span className="connection-connect-name">{props.ConnectName}</span>
    </div>
  )
}

Connection.defaultProps = {
  rootClassName: '',
  ConnectName: 'Text',
}

Connection.propTypes = {
  rootClassName: PropTypes.string,
  ConnectName: PropTypes.string,
}

export default Connection
