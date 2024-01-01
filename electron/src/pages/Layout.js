import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout(){
    return (
    <div>
        <p>Welcome to layout</p>
        <ul>
            <li>
                <a href='/home'>Click here to get home page!</a>
            </li>
        </ul>
        <Outlet/>
    </div>
    );
}