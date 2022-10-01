import React, { useState } from "react";
import AuthService from "../../../services/auth.service";
import { useDispatch } from 'react-redux';
import { userState } from '../../../redux/action';
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const role ="tester";
  const email="gaston.turner@gmail.com";
  const defaultShippingAddress="falso 1";
  const billingAddress= "falso2";


  const navigate = useNavigate(); 

  const handleSignIn = async (e) => {

    e.preventDefault();
    try {
      await AuthService.signup(userName, password,role, email,defaultShippingAddress,billingAddress).then(
        (response) => {
          // check for token and user already exists with 200
          //   console.log("Sign up successfully", response);
          navigate("/home");
          /* window.location.reload(); */
          setUserName('');
          setPassword('');
          dispatch(userState(true));
        },
        (error) => {
          alert(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignIn}>
        <h3>Sign up</h3>
        <input
          type="text"
          placeholder="email"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default SignIn;




// import React from 'react';
// import { Icon } from '@iconify/react';
// import { Link } from 'react-router-dom';
// import './signIn.css'

// const SignIn = () => {
//     return (
//         <div class="login_body">
//             <div class="center">
//                 <Link to={'/'} class='link_box'>
//                     <button class="tooltip button_box">
//                         <Icon icon="akar-icons:arrow-back-thick-fill" />
//                     </button>
//                 </Link>
//                 <h1>Sign In</h1>
//                 <form>
//                     <div class="inputbox">
//                         <input type="text" required="required" />
//                         <span>Full Name</span>
//                     </div>
//                     <div class="inputbox">
//                         <input type="text" required="required" />
//                         <span>Email</span>
//                     </div>
//                     <div class="inputbox">
//                         <input type="text" required="required" />
//                         <span>Password</span>
//                     </div>
//                     <div class='boton'>
//                         <div class="inputbox">
//                             <input type="button" value="Continue" />
//                         </div>
//                         <Link class='login_box' to={'/log-in'}>Log In</Link>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default SignIn;

