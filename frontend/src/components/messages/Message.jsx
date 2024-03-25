import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useConversation from '../../store/useConversations';
import { extractTime } from '../../utils/extractTime';

function Message({message}) {
  const {authUser}=useAuthContext();
  const {selectedConversation}= useConversation();
  const fromMe=message.senderId===authUser._id;
  const chatClassName = fromMe? 'chat chat-end':'chat chat-start';
  const time = extractTime(message.createdAt)
  const profilePic = fromMe? authUser.profilePic : selectedConversation.profilePic;
  console.log(profilePic);
  console.log(authUser);
  const bgColor = fromMe? 'bg-slate-900':"";
  return (
    <div className={chatClassName}>
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img alt="User Avatar" src={profilePic} />
    </div>
  </div>
  <div className={`chat-bubble text-whit ${bgColor}`}>{message.message}</div>
  <div className="chat-footer opacity-50">{time}</div>
</div>
  )
}

export default Message
