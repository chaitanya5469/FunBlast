import React from "react";
import styles from "./Button.scss";

function Button(props){
   
    return <div className="button-container">
    <button  className="mas">{props.text}</button>
    <button className="button" id='work' type="button" name="Hover">{props.text}</button>
</div>


}
export default Button;