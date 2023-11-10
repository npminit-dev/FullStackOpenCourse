import CountryWeather from "./CountryWeather";

const CountryDetails = ({ name, capital, capitalcoords, langs, population, flag, alt }) => {

  return ( 
    <>
      <h3>{ name }</h3>
      <p>capitals: <i>{ capital }</i></p>
      <p>languages: <i>{ langs }</i> </p>
      <p>population: <i>{ population }</i></p>
      <img src={ flag } alt={ alt } style={{height: '100px', width: '150px'}}></img>
      <CountryWeather capital={capital} capitalcoords={capitalcoords}></CountryWeather>
    </>
  );
}
 
export default CountryDetails;