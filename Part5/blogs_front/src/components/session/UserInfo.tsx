import { User } from "../../types/types";
import { AppDispatch, logOutUser } from "../../reduxstate/store";
import { useDispatch } from "react-redux";
import { Button, Card, Icon, Image } from "semantic-ui-react";
import { useRef } from "react";
import { getRandomCat } from "../../utils/utils";

const UserInfo = ({ username, name }: User) => {
  const dispatch = useDispatch<AppDispatch>();
  const imgRef = useRef<string>(getRandomCat(75));

  return (
    <Card>
      <Card.Content>
        <Image
          floated="right"
          src={imgRef.current}
          circular
          bordered
          className="no-margin"
        ></Image>
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{name}</Card.Meta>
        <Button animated size="medium" onClick={() => dispatch(logOutUser())}>
          <Button.Content visible>Log out</Button.Content>
          <Button.Content hidden>
            <Icon name="log out" />
          </Button.Content>
        </Button>
      </Card.Content>
    </Card>
  );
};

export default UserInfo;

