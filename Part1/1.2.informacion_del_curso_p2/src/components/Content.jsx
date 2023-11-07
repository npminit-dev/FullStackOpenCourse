export default function Content(props) {
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
    <p>{ props.name } {props.exercises}</p>
  )
}