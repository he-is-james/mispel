 
 function SettingsButton(props) {

  return (
    <button onClick={props.onClick} className={`py-2 px-2 ml-4 mr-4 rounded-sm hover:bg-sky ${props.active ? "underline": ""}`}>{props.content}</button>
  );
 }

 export default SettingsButton;