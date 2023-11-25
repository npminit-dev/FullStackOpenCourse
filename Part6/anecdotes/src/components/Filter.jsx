import { useDispatch } from "react-redux";
import { changeFilter } from "../reducers/anecdoteReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const handleFilter = (e) => dispatch(changeFilter(e.target.value));

  const handleClear = () => {
    document.querySelector('input[name="filter"]').value = "";
    dispatch(changeFilter(""));
  };

  return (
    <>
      <div>
        <label>
          Filter by text:
          <input onChange={handleFilter} type='text' name='filter'></input>
          <button onClick={handleClear} type='button'>
            CLEAR
          </button>
        </label>
      </div>
    </>
  );
};

export default Filter;
