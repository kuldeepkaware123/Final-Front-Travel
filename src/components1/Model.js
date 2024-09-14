/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";

function Model() {
  return (
    <div
      className="modal fade log-reg"
      id="exampleModal"
      tabindex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <div className="post-tabs">
              {/* <!-- tab navs --> */}
              <ul
                className="nav nav-tabs nav-pills nav-fill"
                id="postsTab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    aria-controls="login"
                    aria-selected="false"
                    className="nav-link active"
                    data-bs-target="#login"
                    data-bs-toggle="tab"
                    id="login-tab"
                    role="tab"
                    type="button"
                  >
                    Login
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    aria-controls="register"
                    aria-selected="true"
                    className="nav-link"
                    data-bs-target="#register"
                    data-bs-toggle="tab"
                    id="register-tab"
                    role="tab"
                    type="button"
                  >
                    Register
                  </button>
                </li>
              </ul>
              {/* <!-- tab contents --> */}
              <div className="tab-content blog-full" id="postsTabContent">
                {/* <!-- popular posts --> */}
                <div
                  aria-labelledby="login-tab"
                  className="tab-pane fade active show"
                  id="login"
                  role="tabpanel"
                >
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="blog-image rounded">
                        <a href="#" classNameName="model-bg-img-1"></a>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <h4 className="text-center border-b pb-2">Login</h4>
                      <div className="log-reg-button d-flex align-items-center justify-content-between">
                        <button type="submit" className="btn btn-fb">
                          <i className="fab fa-facebook"></i> Login with Facebook
                        </button>
                        <button type="submit" className="btn btn-google">
                          <i className="fab fa-google"></i> Login with Google
                        </button>
                      </div>
                      <hr className="log-reg-hr position-relative my-4 overflow-visible" />
                      <form
                        method="post"
                        action="#"
                        name="contactform"
                        id="contactform"
                      >
                        <div className="form-group mb-2">
                          <input
                            type="text"
                            name="user_name"
                            className="form-control"
                            id="fname"
                            placeholder="User Name or Email Address"
                          />
                        </div>
                        <div className="form-group mb-2">
                          <input
                            type="password"
                            name="password_name"
                            className="form-control"
                            id="lpass"
                            placeholder="Password"
                          />
                        </div>
                        <div className="form-group mb-2">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="exampleCheck"
                          />
                          <label
                            className="custom-control-label mb-0"
                            for="exampleCheck1"
                          >
                            Remember me
                          </label>
                          <a className="float-end" href="#">
                            Lost your password?
                          </a>
                        </div>
                        <div className="comment-btn mb-2 pb-2 text-center border-b">
                          <input
                            type="submit"
                            className="nir-btn w-100"
                            id="submit"
                            value="Login"
                          />
                        </div>
                        <p className="text-center">
                          Don't have an account?{" "}
                          <a href="#" className="theme">
                            Register
                          </a>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
                {/* <!-- Recent posts --> */}
                <div
                  aria-labelledby="register-tab"
                  className="tab-pane fade"
                  id="register"
                  role="tabpanel"
                >
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="blog-image rounded">
                        <a href="#" className="model-bg-img-2"></a>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <h4 className="text-center border-b pb-2">Register</h4>
                      <div className="log-reg-button d-flex align-items-center justify-content-between">
                        <button type="submit" className="btn btn-fb">
                          <i className="fab fa-facebook"></i> Login with Facebook
                        </button>
                        <button type="submit" className="btn btn-google">
                          <i className="fab fa-google"></i> Login with Google
                        </button>
                      </div>
                      <hr className="log-reg-hr position-relative my-4 overflow-visible" />
                      <form
                        method="post"
                        action="#"
                        name="contactform1"
                        id="contactform1"
                      >
                        <div className="form-group mb-2">
                          <input
                            type="text"
                            name="user_name"
                            className="form-control"
                            id="fname1"
                            placeholder="User Name"
                          />
                        </div>
                        <div className="form-group mb-2">
                          <input
                            type="text"
                            name="user_name"
                            className="form-control"
                            id="femail"
                            placeholder="Email Address"
                          />
                        </div>
                        <div className="form-group mb-2">
                          <input
                            type="password"
                            name="password_name"
                            className="form-control"
                            id="lpass1"
                            placeholder="Password"
                          />
                        </div>
                        <div className="form-group mb-2">
                          <input
                            type="password"
                            name="password_name"
                            className="form-control"
                            id="lrepass"
                            placeholder="Re-enter Password"
                          />
                        </div>
                        <div className="form-group mb-2 d-flex">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="exampleCheck1"
                          />
                          <label
                            className="custom-control-label mb-0 ms-1 lh-1"
                            for="exampleCheck1"
                          >
                            I have read and accept the Terms and Privacy Policy?
                          </label>
                        </div>
                        <div className="comment-btn mb-2 pb-2 text-center border-b">
                          <input
                            type="submit"
                            className="nir-btn w-100"
                            id="submit1"
                            value="Register"
                          />
                        </div>
                        <p className="text-center">
                          Already have an account?{" "}
                          <a href="#" className="theme">
                            Login
                          </a>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Model;
