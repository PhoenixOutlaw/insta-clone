import { useSelector } from "react-redux";
import "./App.css";
import { Feed } from "./components/Feed";
import { Header } from "./components/Header";
import { login, logout, selectlogin } from "./features/loginSlice";
import { Login } from "./components/Login";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Userprofile } from "./components/Userprofile";
import { Settingedit} from "./components/Settingedit";
import { useHistory } from "react-router";

function App() {
  const history = useHistory()
  const dispatch = useDispatch();
  const signin = useSelector(selectlogin);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          login({
            email: user.email,
            photoURL: user.photoURL,
            displayName: user.displayName,
          })
        );
      } else logout();
    });
  }, []);

  return (
    <div className="App">
      {(signin ) ? (
        <Router>
          <Header />
          {signin.acc!=="NEW"&&(            
            <div>
            <Switch>
              <Route path="/" exact >
                <>
                  <Feed />
                </>
              </Route>
              <Route path="/profile/:usern">
                <Userprofile/>
              </Route>
              <Route path="/profile">
                <Userprofile/>
              </Route>
              <Route path="/account/edit">
                <Settingedit/>
              </Route>
            </Switch>
          </div>
              )}
           {signin.acc==="NEW"&&(
              <Settingedit/>
             
           )}   
        </Router>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
