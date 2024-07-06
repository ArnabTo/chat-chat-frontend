import { useEffect, useState } from "react";
import { checkUser } from "./util/checkUser";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const navigator = useNavigate();

    useEffect(() => {

        const data = checkUser();
        if(data){
            setUser(data)
        }

        setLoading(false);
    }, []);

    if (user) {
        return children
    } else {
        navigator('/login')
    }
};

export default PrivateRoute;