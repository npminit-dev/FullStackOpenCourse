import "./App.css";
import React, { useContext, useEffect } from "react";
import Session from "./components/session/Session";
import UserInfo from "./components/session/UserInfo";
import Messages from "./components/Messages";
import { Outlet, useNavigate } from "react-router-dom";
import { appContext } from "./components/contexts/AppContextProvider";
import SiteHeader from "./components/SiteHeader";
import { Container, Grid, Tab } from "semantic-ui-react";

function App(): React.ReactNode {
  const { msg, user, tabindex, settabindex } = useContext(appContext);
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/blogs");
  }, []);

  const handleTabChange = (idx: any) => {
    switch (idx) {
      case 0:
        navigate("/blogs");
        break;
      case 1:
        navigate("/users");
        break;
    }
  };

  return (
    <div id="app">
      <Grid
        divided="vertically"
        stackable={true}
        verticalAlign="middle"
        className="no-margin"
      >
        <Grid.Row columns={2}>
          <Grid.Column width={6}>
            <Container fluid={false}>
              <SiteHeader></SiteHeader>
            </Container>
          </Grid.Column>
          <Grid.Column width={6} floated="right">
            <Container fluid={false} className="centered-content">
              {!user.token || !user.name ? (
                <Session />
              ) : (
                <UserInfo {...user}></UserInfo>
              )}
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Messages></Messages>
      <Tab
        panes={[
          {
            menuItem: "BLOGS",
            render: () => (
              <Tab.Pane>
                <Outlet></Outlet>
              </Tab.Pane>
            ),
          },
          {
            menuItem: "USERS",
            render: () => (
              <Tab.Pane>
                <Outlet></Outlet>
              </Tab.Pane>
            ),
          },
        ]}
        activeIndex={tabindex}
        renderActiveOnly={true}
        onTabChange={(_, { activeIndex }) => {
          settabindex(activeIndex)
          handleTabChange(activeIndex)}
        }
      ></Tab>
      <span style={{ position: "absolute", top: '5px', left: '10px', opacity: .4}}>
        Example user: <span>Username: Dr Nick |</span> <span>Password: 1234</span>
      </span>
    </div>
  );
}

export default App;
