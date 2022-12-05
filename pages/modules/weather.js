import { Layout } from "../Layout.js";
import { Text, Spacer, Input } from "@nextui-org/react"
import { Box } from "../Box.js"

import { useState } from "react";

import { SendButton } from "../resources/SendButton";
import { SendIcon } from "../resources/SendIcon";

export default function Weather() {
  const [cityJSON, setCityJson] = useState('');

  let [cities, setCity] = useState([]);

  const getWeather = async(cityName) => {
    if(cityName.length >= 3) {
        fetch('https://geocoding-api.open-meteo.com/v1/search?name=' + cityName)
        .then((response) => response.text())
        .then((data) => {
            //setCity([]); 
            const obj = JSON.parse(data);
            setCityJson(JSON.stringify(obj.results))
            //alert('len: ' + obj.results.length)
            let tmp = []
            obj.results.forEach(element => {
              console.log("x:", element.name)
              tmp = [...tmp,  {
                key: element.id,
                name: element.name,
                country: element.country_code,
                elevation: element.elevation,
                latitude: element.latitude,
                longitude: element.longitude
              }]
              
            });
            setCity([ ...tmp]);
            console.log("len:", cities.length)
        } 
        );
    }
    // https://geocoding-api.open-meteo.com/v1/search?name=Warsaw
    // https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,relativehumidity_2m,rain,showers,snow_depth,surface_pressure,visibility
    //const { data, eror} = (...args) => fetch(...args).then((res) => res.json());
  }

  return (
    <Layout>
        <Box css={{px: "$12", mt: "$8", "@xsMax": {px: "$10"}}}>
            <Text h2>Weather</Text>
            <Spacer y={1} />
            <Input 
            clearable 
            contentRightStyling={false} 
            bordered 
            placeholder="City"
            onChange={(e) => getWeather(e.target.value)}
            contentRight={
                <SendButton>
                  <SendIcon />
                </SendButton>
            } />

      <Text>{cityJSON}</Text>
      <ul>
        {cities.map(city => (
          <li key={city.key}>{city.name} {city.country} {city.elevation} {city.latitude} {city.longitude}</li>
        ))}
      </ul>

        </Box>
    </Layout>
  )
}