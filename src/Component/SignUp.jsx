import axios from "axios";
import { useState } from "react";


const SignUp = () => {

    const [uploadImage, setUploadImage] = useState({ image: '' });
    const [Error, setError] = useState('');
    const [token, setToken] = useState('');
    
    const postImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setUploadImage(base64)
    }
    console.log(uploadImage)

    const handleRegisterForm = (e) => {
        setError();
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const image = uploadImage;

        console.log(name, email, password, image);

        const userDate = {
            name, email, password, image
        }
        console.log(userDate)

        axios.post('http://localhost:5000/api/user', {
            name: name,
            email: email,
            password: password,
            image: image
        })
            .then((res) => setToken(res.data.token))
            .catch((error) => {
                setError(error.response.data.message)
                console.log(error)
            })
    }

    return (
        <div className="hero bg-[url('https://i.ibb.co/Y87rmhY/alexander-shatov-PEJt-Zf-T6-C1-Q-unsplash.jpg')] min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold text-white">Sign Up</h1>
                    <p className="py-6 text-white">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-[rgba(251,239,239,0)] shadow-lg backdrop-blur-[3px] rounded-[10px] border border-[rgba(255,255,255,0.18)] w-full max-w-sm shrink-0">
                    <form onSubmit={handleRegisterForm} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Name</span>
                            </label>
                            <input type="text" placeholder="name" name="name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Email</span>
                            </label>
                            <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Image</span>
                            </label>
                            <input type="file" accept="image/*" onChange={(e) => postImage(e)} className="input input-bordered" required />
                            {
                                Error === 'request entity too large' && <p className="text-yellow-400">The image is to learge!</p>
                            }
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Password</span>
                            </label>
                            <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                            {/* <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label> */}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign Up</button>
                        </div>
                        {
                            token && <p className="text-green-400">Congratulation! Accout created successfully.</p>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;


function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result)
        };
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}