export default function Total(props) {
  return (
    <p>
      <strong>Number of exercises:</strong> 
      { ' ' + props.data.reduce((acc, curr) => acc += curr.exercises, 0) }
    </p>
  )
}