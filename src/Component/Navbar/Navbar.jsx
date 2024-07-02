import { useEffect, useState } from "react";

const Navbar = () => {
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        const storageData = localStorage.getItem('userdata');

        if (storageData) {
            const parsedData = JSON.parse(storageData);
            setUserData(parsedData)
        }
        setLoading(false);
    }, [setUserData])

    console.log(userData)

    return (
        <div className="bg-white py-5">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center">
                    <div><p className="text-5xl font-black text-green-500">Chat-Chat</p></div>
                    <div>
                        {
                            userData ?
                                <div>
                                    {
                                        loading ? <p>Wait</p> :
                                            <div className="flex justify-center items-center">
                                                <div className="flex justify-center items-center gap-5">
                                                    <img className="w-[15%] rounded-full" src={userData?.image} alt='profilepic' />
                                                    <span>
                                                        <p className="text-black text-2xl font-extrabold">{userData?.name}</p>
                                                        <p className="text-black text-lg font-semibold">{userData?.email}</p>
                                                    </span>
                                                </div>
                                                <button className="bg-black text-white px-6 py-3 rounded-md text-lg font-bold">Sign Out</button>
                                            </div>
                                    }
                                </div> :
                                <button className="bg-black text-white px-6 py-3 rounded-md text-lg font-bold">Sign Out</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;