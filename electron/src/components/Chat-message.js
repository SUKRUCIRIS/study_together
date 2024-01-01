import React from 'react'

import PropTypes from 'prop-types'

import './chat-message.css'

const ChatMessage = (props) => {
  return (
    <div className="chat-content">
        <img
        alt="image"
        src="/STUser.png"
        className="chat-image"
        />
        <text className="name-surname">{props.NameSurname}</text>
        <div className="chat-text">
        <text>{props.MessageContent}</text>
        </div>
    </div>
  )
}

ChatMessage.defaultProps = {
  MessageContent: 'Text',
  NameSurname: 'Username'
}

ChatMessage.propTypes = {
  MessageContent: PropTypes.string,
  NameSurname: PropTypes.string,
}

export default ChatMessage
