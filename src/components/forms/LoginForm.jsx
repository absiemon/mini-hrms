import { useState } from "react";
import { doLogin } from "../../http";
import { useDispatch } from "react-redux";
import { setAuth } from '../../store/auth-slice';
import { toast } from "react-toastify";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false)

  const inputEvent = (e) => {
    const { name, value } = e.target;
    setFormData((old) => {
      return {
        ...old,
        [name]: value
      }
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) return toast.error('All Fields Required');

    setLoading(true);

    const res = await doLogin({ email, password });
    const { success } = res;
    if (success) {
      dispatch(setAuth(res.user));
      localStorage.setItem('accessToken', res?.accessToken);
      localStorage.setItem('refreshToken', res?.refreshToken);
      setLoading(false);
    }
    else {
      toast.error('Invalid credentials')
      setLoading(false);
    }
  }

  return (
    <div id="app">
      <section className="section">
        <div className="container mt-5">
          <div className="row">
            <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
              <div className="card card-primary">
                <div className="card-header"><h4>Login</h4></div>
                <div className="card-body">
                  <form onSubmit={onSubmit} className="needs-validation" noValidate="">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input id="email" onChange={inputEvent} value={formData.email} type="email" className="form-control" name="email" tabIndex="1" required autoFocus />
                      <div className="invalid-feedback">
                        Please fill in your email
                      </div>
                    </div>

                    <div className="form-group">
                      <input id="password" onChange={inputEvent} value={formData.password} type="password" className="form-control" name="password" tabIndex="2" required />
                      <div className="invalid-feedback">
                        please fill in your password
                      </div>
                    </div>


                    <div className="form-group">
                      <button type="submit" className="btn btn-primary btn-lg btn-block" tabIndex="4" disabled={loading}>
                        {loading ? 'Logging in' : 'Login'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LoginForm;