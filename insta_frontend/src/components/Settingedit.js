import React, { useState } from "react";
import "./css/settings.css";
import { Accedit } from "./accedit";



export const Settingedit = () => {
  const [nav, setnav] = useState([true, false, false, false, false, false, false, false, false]);
  

  return (
    <div className="settings">
      <div className="leftnav">
        <h4
          onClick={() => {
            setnav([true, false, false, false, false, false, false, false, false]);
          }}
          className={nav[0] && "selectednav"}
        >
          Edit Profile
        </h4>
        <h4
          onClick={() => {
            setnav([false, true, false, false, false, false, false, false, false]);
          }}
          className={nav[1] && "selectednav"}
        >
          Change Password
        </h4>
        <h4
          onClick={() => {
            setnav([false, false, true, false, false, false, false, false, false]);
          }}
          className={nav[2] && "selectednav"}
        >
          Apps and Websites
        </h4>
        <h4
          onClick={() => {
            setnav([false, false, false, true, false, false, false, false, false]);
          }}
          className={nav[3] && "selectednav"}
        >
          Email and SMS
        </h4>
        <h4
          onClick={() => {
            setnav([false, false, false, false, true, false, false, false, false]);
          }}
          className={nav[4] && "selectednav"}
        >
          Push Notification
        </h4>
        <h4
          onClick={() => {
            setnav([false, false, false, false, false, true, false, false, false]);
          }}
          className={nav[5] && "selectednav"}
        >
          Manage Contacts
        </h4>
        <h4
          onClick={() => {
            setnav([false, false, false, false, false, false, true, false, false]);
          }}
          className={nav[6] && "selectednav"}
        >
          Privacy and security
        </h4>
        <h4
          onClick={() => {
            setnav([false, false, false, false, false, false, false, true, false]);
          }}
          className={nav[7] && "selectednav"}
        >
          Login Activity
        </h4>
        <h4
          onClick={() => {
            setnav([false, false, false, false, false, false, false, false, true]);
          }}
          className={nav[8] && "selectednav"}
        >
          Email from Instagram
        </h4>
        <h4 id="prac">Switch to Professional Account</h4>
        <div>owner details</div>
      </div>
      <div className="navcontent">
        {nav[0]&&<Accedit/>}
      
      </div>
    </div>
  );
};
