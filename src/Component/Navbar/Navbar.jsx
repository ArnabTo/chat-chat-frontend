import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { checkUser } from "../util/checkUser";

const Navbar = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigator = useNavigate();

    useEffect(() => {

        const data = checkUser();
        if(data){
            setUserData(data)
        }

        setLoading(false);
    }, []);

    console.log(userData)

    const handleSignout = () => {
        localStorage.removeItem('userdata');
        setUserData(null)
        navigator('/login')
    }


    return (
        <div className="bg-white py-5 shadow-lg shadow-black">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center">
                    <div>
                        <a href="/">
                            <p className="text-5xl font-black text-green-500">Chat-Chat</p>
                        </a>
                    </div>
                    <div>
                        {
                            userData ?
                                <div>
                                    {
                                        loading ? <p>Wait</p> :
                                            <div className="flex justify-center items-center gap-4">
                                                <div className="flex justify-center items-center gap-5">
                                                    <img className="w-[15%] rounded-full" src={userData?.image} alt='profilepic' />
                                                    <span>
                                                        <p className="text-black text-2xl font-extrabold">{userData?.name}</p>
                                                        <p className="text-black text-lg font-semibold">{userData?.email}</p>
                                                    </span>
                                                </div>
                                                <button onClick={handleSignout} className="bg-black text-white px-6 py-3 rounded-md text-lg font-bold">Sign Out</button>
                                            </div>
                                    }
                                </div>
                                :
                                <a href="/login">   <button className="bg-black text-white px-6 py-3 rounded-md text-lg font-bold">Sign In</button></a>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;