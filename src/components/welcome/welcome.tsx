import { useForm } from "react-hook-form";
import { Background } from "../background/background";
import { MyInput } from "../my-input/myinput";
import './welcome.css';
import { useLocation, useNavigate } from "react-router-dom";
import { registerUser } from "../../servicies/UserApi";
import { useEffect, useMemo, useState } from "react";
import { loginUser, loginWithJwt } from "../../servicies/AuthService";
import { useCookies } from "react-cookie";
import { navigateToUrl } from "single-spa";
import { getJwtExpiration } from "@TodoPal/utils";

export function Welcome() {
  const { handleSubmit, register, reset, watch } = useForm();
  const [ rememberUser, setRememberUser ] = useState(false);
  const [ cookies, setCookie ] = useCookies(['jwtToken']);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  /**
   * The password must contain at least:
   *    * one digit (0-9)
   *    * one lowercase letter (a-z)
   *    * one uppercase letter (A-Z)
   *    * one special character (@$!%*#?&^_-)
   * It must be at least 10 characters long
   */
  const pwd_regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*#?&^_-])[A-Za-z\d[@$!%*#?&^_-].{9,}/;
  const passwordControl = { required: true, pattern: pwd_regex, minLength: 10 };
  const confirmPasswordControl = { required: true, pattern: pwd_regex, minLength: 10 };
  const usernameControl = { required: true };

  const username = watch('Username');
  const password = watch('Password');
  const repeatPassword = watch('Repeat password');

  useEffect(() => {
    if (cookies.jwtToken) {
      console.log('User is already logged in');
      loginWithJwt(cookies.jwtToken)
        .then(() => {
          navigateToUrl('/todos');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });

  const isLoginPage = () => currentPath === '/' || currentPath === '/login';
  const isSignupPage = () => currentPath === '/signup';
  const getHeader = () => isLoginPage() ? 'Login' : 'Sign up';
  const onSubmit = () => {
    if (isLoginPage()) {
      loginUser(username, password)
        .then((jwtToken) => {
          reset();
          let expires = undefined;
          if (rememberUser) {
            expires = new Date(getJwtExpiration(jwtToken) * 1000);
          }
          setCookie('jwtToken', jwtToken, { path: '/', expires });
          navigateToUrl('/todos');
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (checkPwds()) {
      registerUser(username, password)
        .then(() => {
          reset();
          navigate('/login');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  function checkPwds() {
    if (password === repeatPassword) {
      return true;
    } else {
      console.error('Passwords do not match');
      return false;
    }
  }

  function CheckBox() {
    if (isLoginPage()) {
      return <div className="flex flex-center gap-2">
        <input className="checkbox" type="checkbox" id="checkbox" checked={rememberUser} onChange={e => setRememberUser(e.target.checked)} />
        <label htmlFor="checkbox" className="cursor-pointer text-slate-200">Remember me</label>
      </div>
    } else {
      return null;
    }
  }

  function PwdReset() {
    if (isLoginPage()) {
      return <>
        <a className="w-fit self-center text-center font-semibold text-sm text-[#1e88e5]" href="forgot">Forgot password?</a>
        <p className="font-light flex items-center justify-center text-sm text-slate-200 gap-1">Don't have an account?<a className="font-semibold text-[#1e88e5]" href="signup">Sign up</a></p>
      </>
    } else {
      return null;
    }
  }

  function RepeatPwd() {
    if (isSignupPage()) {
      return <MyInput register={register} placeholder="Repeat password" password={true} formControl={confirmPasswordControl} />
    } else {
      return null;
    }
  }

  // using memo to avoid unnecessary re-rendering the RepeatPwd component
  const pwd2 = useMemo(
    () => RepeatPwd(),
    [isLoginPage()]
  );

  return <>
    <Background />
    <div className="form-container">
      <form className="form bg-base-300" onSubmit={handleSubmit(onSubmit)}>
        <div className="header">{getHeader()}</div>
        <div className="p-6 gap-4 flex flex-col">
          <MyInput register={register} placeholder="Username" formControl={usernameControl} />
          <MyInput register={register} placeholder="Password" password={true} formControl={passwordControl} />
          {pwd2}
          <CheckBox />
          <button className="btn btn-primary text-white font-bold" type="submit">Submit</button>
          <PwdReset />
        </div>
      </form>
    </div>
  </>;
}