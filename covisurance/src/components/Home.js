import React, { Component } from "react";
import "../bootstrap/css/bootstrap.min.css";
import withAuthorization from "./withAuthorization";
import { db } from "../firebase";
import { db1 } from "../firebase/firebase";
import FileUploader from "react-firebase-file-uploader";
import firebase from "firebase";

//A Higher order function with prop name as key and the value to be assigned to
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class HomePage extends Component {
  state = {
    users: null,
    username: "",
    aadhar: 0,
    phone: 0,
    nominee: "",
    nomineephone: 0,
    relation: "",
    loading: true,
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: "",
  };

  componentDidMount() {
    // , db1.onceGetUsers().then(res => {
    //   this.setState({
    //     users: res.val()
    //   });
    // });

    const { loggedUser } = this.props;
    db.doGetAnUnser(loggedUser.uid).then((res) => {
      this.setState({
        username: res.val().username,
        loading: false,
      });
    });
  }

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = (progress) => this.setState({ progress });
  handleUploadError = (error) => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = (filename) => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("documents")
      .child(filename)
      .getDownloadURL()
      .then((url) => this.setState({ avatarURL: url }));
  };

  onSubmit = (event, history) => {
    const { aadhar, phone, nominee, nomineephone, relation, avatar } = this.state;

    event.preventDefault();
    this.setState({
      loading: true,
    });

    db1
      .collection("insurance")
      .add({
        aadhar: aadhar,
        phone: phone,
        nominee: nominee,
        nomineephone: nomineephone,
        relation: relation,
        avatar: avatar,
      })
      .then(() => {
        window.location.assign("https://www.google.com")
        this.setState({
          loading: false,
        })
      })
      .catch((error) => {
        alert("error.message");
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    const {
      username,
      loading,
      aadhar,
      phone,
      nominee,
      nomineephone,
      relation
    } = this.state;

    // console.log("dasdf", this.props.loggedUser);
    return (
      <div>
        <h1 className="display-h1">Personal Details</h1>
        {!loading && (
          <p className="centered">
            Hello {username}! Kindly fill out this form to continue.
          </p>
        )}

        <form onSubmit={this.onSubmit}>

          <div class="form-group">
            <label>Aadhar Number</label>
            <input
              type="number"
              class="form-control"
              name="aadhar"
              placeholder="XXXX-XXXX-XXXX"
              value={aadhar}
              onChange={(e) =>
                this.setState(byPropKey("aadhar", e.target.value))
              }
              required
            />
          </div>

          <div class="form-group">
            <label>Phone Number</label>
            <input
              type="number"
              class="form-control"
              name="phone"
              placeholder="9411XXXXXX"
              value={phone}
              onChange={(e) =>
                this.setState(byPropKey("phone", e.target.value))
              }
              required
            />
          </div>

          <div class="form-group">
            <label>Nominee's Name</label>
            <input
              type="text"
              class="form-control"
              name="nominee"
              placeholder="Nominee"
              value={nominee}
              onChange={(e) =>
                this.setState(byPropKey("nominee", e.target.value))
              }
              required
            />
          </div>

          <div class="form-group">
            <label>Nominee's Phone Number</label>
            <input
              type="number"
              class="form-control"
              name="nomineephone"
              placeholder="8708XXXXXX"
              value={nomineephone}
              onChange={(e) =>
                this.setState(byPropKey("nomineephone", e.target.value))
              }
              required
            />
          </div>

          <div class="form-group">
            <label>Relationship</label>
            <input
              type="text"
              class="form-control"
              name="relation"
              placeholder="Son/Daughter/Wife/Son-in-Law etc."
              value={relation}
              onChange={(e) =>
                this.setState(byPropKey("relation", e.target.value))
              }
              required
            />
          </div>

          <div>
          <p className="lead">*Upload Certificate of specified relationship with Nominee</p>
          <label>Image Preview:</label>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          {this.state.avatarURL && <img src={this.state.avatarURL} alt="file"/>}
          <div  style={{marginTop:20, marginBottom:20}}>
          <FileUploader
            accept="documents/*"
            name="avatar"
            randomizeFilename
            storageRef={firebase.storage().ref("documents")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
          </div>
          </div>
            <div>
          <button
            type="submit"
            class="btn btn-success"
          >
            Submit
          </button>
          </div>
        </form>

        {/* {!!users && <UserList users={users} />} */}
      </div>
    );
  }
}

// const UserList = ({ users }) => (
//   <div>
//     {console.log("users", users)}
//     <h2>List of Usernames of Users</h2>
//     <p>(Saved on Sign Up in Firebase Database)</p>

//     {Object.keys(users).map(key => (
//       <div key={key}>{users[key].username}</div>
//     ))}
//   </div>
// );

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage); //grants authorization to open endpoint if an user is signed in
