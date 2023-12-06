import {
  AppDispatch,
  likeBlogAsync,
  removeBlogAsync,
} from "../../reduxstate/store";
import { useNavigate, useParams } from "react-router-dom";
import { appContext } from "../contexts/AppContextProvider";
import { useContext, useEffect, useState } from "react";
import { BlogProps } from "../../types/types";
import { useDispatch } from "react-redux";
import { Button, Label, Table } from "semantic-ui-react";
import Comments from "./Comments";
import RemoveModal from "./RemoveModal";

const Blog = (): JSX.Element => {
  const [blogdata, setblogdata] = useState<BlogProps | null>();
  const [likeload, setlikeload] = useState<boolean>(false);
  const [removeload, setremoveload] = useState<boolean>(false);
  const [modalopen, setmodalopen] = useState<boolean>(false);
  const { user, blogs } = useContext(appContext);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setblogdata((b) => blogs.find((blog) => blog.id === id));
  }, [blogs]);

  const handleLikeIncrement = async (): Promise<any> => {
    setlikeload(true);
    if (blogdata) {
      dispatch(
        likeBlogAsync({
          token: user.token || "",
          id: blogdata?.id,
          likes: blogdata?.likes + 1,
        })
      ).then(() => setlikeload(false));
    }
  };

  return (
    <>
      {blogdata && (
        <>
          <Table celled color="teal" stackable={false}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Author</Table.HeaderCell>
                <Table.HeaderCell>URL</Table.HeaderCell>
                <Table.HeaderCell>Likes</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Label ribbon>
                    <strong>{blogdata.title}</strong>
                  </Label>
                </Table.Cell>
                <Table.Cell>{blogdata.author.username}</Table.Cell>
                <Table.Cell>
                  <a href={blogdata.url}>{blogdata.url}</a>
                </Table.Cell>
                <Table.Cell>{blogdata.likes}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Button
            compact
            circular
            primary
            name="backToBlogs"
            title="Go back to blogs page"
            type="button"
            icon="arrow circle left"
            onClick={() => navigate("/blogs")}
          ></Button>
          {user.token !== null && user.token && (
            <Button
              size="mini"
              circular
              compact
              color="purple"
              content="Like"
              icon="heart"
              loading={likeload}
              label={{
                basic: true,
                color: "purple",
                pointing: "left",
                content: blogdata.likes,
              }}
              onClick={async () => handleLikeIncrement()}
            />
          )}
          {blogdata.author.username === user.username &&
            user.token !== null && (
              <Button
                size="medium"
                compact
                color="red"
                loading={removeload}
                onClick={async () => setmodalopen(true)}
                title="Remove blog button"
                type="button"
                icon="trash"
              ></Button>
            )}
          {id && <Comments comments={blogdata?.comments} id={id}></Comments>}
          <RemoveModal
            modalopen={modalopen}
            blogdata={blogdata}
            setmodalopen={setmodalopen}
            setremoveload={setremoveload}
          ></RemoveModal>
        </>
      )}
    </>
  );
};

export default Blog;
