import React, { useEffect, useState } from "react";
import "./css/accedit.css";
import { Avatar } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectlogin } from "../features/loginSlice";
import { useHistory } from 'react-router';
import axios from "./axios";

export const Accedit = () => {
  const user = useSelector(selectlogin);
  const [accinfo, setaccinfo] = useState();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    axios.post("/account/edit", data).then((response) => {
      alert(response.data);
      if(response.data!=="USERNAME ALREADY EXIST")
      history.push("/");
    });
  };

  
  useEffect(() => {
    
     axios.post('/account/user',{useremail:user.email}).then( async(req) => {
        const data =  req.data;
        setaccinfo(await data[0]);
        console.log(data[0].username)
        if(data[0].username===null) 
        {
           history.push("/account/edit")
           alert("Please Username To Continue")
        }       
      })
      
    }, []);
    
  return (
    <div className="Accedit">
      <div className="eh">
        <Avatar src={user.photoURL}/>
        <div>
          <h4>{accinfo?.username}</h4>
          <h6>change Profile Picture</h6>
        </div>
      </div>
      <div className="changes">
        <form onSubmit={handleSubmit(submit)}>
          <div className="c1">
            <h5>Name</h5>
            <div>
              <input type="text" placeholder={accinfo?.name} {...register("name")} />
              <h6>
                Help people discover your account by using the name you're known
                by. either your full name, nickname or business name.
              </h6>
              <h6>You can only change your name twice within 14 days.</h6>
            </div>
          </div>
          <div className="c1">
            <h5>Username</h5>
            <div>
              <input type="text" placeholder={accinfo?.username} {...register("username")} />
              <h6>
                Help people discover your account by using the name you're known
                by. either your full name, nickname or business name.
              </h6>
              <h6>You can only change your name twice within 14 days.</h6>
            </div>
          </div>
          <div className="c1">
            <h5>Website</h5>
            <div>
              <input type="text" />
            </div>
          </div>
          <div className="c1">
            <h5>Bio</h5>
            <div>
              <textarea type="text" placeholder={accinfo?.bio} {...register("bio")} />
              <h5 style={{ marginTop: "30px" }}>Personal Information</h5>
              <h6 style={{ fontsize: "14px" }}>
                Provide your personal information even if the accoung is used
                for a business,a pet or something else.This won't be a part of
                your public profile
              </h6>
            </div>
          </div>
          <div className="c1">
            <h5>Email</h5>
            <div>
              <input
                style={{ pointerEvents: "none", opacity: "40%" }}
                type="text"
                value={user.email}
                {...register("useremail")}
              />
            </div>
          </div>
          <div className="c1">
            <h5>Phone Number</h5>
            <div>
              <input type="text" placeholder={accinfo?.phno} {...register("phno")} />
            </div>
          </div>
          <div className="c1">
            <h5>Gender</h5>
            <div>
              <input type="text" />
            </div>
          </div>
          <div id="sv">
            <button>Save changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};
