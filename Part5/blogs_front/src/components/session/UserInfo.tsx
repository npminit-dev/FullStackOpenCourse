import { User } from "../../types/types";

const UserInfo = ({ username, name }: User) => {
  return ( 
    <div>
      <h4>{ username } - {name} logged</h4>
    </div>
  );
}
 
export default UserInfo;