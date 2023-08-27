import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage'; // Adjust the path if necessary
import AddTransaction from './components/AddTransaction'; // Adjust the path if necessary

function App() {
  const [data, setData] = useState({ members: [] });

  useEffect(() => {
    fetch("./members")
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return res.json();
        } else {
          throw new Error('Response was not JSON');
        }
      })
      .then(data => {
        setData(data);
        console.log(data);
      })
      .catch(error => {
        console.error("There was a problem with the fetch operation:", error.message);
      });
  }, []); 

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/add-transaction" component={AddTransaction} />
          <Route path="/members" render={() => (
            (typeof data.members === 'undefined' || data.members.length === 0) ? (
              <p>loading.....</p>
            ) : (
              data.members.map((member) => (
                <p key={member.id}>{member.name}</p> // Assuming each member has an 'id' and 'name' property
              ))
            )
          )} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
