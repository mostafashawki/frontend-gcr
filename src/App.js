import React, { useEffect, useState } from 'react';
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3003/api/data';
// const backendEndpoint = process.env.COPILOT_SERVICE_DISCOVERY_ENDPOINT || 'http://localhost:3000';
// const apiUrl = `http://fsapp1be.${process.env.COPILOT_SERVICE_DISCOVERY_ENDPOINT}:3000/api/data` || 'http://localhost:3000/api/data';
// const COPILOT_SERVICE_DISCOVERY_ENDPOINT = `dev.fsapp2.local`
//http://fsapp2be.${COPILOT_SERVICE_DISCOVERY_ENDPOINT}:3000
// const apiUrl = 'http://fsapp2be.dev.fsapp2.local:3000/api/data';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from the server
    fetch(apiUrl)
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <h1>React App</h1>
      {data ? (
        <p>Data from the server: {data.message}</p>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default App;
