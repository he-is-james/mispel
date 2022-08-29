 
 function SettingButton(props) {

  return (
    <button onClick={props.onClick} className={`py-2 px-2 mr-8 rounded-sm hover:bg-sky ${props.active ? "underline": ""}`}>{props.text}</button>
  );
 }

 export default SettingButton