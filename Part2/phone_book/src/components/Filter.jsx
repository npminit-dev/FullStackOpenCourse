const Filter = ({setList, defaultList}) => {
  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    if (!value.length) setList(defaultList);
    else {
      setList(
          defaultList.filter((person) => {
            const lowercased = person.name.toLowerCase();
            if (lowercased.startsWith(value)) return true;
            else return false;
          }),
      );
    }
  };

  return (
    <form>
      <label>
        filter:
        <input
          pattern="\+?\d{0,20}"
          maxLength={20}
          onChange={handleChange}
        ></input>
      </label>
    </form>
  );
};

export default Filter;
