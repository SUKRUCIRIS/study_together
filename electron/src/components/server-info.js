import React from 'react'

import PropTypes from 'prop-types'

import './server-info.css'

import UserProfile from '../SessionUserProfile.js'

const ServerInfo = (props) => {

  const handleServerInfoClick = async () => {
    // Replace with your actual user_id and server.id values
    const user_id = UserProfile.getId();
    const group_id = props.ServerID; // Assuming that id is the server.id

    try {
      const response = await fetch('http://localhost:80/addusertogroup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "user_id": user_id,
          "group_id": group_id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User added to group. ID:', data.id);
        window.location.reload();
      } else {
        console.error('Failed to add user to group');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div
    className={`server-info-server-info ${props.rootClassName} `}
    onClick={handleServerInfoClick}
    >
      <svg viewBox="0 0 1024 1024" className="server-info-icon">
        <path
          d="M170.667 42.667c-35.328 0-67.413 14.379-90.496 37.504s-37.504 55.168-37.504 90.496v170.667c0 35.328 14.379 67.413 37.504 90.496s55.168 37.504 90.496 37.504h682.667c35.328 0 67.413-14.379 90.496-37.504s37.504-55.168 37.504-90.496v-170.667c0-35.328-14.379-67.413-37.504-90.496s-55.168-37.504-90.496-37.504zM170.667 128h682.667c11.776 0 22.4 4.736 30.165 12.501s12.501 18.389 12.501 30.165v170.667c0 11.776-4.736 22.4-12.501 30.165s-18.389 12.501-30.165 12.501h-682.667c-11.776 0-22.4-4.736-30.165-12.501s-12.501-18.389-12.501-30.165v-170.667c0-11.776 4.736-22.4 12.501-30.165s18.389-12.501 30.165-12.501zM170.667 554.667c-35.328 0-67.413 14.379-90.496 37.504s-37.504 55.168-37.504 90.496v170.667c0 35.328 14.379 67.413 37.504 90.496s55.168 37.504 90.496 37.504h682.667c35.328 0 67.413-14.379 90.496-37.504s37.504-55.168 37.504-90.496v-170.667c0-35.328-14.379-67.413-37.504-90.496s-55.168-37.504-90.496-37.504zM170.667 640h682.667c11.776 0 22.4 4.736 30.165 12.501s12.501 18.389 12.501 30.165v170.667c0 11.776-4.736 22.4-12.501 30.165s-18.389 12.501-30.165 12.501h-682.667c-11.776 0-22.4-4.736-30.165-12.501s-12.501-18.389-12.501-30.165v-170.667c0-11.776 4.736-22.4 12.501-30.165s18.389-12.501 30.165-12.501zM298.667 256c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667 19.115 42.667 42.667 42.667 42.667-19.115 42.667-42.667zM298.667 768c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667 19.115 42.667 42.667 42.667 42.667-19.115 42.667-42.667z"
          className=""
        ></path>
      </svg>
      <span className="server-info-server-name">{props.ServerName}</span>
      <div className="server-info-container">
        <svg viewBox="0 0 1024 1024" className="server-info-icon2">
          <path d="M342 214l468 298-468 298v-596z" className=""></path>
        </svg>
        <span className="server-info-tag">{props.Tag}</span>
      </div>
    </div>
  )
}

ServerInfo.defaultProps = {
  text: 'Tags:',
  ServerName: 'Unknown Server',
  rootClassName: '',
  Tag: 'None',
}

ServerInfo.propTypes = {
  text: PropTypes.string,
  ServerID: PropTypes.number,
  ServerName: PropTypes.string,
  rootClassName: PropTypes.string,
  Tag: PropTypes.string,
}

export default ServerInfo
