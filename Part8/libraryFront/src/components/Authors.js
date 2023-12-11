import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, UPDATE_BORN } from "../queries/authors";
import { v4 } from "uuid";
import { loadErrorMessages } from "@apollo/client/dev";

loadErrorMessages();

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS);
  const [editAuthorBorn, { error }] = useMutation(UPDATE_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!props.show) return null;

  const handleUpdate = (e) => {
    e.preventDefault();
    let formData = [...new FormData(e.target)];
    editAuthorBorn({
      variables: { name: formData[0][1], setbornto: parseInt(formData[1][1]) },
    });
  };

  return (
    <>
      <h2>Authors</h2>
      {authors.loading ? (
        <div>LOADING AUTHORS...</div>
      ) : (
        <>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>born</th>
                <th>books</th>
              </tr>
              {authors.data.allauthors.map((a) => (
                <tr key={v4()}>
                  <td>{a.name}</td>
                  <td>{a.born || "unknown"}</td>
                  <td>{a.booksCount || "unknown"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <br></br>
          {props.user && (
            <>
              <h4>Set birth year</h4>
              <form id="updateborn_form" onSubmit={handleUpdate}>
                <label>
                  author to change
                  <select
                    form="updateborn_form"
                    name="author"
                    required
                    onChange={(e) => console.log(e.target.value)}
                  >
                    {authors.data.allauthors.map((author) => {
                      return (
                        <option key={v4()} value={author.name}>
                          {author.name}
                        </option>
                      );
                    })}
                  </select>
                </label>
                <label>
                  new born year:
                  <input
                    form="updateborn_form"
                    name="newborn"
                    type="text"
                    pattern="\d{3,4}"
                    required
                  ></input>
                </label>
                <button type="submit">UPDATE</button>
              </form>
            </>
          )}
          {error && <div>Error fetching update: {error.message}</div>}
        </>
      )}
    </>
  );
};

export default Authors;
