import { Button, Header, Icon, Modal } from "semantic-ui-react";
import { RemoveBlogProps } from "../../types/types";
import { useDispatch } from "react-redux";
import { removeBlogAsync } from "../../reduxstate/store";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { appContext } from "../contexts/AppContextProvider";

const RemoveModal = ({ modalopen, setmodalopen, setremoveload, blogdata }: RemoveBlogProps) => {

  const dispatch = useDispatch<any>()
  const navigate = useNavigate()
  const { user } = useContext(appContext)

  const handleRemove = async (): Promise<any> => {
    setremoveload(true)
    if (blogdata) {
      dispatch(
        removeBlogAsync({
          token: user.token || "",
          id: blogdata.id,
        })
      ).then(() => {
        setremoveload(false)
        navigate("/blogs")
      });
    }
  };

  return ( 
    <Modal open={modalopen}>
      <Header>
        <Icon name="trash"></Icon>
      </Header>
      <Modal.Content>

      </Modal.Content>
      <Modal.Actions>
        <Button></Button>
        <Button></Button>
      </Modal.Actions>
    </Modal>
  );
}
 
export default RemoveModal;


