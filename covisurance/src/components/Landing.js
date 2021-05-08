import React from "react";
import '../bootstrap/css/bootstrap.min.css'
import * as routes from "../constants/routes";
import { Button } from "reactstrap";

const LandingPage = ({ history}) => (
  <div className="jumbotron">
  <h1 className="display-4">COVISURANCE</h1>
  <p className="lead">Your personal COVID Insurance</p>
  <hr className="my-4" />
  <p>Fill in your details and get instant insurance in your wallet.</p>
  <p className="lead">
  <Button color="info" onClick={() => { history.push(routes.SIGN_IN) }}>
    Get Started
  </Button>
  </p>
  </div>
);

export default LandingPage;
