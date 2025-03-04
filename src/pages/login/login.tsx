import LoginForm from "./components/login-form";
import "./css/login.css";
import loginBg from "../../assets/png/login-bg.png";

const Login = () => {
  return (
    <section className="login">
      <div className="login_container">
        <div className="login__wrapper">
          <h1 className="login__title">Nasiya App</h1>
          <div>
            <img src={loginBg} alt="" />
          </div>
        </div>
        <div className="login__form-box">
            <h2 className="login__form-title">Welcome to N14</h2>
          <LoginForm />
        </div>
      </div>
    </section>
  );
};

export default Login;
