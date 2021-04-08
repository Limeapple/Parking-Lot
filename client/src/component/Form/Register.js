import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { withRouter } from "react-router-dom";

import "./styles.css";

const REGISTER_STUDENT = gql`
  mutation register(
    $id: String!
    $firstName: String!
    $lastName: String!
    $gradeLevel: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      id: $id
      firstName: $firstName
      lastName: $lastName
      gradeLevel: $gradeLevel
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      firstName
      lastName
      gradeLevel
    }
  }
`;

function Register({ history, userInfo }) {
  const [variables, setVariables] = useState({
    id: "",
    firstName: "",
    lastName: "",
    gradeLevel: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [registerStudent, { loading }] = useMutation(REGISTER_STUDENT, {
    update(_, res) {
      history.push("/home");
      userInfo(variables);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
  });

  const registerForm = (e) => {
    e.preventDefault();
    registerStudent({ variables });
  };

  return (
    <div className='container'>
      <form className='formContainer' onSubmit={registerForm} style={{ overflowY: "auto" }}>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "5%" }}>
            <label className='label'>School ID</label>
            <br />
            <input
              className='input'
              type='text'
              id='id'
              value={variables.id}
              onChange={(e) => setVariables({ ...variables, id: e.target.value })}
            />
          </div>
          <div>
            <label className='label'>Grade</label>
            <br />
            <select
              id='gradeLevel'
              className='dropdown'
              onChange={(e) => setVariables({ ...variables, gradeLevel: e.target.value })}>
              <option defaultValue hidden>
                Select One
              </option>
              <option value='9'>9</option>
              <option value='10'>10</option>
              <option value='11'>11</option>
              <option value='12'>12</option>
            </select>
          </div>
        </div>
        <label className='label'>First Name</label>
        <br />
        <input
          className='input'
          type='text'
          id='firstName'
          value={variables.firstName}
          onChange={(e) => setVariables({ ...variables, firstName: e.target.value })}
        />
        <br />
        <label className='label'>Last Name</label>
        <br />
        <input
          className='input'
          type='text'
          id='lastName'
          value={variables.lastName}
          onChange={(e) => setVariables({ ...variables, lastName: e.target.value })}
        />
        <br />
        <label className='label'>Password</label>
        <br />
        <input
          className='input'
          type='password'
          id='password'
          value={variables.password}
          onChange={(e) => setVariables({ ...variables, password: e.target.value })}
        />
        <br />
        <label className='label'>Confirm Password</label>
        <br />
        <input
          className='input'
          type='password'
          id='confirmPassword'
          value={variables.confirmPassword}
          onChange={(e) => setVariables({ ...variables, confirmPassword: e.target.value })}
        />
        {Object.values(errors).length > 0 ? (
          <div className=' alert-danger alert-dismissible fade show'>
            <ul>
              {Object.values(errors).map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <button className='button' disabled={loading}>
          {loading ? "Loading..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}

export default withRouter(Register);
