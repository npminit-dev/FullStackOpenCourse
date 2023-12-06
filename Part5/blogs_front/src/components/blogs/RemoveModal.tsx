import { Button, Confirm, Header, Icon, Modal } from "semantic-ui-react";
import { RemoveBlogProps } from "../../types/types";
import { useDispatch } from "react-redux";
import { removeBlogAsync, setMessage } from "../../reduxstate/store";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { appContext } from "../contexts/AppContextProvider";

const RemoveModal = ({
  modalopen,
  setmodalopen,
  setremoveload,
  blogdata,
}: RemoveBlogProps) => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { user } = useContext(appContext);

  const handleRemove = async (): Promise<any> => {
    setremoveload(true);
    setmodalopen(false);
    dispatch(setMessage({ msg: "Removing the blog", type: "loading" }));
    if (blogdata) {
      dispatch(
        removeBlogAsync({
          token: user.token || "",
          id: blogdata.id,
        })
      )
        .then(() => {
          setremoveload(false);
          dispatch(setMessage({ msg: "Blog deteled.", type: "info" }));
          navigate("/blogs");
        })
        .catch((err: any) => {
          console.log(err);
          setremoveload(false);
          dispatch(
            setMessage({
              msg: "We couldn't delete your blog, try again later",
              type: "error",
            })
          );
          navigate("/blogs");
        });
    }
  };

  return (
    <Confirm
      open={modalopen}
      onCancel={() => setmodalopen(false)}
      onConfirm={() => handleRemove()}
      header={
        <Header>
          <i>"{blogdata?.title}"</i> will be removed.
        </Header>
      }
      content="confirm this action?"
      confirmButton="Confirm"
      cancelButton="Cancel"
    ></Confirm>
  );
};

export default RemoveModal;
