import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { FormControl, NativeSelect } from "@material-ui/core";
import Map from "./Map";
import "leaflet/dist/leaflet.css";
import Cards from "./Cards/Cards";
import Chart from "./Chart/Chart";
import corona from "./images/covid.png";

//https://disease.sh/v3/covid-19/countries

function App() {
  // eslint-disable-next-line
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({
    lat: 20.5937,
    lng: 78.9629,
  });
  const [mapZoom, setMapZoom] = useState(4);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
          setMapCountries(data);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    console.log(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
        if (countryCode !== "worldwide") {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4.3);
        }
      });
  };

  return (
    <Router>
      <div className="app">
        <div className="app__header">
          {/* <h1>COVID-19 Tracker</h1> */}
          <Link to="/">
            <img src={corona} alt="Covid-19" className="ant" />
          </Link>
          <Link to="/" className="link">
            <h3
              style={{ color: " #9e5c00" }}
              className="removedeco"
              onClick={() => setCasesType("cases")}
            >
              <b>
                Infected {"\u00A0"}
                {"\u00A0"}
              </b>
            </h3>
          </Link>
          <Link to="/" className="link">
            <strong>
              <h3
                style={{ color: "#7dd71d" }}
                className="removedeco"
                onClick={() => setCasesType("recovered")}
              >
                Recovered{"\u00A0"}
                {"\u00A0"}
              </h3>
            </strong>
          </Link>
          <Link to="/" className="link">
            <b>
              <h3
                style={{ color: "#ff0000" }}
                className="removedeco"
                onClick={() => setCasesType("deaths")}
              >
                Deaths{"\u00A0"}
                {"\u00A0"}
              </h3>
            </b>
          </Link>
          <Link to="/chart" className="link">
            <h3 className="graph">Graph</h3>
          </Link>
        </div>
        <div>
          <Cards data={countryInfo} />
          <br />
        </div>
        <div className="app__dropdown">
          <FormControl>
            <NativeSelect
              className="options"
              defaultValue="IN"
              onChange={onCountryChange}
            >
              <option value="worldwide"> Worldwide</option>

              {countries.map((country, i) => (
                <option key={i} value={country.value}>
                  {country.name}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </div>
        <Switch>
          <Route path="/" exact>
            <Map
              countries={mapCountries}
              casesType={casesType}
              center={mapCenter}
              zoom={mapZoom}
            />
          </Route>
        </Switch>
        <Switch>
          <Route path="/chart" exact>
            <Chart
              data={countryInfo}
              value={() => setInputCountry("worldwide")}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
