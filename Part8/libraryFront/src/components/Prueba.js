import { useSubscription } from '@apollo/client';
import { ADDED_BOOK } from '../queries/authors';

const Prueba = () => {

  useSubscription(ADDED_BOOK, {
    onData: ({ data }) => {
      console.log(data)
    }
  })

  return ( <>
    PRUEBA
  </> );
}
 
export default Prueba;