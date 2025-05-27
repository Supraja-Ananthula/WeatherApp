import React from 'react';
// Change from 'Line' to 'Bar'
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  // Add BarElement, Tooltip, Legend specific to Bar chart
  BarElement, // Important: Register BarElement for Bar charts
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './WeatherChart.css'; // Import chart specific CSS

// Register Chart.js components for a Bar chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement, // Register BarElement
  Title,
  Tooltip,
  Legend
);

const WeatherChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.day),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: data.map(item => item.temp),
        // Bar chart specific styling
        backgroundColor: '#1abc9c', // Solid color for bars
        borderColor: '#1abc9c',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Historical Temperature Trend (Mock Data)',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Day'
        }
      },
      y: {
        beginAtZero: false, // Temperatures might not start at zero
        title: {
          display: true,
          text: 'Temperature (°C)'
        }
      }
    }
  };

  return (
    <div className="chart-container">
      {/* Change from <Line> to <Bar> */}
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default WeatherChart;
