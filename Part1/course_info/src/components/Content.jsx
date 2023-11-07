export default function Content(props) {

  /*
    console.log(props)
    debugger // debugger pausa la ejecucion justo en este punto
  */

  return (
    <>
    {
      props.data.map((elem, i) => {
        return <Part key={i} name={elem.name} exercises={elem.exercises}/>
      })
    }
    </>
  )
}

function Part(props) {
  return (
    <p>{ props.name } { props.exercises }</p>
  )
}