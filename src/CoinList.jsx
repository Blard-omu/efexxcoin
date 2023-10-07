import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import Loader from "./Loader";

const CoinList = () => {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = "https://coinranking1.p.rapidapi.com/coins";
      const headers = {
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        'X-RapidAPI-Key': '11286476camsh21a72f9ea6e55bep1d8d3djsnab0b968b2894', // You may need to change this to your own API key
      };

      try {
        // Calculate the offset based on the current page
        const offset = (currentPage - 1) * coinsPerPage;

        const response = await axios.get(apiUrl, {
          headers,
          params: {
            referenceCurrencyUuid: "yhjMzLPhuIDl",
            timePeriod: "24h",
            "tiers[0]": "1",
            orderBy: "marketCap",
            orderDirection: "desc",
            limit: 50,
          },
        });

        const coinData = response.data.data.coins;
        setCoins(coinData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage]); 

  const totalPages = Math.ceil(coins.length / coinsPerPage);

  const truncatedCoins = coins.slice((currentPage - 1) * coinsPerPage, currentPage * coinsPerPage);
  // console.log(truncatedCoins);

// For Loader
  if (isLoading) {
    return <><Loader/></>;
  }


  // Handlers
  const handlePrevPageClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPageClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      console.log(currentPage);
    }
  };

  return (
    <div className="coin-list container ">
      <div className="col-md-4">
      {truncatedCoins.map((coin) => (
        <Card key={coin.uuid} coin={coin} />
      ))}
      </div>
      <div className="pagination">
        <button
        className="btn btn-primary"
          onClick={handlePrevPageClick}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-secondary text-center">Page {currentPage} of {totalPages}</span>
        <button
        className="btn btn-primary "
          onClick={handleNextPageClick}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CoinList;
