import { useLocation, useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { BlogProps, User as UP } from "../../types/types";
import { Button, Header, List } from "semantic-ui-react";

const User = () => {
  let { state } = useLocation();
  let navigate = useNavigate();

  return (
    <>
      {state && (
        <>
          <Header>{state.username} posts</Header>
          {state.blogs.length ? (
            <List size="large">
              {state.blogs.map((blog: Partial<BlogProps & UP>) => (
                <List.Item key={v4()}>
                  <List.Icon name="minus"></List.Icon>
                  <List.Content>
                    <List.Header>{blog.title}</List.Header>
                    <List.Description>likes: {blog.likes}</List.Description>
                    {blog.comments && (
                      <List.Description>
                        comments: {blog.comments.length}
                      </List.Description>
                    )}
                  </List.Content>
                </List.Item>
              ))}
            </List>
          ) : (
            <div className="secondary-font high-margin-container max-widthed centered-content">
              <span className="high-margin-container">
                <i>Nothing to see here...</i>
              </span>
            </div>
          )}
        </>
      )}
      <Button
        compact
        circular
        color="red"
        name="backToUsersPage"
        title="Go back to users page"
        type="button"
        icon="arrow circle left"
        onClick={() => navigate("/users")}
      ></Button>
    </>
  );
};

export default User;
