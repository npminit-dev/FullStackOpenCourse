import { Container } from "semantic-ui-react";
import { Header, Icon } from "semantic-ui-react";

const SiteHeader = () => {
  return (
    <Container fluid={true} textAlign="center">
      <Header icon className="low-margin-container" size="huge">
        <Icon name="discussions" color="pink" size="massive" />
        <h2 className="low-margin-container">{'<BYTE-BLOG/>'}</h2>
        <Header.Subheader>
          <h4>Create, manage and share you own sofware posts!</h4>
        </Header.Subheader>
      </Header>
    </Container>
  );
};

export default SiteHeader;
