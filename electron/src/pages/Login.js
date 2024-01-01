import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./Login.css";

import UserProfile from '../SessionUserProfile'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/home");
  };
  const gotoSignup = () => {
    navigate('/signup');
  }

  return (
    <div className='body'>
      <svg viewBox="0 0 1024 1024" className='icon'>
        <path d="M896 128v832h-672c-53.026 0-96-42.98-96-96s42.974-96 96-96h608v-768h-640c-70.398 0-128 57.6-128 128v768c0 70.4 57.602 128 128 128h768v-896h-64z"></path>
        <path d="M224.056 832v0c-0.018 0.002-0.038 0-0.056 0-17.672 0-32 14.326-32 32s14.328 32 32 32c0.018 0 0.038-0.002 0.056-0.002v0.002h607.89v-64h-607.89z"></path>
      </svg>
      <h3 className='text'>Welcome to</h3>
      <div className='container'>
          <p className='text1'>Study</p>
          <h1 className='text2'>Together</h1>
          <svg viewBox="0 0 1024 1024" className='icon1'>
            <path d="M512 0c-282.77 0-512 229.23-512 512s229.23 512 512 512 512-229.23 512-512-229.23-512-512-512zM704 256c35.346 0 64 28.654 64 64s-28.654 64-64 64-64-28.654-64-64 28.654-64 64-64zM320 256c35.346 0 64 28.654 64 64s-28.654 64-64 64-64-28.654-64-64 28.654-64 64-64zM543.8 679.376c-1.25-1.124-2.48-2.29-3.684-3.492-18.74-18.74-28.112-43.3-28.118-67.864-0.004 24.562-9.376 49.124-28.118 67.864-1.204 1.204-2.434 2.368-3.684 3.492-86.524 78.512-288.196-1.842-288.196-103.376 62 40 110.45 9.786 156.118-35.882 37.49-37.49 98.276-37.49 135.766 0 18.74 18.74 28.112 43.3 28.118 67.864 0.004-24.562 9.376-49.124 28.118-67.864 37.49-37.49 98.276-37.49 135.766 0 45.664 45.668 94.114 75.882 156.114 35.882 0 101.534-201.672 181.888-288.2 103.376z"></path>
          </svg>
      </div>
      <div className='login-container'>
      <form className='form-login' onSubmit={(e) => e.preventDefault()}>
        <h2 className='h2-login'>Login</h2>
        <label className='label-login'>
        <svg viewBox="0 0 1024 1024" className='icon-info'>
              <path d="M854 342v-86l-342 214-342-214v86l342 212zM854 170q34 0 59 26t25 60v512q0 34-25 60t-59 26h-684q-34 0-59-26t-25-60v-512q0-34 25-60t59-26h684z"></path>
        </svg>
        <div className='vertical-border'/>
          <input
            className='input-login'
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className='label-login'>
        <svg viewBox="0 0 1024 1024" className='icon-info'>
            <path d="M704 0c-176.73 0-320 143.268-320 320 0 20.026 1.858 39.616 5.376 58.624l-389.376 389.376v192c0 35.346 28.654 64 64 64h64v-64h128v-128h128v-128h128l83.042-83.042c34.010 12.316 70.696 19.042 108.958 19.042 176.73 0 320-143.268 320-320s-143.27-320-320-320zM799.874 320.126c-53.020 0-96-42.98-96-96s42.98-96 96-96 96 42.98 96 96-42.98 96-96 96z"></path>
        </svg>
        <div className='vertical-border'/>
          <input
            className='input-login'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className='button-login' onClick={handleLogin}>Login</button>
        <div className='signup-container'>
          <text className='text'>
            Click&nbsp;
          </text>
          <text className='underlined-text' onClick={gotoSignup}>here</text>
          <text className='text'>
            &nbsp;to sign up!
          </text>
        </div>
      </form>
      <Outlet />
      </div>
    </div>
  );
}