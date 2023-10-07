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
        'X-RapidAPI-Key': '11286476camsh21a72f9ea6e55bep1d8d3djsnab0b968b2894',
      };

      try {
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
  }, []);

  const totalPages = Math.ceil(coins.length / coinsPerPage);

  // Truncate the coins array based on the currentPage
  const truncatedCoins = coins.slice((currentPage - 1) * coinsPerPage, currentPage * coinsPerPage);

  const handlePrevPageClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPageClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (isLoading) {
    return <div><Loader/></div>;
  }

  // Create pagination items
  const paginationItems = [];
  for (let i = 1; i <= totalPages; i++) {
    const isCurrentPage = i === currentPage;
    paginationItems.push(
      <li className={`page-item ${isCurrentPage ? "active" : ""}`} key={i}>
        <a
          className="page-link"
          onClick={() => setCurrentPage(i)}
          href=""
        >
          {i}
        </a>
      </li>
    );
  }

  return (
    <div className="">
      <div className="card-container col-md-4">
      {truncatedCoins.map((coin) => (
        <Card key={coin.uuid} coin={coin} />
      ))}
      </div>
      <nav aria-label="...">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <a className="page-link" onClick={handlePrevPageClick} href="#">
              Previous
            </a>
          </li>
          {paginationItems}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <a className="page-link" onClick={handleNextPageClick} href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default CoinList;
