import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line, Bar, Pie, Doughnut, Radar } from "react-chartjs-2";
import "chart.js/auto"; // Ensure Chart.js is imported for chart types
import "../css/JobStats.css"; // Import the CSS file

const JobStats = () => {
  const [stats, setStats] = useState({
    grouped: [],
    monthly: [],
    yearly: [],
  });
  const [filters, setFilters] = useState({
    status: "", // Default status filter
    workType: "", // Default work type filter
    workLocation: "", // Default work location filter
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/v1/job/job-stats", {
          params: filters,
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        });

        if (response.data.success) {
          setStats(response.data.stats);
        } else {
          console.error("Failed to fetch stats:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, [filters]);

  const monthlyLabels = stats.monthly.map((item) => item.date);
  const monthlyData = stats.monthly.map((item) => item.count);

  const yearlyLabels = stats.yearly.map((item) => item.year);
  const yearlyData = stats.yearly.map((item) => item.count);

  const groupedLabels = [
    ...new Set(
      stats.grouped.map((item) => `${item.workType} - ${item.status}`)
    ),
  ];
  const groupedData = groupedLabels.map((label) => {
    const group = stats.grouped.find(
      (item) => `${item.workType} - ${item.status}` === label
    );
    return group ? group.count : 0;
  });

  const monthlyChartData = {
    labels: monthlyLabels,
    datasets: [
      {
        label: "Jobs per Month",
        data: monthlyData,
        borderColor: "#4bc0c0",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderWidth: 2,
        pointBackgroundColor: "#4bc0c0",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointHoverRadius: 5,
      },
    ],
  };

  const yearlyChartData = {
    labels: yearlyLabels,
    datasets: [
      {
        label: "Jobs per Year",
        data: yearlyData,
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "#ff6384",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
      },
    ],
  };

  const groupedChartData = {
    labels: groupedLabels,
    datasets: [
      {
        label: "Jobs by Type and Status",
        data: groupedData,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#F782E4",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const doughnutChartData = {
    labels: groupedLabels,
    datasets: [
      {
        label: "Jobs by Type and Status (Doughnut)",
        data: groupedData,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#F782E4",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const radarChartData = {
    labels: groupedLabels,
    datasets: [
      {
        label: "Jobs by Type and Status (Radar)",
        data: groupedData,
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "#ff6384",
        borderWidth: 2,
        pointBackgroundColor: "#ff6384",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointHoverRadius: 5,
      },
    ],
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="job-stats-container">
      <h1>Job Statistics</h1>

      <div className="filters">
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="closed">Closed</option>
        </select>

        <input
          type="text"
          name="workType"
          value={filters.workType}
          onChange={handleFilterChange}
          placeholder="Work Type"
        />

        <input
          type="text"
          name="workLocation"
          value={filters.workLocation}
          onChange={handleFilterChange}
          placeholder="Work Location"
        />
      </div>

      <div className="charts-grid">
        <div className="chart-item">
          <h2>Monthly Jobs</h2>
          <Line data={monthlyChartData} options={chartOptions} />
        </div>

        <div className="chart-item">
          <h2>Yearly Jobs</h2>
          <Bar data={yearlyChartData} options={chartOptions} />
        </div>

        <div className="chart-item">
          <h2>Grouped Jobs</h2>
          <Pie data={groupedChartData} options={pieOptions} />
        </div>

        <div className="chart-item">
          <h2>Doughnut Chart</h2>
          <Doughnut data={doughnutChartData} options={pieOptions} />
        </div>

        <div className="chart-item">
          <h2>Radar Chart</h2>
          <Radar data={radarChartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

// Common chart options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
        },
      },
    },
  },
};

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right",
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          return `${tooltipItem.label}: ${tooltipItem.raw}`;
        },
      },
    },
  },
};

export default JobStats;
