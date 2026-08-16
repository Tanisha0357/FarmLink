import React from "react";
import "./MarketTicker.css";

const MarketTicker = ({ items }) => {
  const displayItems = [...items, ...items];

  return (
    <div className="market-ticker-container">
      <div className="ticker-label">
        LIVE MARKET TRENDS:
      </div>
      <div className="ticker-wrap">
        <div className="ticker-move">
          {displayItems.map((item, index) => (
            <div key={index} className="ticker-item">
              <span className="crop-name">{item.crop}</span>
              <span className="crop-price">₹{item.price}</span>
              <span className={`crop-trend ${item.trend.includes('↑') ? 'up' : 'down'}`}>
                {item.trend}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketTicker;
