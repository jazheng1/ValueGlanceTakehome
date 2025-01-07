"use client";

import React, { useState, useEffect } from "react";

interface IncomeStatement  {
  date: string;
  revenue: number;
  grossProfit: number;
  operatingIncome: number;
  netIncome: number;
  eps: number;
}
export default function Home() {
  const [data, setData] = useState<IncomeStatement[]>([]);
  const [filteredData, setFilteredData] = useState<IncomeStatement[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Initial filter values
  const initialDateRange: [number, number] = [2020, 2024];
  const initialRevenueRange: [number, number] = [0, 1000000000000];
  const initialNetIncomeRange: [number, number] = [0, 100000000000];

  // Filtering states
  const [dateRange, setDateRange] = useState<[number, number]>([2020, 2024]);
  const [revenueRange, setRevenueRange] = useState<[number, number]>([0, 1000000000000]);
  const [netIncomeRange, setNetIncomeRange] = useState<[number, number]>([0, 100000000000]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://financialmodelingprep.com/api/v3/income-statement/AAPL?apikey=BIflp6hdrcNy0z4oaep16SdByc8cbFue");
      const result = await response.json();
      setData(result);
      setFilteredData(result);
    };
    fetchData();
  }, []);

  // Sort data by a specified field
  const sortData = (key: keyof IncomeStatement) => {
    const sortedData = [...filteredData].sort((a, b) => {
      if (key === "date") {
        const dateA = new Date(a[key]);
        const dateB = new Date(b[key]);
        return sortOrder === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
      } else if (key === "revenue" || key === "netIncome") {
        return sortOrder === "asc" ? a[key] - b[key] : b[key] - a[key];
      }
      return 0;
    });
    setFilteredData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Filter the data based on selected ranges
  const filterData = () => {
    const filtered = data.filter((item) => {
      const year = parseInt(item.date.split("-")[0]);
      return (
        year >= dateRange[0] &&
        year <= dateRange[1] &&
        item.revenue >= revenueRange[0] &&
        item.revenue <= revenueRange[1] &&
        item.netIncome >= netIncomeRange[0] &&
        item.netIncome <= netIncomeRange[1]
      );
    });
    setFilteredData(filtered);
  };

  // Handle changes in filters
  const handleDateRangeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newRange = [...dateRange];
    const value = parseInt(e.target.value);

    if (isNaN(value) || value === null) {
      newRange[index] = initialDateRange[index];
    } else {
      newRange[index] = value;
    }
    setDateRange(newRange as [number, number]);
  };

  const handleRevenueRangeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newRange = [...revenueRange];
    const value = parseInt(e.target.value);

    if (isNaN(value) || value === null) {
      newRange[index] = initialRevenueRange[index];
    } else {
      newRange[index] = value;
    }
    setRevenueRange(newRange as [number, number]);
  };

  const handleNetIncomeRangeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newRange = [...netIncomeRange];
    const value = parseInt(e.target.value);

    if (isNaN(value) || value === null) {
      newRange[index] = initialNetIncomeRange[index];
    } else {
      newRange[index] = value;
    }
    setNetIncomeRange(newRange as [number, number]);
  };

  return (
    <div>
      <h1 className="table-name">Income Statement Data for AAPL</h1>
      <div className="filters">
        <div className="filter-item">
          <h3>Filter by Date Range</h3>
          <input
            type="number"
            value={dateRange[0]}
            onChange={(e) => handleDateRangeChange(e, 0)}
            placeholder="Start Year"
          />
          to
          <input
            type="number"
            value={dateRange[1]}
            onChange={(e) => handleDateRangeChange(e, 1)}
            placeholder="End Year"
          />
        </div>

        <div className="filter-item">
          <h3>Filter by Revenue Range</h3>
          <input
            type="number"
            value={revenueRange[0]}
            onChange={(e) => handleRevenueRangeChange(e, 0)}
            placeholder="Min Revenue"
          />
          to
          <input
            type="number"
            value={revenueRange[1]}
            onChange={(e) => handleRevenueRangeChange(e, 1)}
            placeholder="Max Revenue"
          />
        </div>

        <div className="filter-item">
          <h3>Filter by Net Income Range</h3>
          <input
            type="number"
            value={netIncomeRange[0]}
            onChange={(e) => handleNetIncomeRangeChange(e, 0)}
            placeholder="Min Net Income"
          />
          to
          <input
            type="number"
            value={netIncomeRange[1]}
            onChange={(e) => handleNetIncomeRangeChange(e, 1)}
            placeholder="Max Net Income"
          />
        </div>

        <button onClick={filterData}>Apply Filters</button>
      </div>
      <div className="income-table">
        <table cellPadding="10" style={{ width: "50%"}}>
          <thead>
            <tr style={{ borderBottom: "1px solid black" }}>
              <th onClick={() => sortData("date")} style={{ cursor: "pointer" }}>
                Date {sortOrder === "asc" ? "🔼" : "🔽"}
              </th>
              <th onClick={() => sortData("revenue")} style={{ cursor: "pointer" }}>
                Revenue {sortOrder === "asc" ? "🔼" : "🔽"}
              </th>
              <th onClick={() => sortData("netIncome")} style={{ cursor: "pointer" }}>
                Net Income {sortOrder === "asc" ? "🔼" : "🔽"}
              </th>
              <th>Gross Profit</th>
              <th>EPS</th>
              <th>Operating Income</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((incomeStatement, index) => (
              <tr key={index}>
                <td>{incomeStatement.date}</td>
                <td>{incomeStatement.revenue.toLocaleString()}</td>
                <td>{incomeStatement.netIncome.toLocaleString()}</td>
                <td>{incomeStatement.grossProfit.toLocaleString()}</td>
                <td>{incomeStatement.eps}</td>
                <td>{incomeStatement.operatingIncome.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
