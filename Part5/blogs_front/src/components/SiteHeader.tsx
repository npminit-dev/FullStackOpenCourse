import { Container } from "semantic-ui-react";
import { Header, Icon } from "semantic-ui-react";

const SiteHeader = () => {
  return (
    <Container fluid={true} textAlign="center">
      <Header as="h3" icon>
        <Icon name="code" size="tiny" />
        BYTE-BLOG
        <Header.Subheader>
          <h4>Create, manage and share you own sofware posts!</h4>
        </Header.Subheader>
      </Header>
    </Container>
  );
};

export default SiteHeader;
