// src/components/DataTable.js

import React from 'react';

const DataTable = ({ statistics, priceRangeDistribution, categoryDistribution }) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Statistics</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b text-left">Total Sale Amount</th>
            <th className="py-2 px-4 border-b text-left">Total Sold Items</th>
            <th className="py-2 px-4 border-b text-left">Total Not Sold Items</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b">${statistics.totalSaleAmount.toFixed(2)}</td>
            <td className="py-2 px-4 border-b">{statistics.totalSoldItems}</td>
            <td className="py-2 px-4 border-b">{statistics.totalNotSoldItems}</td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mt-8 mb-4">Price Range Distribution</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b text-left">Price Range</th>
            <th className="py-2 px-4 border-b text-left">Number of Items</th>
          </tr>
        </thead>
        <tbody>
          {priceRangeDistribution.map((item, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{item.range}</td>
              <td className="py-2 px-4 border-b">{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mt-8 mb-4">Category Distribution</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b text-left">Category</th>
            <th className="py-2 px-4 border-b text-left">Number of Items</th>
          </tr>
        </thead>
        <tbody>
          {categoryDistribution.map((item, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{item.category}</td>
              <td className="py-2 px-4 border-b">{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
