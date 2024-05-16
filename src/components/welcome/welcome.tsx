import { useForm } from "react-hook-form";
import { Background } from "../background/background";
import { MyInput } from "../my-input/myinput";
import './welcome.css';
import { useLocation } from "react-router-dom";

export function Login() {
  const { handleSubmit } = useForm();
  const location = useLocation();
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
  const usernameControl = { required: true };

  const isLoginPage = () => currentPath === '/' || currentPath === '/login';
  const isSignupPage = () => currentPath === '/signup';
  const getHeader = () => isLoginPage() ? 'Login' : 'Sign up';
  const onSubmit = () => {
    console.error('Not yet implemented');
  }

  function CheckBox() {
    if (isLoginPage()) {
      return <div className="flex flex-center gap-2">
        <input className="checkbox" type="checkbox" id="checkbox" />
        <label htmlFor="checkbox" className="cursor-pointer text-slate-200">Remember me</label>
      </div>
    } else {
      return null;
    }
  }

  function PwdReset() {
    if (isLoginPage()) {
      return <>
        <a className="text-center font-semibold text-sm text-[#1e88e5]" href="forgot">Forgot password?</a>
        <p className="font-light flex items-center justify-center text-sm text-slate-200 gap-1">Don't have an account?<a className="font-semibold text-[#1e88e5]" href="signup">Sign up</a></p>
      </>
    } else {
      return null;
    }
  }

  function RepeatPwd() {
    if (isSignupPage()) {
      return <MyInput placeholder="Repeat password" password={true} formControl={passwordControl} />
    } else {
      return null;
    }
  }

  return <>
    <Background />
    <div className="form-container">
      <form className="form bg-base-300" onSubmit={handleSubmit(onSubmit)}>
        <div className="header">{getHeader()}</div>
        <div className="p-6 gap-4 flex flex-col">
          <MyInput placeholder="Username" formControl={usernameControl} />
          <MyInput placeholder="Password" password={true} formControl={passwordControl} />
          <RepeatPwd />
          <CheckBox />
          <button className="btn btn-primary text-white font-bold" type="submit">Submit</button>
          <PwdReset />
        </div>
      </form>
    </div>
  </>;
}