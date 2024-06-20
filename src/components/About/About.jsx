import React from "react";
import './About.css'
import img from '../../images/my.jpg'

function About(){
    return ( <div class="section">
    <div class="image">
        <img src={img}/>
    </div>

    <div class="content">
        <h3>Chaitanya Krishna</h3>
        <ul style={{textAlign:"start"}}>
            <li>Pursuing B-Tech in IIOT at NIT Kurukshetra</li>
            <li>Finished schooling at Sainik school Korukonda</li>
            <li>AIR 78 in NDA 2023</li>
            <li>Hails from RavulaPalem, AndhraPradesh</li>
            <li>Skills: Java,C,Python, Android development, Full Stack development : React+Express,PostGreSQL</li>

        </ul>
    </div>

</div>)
}
export default About;