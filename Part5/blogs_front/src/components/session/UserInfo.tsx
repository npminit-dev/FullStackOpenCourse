import { User } from "../../types/types";

const UserInfo = ({ username, name }: User) => {
  return ( 
    <div>
      <h4>Your username: { username }</h4>
      <h5>Your first name: { name }</h5>
    </div>
  );
}
 
export default UserInfo;