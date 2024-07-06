import { useState } from "react";
import './messageInput.css'

const MessageInput = ({sendMessage}) => {
    
    const [message, setMessage] = useState('');

    const handleSendMessage =()=>{
        if(message.trim()){
            setMessage(message)
            setMessage('');
        }
    };

    return (
        <div className="message-input">
            <input type="text" value={message} onChange={(e)=>{setMessage(e.target.value)}}
            placeholder="Type your message..."/>
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default MessageInput;