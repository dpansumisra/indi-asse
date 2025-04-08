import React, { useEffect, useState } from "react";

function CarOptions() {
  
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://indirides.com/city-to-city/mumbai/kolkata");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/scrape?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        setCarData(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCarData();
  }, [url]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!carData) return <div className="no-data">No data found.</div>;

  return (
    
    <div className="container">
      
      <div className="box">
      <h className= "heading">From to</h>
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
