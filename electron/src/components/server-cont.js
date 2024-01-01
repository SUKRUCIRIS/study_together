import React from 'react'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

import './server-cont.css'

import UserProfile from '../SessionUserProfile.js'


const ServerCont = (props) => {

  const handleServerClick = () => {
    // Your custom onClick logic here
    UserProfile.setGroupName(props.server_name);
  };


  return (
    <div className="server-cont-server-cont" onClick={handleServerClick}>
      <Link to="/chat" className="server-cont-navlink">
        <img src={props.image_src} className="server-cont-image" />
      </Link>
    </div>
  )
}

ServerCont.defaultProps = {
  image_src: 'https://play.teleporthq.io/static/svg/default-img.svg',
  server_name: "Unknown Group"
}

ServerCont.propTypes = {
  image_src: PropTypes.string,
  server_name: PropTypes.string
}

export default ServerCont
