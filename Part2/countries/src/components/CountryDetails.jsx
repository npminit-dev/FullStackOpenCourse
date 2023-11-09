import CountryWeather from "./CountryWeather";

const CountryDetails = ({ name, capital, langs, population, flag, alt }) => {
  return ( 
    <>
      <h3>{ name }</h3>
      <p>capitals: <i>{ capital }</i></p>
      <p>languages: <i>{ langs }</i> </p>
      <p>population: <i>{ population }</i></p>
      <img src={ flag } alt={ alt }></img>
      <CountryWeather name={name}></CountryWeather>
    </>
  );
}
 
export default CountryDetails;