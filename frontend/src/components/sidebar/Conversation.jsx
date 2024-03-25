import React from 'react'
import useConversation from '../../store/useConversations'
import { useSocketContext } from '../../context/SocketContext';

function Conversation({ conversation, lastIdx }) {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = (selectedConversation?._id === conversation._id);
  const {onlineUsers}=useSocketContext();
  console.log("oline");
  console.log(onlineUsers);
  console.log(conversation._id);
  const isOnline=onlineUsers.includes(conversation._id)?'avatar online':'';
  return (<>
    <div className={`flex gap-2 items-center hover:bg-gray-400 rounded p-2 py-1 cursor-pointer ${isSelected? "bg-gray-400":null}`} onClick={()=>setSelectedConversation(conversation)}>
      <div className={`avatar ${isOnline}`}>
        <div className="w-12 rounded-full">
          <img src={conversation.profilePic} alt='user-avatar' />
        </div>
      </div>
      <div className='flex flex-col flex-1'>
        <div className='flex gap-3'>
          <p className='font-bold text-gray-200'>{conversation.fullName}</p>
        </div>
      </div>
    </div>
    {!lastIdx ? <div className='divider my-0 py-0 h-1' /> : null}
  </>)
}

export default Conversation
