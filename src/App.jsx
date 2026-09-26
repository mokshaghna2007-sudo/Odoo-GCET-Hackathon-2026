import { useState } from "react";
import "./App.css";

function App() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const [products, setProducts] = useState([
  {
    id: 1,
    name: "Steel Rods",
    sku: "STR-001",
    category: "Raw Material",
    uom: "kg",
    stock: 100,
  },
  {
    id: 2,
    name: "Office Chairs",
    sku: "CHR-001",
    category: "Furniture",
    uom: "Units",
    stock: 80,
  },
  {
    id: 3,
    name: "Copper Wire",
    sku: "CPW-001",
    category: "Raw Material",
    uom: "m",
    stock: 250,
  },
]);

  const menuItems = [
    "Dashboard",
    "Products",
    "Receipts",
    "Deliveries",
    "Transfers",
    "Adjustments",
    "Move History",
  ];

  const stats = [
    {
      title: "Total Products",
      value: "1,248",
      change: "+8.2%",
      icon: "📦",
    },
    {
      title: "Low Stock",
      value: "24",
      change: "Needs attention",
      icon: "⚠️",
    },
    {
      title: "Pending Receipts",
      value: "18",
      change: "6 arriving today",
      icon: "🚚",
    },
    {
      title: "Pending Deliveries",
      value: "31",
      change: "12 ready",
      icon: "📤",
    },
  ];

  const movements = [
    {
      product: "Steel Rods",
      type: "Receipt",
      quantity: "+100",
      location: "Main Warehouse",
      status: "Done",
    },
    {
      product: "Office Chairs",
      type: "Delivery",
      quantity: "-20",
      location: "Main Warehouse",
      status: "Done",
    },
    {
      product: "Copper Wire",
      type: "Transfer",
      quantity: "40",
      location: "Production Rack",
      status: "Done",
    },
    {
      product: "Steel Sheets",
      type: "Adjustment",
      quantity: "-3",
      location: "Main Warehouse",
      status: "Done",
    },
  ];

  return (
    <div className="app">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">S</div>
          <div>
            <h2>StockSense</h2>
            <span>Inventory Intelligence</span>
          </div>
        </div>

        <div className="menu-title">MAIN MENU</div>

        <nav>
          {menuItems.map((item) => (
            <button
              key={item}
              className={`menu-item ${
                activeMenu === item ? "active" : ""
              }`}
              onClick={() => setActiveMenu(item)}
            >
              <span>
                {item === "Dashboard" && "▦"}
                {item === "Products" && "📦"}
                {item === "Receipts" && "↓"}
                {item === "Deliveries" && "↑"}
                {item === "Transfers" && "⇄"}
                {item === "Adjustments" && "⊕"}
                {item === "Move History" && "◷"}
              </span>

              {item}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button className="menu-item">⚙️ Settings</button>
          <button className="menu-item">👤 My Profile</button>
          <button className="menu-item logout">↪ Logout</button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main">

        {/* HEADER */}
        <header className="topbar">
          <div>
            <p className="welcome">Welcome back 👋</p>
            <h1>{activeMenu}</h1>
          </div>

          <div className="top-actions">
            <button className="notification">🔔</button>

            <div className="profile">
              <div className="avatar">AM</div>
              <div>
                <strong>Inventory Manager</strong>
                <small>Admin</small>
              </div>
            </div>
          </div>
        </header>

        {/* DASHBOARD */}
        {activeMenu === "Dashboard" && (
          <>
            <section className="hero">
              <div>
                <span className="hero-label">INVENTORY OVERVIEW</span>
                <h2>Everything in stock, under control.</h2>
                <p>
                  Monitor your inventory, track movements and keep
                  operations running smoothly.
                </p>
              </div>

              <div className="hero-icon">📊</div>
            </section>

            {/* KPI CARDS */}
            <section className="stats-grid">
              {stats.map((stat) => (
                <div className="stat-card" key={stat.title}>
                  <div className="stat-top">
                    <span className="stat-icon">{stat.icon}</span>
                    <span className="stat-change">{stat.change}</span>
                  </div>

                  <p>{stat.title}</p>
                  <h3>{stat.value}</h3>
                </div>
              ))}
            </section>

            {/* FILTERS */}
            <section className="filter-section">
              <div>
                <h3>Inventory Activity</h3>
                <p>Track your latest stock operations</p>
              </div>

              <div className="filters">
                <select>
                  <option>All Operations</option>
                  <option>Receipts</option>
                  <option>Deliveries</option>
                  <option>Transfers</option>
                  <option>Adjustments</option>
                </select>

                <select>
                  <option>All Status</option>
                  <option>Draft</option>
                  <option>Waiting</option>
                  <option>Ready</option>
                  <option>Done</option>
                </select>

                <select>
                  <option>All Locations</option>
                  <option>Main Warehouse</option>
                  <option>Production Rack</option>
                </select>
              </div>
            </section>

            {/* TABLE */}
            <section className="table-card">
              <div className="table-header">
                <div>
                  <h3>Recent Stock Movements</h3>
                  <p>Latest inventory transactions</p>
                </div>

                <button className="view-btn">
                  View all →
                </button>
              </div>

              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>PRODUCT</th>
                      <th>TYPE</th>
                      <th>QUANTITY</th>
                      <th>LOCATION</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>

                  <tbody>
                    {movements.map((move, index) => (
                      <tr key={index}>
                        <td>
                          <strong>{move.product}</strong>
                        </td>

                        <td>
                          <span className="type-badge">
                            {move.type}
                          </span>
                        </td>

                        <td
                          className={
                            move.quantity.startsWith("-")
                              ? "negative"
                              : "positive"
                          }
                        >
                          {move.quantity}
                        </td>

                        <td>{move.location}</td>

                        <td>
                          <span className="status-badge">
                            ● {move.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {/* OTHER PAGES */}
        {activeMenu !== "Dashboard" && (
          <section className="coming-soon">
            <div>🚧</div>
            <h2>{activeMenu}</h2>
            <p>
              This module will be connected to the StockSense
              inventory system next.
            </p>
          </section>
        )}

      </main>
    </div>
  );
}

export default App;