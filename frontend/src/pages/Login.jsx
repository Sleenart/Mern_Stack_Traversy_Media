
import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";

function Login() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { email, password } = formData

  const onChange = (e) => {setFormData((prevState)=> ({
    ...prevState,
    [e.target.name]: e.target.value
  }))}

//   const onChange = (e) => {}

  const onSubmit = (e) => {e.preventDefault()}

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting goal</p>
        <section className="form">
          <form onSubmit={onSubmit}>

            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={onChange}
              />
            </div>
            
            <div className="form-group">
                <button type="submit" className="btn btn-block">
                    Submit
                </button>
            </div>
          </form>
        </section>
      </section>
      <div>Login</div>
    </>
  );
}

export default Login;
