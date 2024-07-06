import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

const Chat = () => {

    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [user, setUser] = useState();
 const navigator = useNavigate();
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

useEffect(()=>{
    if(!user){
      navigator('/')
    }
})

    return (
        <div>
            <div className='flex justify-between'>
                <div className='bg-white w-[30%] h-screen'>
                    {/* users */}
                    <div className='flex justify-start items-center gap-2 my-2 bg-green-300 p-3'>
                        <img className='w-10 rounded-full' src='https://static.vecteezy.com/system/resources/previews/004/819/327/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg' alt='user' />
                        <p className='text-2xl font-medium'>Arnab</p>
                    </div>
                </div>
                <div className='w-full relative'>
                    <div className='flex flex-col'>
                        <div className=''>
                            {
                                chat.map((payload, index) => {
                                    return (
                                        <div className='flex items-center gap-3' key={index}>
                                            <img className='w-10 rounded-full' src={payload.image} />
                                            <p className='bg-white rounded-md px-5 py-' key={index}>{payload.message}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div>
                            <form className='flex items-center relative top-48 mx-4 rounded-md' onSubmit={handleSendMessage}>
                                <input className='w-full py-2 px-2'
                                    type='text'
                                    value={message}
                                    onChange={(e) => { setMessage(e.target.value) }}
                                    placeholder='Type your message...' />
                                <button type='submit' className='bg-black text-white px-6 py-2'>Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;