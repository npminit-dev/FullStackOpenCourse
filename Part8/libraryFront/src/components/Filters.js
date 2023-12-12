import { useQuery } from "@apollo/client";
import { GET_GENRES } from "../queries/books";
import { v4 } from "uuid";

const Filters = ({ setgenre }) => {
  const genres = useQuery(GET_GENRES);

  return (
    <fieldset>
      <button onClick={() => setgenre(null)}><b>RESET</b></button>
      {!genres.loading ? (
        genres.data.getgenres.map((genre) => (
          <button key={v4()} onClick={() => setgenre(genre)}>
            {genre}
          </button>
        ))
      ) : (
        <div>Loading filters...</div>
      )}
    </fieldset>
  );
};

export default Filters;
