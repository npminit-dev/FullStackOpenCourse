import "./App.css";
import React, { useContext, useEffect } from "react";
import Session from "./components/session/Session";
import UserInfo from "./components/session/UserInfo";
import Messages from "./components/Messages";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { appContext } from "./components/contexts/AppContextProvider";
import SiteHeader from "./components/SiteHeader";
import { Container, Grid } from "semantic-ui-react";

function App(): React.ReactNode {
  const { msg, user } = useContext(appContext)
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/blogs')
  }, []);

  return (
    <div id="app">
      <Grid divided='vertically' stackable={true} verticalAlign="middle" className="no-margin">
        <Grid.Row columns={2}>
          <Grid.Column width={6}>
            <Container fluid={false}>
              <SiteHeader></SiteHeader>
            </Container>
          </Grid.Column>
          <Grid.Column width={6} floated="right">
            <Container fluid={false} className="centered-content">
              {msg !== null && <Messages msg={msg}></Messages>}
              {!user.token || !user.name ? (
                <Session/>
              ) : (
                <UserInfo {...user}></UserInfo>
              )}
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Link to="/users"><div>USERS</div></Link>
      <Link to='/blogs'><div>BLOGS</div></Link>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
