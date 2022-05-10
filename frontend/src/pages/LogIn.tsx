import axios from 'axios';
import React, { useState } from 'react';
import { GiReturnArrow } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';

const LogIn: React.FC = () => {

  const [bin, setBin] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();
  const infos = {
    bin: bin,
    password: password
  }

  const auth = () =>{
    axios.post('http://localhost:4001/api/client/',infos)
    .then(res => {

      let token = res.data.token;
      let sold = res.data.sold;
      let email = res.data.email;
      
      if (res.data.bin === bin && res.data.password === password) {
        localStorage.setItem("token", token);
        localStorage.setItem("solde", sold);
        localStorage.setItem("email", email);
        
        navigate("/home", { replace: true });
      }

    })
    .catch(err => console.warn(err))
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black/50">
      <div className="bg-gradient-to-b from-slate-300/50 via-slate-200/50 to-slate-100/50 h-4/5 lg:h-3/6 w-3/5 lg:w-1/4 rounded-3xl flex flex-col justify-center items-center">
        <div className="w-full flex justify-center">
          <h1 className="text-xl lg:text-3xl uppercase bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-violet-200 font-extrabold">
            Votre code
          </h1>
        </div>

        <div className="w-full h-5/6 rounded-3xl flex flex-col justify-around items-center justify-items-center">
          <div className="w-4/5 h-64 rounded-xl bg-gradient-to-b from-cyan-900 via-cyan-800/80 to-cyan-700/60 flex flex-col justify-around items-center text-white">
            <div className="w-full flex justify-end">
              <img src="src/assets/cc.png" alt="" className="w-28 mt-6 mr-10" />
            </div>
            <div className="w-full flex justify-start">
              <img src="src/assets/chip.png" alt="" className="w-16 ml-10" />
            </div>
            <input
              type="text"
              placeholder="Bin"
              onChange={(e)=>{setBin(e.target.value)}}
              className=" w-5/6 rounded-lg p-4 text-white-900 bg-transparent focus:outline-none"
            />
            <div className="w-full flex justify-between px-10 mb-6">
              <span className='uppercase'>card holder</span>
              <span> 05/24 </span>
            </div>
          </div>

          <div className="flex flex-col w-full items-center">
            <input
              type="password"
              placeholder="code"
              onChange={(e)=>{setPassword(e.target.value)}}
              className=" w-5/6 rounded-lg p-4"
            />
            <button onClick={auth} className="bg-slate-100 rounded-lg px-4 py-1 text-xl my-2 w-1/4 text-center">
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
