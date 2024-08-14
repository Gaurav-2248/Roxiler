import React, { useState, useEffect } from 'react';
import { getTransactions } from '../api';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const TransactionTable = () => {
  const [month, setMonth] = useState('March');
  const [search, setSearch] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });
  const [priceRangeData, setPriceRangeData] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getTransactions(month, search, currentPage);
        // console.log(response);

          const data = response?.data?.transactions;
          console.log(data);
          // Extract transactions and pagination details
          const transactionsData = data?.transactions || [];
         
          const totalPages = Math.ceil((data?.total || 0) / (data?.perPage || 10));
          // const totalPages = data?.total 
          // console.log(totalPages);
  
          // Update state with the fetched data
          setTransactions(transactionsData);
          setTotalPages(totalPages);

          const statisticsResponse = await getTransactions(month);
          // console.log(statisticsResponse);
          const staticData = statisticsResponse?.data?.statistics;
          // console.log(staticData);
          setStatistics(staticData);

          const priceRangeResponse = await getTransactions(month, search, currentPage); // Assuming this API also returns price range data
          const priceRangeDistribution = priceRangeResponse.data.priceRangeDistribution;
          // console.log(priceRangeDistribution)
          setPriceRangeData(priceRangeDistribution);

      } catch (error) {
        console.error('Error fetching transactions:', error.message);
      }
    };
  
    fetchTransactions();
  }, [month, search, currentPage]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    setCurrentPage(1); // Reset to first page on month change
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Prepare data for the bar chart
  const chartData = {
    labels: priceRangeData.map(range => range.range),
    datasets: [
      {
        label: 'Number of Items',
        data: priceRangeData.map(range => range.count),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };


  

  return (
    <div className="p-6 bg-[#050a30] text-white">
      <div className='w-[1200px] mx-auto'>
      <h1 className="text-3xl font-bold mb-6 text-center">Transactions Insight Board</h1>
  
  <div className="flex justify-between items-center mb-6">
    <select
      value={month}
      onChange={handleMonthChange}
      className="p-2 border-none bg-[#FCA311] rounded-md text-black"
    >
      {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m) => (
        <option key={m} value={m}>
          {m}
        </option>
      ))}
    </select>

    <input
      type="text"
      value={search}
      onChange={handleSearchChange}
      placeholder="Search by title/description/price"
      className="p-2 border-none border-none bg-[#FCA311] rounded-md placeholder:text-gray-500 text-black"
    />
  </div>

  <div className="mb-6">
    <h2 className="text-xl font-semibold">Transaction Statistics for {month}</h2>
    <div>Total Sale Amount: ${statistics.totalSaleAmount.toFixed(2)}</div>
    <div>Total Sold Items: {statistics.totalSoldItems}</div>
    <div>Total Not Sold Items: {statistics.totalNotSoldItems}</div>
  </div>

  <div className='overflow-auto'>
  <table className="min-w-full bg-white border border-gray-200 rounded-lg mb-4 text-black">
    <thead className="bg-[#FCE181]">
      <tr>
        <th className="py-2 px-4 border-b text-left">Title</th>
        <th className="py-2 px-4 border-b text-left">Description</th>
        <th className="py-2 px-4 border-b text-left">Price</th>
        <th className="py-2 px-4 border-b text-left">Date of Sale</th>
      </tr>
    </thead>
    <tbody className='bg-yellow-100'>
      {transactions.length ? (
        transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td className="py-2 px-4 border-b">{transaction.title}</td>
            <td className="py-2 px-4 border-b">{transaction.description}</td>
            <td className="py-2 px-4 border-b">${transaction.price.toFixed(2)}</td>
            <td className="py-2 px-4 border-b">{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="4" className="py-2 px-4 border-b text-center">No transactions found</td>
        </tr>
      )}
    </tbody>
  </table>
  </div>

  <div className="flex justify-between items-center">
    <button
      onClick={handlePreviousPage}
      disabled={currentPage === 1}
      className="px-4 py-2 bg-[#F8E9A1] text-black rounded-md disabled:bg-gray-400"
    >
      Previous
    </button>
    <span>Page {currentPage} of {totalPages}</span>
    <button 
      onClick={handleNextPage}
      disabled={currentPage === totalPages}
      className="px-4 py-2 bg-[#F8E9A1] text-black rounded-md disabled:bg-gray-400"
    >
      Next
    </button>
    
  </div>

  <div className="mb-6">
    <h2 className="text-xl font-semibold">Price Range Distribution for {month}</h2>
    <div className='bg-white '>
      <Bar
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                return `${context.label}: ${context.raw} items`;
              },
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Price Range',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Number of Items',
            },
            beginAtZero: true,
          },
        },
      }}
    /></div>
  </div>
      </div>
      
    </div>
  );
  

  
};

export default TransactionTable;

