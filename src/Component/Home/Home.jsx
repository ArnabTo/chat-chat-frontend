import { useEffect, useState } from "react";
import { checkUser } from "../util/checkUser";


const Home = () => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const data = checkUser();
        if(data){
            setUser(data)
        }

        setLoading(false);
    }, []);

    return (
        <div className="flex justify-center items-center h-[90vh]">
            <div className="bg-white p-10 rounded-lg">
                <div>
                    <p className="text-green-500 text-7xl font-black">Chat-Chat</p>
                    <p className="mt-3 text-xl w-4/5">Chat-Chat is a basic public chatting web app, where strangers can join in a group gossip!</p>
                </div>
                <h1 className="text-xl text-center">Want to start chat?</h1>
                <div className="flex justify-between items-center mt-5">
                    {
                        user ?
                            <a href="/chat"> <button className="bg-black text-green-600 px-10 py-3 rounded-lg text-xl font-semibold hover:scale-110">Start chat...</button></a>
                            : <a href="/login"> <button className="bg-black text-green-600 px-10 py-3 rounded-lg text-xl font-semibold hover:scale-110">Login</button></a>
                    }
                    <a href="/signup"> <button className="bg-black text-green-600 px-10 py-3 rounded-lg text-xl font-semibold hover:scale-110">Sign Up</button></a>
                </div>
            </div>
        </div>
    );
};

export default Home;