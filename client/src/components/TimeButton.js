 
 function TimeButton(props) {

  const handleClick=()=> {
  }

  return (
    <button className="py-2 px-2 mr-8 rounded-sm hover:bg-sky focus:underline">{props.time}</button>
  );
 }

 export default TimeButton;