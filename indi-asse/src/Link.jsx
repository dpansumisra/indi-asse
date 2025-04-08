// import React from 'react'

// const Link = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Link
import React, { useState, useEffect } from "react";

const Link = () => {
  const [links, setLinks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/links");
        const data = await response.json();
        setLinks(data);
      } catch (err) {
        console.error("Error fetching links:", err);
        setError("Failed to fetch links.");
      }
    };

    fetchLinks();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Available Links</h2>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Link;
