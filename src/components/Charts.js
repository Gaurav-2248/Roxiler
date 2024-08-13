// src/components/Charts.js

import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, ArcElement);

const Charts = ({ priceRangeDistribution, categoryDistribution }) => {
  // Prepare data for bar chart (price range distribution)
  const priceRangeData = {
    labels: priceRangeDistribution.map(item => item.range),
    datasets: [
      {
        label: 'Number of Items',
        data: priceRangeDistribution.map(item => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for pie chart (category distribution)
  const categoryData = {
    labels: categoryDistribution.map(item => item.category),
    datasets: [
      {
        label: 'Number of Items',
        data: categoryDistribution.map(item => item.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Price Range Distribution</h2>
      <div className="bg-white p-4 border border-gray-200 rounded-lg">
        <Bar data={priceRangeData} options={{ responsive: true }} />
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">Category Distribution</h2>
      <div className="bg-white p-4 border border-gray-200 rounded-lg">
        <Pie data={categoryData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default Charts;
