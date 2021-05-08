import React from "react";
import { Button } from "reactstrap";
import '../bootstrap/css/bootstrap.min.css';

import { auth } from "../firebase";

const SignOutButton = () => (
  <div style={{marginTop:10}}>
  <Button className="btn btn-danger" onClick={auth.doSignOut}>
    Sign Out
  </Button>
  </div>
);

export default SignOutButton;
