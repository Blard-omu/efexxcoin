import React from 'react';
import './Card.css'

const Card = ({coin}) => {
  return (
    <>
<div className="card-container">
        <div className="coin-card shadow p-2 rounded">
          <div className="coin-info">
          <div className="coin-icon d-flex justify-content-between">
            <img src={coin.iconUrl} alt={coin.name} />
            <h3>{coin.name}</h3>
          </div>
            <div className="card-content d-flex justify-content-between flex-column p-2">
            <p className='text-info'><b className='me-3'>Symbol:</b> {coin.symbol}</p>
            <p className='text-success'><b className='me-3'>Price:</b> ${coin.price}</p>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default Card