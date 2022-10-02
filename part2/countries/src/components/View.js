import React from "react";
import { useState, useEffect } from 'react'
import axios from "axios";
import Weather from "./Weather";
//cdb765aaa7a131319d24d01f8100d292
const View = ({ props }) => {
    return <><h1>{props.name.common}</h1><p>capital {props.capital}</p><p>area {props.area}</p>
        <h2>languages:</h2>
        <ul>{Object.keys(props.languages).map((language, id) => { return <li key={id}>{props.languages[language]}</li> })}</ul>
        <img src={props.flags.png}></img>
        <Weather capital={props.capital}></Weather>
    </>
}

export default View