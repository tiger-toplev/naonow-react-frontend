import React, { useState } from "react";
import Layout from "../components/Layout";
import "../assets/styles/messages.scss";
import UserImg1 from "../assets/images/students/student1.jpg";
import UserImg2 from "../assets/images/students/student2.jpg";
import UserImg3 from "../assets/images/students/student3.jpg";

const messageReceivers = [
  {id: 1, name: 'Student #1', image: UserImg1},
  {id: 2, name: 'Student #2', image: UserImg2},
  {id: 3, name: 'Student #3', image: UserImg3},
  {id: 4, name: 'Student #4', image: UserImg2},
  {id: 5, name: 'Student #5', image: UserImg1},
]

const messages = [
  {
    userType: 'client',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel semor rhoncus, pulvinar risus eu, porta justo. Vestibulum a lectus id velit vehicula pretium vel acum mapul vinar risus eu, porta just ossa.',
    image: UserImg2
  },
  {
    userType: 'user',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel semor rhoncus, pulvinar risus eu, porta justo. Vestibulum a lectus id velit vehicula pretium vel acum mapul vinar risus eu, porta just ossa. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel semor soemuf pulvinar risus eu, porta justo. Vestibulum a lectus id velit vehicula.',
    image: UserImg1
  },
  {
    userType: 'client',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel semor rhoncus, pulvinar risus eu, porta justo. Vestibulum a lectus id velit vehicula pretium vel acum mapul vinar.',
    image: UserImg2
  },
  {
    userType: 'user',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel semor rhoncus, pulvinar risus eu, porta justo. Vestibulum a lectus id velit.',
    image: UserImg1
  },
  {
    userType: 'client',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel semor rhoncus, pulvinar risus eu, porta justo. Vestibulum a lectus id velit vehicula pretium.',
    image: UserImg2
  },
]

const Messages = () => {  
  const [currentReceiver, setCurrentReceiver] = useState(messageReceivers[0])
  const selectReceiver = (id) => {
    setCurrentReceiver(messageReceivers.find(receiver => receiver.id === id));    
  }

  return (
    <Layout>
      <div className="view-messages">      
        <div className="header-title desktop-version">
          <h4 className="main-title">View Messages</h4>
          <p>Talk to your tutors directly!</p>
        </div>
        <div className="header-title mobile-version">
          <h4 className="main-title">View Messages</h4>
          <p>Talk to your tutors directly!</p>
        </div>
        <div className="divider"/>
        <div className="messages-window desktop-version">
          <div className="message-receivers">
            {
              messageReceivers.map(receiver => (
                <div className={`message-receiver ${receiver.id === currentReceiver.id ? "active" : ""}`} onClick={() => selectReceiver(receiver.id)} key={receiver.id}>
                  <div className="message-inner">
                    <img src={receiver.image} alt=""/>
                    <p>{receiver.name}</p>
                  </div>                  
                </div>
              ))
            }
          </div>
          <div className="message-content">
            <div className="message-content-header">
              <p>Between you and {currentReceiver.name}</p>
            </div>
            <div className="messages desktop-version">
              {
                messages.map((message, index) => (
                  <div className={` message-item ${message.userType === "client" ? "client-message" : "sender-message"}`} key={index}>
                    <div className="user-image">
                      <img src={message.image} alt=""/>
                    </div>
                    <div className="message-text">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel semor rhoncus, pulvinar risus eu, porta justo. Vestibulum a lectus id velit vehicula pretium vel acum mapul vinar risus eu, porta just ossa.</p>
                    </div>
                  </div>
                ))
              }              
            </div>
            <div className="message-input">
              <div className="user-image">
                <img src={UserImg1} alt=""/>
              </div>
              <input type="text" placeholder="Type your message here..."/>
              <button className="send-message">Send</button>
            </div>                       
          </div>
        </div>
        <div className="messages-window mobile-version">
          <div className="message-receivers">
            {
              messageReceivers.map(receiver => (
                <div className={`message-receiver ${receiver.id === currentReceiver.id ? "active" : ""}`} onClick={() => selectReceiver(receiver.id)} key={receiver.id}>
                  <div className="message-inner">
                    <img src={receiver.image} alt=""/>
                    <p>{receiver.name}</p>
                  </div>                  
                </div>
              ))
            }
          </div>
          <div className="message-content">
            <div className="message-content-header mobile-version">
              <p>Between you and {currentReceiver.name}</p>
            </div>
            <div className="messages mobile-version">
              {
                messages.map((message, index) => (
                  <div className={` message-item ${message.userType === "client" ? "client-message" : "sender-message"}`} key={index}>
                    <div className="user-image">
                      <img src={message.image} alt=""/>
                    </div>
                    <div className="message-text">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel semor rhoncus, pulvinar risus eu, porta justo. Vestibulum a lectus id velit vehicula pretium vel acum mapul vinar risus eu, porta just ossa.</p>
                    </div>
                  </div>
                ))
              }              
            </div>
            <div className="submit-action">
              <div className="message-input">
                <div className="user-image">
                  <img src={UserImg1} alt=""/>
                </div>
                <input type="text" placeholder="Type your message here..."/>
                <button className="send-message">Send</button>
              </div>
            </div>            
          </div>
        </div>
      </div>
    </Layout>    
  )
}

export default Messages;
