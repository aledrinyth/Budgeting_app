import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const HomePage = () => {

  const headingStyle = {
    textAlign: 'center'
  };

  const circleStyle = {
    height: '200px',
    width: '200px',
    backgroundColor: 'red',
    borderRadius: '50%'
  };

  const [redirectToNewPage, setRedirectToNewPage] = useState(false);

  const handleRedirect = () => {
    setRedirectToNewPage(true);
  };

  if (redirectToNewPage) {
    return <Navigate to="/add-transaction" />;
  }

  return (
    <div>
      {/* <h1>This is the home page!</h1>
      <li>
        <Link to="/add-transaction">Add a transaction</Link>
      </li> */}

      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/#">WiseWallet</a>
          <a className="navbar-brand justify-content-end" href="#">
            <img src="https://png.pngtree.com/png-vector/20190704/ourmid/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg" alt="Logo" style={{width:40}} className="rounded-pill"/>
          </a>
        </div>
      </nav>

      <h1 style={headingStyle}>August 2023</h1>
      
      <div className="row">
        <div className="col-sm-4 p-4 my-4 border d-flex flex-column align-items-center">
            <h2 className="text-center mb-4">Overview</h2>
            <div className="circle d-flex justify-content-center align-items-center" style={circleStyle}>
              <div className="text-center">
                <p className="mb-1">Net Savings</p>
                <h4 className="mb-0">-$101.04</h4>
              </div>
            </div>
        </div>
        <div className="col-sm-8 bg-secondary p-4 my-4 border">
          <h3>Net Savings for the Year</h3>
        </div>
      </div>

      <div className="container mt-4">
        <h2 className="text-center">Categories</h2>
        <br/>
        <div className="d-flex justify-content-center">
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-outline-secondary btn-lg">Food</button>
            <button type="button" className="btn btn-outline-secondary btn-lg">Bills</button>
            <button type="button" className="btn btn-outline-secondary btn-lg">Transport</button>
            <button type="button" className="btn btn-outline-secondary btn-lg">Healthcare</button>
            <button type="button" className="btn btn-outline-secondary btn-lg">House</button>
            <button type="button" className="btn btn-outline-secondary btn-lg">Savings</button>
          </div>
        </div>
        <br/>
        <div className="d-flex justify-content-center">
        <button type="button" className="btn btn-success" onClick={handleRedirect}>+Add New Transaction</button>
          </div>
      </div>

    </div>
  
  )
}

export default HomePage
