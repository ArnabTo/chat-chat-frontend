import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';


const socket = io.connect('http://localhost:4000');

const Chat = () => {

    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [user, setUser] = useState();

    useEffect(() => {

        const storageData = localStorage.getItem('userdata');

        if (storageData) {
            const parsedData = JSON.parse(storageData);
            setUser(parsedData)
        }

        socket.on('chat', (payload) => {
            console.log(payload)
            setChat([...chat, payload])
        })

    }, [chat]);

    // console.log(user)

    const handleSendMessage = (e) => {
        e.preventDefault()
        console.log(message)

        socket.emit('chat', { message, image: user.image });
        setMessage('');
    }


    return (
        <div className='flex h-screen' id='chat'>
            <div className='bg-black/50 w-1/3 p-4 border-r border-gray-200'>
                {/* Users */}
                <div className='flex items-center gap-2 my-2 bg-green-300 p-3 rounded-md'>
                    <img
                        className='w-10 h-10 rounded-full'
                        src='https://static.vecteezy.com/system/resources/previews/004/819/327/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg'
                        alt='user'
                    />
                    <p className='text-xl font-medium'>Arnab</p>
                </div>
            </div>
            <div className='w-full relative flex flex-col justify-between'>
                <div className='overflow-y-auto p-4 space-y-4' style={{ height: '80vh' }}>
                    {chat.map((payload, index) => (
                        <div className='flex items-center gap-3' key={index}>
                            <img className='w-10 h-10 rounded-full' src={payload.image} alt='profile' />
                            <p className='bg-white rounded-md px-4 py-2 shadow-sm text-xl font-base'>{payload.message}</p>
                        </div>
                    ))}
                </div>
                <div className='p-4'>
                    <form className='flex items-center space-x-2' onSubmit={handleSendMessage}>
                        <input
                            className='w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                            type='text'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder='Type your message...'
                        />
                        <button
                            type='submit'
                            className='bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600'
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Chat;