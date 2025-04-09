import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'

const LinkScraper = () => {
  const [links, setLinks] = useState([]);
  const navigate = useNavigate();

  const handleOpeningSite =(link)=>{
    navigate("/details", { state: link });
  }

  
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch('http://localhost:5000/scrape-links'); 
        const data = await response.json();
        setLinks(data);
      } catch (error) {
        console.error('Error fetching links:', error);
      }
    };

    fetchLinks();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Scraped Links</h2>
      <ul className="list-disc ml-5">
        {links.map((link, index) => (
          <li key={index}>
            <p onClick={() => handleOpeningSite(link)}>
              {link}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LinkScraper;
