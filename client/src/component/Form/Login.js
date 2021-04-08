import "./styles.css";
import { gql, useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { withRouter } from "react-router-dom";

const LOGIN_USER = gql`
  query login($id: String!, $password: String!) {
    login(id: $id, password: $password) {
      id
      firstName
      lastName
      gradeLevel
      password
      token
    }
  }
`;

function Login({ history, userInfo }) {
  const [variables, setVariables] = useState({
    id: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [loginStudent, { loading }] = useLazyQuery(LOGIN_USER, {
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    onCompleted(data) {
      localStorage.setItem("token", data.login.token);
      history.push("/home");
      userInfo(data.login);
    },
  });

  const login = (e) => {
    e.preventDefault();
    loginStudent({ variables });
  };
  return (
    <div className='container'>
      <form className='formContainer' onSubmit={login}>
        <label className='label'>School ID</label>
        <input
          className='input'
          type='text'
          id='LoginId'
          value={variables.id}
          onChange={(e) => setVariables({ ...variables, id: e.target.value })}
        />
        <br />
        <label className='label'>Password</label>
        <br />
        <input
          className='input'
          type='password'
          id='loginPassword'
          value={variables.password}
          onChange={(e) => setVariables({ ...variables, password: e.target.value })}
        />
        <br />
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
          {loading ? "Loading..." : "Login"}
        </button>
        <div></div>
      </form>
    </div>
  );
}

export default withRouter(Login);
