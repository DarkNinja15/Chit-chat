import React from 'react'
import useConversation from '../../store/useConversations'

function Conversation({ conversation, lastIdx }) {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = (selectedConversation?._id === conversation._id);
  return (<>
    <div className={`flex gap-2 items-center hover:bg-gray-400 rounded p-2 py-1 cursor-pointer ${isSelected? "bg-gray-400":null}`} onClick={()=>setSelectedConversation(conversation)}>
      <div className="avatar online">
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
