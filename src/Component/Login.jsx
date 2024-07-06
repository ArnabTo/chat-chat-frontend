import axios from 'axios';
import '../App.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [token, setToken] = useState();
    const navigate = useNavigate();
    const handleLogin =(e) =>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)

        axios.post('http://localhost:5000/api/user/login', {email: email, password: password})
        .then((res)=> {
            setToken(res?.data?.token)
            console.log(res)
            localStorage.setItem('userdata', JSON.stringify(res.data));
            navigate('/');
        })
        .catch((err) => console.log(err))
    }
    return (
            <div className="hero bg-[url('https://i.ibb.co/Y87rmhY/alexander-shatov-PEJt-Zf-T6-C1-Q-unsplash.jpg')] min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold text-white">Login now!</h1>
                    <p className="py-6 text-white">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-[rgba(251,239,239,0.15)] shadow-lg backdrop-blur-[20px] rounded-[10px] border border-[rgba(255,255,255,0.18)] w-full max-w-sm shrink-0">
                    <form className="card-body" onSubmit={handleLogin}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            {/* <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label> */}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        {
                            token && <p className="text-green-400">Loged in!</p>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;