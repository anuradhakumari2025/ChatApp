import React from 'react'
import './Chat.css'
import LeftSidebar from '../../components/leftSidebar/LeftSidebar'
import ChatBox from '../../components/chatBox/ChatBox'
import RightSidebar from '../../components/rightSidebar/RightSidebar'

function Chat() {
  return (
    <div className='chat'>
      <div className='chatContainer'>
        <LeftSidebar/>
        <ChatBox/>
        <RightSidebar/>
      </div>
    </div>
  )
}

export default Chat