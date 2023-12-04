import { useLocation, useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { BlogProps, User as UP } from "../../types/types";

const User = () => {
  let { state } = useLocation();
  let navigate = useNavigate();

  return (
    <>
      {state && (
      <>
        <h3>{state.username} posts:</h3>
        <span>
          {state.blogs.map((blog: Partial<BlogProps&UP>) => (
            <div key={v4()}>
              <i>"{blog.title}"</i> - likes: {blog.likes}
            </div>
          ))}
        </span>
      </>
      )}
      <button
        type="button"
        name="back to users list"
        title="back"
        onClick={() => navigate("/users")}
      >Back</button>
    </>
  );
};

export default User;
