import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function CarOptions() {
  const location = useLocation();
  const urlData = location.state;
  const [from, setfrom] = useState();
  const [to, setto] = useState();
  
  
  
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const parsedUrl = new URL(urlData);
        const pathSegments = parsedUrl.pathname.split("/").filter(Boolean);
        const source = pathSegments[1];       
        const destination = pathSegments[2];
        console.log(pathSegments);
        const finalurl = `https://indirides.com/city-to-city/${source}/${destination}`;
        setfrom(source);
        setto(destination);
        const response = await fetch(`http://localhost:5000/api/scrape?url=${encodeURIComponent(finalurl)}`);
        const data = await response.json();
        console.log(data);
        console.log(source);
        console.log(destination);
        setCarData(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCarData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!carData) return <div className="no-data">No data found.</div>;

  return (
    
    <div className="container">
      
      <div className="box">
      <h1 className= "heading"> From {from} to {to} </h1>
        <h2 className="heading">Available Car Options</h2>

        <div className="trip-info">
          <p><strong>Distance:</strong> {carData.distance}</p>
          <p><strong>Travel Time:</strong> {carData.travelTime}</p>
          <p><strong>Best Option:</strong> {carData.bestOption}</p>
        </div>

        <div className="car-list">
          {carData.carOptions.map((carName) => {
            const car = carData.carDetails[carName];
            return (
              <div className="car-card" key={carName}>
                <div className="car-fare">{car.fare}</div>
                <img src={car.image} alt={carName} className="car-image" />
                <h3 className="car-title">{carName}</h3>
                <p className="car-desc">{car.description}</p>
                <ul className="car-features">
                  {car.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CarOptions;
