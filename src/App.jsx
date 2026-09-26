import { useState } from "react";
import "./App.css";

function App() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const [showProductForm, setShowProductForm] = useState(false);
  const [showReceiptForm, setShowReceiptForm] = useState(false);
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);

  const saveReceipt = () => {
  const inputs = document.querySelectorAll("input");

  const receiptNumber = inputs[0].value;
  const productName = inputs[1].value;
  const quantity = inputs[2].value;
  const supplier = inputs[3].value;

  if (!receiptNumber || !productName || !quantity || !supplier) {
    alert("Please fill in all receipt details.");
    return;
  }

  setReceipts((prev) => [
    ...prev,
    {
      id: Date.now(),
      receipt: receiptNumber,
      product: productName,
      quantity: `+${quantity}`,
      supplier: supplier,
      status: "Done",
    },
  ]);

  setShowReceiptForm(false);
};
const [newProduct, setNewProduct] = useState({
  name: "",
  sku: "",
  category: "",
  uom: "",
  stock: "",
});
const saveDelivery = () => {
  const inputs = document.querySelectorAll("input");

  const deliveryNumber = inputs[0].value;
  const productName = inputs[1].value;
  const quantity = inputs[2].value;
  const customer = inputs[3].value;

  if (!deliveryNumber || !productName || !quantity || !customer) {
    alert("Please fill in all delivery details.");
    return;
  }
  setDeliveries((prev) => [
    ...prev,
    {
      id: Date.now(),
      delivery: deliveryNumber,
      product: productName,
      quantity: `-${quantity}`,
      customer: customer,
      status: "Pending",
    },
  ]);

  setShowDeliveryForm(false);
};
const saveTransfer = () => {
  const inputs = document.querySelectorAll("input");

  const reference = inputs[inputs.length - 5].value.trim();
  const productName = inputs[inputs.length - 4].value.trim();
  const quantity = Number(inputs[inputs.length - 3].value);
  const from = inputs[inputs.length - 2].value.trim();
  const to = inputs[inputs.length - 1].value.trim();

  if (!reference || !productName || !quantity || !from || !to) {
    alert("Please fill in all transfer details.");
    return;
  }

  if (quantity <= 0) {
    alert("Quantity must be greater than 0.");
    return;
  }

  if (from.toLowerCase() === to.toLowerCase()) {
    alert("From and To locations must be different.");
    return;
  }

  const product = products.find(
    (item) =>
      item.name.toLowerCase() === productName.toLowerCase()
  );

  if (!product) {
    alert("Product not found.");
    return;
  }

  if (quantity > product.stock) {
    alert(
      `Insufficient stock. Available stock for ${product.name}: ${product.stock}`
    );
    return;
  }

  setTransfers((prev) => [
    ...prev,
    {
      id: Date.now(),
      reference,
      product: product.name,
      quantity,
      from,
      to,
      status: "Pending",
    },
  ]);

  setShowTransferForm(false);
};
const saveAdjustment = () => {
  const product = products.find(
    (item) =>
      item.name.toLowerCase() ===
      newAdjustment.product.trim().toLowerCase()
  );

  if (
    !newAdjustment.reference ||
    !newAdjustment.product ||
    newAdjustment.counted === "" ||
    !newAdjustment.location
  ) {
    alert("Please fill in all adjustment details.");
    return;
  }

  if (!product) {
    alert("Product not found.");
    return;
  }

  const counted = Number(newAdjustment.counted);

  if (counted < 0) {
    alert("Counted quantity cannot be negative.");
    return;
  }

  const difference = counted - Number(product.stock);

  setProducts((prevProducts) =>
    prevProducts.map((item) =>
      item.name === product.name
        ? {
            ...item,
            stock: counted,
          }
        : item
    )
  );

  setAdjustments((prevAdjustments) => [
    ...prevAdjustments,
    {
      id: Date.now(),
      reference: newAdjustment.reference,
      product: product.name,
      counted,
      difference,
      location: newAdjustment.location,
      status: "Done",
    },
  ]);

  setNewAdjustment({
    reference: "",
    product: "",
    counted: "",
    location: "",
  });

  setShowAdjustmentForm(false);
};


