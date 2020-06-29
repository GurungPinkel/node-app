import React, { useState } from "react";
import Link from "next/link";
import { CustomForm } from "../../lib/form/customForm";
import DatePicker from "react-datepicker";
import styles from "./sign-up-form.module.scss";

const SignUpForm = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const formConfig = {
    initialValues: {
      firstName: "",
      lastName: "",
      password: "",
      email: "",
    },
    validations: {
      firstName: [
        {
          regex: /^.{2,20}$/,
          message: "First name must be between 2-20 characters",
        },
      ],
      lastName: [
        {
          fn: (value) => {
            if (value.length > 20 || value.length < 2) {
              return false;
            }
            return true;
          },
          message: "Last name must be between 2-20 characters",
        },
      ],
      password: [
        {
          regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,20}$/,
          message:
            "Password must be between 8-20 characters and must contain atleast 1 special character and 1 number",
        },
      ],
      email: [
        {
          regex: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
          message: "Invalid Email",
        },
      ],
    },
  };
  const {
    values,
    errors,
    handleInputChange,
    handleBlur,
    handleSubmit,
  } = CustomForm({
    config: formConfig,
    onSubmit: () => formSubmitHandler,
  });

  const formSubmitHandler = () => {
    console.log(values);
  };

  const displayErrors = (key) => {
    if (hasErrors(key)) {
      const errorObj = errors[key];
      return (
        <ul className={styles.errorsList}>
          {errorObj.map((error) => (
            <li key={error} className={`dangerText`}>
              {error}
            </li>
          ))}
        </ul>
      );
    }
  };

  const hasErrors = (key) => {
    const errorObj = errors[key];
    if (errorObj && errorObj.length > 0) {
      return true;
    }
    return false;
  };
  return (
    <div className={styles.SignUpForm}>
      <div className={`title_lg`}>Sign Up</div>
      <form onSubmit={handleSubmit}>
        <div className={`${styles.inputFields}`}>
          <div className={`${styles.inputField}`}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              autoComplete="off"
              value={values.name}
              onBlur={handleBlur}
              onChange={handleInputChange}
              className={`inputBox ${hasErrors("firstName") ? "danger" : null}`}
            />
            {displayErrors("firstName")}
          </div>

          <div className={`${styles.inputField}`}>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              autoComplete="off"
              value={values.name}
              onBlur={handleBlur}
              onChange={handleInputChange}
              className={`inputBox ${hasErrors("lastName") ? "danger" : null}`}
            />
            {displayErrors("lastName")}
          </div>
        </div>
        <div className={`${styles.inputField}`}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            autoComplete="username"
            onBlur={handleBlur}
            onChange={handleInputChange}
            className={`inputBox ${hasErrors("email") ? "danger" : null}`}
          />
          {displayErrors("email")}
        </div>
        <div className={`${styles.inputField}`}>
          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={values.password}
            autoComplete="new-password"
            onBlur={handleBlur}
            onChange={handleInputChange}
            className={`inputBox ${hasErrors("password") ? "danger" : null}`}
          />
          {displayErrors("password")}
        </div>
        <div>
          <div className={`${styles.label} title_sm`}> Birthday </div>
          <div className={`${styles.inputField}`}>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              maxDate={new Date()}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              className={`inputBox`}
            />
          </div>
        </div>
        <div>
          <div className={`${styles.label} title_sm`}> Gender </div>
          <div className={`${styles.inputRadioButtons}`}>
            <div className={`${styles.item}`}>
              <input type="radio" id="male" name="gender" value="male" />
              <label htmlFor="male">Male</label>
            </div>
            <div className={`${styles.item}`}>
              <input type="radio" id="female" name="gender" value="female" />
              <label htmlFor="female">Female</label>
            </div>
          </div>
        </div>
        <div className={styles.signupButton}>
          <button type="submit" value="Sign up" className={`signupButton`}>
            Sign up
          </button>
        </div>
      </form>
      <div className={styles.signInLink}>
        <Link href="/signin">
          <a className="link bold textCenter decoration">
            Already have an account? Sign in
          </a>
        </Link>
      </div>
    </div>
  );
};
export default SignUpForm;
