import Login from "./Login";
import Register from "./Register";
import { Tabs, Tab } from "react-bootstrap";

const Form = ({ userInfo }) => {
  return (
    <div style={container}>
      <Tabs defaultActiveKey='login' id='uncontrolled-tab-example' style={tabContainer}>
        <Tab eventKey='login' title='Login'>
          <Login userInfo={userInfo} />
        </Tab>
        <Tab eventKey='signUp' title='Sign Up'>
          <Register userInfo={userInfo} />
        </Tab>
      </Tabs>
    </div>
  );
};

const container = {
  width: "40%",
  height: "80%",
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  background: "hsla(0, 0%, 17%, 1)",
  boxShadow: "0px 0px 9px 5px hsla(0, 0%, 12%, 1)",
  overflowY: "auto",
};

const tabContainer = {
  fontSize: 21,
};

export default Form;