const [receipts, setReceipts] = useState([
  {
    id: 1,
    receipt: "WH/IN/0001",
    product: "Steel Rods",
    quantity: "+100 kg",
    supplier: "Tata Steel",
    status: "Done",
  },
  {
    id: 2,
    receipt: "WH/IN/0002",
    product: "Copper Wire",
    quantity: "+250 m",
    supplier: "ABC Metals",
    status: "Done",
  },
  {
    id: 3,
    receipt: "WH/IN/0003",
    product: "Office Chairs",
    quantity: "+40 Units",
    supplier: "Furniture Hub",
    status: "Pending",
  },
]);
const [deliveries, setDeliveries] = useState([
  {
    id: 1,
    delivery: "WH/OUT/0001",
    product: "Office Chairs",
    quantity: "-20 Units",
    customer: "ABC Office",
    status: "Done",
  },
  {
    id: 2,
    delivery: "WH/OUT/0002",
    product: "Steel Rods",
    quantity: "-10 kg",
    customer: "BuildPro",
    status: "Pending",
  },
  {
    id: 3,
    delivery: "WH/OUT/0003",
    product: "Copper Wire",
    quantity: "-50 m",
    customer: "TechWorks",
    status: "Pending",
  },
]);


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
const [showTransferForm, setShowTransferForm] = useState(false);
const [showAdjustmentForm, setShowAdjustmentForm] = useState(false);

const [adjustments, setAdjustments] = useState([
  {
    id: 1,
    reference: "WH/ADJ/0001",
    product: "Steel Sheets",
    counted: 97,
    difference: -3,
    location: "Main Warehouse",
    status: "Done",
  },
]);
const [newAdjustment, setNewAdjustment] = useState({
  reference: "",
  product: "",
  counted: "",
  location: "",
});

