import { useState, useEffect } from 'react'
import React from "react"
import View from './View'



const Countries = ({ filteredCountries }) => {
    const [view, setView] = useState(filteredCountries[0])
    const [length, setLength] = useState(filteredCountries.length)
    const handleCountryView = (country) => {
        setLength(1)
        setView((prevVal) => prevVal = country)
    }
    return <div>
        {(length === 1 || filteredCountries.length === 1) ? <View props={view}></View> : filteredCountries.map((country, i) => { return <div key={i} ><><p>{country.name.common}</p><button onClick={(() => handleCountryView(country))}>show</button></></div> })}
    </div>
}
export default Countries