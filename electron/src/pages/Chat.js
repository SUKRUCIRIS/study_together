import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Outlet, useNavigate } from "react-router-dom";

import ServerCont from '../components/server-cont'
import ChatMessage from '../components/Chat-message';
import './chat.css'

import UserProfile from '../SessionUserProfile'
import { type } from '@testing-library/user-event/dist/type'




const Chat = (props) => {

  const [chatMessage, setChatMessage] = useState('');
  const [chatList, setChatList] = useState([])
  const [channelName, setChannelName] = useState('');
  const [channelId, setChannelId] = useState(null);


  const handleChannelOne = async () => {
    setChannelName('Genel sohbet');
    try {
      const response = await fetch('http://localhost:80/addtextchannel', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({group_id: 1,
                              name: 'Genel sohbet'
                              }),
      });
      
      if(response.ok){
        const data = await response.json();
        console.log('Channel ID:', data.id);
        setChannelId(data.id);
      }
    }
      catch (error) {
        console.error('Error:', error.message);
        // Add logic for error handling
      }
      
      return(
        <div>
          <text>Channel change worked if you see this woo.</text>
        </div>
      )
  }

  const handleChannelTwo = async () => {
    setChannelName('Ders sohbet');
    try {
      const response = await fetch('http://localhost:80/addtextchannel', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({group_id: 1,
                              name: 'Ders sohbet'
                              }),
      });
      
      if(response.ok){
        const data = await response.json();
        console.log('Channel ID:', data.id)
        setChannelId(data.id);
      }
    }
      catch (error) {
        console.error('Error:', error.message);
        // Add logic for error handling
      }
      
      return(
        <div>
          <text>Channel change worked if you see this woo.</text>
        </div>
      )
  }

  const handleChannelThree = async () => {
    setChannelName('Ses kanalı');
    try {
      const response = await fetch('http://localhost:80/addtextchannel', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({group_id: 1,
                              name: 'Ses kanalı'
                              }),
      });
      
      if(response.ok){
        const data = await response.json();
        console.log('Channel ID:', data.id)
        setChannelId(data.id);
      }
    }
      catch (error) {
        console.error('Error:', error.message);
        // Add logic for error handling
      }
      
      return(
        <div>
          <text>Channel change worked if you see this woo.</text>
        </div>
      )
  }

  const handleChatMessage = async () => {
    try {
      const response = await fetch('http://localhost:80/addgroupmessage', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user_id: UserProfile.getId(),
                              tc_id: 1,
                              data: chatMessage,
                              file_id: null
                              }),
      });
      
      if(response.ok){
        const data = await response.json();
      }
    }
      catch (error) {
        console.error('Error:', error.message);
        // Add logic for error handling
      }

      window.location.reload();
  }


  const [connections, setConnections] = useState([]);
  const [servers, setServers] = useState([]);


  useEffect(() => {
    

    // Get Servers
    const fetchServers = async () => {
      console.log("Getting Servers ...");

      try {
        const response = await fetch('http://localhost:80/getgroups', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: UserProfile.getId() }),
        });

        if (response.ok) {
          const data = await response.json();
          if (!data.list) { console.log("null returned from API"); return;} ///
          const serverIds = data.list.map(serverId => ({ id: serverId[0] }));
          
          // Fetch detailed information for each server
          const serverPromises = serverIds.map(async (serverId) => {
            const serverResponse = await fetch('http://localhost:80/getgroupinfo', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(serverId),
            });
            if (serverResponse.ok) {
              const serverInfo = await serverResponse.json();
            
              if (serverInfo.file_id != null){
              // Fetch file data for the server
              const fileResponse = await fetch('http://localhost:80/getfile', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: serverInfo.file_id }), // Assuming serverInfo contains the file_id
              });

              if (fileResponse.ok) {
                const fileData = await fileResponse.json();
                console.log("uploaded base64",fileData);
                serverInfo.image_src = `${fileData.data}`; // Assuming the data is a base64 encoded image
                return serverInfo;
              } else {
                console.error('Error fetching file data:', fileResponse.statusText);
                return null;
              }}
            else{
              serverInfo.image_src = "/unknown-server.png";
              return serverInfo;
            }
            
            }
              
              else {
              console.error('Error fetching server info:', serverResponse.statusText);
              return null;
            }
          });

          // Wait for all server details to be fetched
          const serverDetails = await Promise.all(serverPromises);

          // Filter out any null values (errors)
          const validServers = serverDetails.filter(server => server !== null);

          setServers(validServers);
          console.log("valid Servers",validServers);
        } else {
          console.error('Error fetching servers:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchServers();


    const fetchChatList = async() => {
      try {
        const response = await fetch('http://localhost:80/gettextchannelmessages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({'id': 1})
        });

        const r = await response.json();

        setChatList(r.list);
        console.log(r, r.list);

      }
      catch (error) {
        console.error(error);
      }
    }

    fetchChatList();

    // Get Connections

    const fetchConnections = async () => {

      console.log("Getting Connections ...");

      try {
        const response = await fetch('http://localhost:80/getconnections', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: UserProfile.getId() }),
        });

        if (response.ok) {
          const data = await response.json();
          const userList = data.list;
          
            const userPromises = userList.map(async (userId) => {
              const userResponse = await fetch('http://localhost:80/getuser', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({"id": userId[0]}),
              });


              if (userResponse.ok) {
                const userInfo = await userResponse.json();
                return userInfo;

              }
                
              else {
                console.error('Error fetching server info:', userResponse.statusText);
                return null;
              }
            });
  
            // Wait for all server details to be fetched
            const userDetails = await Promise.all(userPromises);
  
            // Filter out any null values (errors)
            const validUsers = userDetails.filter(user => user !== null);

            setConnections(validUsers);
        } else {
          console.error('Error fetching connections:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchConnections();


  }, []);


  // HTML

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="home-h-content">
          <div className="home-app">
            <Link to="/home" className="home-navlink">
              <svg viewBox="0 0 1024 1024" className="home-app-logo">
                <path d="M512 128c0 0-263.936 227.84-411.435 351.232-8.661 7.851-15.232 19.285-15.232 32.768 0 23.595 19.072 42.667 42.667 42.667h85.333v298.667c0 23.595 19.072 42.667 42.667 42.667h128c23.595 0 42.667-19.115 42.667-42.667v-170.667h170.667v170.667c0 23.552 19.072 42.667 42.667 42.667h128c23.595 0 42.667-19.072 42.667-42.667v-298.667h85.333c23.595 0 42.667-19.072 42.667-42.667 0-13.483-6.571-24.917-16.341-32.768-146.475-123.392-410.325-351.232-410.325-351.232z"></path>
              </svg>
            </Link>
            <h1 className="home-app-name">
              <span className="home-text">Study</span>
              <span className="home-text01">Together</span>
            </h1>
          </div>
          <div className="home-servers">
            {/* Map over the servers array and render ServerCont components */}
            {servers.map((server, index) => (
              <ServerCont key={index} image_src={server.image_src} server_name={server.name} />
            ))}
            {/*<ServerCont
            key = "0"
            image_src= "/Nash-History-Journal.png"
             />
             <ServerCont
            key = "1"
            image_src= "/elect.jpg"
            /> */}
            <svg viewBox="0 0 1024 1024" className="home-icon1">
              <path d="M768 426.667h-170.667v-170.667c0-47.104-38.229-85.333-85.333-85.333s-85.333 38.229-85.333 85.333l3.029 170.667h-173.696c-47.104 0-85.333 38.229-85.333 85.333s38.229 85.333 85.333 85.333l173.696-3.029-3.029 173.696c0 47.104 38.229 85.333 85.333 85.333s85.333-38.229 85.333-85.333v-173.696l170.667 3.029c47.104 0 85.333-38.229 85.333-85.333s-38.229-85.333-85.333-85.333z"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="home-body-content">
      <div className="home-chat">
      <div className="top-part">
        <text className="server-name">Sunucu adı: {UserProfile.getGroupName()}</text>
        <text className="channel-name">Kanal adı: {channelName}</text>
        <div className="chat-horizontal-border"></div>
      </div>
      <div className='chat-flexbox'>
      <div className="chats-2">
      <ChatMessage key={100} NameSurname={"Emircan Uzun"} MessageContent={"Selam"}/>
      <ChatMessage key={99} NameSurname={"Barış Engin"} MessageContent={"Merhaba"}/>
        {chatList.map((message, index) => (
              <ChatMessage key={index} NameSurname={UserProfile.getName()} MessageContent={message[1]}/>
            ))}
      </div>
      </div>
        <label className="label-chat">
        <input
              className='input-chat'
              type="text"
              placeholder="Type here to chat"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
            />
        <button className='button-send' onClick={handleChatMessage}>Send</button>
        </label>
      </div>
        <div className="home-connections">
          <div className="home-connection-header">
            <h2>
              <span>Channels</span>
              <br></br>
            </h2>
          </div>
          <div className="home-connection-list">
            <div className='channels' onClick={handleChannelOne}>
            <svg viewBox="0 0 1024 1024" className='icon-channels'>
              <path d="M64 192h896v192h-896zM64 448h896v192h-896zM64 704h896v192h-896z"></path>
            </svg>
            <span className='connection-connect-name'>Genel sohbet</span>
            </div>
            <div className='channels' onClick={handleChannelTwo}>
            <svg viewBox="0 0 1024 1024" className='icon-channels'>
              <path d="M64 192h896v192h-896zM64 448h896v192h-896zM64 704h896v192h-896z"></path>
            </svg>
            <span className='connection-connect-name'>Ders sohbet</span>
            </div>
            <div className='channels' onClick={handleChannelThree}>
            <svg viewBox="0 0 1024 1024" className='icon-channels'>
              <path d="M64 192h896v192h-896zM64 448h896v192h-896zM64 704h896v192h-896z"></path>
            </svg>
            <span className='connection-connect-name'>Ses kanalı</span>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default Chat
