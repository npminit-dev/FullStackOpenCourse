const AddNumber = ({ handleNameChange, handleNumberChange, handleSubmit }) => 
  (
    <form onSubmit={handleSubmit}>
      <h4>Add new</h4>
      <div>
        <div>
          <label>Name:
            <input
              required
              pattern="[A-Za-záéíóúÁÉÍÓÚ ]{2,50}"
              minLength={2}
              maxLength={50}
              onChange={handleNameChange}
            />
          </label>
        </div>
        <div>
          <label>Number: 
            <input
              required
              pattern="\+?[\d\-]{4,20}"
              minLength={4}
              maxLength={20}
              onChange={handleNumberChange}
            ></input>
          </label>
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );

export default AddNumber;