const [transfers, setTransfers] = useState([
  {
    id: 1,
    reference: "WH/INT/0001",
    product: "Copper Wire",
    quantity: 40,
    from: "Main Warehouse",
    to: "Production Rack",
    status: "Done",
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
      value: products.length.toString(),
      change: "+8.2%",
      icon: "📦",
    },
    {
      title: "Low Stock",
      value: products.filter(product => product.stock < 20).length.toString(),
      change: "Needs attention",
      icon: "⚠️",
    },
    {
      title: "Pending Receipts",
      value: receipts.filter(receipt => receipt.status === "Pending").length.toString(),
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

        {/* PRODUCTS PAGE */}
{activeMenu === "Products" && (
  <section>
    <div className="filter-section">
      <div>
        <h3>Products</h3>
        <p>Manage products and current stock levels</p>
      </div>

      <button
        className="view-btn"
        onClick={() => setShowProductForm(true)}
      >
        + Add Product
      </button>
    </div>

    {showProductForm && (
  <div className="table-card product-form-card">
    <div className="table-header">
      <div>
        <h3>Add New Product</h3>
        <p>Enter product details and initial stock</p>
      </div>

      <button
        className="view-btn"
        onClick={() => setShowProductForm(false)}
      >
        Cancel
      </button>
    </div>

    <div className="product-form">
      <input
        type="text"
        placeholder="Product Name"
        value={newProduct.name}
        onChange={(e) =>
          setNewProduct({ ...newProduct, name: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="SKU"
        value={newProduct.sku}
        onChange={(e) =>
          setNewProduct({ ...newProduct, sku: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="Category"
        value={newProduct.category}
        onChange={(e) =>
          setNewProduct({ ...newProduct, category: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="Unit of Measure (kg, units, m)"
        value={newProduct.uom}
        onChange={(e) =>
          setNewProduct({ ...newProduct, uom: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Initial Stock"
        value={newProduct.stock}
        onChange={(e) =>
          setNewProduct({ ...newProduct, stock: e.target.value })
        }
      />

      <button
        className="view-btn"
        onClick={() => {
          if (!newProduct.name || !newProduct.sku) {
            alert("Product name and SKU are required.");
            return;
          }

          setProducts([
            ...products,
            {
              id: Date.now(),
              ...newProduct,
              stock: Number(newProduct.stock) || 0,
            },
          ]);

          setNewProduct({
            name: "",
            sku: "",
            category: "",
            uom: "",
            stock: "",
          });

          setShowProductForm(false);
        }}
      >
        Save Product
      </button>
    </div>
  </div>
)}
<div className="table-card">
      <div className="table-header">
        <div>
          <h3>Product Inventory</h3>
          <p>{products.length} products in the system</p>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>PRODUCT</th>
              <th>SKU</th>
              <th>CATEGORY</th>
              <th>UOM</th>
              <th>STOCK</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <strong>{product.name}</strong>
                </td>
                <td>{product.sku}</td>
                <td>{product.category}</td>
                <td>{product.uom}</td>
                <td>
                  <strong>{product.stock}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
)}

{/* RECEIPTS PAGE */}
{activeMenu === "Receipts" && (
  <section className="page-section">
    <div className="filter-section">
      <div>
        <h2>Receipts</h2>
        <p>Track incoming stock and received products</p>
      </div>

<button
  className="view-btn"
  onClick={() => setShowReceiptForm(true)}
>
  + New Receipt
</button>
    </div>
    {showReceiptForm && (
  <div className="table-card" style={{ marginBottom: "20px" }}>
    <div className="table-header">
      <div>
        <h3>New Receipt</h3>
        <p>Enter incoming stock details</p>
      </div>

      <button
        className="view-btn"
        onClick={() => setShowReceiptForm(false)}
      >
        Cancel
      </button>
    </div>

    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "15px",
      padding: "20px"
    }}>
      <input
        type="text"
        placeholder="Receipt Number"
      />

      <input
        type="text"
        placeholder="Product Name"
      />

      <input
        type="number"
        placeholder="Quantity"
      />

      <input
        type="text"
        placeholder="Supplier"
      />

      <input
        type="text"
        placeholder="Location"
      />

      <input
        type="date"
      />

      <button
        className="view-btn"
        style={{ gridColumn: "1 / -1" }}
        onClick={saveReceipt}     
 >
        Save Receipt
      </button>
    </div>
  </div>
)}

    <div className="table-card">
      <div className="table-header">
        <div>
          <h3>Recent Receipts</h3>
          <p>Latest incoming inventory</p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Receipt</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Supplier</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
  {receipts.map((receipt) => (
    <tr key={receipt.id}>
      <td>{receipt.receipt}</td>
      <td>{receipt.product}</td>
      <td>{receipt.quantity}</td>
      <td>{receipt.supplier}</td>
      <td>
        <span className="status-badge">
          {receipt.status}
        </span>
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  </section>
)}

{/* DELIVERIES PAGE */}
{activeMenu === "Deliveries" && (
  <section className="page-section">
    <div className="filter-section">
      <div>
        <h2>Deliveries</h2>
        <p>Track outgoing stock and customer shipments</p>
      </div>

<button
  className="view-btn"
  onClick={() => setShowDeliveryForm(true)}
>
  + New Delivery
</button>
    </div>
    {showDeliveryForm && (
  <div className="table-card" style={{ marginBottom: "20px" }}>
    <div className="table-header">
      <div>
        <h3>New Delivery</h3>
        <p>Enter outgoing stock details</p>
      </div>

      <button
        className="view-btn"
        onClick={() => setShowDeliveryForm(false)}
      >
        Cancel
      </button>
    </div>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "15px",
        padding: "20px",
      }}
    >
      <input
        type="text"
        placeholder="Delivery Number"
      />

      <input
        type="text"
        placeholder="Product Name"
      />

      <input
        type="number"
        placeholder="Quantity"
      />

      <input
        type="text"
        placeholder="Customer"
      />

      <input
        type="text"
        placeholder="Location"
      />

      <input
        type="date"
      />

<button
  className="view-btn"
  style={{ gridColumn: "1 / -1" }}
  onClick={saveDelivery}
>
  Save Delivery
</button>
    </div>
  </div>
)}

    <div className="table-card">
      <div className="table-header">
        <div>
          <h3>Recent Deliveries</h3>
          <p>Latest outgoing inventory</p>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>DELIVERY</th>
              <th>PRODUCT</th>
              <th>QUANTITY</th>
              <th>CUSTOMER</th>
              <th>STATUS</th>
            </tr>
          </thead>

          <tbody>
            {deliveries.map((delivery) => (
              <tr key={delivery.id}>
                <td>{delivery.delivery}</td>
                <td>{delivery.product}</td>
                <td>{delivery.quantity}</td>
                <td>{delivery.customer}</td>
                <td>
                  <span className="status-badge">
                    {delivery.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
)}
{activeMenu === "Transfers" && (
<section className="page-section">
  <div className="page-header">
    <div>
      <h1 style={{ color: "#0f172a" }}>
        Internal Transfers
      </h1>

      <p style={{ color: "#64748b" }}>
        Move stock between warehouse locations
      </p>
    </div>

    <button
      onClick={() => setShowTransferForm(true)}
      style={{
        background: "#2563eb",
        color: "#ffffff",
        border: "none",
        padding: "12px 20px",
        borderRadius: "10px",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
      }}
    >
      + New Transfer
    </button>
  </div>
  {showTransferForm && (
  <div
    style={{
      background: "#ffffff",
      padding: "24px",
      borderRadius: "16px",
      marginBottom: "24px",
      boxShadow: "0 4px 20px rgba(15, 23, 42, 0.08)",
    }}
  >
    <h2 style={{ color: "#0f172a", marginBottom: "20px" }}>
      New Internal Transfer
    </h2>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "16px",
      }}
    >
      <input
        type="text"
        placeholder="Reference Number"
      />

      <input
        type="text"
        placeholder="Product Name"
      />

      <input
        type="number"
        placeholder="Quantity"
      />

      <input
        type="text"
        placeholder="From Location"
      />

      <input
        type="text"
        placeholder="To Location"
      />
    </div>

    <div style={{ marginTop: "20px" }}>
      <button
        onClick={saveTransfer}
        style={{
          background: "#2563eb",
          color: "#ffffff",
          border: "none",
          padding: "11px 20px",
          borderRadius: "8px",
          fontWeight: "600",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        Save Transfer
      </button>

      <button
        onClick={() => setShowTransferForm(false)}
        style={{
          background: "#e2e8f0",
          color: "#334155",
          border: "none",
          padding: "11px 20px",
          borderRadius: "8px",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        Cancel
      </button>
    </div>
  </div>
)}
    <div className="table-card">
<div className="table-header">
  <h2 style={{ color: "#0f172a" }}>
    Recent Transfers
  </h2>
</div>
      <table>
        <thead>
          <tr>
            <th>REFERENCE</th>
            <th>PRODUCT</th>
            <th>QUANTITY</th>
            <th>FROM</th>
            <th>TO</th>
            <th>STATUS</th>
          </tr>
        </thead>

        <tbody>
          {transfers.map((transfer) => (
            <tr key={transfer.id}>
              <td>{transfer.reference}</td>
              <td>{transfer.product}</td>
              <td>{transfer.quantity}</td>
              <td>{transfer.from}</td>
              <td>{transfer.to}</td>
              <td>
                <span className="status-badge">
                  {transfer.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
)}
{activeMenu === "Adjustments" && (
  <section className="page-section">
    <div className="page-header">
      <div>
        <h1 style={{ color: "#0f172a" }}>
          Inventory Adjustments
        </h1>

        <p style={{ color: "#64748b" }}>
          Correct stock quantities based on physical counts
        </p>
      </div>

      <button
        onClick={() => setShowAdjustmentForm(true)}
        style={{
          background: "#2563eb",
          color: "#ffffff",
          border: "none",
          padding: "12px 20px",
          borderRadius: "10px",
          fontSize: "14px",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        + New Adjustment
      </button>
    </div>

    {showAdjustmentForm && (
      <div
        style={{
          background: "#ffffff",
          padding: "24px",
          borderRadius: "16px",
          marginBottom: "24px",
          boxShadow: "0 4px 20px rgba(15, 23, 42, 0.08)",
        }}
      >
        <h2 style={{ color: "#0f172a", marginBottom: "20px" }}>
          New Inventory Adjustment
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <input
            type="text"
            placeholder="Reference Number"
            value={newAdjustment.reference}
            onChange={(e) =>
              setNewAdjustment({
                ...newAdjustment,
                reference: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Product Name"
            value={newAdjustment.product}
            onChange={(e) =>
              setNewAdjustment({
                ...newAdjustment,
                product: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Counted Quantity"
            value={newAdjustment.counted}
            onChange={(e) =>
              setNewAdjustment({
                ...newAdjustment,
                counted: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Location"
            value={newAdjustment.location}
            onChange={(e) =>
              setNewAdjustment({
                ...newAdjustment,
                location: e.target.value,
              })
            }
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          <button
            onClick={saveAdjustment}
            style={{
              background: "#2563eb",
              color: "#ffffff",
              border: "none",
              padding: "11px 20px",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Save Adjustment
          </button>

          <button
            onClick={() => setShowAdjustmentForm(false)}
            style={{
              background: "#e2e8f0",
              color: "#334155",
              border: "none",
              padding: "11px 20px",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    )}

    <div className="table-card">
      <div className="table-header">
        <h2 style={{ color: "#0f172a" }}>
          Adjustment History
        </h2>
      </div>

      <table>
        <thead>
          <tr>
            <th>REFERENCE</th>
            <th>PRODUCT</th>
            <th>COUNTED</th>
            <th>DIFFERENCE</th>
            <th>LOCATION</th>
            <th>STATUS</th>
          </tr>
        </thead>

        <tbody>
          {adjustments.map((adjustment) => (
            <tr key={adjustment.id}>
              <td>{adjustment.reference}</td>
              <td>{adjustment.product}</td>
              <td>{adjustment.counted}</td>
              <td>
                {adjustment.difference > 0
                  ? `+${adjustment.difference}`
                  : adjustment.difference}
              </td>
              <td>{adjustment.location}</td>
              <td>
                <span className="status-badge">
                  {adjustment.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
)}
{activeMenu === "Move History" && (
  <section className="content-section">
    <div className="page-header">
      <div>
        <h1>Move History</h1>
        <p>Complete history of inventory movements</p>
      </div>
    </div>

    <div className="table-card">
      <h2>Stock Movement Ledger</h2>

      <table>
        <thead>
          <tr>
            <th>REFERENCE</th>
            <th>TYPE</th>
            <th>PRODUCT</th>
            <th>QUANTITY</th>
            <th>FROM</th>
            <th>TO</th>
            <th>STATUS</th>
          </tr>
        </thead>

        <tbody>
          {[
            ...receipts.map((item) => ({
              reference: item.receipt,
              type: "Receipt",
              product: item.product,
              quantity: item.quantity,
              from: item.supplier,
              to: "Main Warehouse",
              status: item.status,
            })),

            ...deliveries.map((item) => ({
              reference: item.delivery,
              type: "Delivery",
              product: item.product,
              quantity: item.quantity,
              from: "Main Warehouse",
              to: item.customer,
              status: item.status,
            })),

            ...transfers.map((item) => ({
              reference: item.reference,
              type: "Transfer",
              product: item.product,
              quantity: item.quantity,
              from: item.from,
              to: item.to,
              status: item.status,
            })),

            ...adjustments.map((item) => ({
              reference: item.reference,
              type: "Adjustment",
              product: item.product,
              quantity: item.difference,
              from: item.location,
              to: "-",
              status: item.status,
            })),
          ].map((move) => (
            <tr key={`${move.type}-${move.reference}`}>
              <td>{move.reference}</td>
              <td>{move.type}</td>
              <td>{move.product}</td>
              <td>{move.quantity}</td>
              <td>{move.from}</td>
              <td>{move.to}</td>
              <td>
                <span className="status-badge">
                  {move.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
)}
{/* OTHER PAGES */}
{activeMenu !== "Dashboard" &&
  activeMenu !== "Products" &&
  activeMenu !== "Receipts" &&
  activeMenu !== "Deliveries" &&
  activeMenu !== "Transfers" &&
  activeMenu !== "Adjustments" && 
  activeMenu !== "Move History" && (
      <section className="coming-soon">
    <div>↔</div>
    <h2>{activeMenu}</h2>
    <p>
      This module will be connected to the StockSense
      inventory system next.
    </p>
  </section>
)}      </main>
    </div>
  );
}

export default App;