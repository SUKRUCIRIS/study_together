import React, { useState, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./Login.css";
import Select from 'react-select'

export default function Signup() {

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [occupation, setOccupation] = useState("");
  const [graduationlevel, setGraduationlevel] = useState("");
  const navigate = useNavigate();
  const ref = useRef();

  const options = [
    { value: 'prehighschool', label: 'Pre-Highschool' },
    { value: 'highschool', label: 'Highschool' },
    { value: 'college', label: 'College' },
    { value: 'postcollege', label: 'Post-College' }
  ];


  const gotoLogin = () => {
    navigate('/');
  }

  const registerUser = async () => {
    try {
      const response = await fetch('http://localhost:80/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "name": name,
          "surname": surname,
          "birth_date": birthdate,
          "email": email,
          "telephone": phonenumber,
          "occupation": occupation,
          "graduation_level": graduationlevel,
          "about": "x",
          "file_id": null,
          "password": password
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User registered successfully. ID:', data.id);
        // You can perform further actions based on the response.
      } else {
        console.error('Failed to register user.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
      <div className='signup-container'>
      <form className='form-login' onSubmit={(e) => e.preventDefault()}>
        <h2 className='h2-login'>Make an account</h2>
        <div className='signup-rows'>
          <label className='label-login'>
          <svg viewBox="0 0 1024 1024" className='icon-info'>
              <path d="M576 706.612v-52.78c70.498-39.728 128-138.772 128-237.832 0-159.058 0-288-192-288s-192 128.942-192 288c0 99.060 57.502 198.104 128 237.832v52.78c-217.102 17.748-384 124.42-384 253.388h896c0-128.968-166.898-235.64-384-253.388z"></path>
          </svg>
          <div className='vertical-border'/>
            <input
              className='input-login'
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
          <label className='label-login'>
          <svg viewBox="0 0 1024 1024" className='icon-info'>
              <path d="M576 706.612v-52.78c70.498-39.728 128-138.772 128-237.832 0-159.058 0-288-192-288s-192 128.942-192 288c0 99.060 57.502 198.104 128 237.832v52.78c-217.102 17.748-384 124.42-384 253.388h896c0-128.968-166.898-235.64-384-253.388z"></path>
          </svg>
          <div className='vertical-border'/>
            <input
              className='input-login'
              type="text"
              placeholder="Surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </label>
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
          <svg viewBox="0 0 950.8571428571428 1024" className='icon-info'>
            <path d="M73.143 950.857h164.571v-164.571h-164.571v164.571zM274.286 950.857h182.857v-164.571h-182.857v164.571zM73.143 749.714h164.571v-182.857h-164.571v182.857zM274.286 749.714h182.857v-182.857h-182.857v182.857zM73.143 530.286h164.571v-164.571h-164.571v164.571zM493.714 950.857h182.857v-164.571h-182.857v164.571zM274.286 530.286h182.857v-164.571h-182.857v164.571zM713.143 950.857h164.571v-164.571h-164.571v164.571zM493.714 749.714h182.857v-182.857h-182.857v182.857zM292.571 256v-164.571c0-9.714-8.571-18.286-18.286-18.286h-36.571c-9.714 0-18.286 8.571-18.286 18.286v164.571c0 9.714 8.571 18.286 18.286 18.286h36.571c9.714 0 18.286-8.571 18.286-18.286zM713.143 749.714h164.571v-182.857h-164.571v182.857zM493.714 530.286h182.857v-164.571h-182.857v164.571zM713.143 530.286h164.571v-164.571h-164.571v164.571zM731.429 256v-164.571c0-9.714-8.571-18.286-18.286-18.286h-36.571c-9.714 0-18.286 8.571-18.286 18.286v164.571c0 9.714 8.571 18.286 18.286 18.286h36.571c9.714 0 18.286-8.571 18.286-18.286zM950.857 219.429v731.429c0 40-33.143 73.143-73.143 73.143h-804.571c-40 0-73.143-33.143-73.143-73.143v-731.429c0-40 33.143-73.143 73.143-73.143h73.143v-54.857c0-50.286 41.143-91.429 91.429-91.429h36.571c50.286 0 91.429 41.143 91.429 91.429v54.857h219.429v-54.857c0-50.286 41.143-91.429 91.429-91.429h36.571c50.286 0 91.429 41.143 91.429 91.429v54.857h73.143c40 0 73.143 33.143 73.143 73.143z"></path>
          </svg>
          <div className='vertical-border'/>
            <input
              className='date'
              type="text"
              ref={ref}
              onFocus={() => (ref.current.type = "date")}
              onBlur={() => (ref.current.type = "text")}
              placeholder="Date of birth"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </label>
          <label className='label-login'>
          <svg viewBox="0 0 1024 1024" className='icon-info'>
            <path d="M704 640c-64 64-64 128-128 128s-128-64-192-128-128-128-128-192 64-64 128-128-128-256-192-256-192 192-192 192c0 128 131.5 387.5 256 512s384 256 512 256c0 0 192-128 192-192s-192-256-256-192z"></path>
          </svg>
          <div className='vertical-border'/>
            <input
              className='input-login'
              type="tel"
              placeholder="Phone number"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
            />
          </label>
          <label className='label-login'>
          <svg viewBox="0 0 1024 1024" className='icon-info'>
            <path d="M384 640l128-64 448-448-64-64-448 448-64 128zM289.3 867.098c-31.632-66.728-65.666-100.762-132.396-132.394l99.096-272.792 128-77.912 384-384h-192l-384 384-192 640 640-192 384-384v-192l-384 384-77.912 128z"></path>
          </svg>
          <div className='vertical-border'/>
            <input
              className='input-login'
              type="text"
              placeholder="Occupation"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            />
          </label>
          <label className='label-login'>
                            <Select 
                                options={options}
                                value={graduationlevel}
                                onChange={setGraduationlevel} 
                                isSearchable={false}
                                placeholder='Graduation level'
                                className='select-login'
                                />
                      <svg viewBox="0 0 1316.5714285714284 1024" className='icon-info'>
            <path d="M1013.714 477.714l10.286 180.571c4.571 80.571-164 146.286-365.714 146.286s-370.286-65.714-365.714-146.286l10.286-180.571 328 103.429c9.143 2.857 18.286 4 27.429 4s18.286-1.143 27.429-4zM1316.571 292.571c0 8-5.143 14.857-12.571 17.714l-640 201.143c-2.286 0.571-4 0.571-5.714 0.571s-3.429 0-5.714-0.571l-372.571-117.714c-32.571 25.714-55.429 88.571-60 165.714 21.714 12.571 36 35.429 36 62.286 0 25.714-13.143 48-33.143 61.143l33.143 247.429c0.571 5.143-1.143 10.286-4.571 14.286s-8.571 6.286-13.714 6.286h-109.714c-5.143 0-10.286-2.286-13.714-6.286s-5.143-9.143-4.571-14.286l33.143-247.429c-20-13.143-33.143-35.429-33.143-61.143 0-27.429 15.429-50.857 37.143-63.429 3.429-66.857 20.571-138.857 56-188.571l-190.286-59.429c-7.429-2.857-12.571-9.714-12.571-17.714s5.143-14.857 12.571-17.714l640-201.143c2.286-0.571 4-0.571 5.714-0.571s3.429 0 5.714 0.571l640 201.143c7.429 2.857 12.571 9.714 12.571 17.714z"></path>
          </svg>
          <div className='vertical-border'/>
          </label>
        </div>
        <button className='button-login' onClick={gotoLogin}>Make an account</button>
        <div className='signup-container'>
          <text className='text'>
            Click&nbsp;
          </text>
          <text className='underlined-text' onClick={gotoLogin}>here</text>
          <text className='text'>
            &nbsp;to return to login page!
          </text>
        </div>
      </form>
      </div>
      <Outlet />
    </div>
  );
}