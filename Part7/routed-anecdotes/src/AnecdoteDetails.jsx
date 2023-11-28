import { useLocation } from 'react-router-dom';

const AnecdoteDetails = () => {

  const location = useLocation()

  console.log(location.state)

  return ( <>
    {
      location && location.state ?
      <div style={style}>
      <div>{ location.state.author }</div>
      <cite>{ location.state.content }</cite>
      <a href={ location.state.info }>Info</a>
      <div>Votes: { location.state.votes }</div>
    </div> : <></>
    }  
  </> 
  );
}

const style = {
  display: 'grid',
  gridTemplateRows: 'repeat(3,min-content)',
  padding: '10px 5px'
}
 
export default AnecdoteDetails;