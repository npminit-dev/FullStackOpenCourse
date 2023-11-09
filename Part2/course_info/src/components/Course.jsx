const Course = ({ course }) => {
  const getSum = (parts) =>
    parts.reduce((acc, curr) => (acc += curr.exercises), 0);

  return (
    <>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total sum={getSum(course.parts)}></Total>
    </>
  );
};

const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <p><strong>Number of exercises {sum}</strong></p>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part part={part} key={part.id}></Part>
      ))}
  </>
);

export default Course;