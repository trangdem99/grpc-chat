import React, {
  useEffect,
  useState,
} from 'react';
import {
  Link,
  useNavigate
} from 'react-router-dom';

import {
  Account
} from '../protos/models_pb'
import {
  AuthenticationsClient
} from '../protos/authentications_grpc_web_pb'

const authentications = new AuthenticationsClient('http://localhost:8080', null, null);

export const SignIn = () => {
  const history = useNavigate();
  const [data, setData] = useState({
    username: '',
    password: '',
    is_remember: false,
  });
  const [is_show_password, setIs_show_password] = useState(false);
  const [msg, setMsg] = useState({
    msg: '',
    type: '',
  });

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const signIn = (e) => {
    try {
      e.preventDefault();
      
      const account = new Account();
      account.setUsername(data.username);
      account.setPassword(data.password);

      authentications.signIn(account, null, (err, response) => {
        if (err) {
          setMsg({ msg: err.message, type: 'danger' });
        } else {
          console.log(response);
          setMsg({ msg: response.array[1], type: response.array[0] ? 'success' : 'danger' });

          if (response.array[0]) {
            localStorage.setItem('access_token', JSON.parse(response.array[2]).access_token);

            setTimeout(() => {
              history('/');
            }, 2000);
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      history('/');
    }
  }, [history])
  
  return (
    <>
      <div className="autentication-bg">
        <div className="container-lg">
          <div className="row justify-content-center authentication authentication-basic align-items-center h-100">
            <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-6 col-sm-8 col-12">
              <div className="my-4 d-flex justify-content-center">
                <Link to="/">
                  <img src="/logo.png" alt="logo" />
                </Link>
              </div>
              <div className="card custom-card">
                <div className="card-body p-5">
                  <p className="h5 fw-semibold mb-2 text-center">Sign In</p>
                  <p className="mb-4 text-muted op-7 fw-normal text-center">Welcome back!</p>
                  <div className="row gy-3">
                    { msg.msg ? (<div className={`alert alert-${msg.type}`} role="alert">{msg.msg}</div> ) : null}
                  </div>
                  <div className="row gy-3">
                    <div className="col-xl-12 mb-2">
                      <label htmlFor="username" className="form-label text-default">User Name</label>
                      <input type="text" className="form-control form-control-lg" name="username" placeholder="Username" value={data.username} onChange={onChange} required />
                    </div>
                    <div className="col-xl-12 mb-2">
                      <label htmlFor="password" className="form-label text-default d-block">Password<a href="/" className="float-end text-danger">Forget password ?</a></label>
                      <div className="input-group">
                        <input type={is_show_password ? "text" : "password"} className="form-control form-control-lg" name="password" placeholder="Password" value={data.password} onChange={onChange} autoComplete="off" required />
                        <button className="btn btn-light" type="button" onClick={() => setIs_show_password(!is_show_password)}><i className={`ri-eye${is_show_password ? "" : "-off"}-line align-middle`}></i></button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="is_remember" value={data.is_remember} onChange={onChange} />
                        <label className="form-check-label text-muted fw-normal">
                          Remember password ?
                        </label>
                      </div>
                    </div>
                    <div className="col-xl-12 d-grid mt-2">
                      <button className="btn btn-lg btn-primary" disabled={data.username === '' || data.password === ''} onClick={signIn}>Sign In</button>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-muted mt-3">Dont have an account? <Link to="/sign-up" className="text-primary">Sign Up</Link></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}