import ApolloProvider from "./ApolloProvider";
import { BrowserRouter, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";

import Form from "./component/Form/Form";
import Homepage from "./component/Homepage";
import Bar from "./component/Navbar";
import { useState } from "react";

let user;

const token = localStorage.getItem("token");

if (token) {
  const decodedToken = jwtDecode(token);
  const expiresAt = new Date(decodedToken.exp * 1000);

  if (new Date() > expiresAt) localStorage.removeItem("token");
  else user = decodedToken;
}

function App() {
  const [userInfo, setUserInfo] = useState(user);

  return (
    <ApolloProvider>
      <BrowserRouter>
        <Route exact path='/' render={() => <Form userInfo={setUserInfo} />} />
        <Route exact path='/home' component={Bar} />
        <Route exact path='/home' render={() => <Homepage userInfo={userInfo} />} />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
