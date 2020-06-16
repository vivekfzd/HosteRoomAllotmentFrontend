import React from "react";
import axios from "axios";
import ModalLoad from "./LoadingModal.js";

class Signup extends React.Component {
  state = {
    error: "",
    disabled: false,
    modalshow: undefined,
  };
  submitSignup = async (e) => {
    e.preventDefault();
    this.setState(() => ({ disabled: true, modalshow: true }));
    const firstName = e.target.elements.firstName.value.trim();
    const lastName = e.target.elements.lastName.value.trim();
    const email = e.target.elements.email.value.trim();
    const password = e.target.elements.password.value;
    const rPassword = e.target.elements.rPassword.value;
    const credential = {};
    try {
      const re = /^[A-Za-z0-9]{8,15}$/;
      if (!re.test(password))
        throw new Error("Password Must contain only AlphaNumerics");
      if (password !== rPassword)
        throw new Error("Both passwords must be same");

      credential.name = firstName + " " + lastName;
      credential.email = email;
      credential.password = password;
      const Data = await axios.post(
        "https://hostel-allotment-api.herokuapp.com/signup",
        credential
      );
      this.props.authenticated(Data.data);
    } catch (e) {
      let msg = "";
      if (e.response) {
        const error = e.response;
        if (error.status >= 400 && error.status < 500) {
          msg = "provided email already exist";
        } else {
          msg = "Please Try Again Later";
        }
      } else {
        msg = e.message;
      }
      this.setState(() => ({ error: msg }));
    }
    this.setState(() => ({ disabled: false, modalshow: undefined }));
  };
  render() {
    return (
      <div className="signupflex">
        {this.state.modalshow && <ModalLoad />}
        <div className="signupflex2">
          <h2 className="singuptag">Sign Up Here...</h2>
          <form className="form" onSubmit={this.submitSignup}>
            {this.state.error && (
              <p className="errorshow">{this.state.error}</p>
            )}
            <p>
              <label htmlFor="firstName">First Name</label>
              <label className="red">*</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="first_name"
                required={true}
              />
            </p>

            <p>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                placeholder="last_name"
                name="lastName"
              />
            </p>

            <div className="email">
              <p>
                <label htmlFor="emailid">Email</label>
                <label className="red">*</label>
                <input
                  placeholder="email_id"
                  type="email"
                  id="emailid"
                  name="email"
                  required={true}
                />
              </p>

              <div className="password">
                <p>
                  <label htmlFor="password_id">Password</label>
                  <label className="red">*</label>
                  <input
                    type="password"
                    id="password_id"
                    name="password"
                    placeholder="password"
                    required={true}
                    minLength={8}
                    maxLength={15}
                  />
                </p>
              </div>

              <div className="retypepassword">
                <p>
                  <label htmlFor="retypePassword_id">Confirm Password</label>
                  <label className="red">*</label>
                  <input
                    type="password"
                    id="retypePassword_id"
                    name="rPassword"
                    placeholder="retype_password"
                    required={true}
                    minLength={8}
                    maxLength={15}
                  />
                </p>
              </div>
              <div className="term">
                <input
                  type="checkbox"
                  id="term_id"
                  name="checkbox"
                  required={true}
                />
                <label className="terms" htmlFor="term_id">
                  I accept the terms of Use & Privacy Policy
                </label>
                <br />
              </div>
              <input
                type="submit"
                id="create_an_Account"
                name="submit"
                value="Create Account"
                disabled={this.state.disabled}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
