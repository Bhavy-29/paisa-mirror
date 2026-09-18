"use client";

import { useMemo, useState } from "react";

type Transaction = {
  id: number;
  name: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  date: string;
};

const initialTransactions: Transaction[] = [
  {
    id: 1,
    name: "Swiggy",
    category: "Food",
    amount: 420,
    type: "expense",
    date: "Today",
  },
  {
    id: 2,
    name: "Freelance",
    category: "Income",
    amount: 8500,
    type: "income",
    date: "Yesterday",
  },
  {
    id: 3,
    name: "Amazon",
    category: "Shopping",
    amount: 1299,
    type: "expense",
    date: "Sep 15",
  },
  {
    id: 4,
    name: "Uber",
    category: "Travel",
    amount: 280,
    type: "expense",
    date: "Sep 14",
  },
];

const categories = [
  { name: "Food", value: 32, icon: "🍔" },
  { name: "Shopping", value: 24, icon: "🛍️" },
  { name: "Travel", value: 18, icon: "🚕" },
  { name: "Bills", value: 15, icon: "⚡" },
  { name: "Other", value: 11, icon: "◈" },
];

export default function Home() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);

  const [activeTab, setActiveTab] = useState("Overview");
  const [showAdd, setShowAdd] = useState(false);
  const [dark, setDark] = useState(true);

  const [form, setForm] = useState({
    name: "",
    amount: "",
    category: "Food",
    type: "expense" as "income" | "expense",
  });

  const income = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const expenses = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const balance = income - expenses;

  function addTransaction() {
    if (!form.name || !form.amount) return;

    const newTransaction: Transaction = {
      id: Date.now(),
      name: form.name,
      category: form.category,
      amount: Number(form.amount),
      type: form.type,
      date: "Just now",
    };

    setTransactions((prev) => [newTransaction, ...prev]);

    setForm({
      name: "",
      amount: "",
      category: "Food",
      type: "expense",
    });

    setShowAdd(false);
  }

  return (
    <main className={dark ? "app dark" : "app"}>
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">₹</div>
          <div>
            <strong>Paisa</strong>
            <span>Mirror</span>
          </div>
        </div>

        <nav>
          {["Overview", "Transactions", "Analytics", "Goals"].map((item) => (
            <button
              key={item}
              className={activeTab === item ? "nav-item active" : "nav-item"}
              onClick={() => setActiveTab(item)}
            >
              <span>
                {item === "Overview" && "⌂"}
                {item === "Transactions" && "↕"}
                {item === "Analytics" && "◒"}
                {item === "Goals" && "◎"}
              </span>
              {item}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button className="nav-item" onClick={() => setDark(!dark)}>
            <span>{dark ? "☼" : "☾"}</span>
            {dark ? "Light mode" : "Dark mode"}
          </button>

          <div className="profile">
            <div className="avatar">K</div>
            <div>
              <strong>Kenil</strong>
              <span>Personal account</span>
            </div>
          </div>
        </div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div>
            <p className="eyebrow">PERSONAL FINANCE</p>
            <h1>{activeTab}</h1>
          </div>

          <div className="top-actions">
            <button className="icon-button">⌕</button>
            <button className="icon-button">◌</button>
            <button className="add-button" onClick={() => setShowAdd(true)}>
              + Add transaction
            </button>
          </div>
        </header>

        {activeTab === "Overview" && (
          <>
            <section className="hero-grid">
              <div className="balance-card">
                <div className="balance-header">
                  <div>
                    <span>Total balance</span>
                    <h2>₹{balance.toLocaleString("en-IN")}</h2>
                  </div>
                  <div className="balance-icon">₹</div>
                </div>

                <div className="balance-footer">
                  <div>
                    <span>Income</span>
                    <strong className="income">
                      +₹{income.toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <div>
                    <span>Expenses</span>
                    <strong className="expense">
                      -₹{expenses.toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <div className="mini-chart">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              </div>

              <div className="score-card">
                <div className="card-heading">
                  <span>Financial health</span>
                  <span className="status">GOOD</span>
                </div>

                <div className="score">
                  <strong>82</strong>
                  <span>/100</span>
                </div>

                <div className="progress">
                  <div style={{ width: "82%" }} />
                </div>

                <p>
                  You're maintaining a healthy balance between spending and
                  saving.
                </p>
              </div>
            </section>

            <section className="section-grid">
              <div className="panel">
                <div className="panel-header">
                  <div>
                    <span className="eyebrow">ACTIVITY</span>
                    <h3>Recent transactions</h3>
                  </div>

                  <button
                    className="text-button"
                    onClick={() => setActiveTab("Transactions")}
                  >
                    View all →
                  </button>
                </div>

                <div className="transactions">
                  {transactions.slice(0, 5).map((transaction) => (
                    <TransactionRow
                      key={transaction.id}
                      transaction={transaction}
                    />
                  ))}
                </div>
              </div>

              <div className="panel">
                <div className="panel-header">
                  <div>
                    <span className="eyebrow">BREAKDOWN</span>
                    <h3>Where your money goes</h3>
                  </div>
                </div>

                <div className="donut-wrap">
                  <div className="donut">
                    <div>
                      <strong>₹{expenses.toLocaleString("en-IN")}</strong>
                      <span>spent</span>
                    </div>
                  </div>
                </div>

                <div className="category-list">
                  {categories.map((category) => (
                    <div className="category" key={category.name}>
                      <div className="category-left">
                        <span>{category.icon}</span>
                        <strong>{category.name}</strong>
                      </div>
                      <div className="category-right">
                        <div className="category-bar">
                          <i style={{ width: `${category.value}%` }} />
                        </div>
                        <span>{category.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="insight">
              <div className="insight-icon">✦</div>
              <div>
                <span>SMART INSIGHT</span>
                <h3>Your spending is under control.</h3>
                <p>
                  Food is currently your largest expense category. Reducing
                  weekly food spending by 10% could increase your monthly
                  savings.
                </p>
              </div>
              <button>Explore analytics →</button>
            </section>
          </>
        )}

        {activeTab === "Transactions" && (
          <section className="page-panel">
            <div className="panel-header">
              <div>
                <span className="eyebrow">ALL ACTIVITY</span>
                <h3>Transactions</h3>
              </div>
              <button className="add-button" onClick={() => setShowAdd(true)}>
                + Add transaction
              </button>
            </div>

            <div className="transactions">
              {transactions.map((transaction) => (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </div>
          </section>
        )}

        {activeTab === "Analytics" && (
          <section className="analytics-grid">
            <div className="page-panel large">
              <span className="eyebrow">MONTHLY TREND</span>
              <h3>Spending activity</h3>

              <div className="bar-chart">
                {[42, 61, 48, 75, 55, 88, 68, 52, 79, 63, 91, 70].map(
                  (height, index) => (
                    <div className="chart-column" key={index}>
                      <i style={{ height: `${height}%` }} />
                      <span>{index + 1}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="page-panel">
              <span className="eyebrow">SAVINGS</span>
              <h3>Monthly goal</h3>

              <div className="goal-circle">
                <strong>68%</strong>
              </div>

              <p className="muted">
                You're on track to reach your monthly savings target.
              </p>
            </div>
          </section>
        )}

        {activeTab === "Goals" && (
          <section className="goals-grid">
            {[
              ["MacBook Fund", "₹42,000", "₹75,000", 56],
              ["Emergency Fund", "₹18,500", "₹30,000", 62],
              ["Travel Fund", "₹12,000", "₹25,000", 48],
            ].map(([name, current, target, progress]) => (
              <div className="goal-card" key={name as string}>
                <span className="goal-icon">◎</span>
                <h3>{name}</h3>
                <strong>{current}</strong>
                <span>of {target}</span>
                <div className="progress">
                  <div style={{ width: `${progress}%` }} />
                </div>
                <small>{progress}% completed</small>
              </div>
            ))}
          </section>
        )}
      </section>

      {showAdd && (
        <div className="modal-backdrop" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="eyebrow">NEW ENTRY</span>
                <h2>Add transaction</h2>
              </div>
              <button
                className="close"
                onClick={() => setShowAdd(false)}
              >
                ×
              </button>
            </div>

            <input
              placeholder="Transaction name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Amount"
              value={form.amount}
              onChange={(e) =>
                setForm({ ...form, amount: e.target.value })
              }
            />

            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            >
              <option>Food</option>
              <option>Shopping</option>
              <option>Travel</option>
              <option>Bills</option>
              <option>Other</option>
            </select>

            <div className="type-toggle">
              <button
                className={form.type === "expense" ? "selected" : ""}
                onClick={() => setForm({ ...form, type: "expense" })}
              >
                Expense
              </button>

              <button
                className={form.type === "income" ? "selected" : ""}
                onClick={() => setForm({ ...form, type: "income" })}
              >
                Income
              </button>
            </div>

            <button className="submit" onClick={addTransaction}>
              Add transaction
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function TransactionRow({
  transaction,
}: {
  transaction: Transaction;
}) {
  return (
    <div className="transaction">
      <div className="transaction-icon">
        {transaction.category === "Food" && "🍔"}
        {transaction.category === "Shopping" && "🛍️"}
        {transaction.category === "Travel" && "🚕"}
        {transaction.category === "Income" && "↗"}
        {transaction.category === "Bills" && "⚡"}
        {transaction.category === "Other" && "◈"}
      </div>

      <div className="transaction-name">
        <strong>{transaction.name}</strong>
        <span>
          {transaction.category} · {transaction.date}
        </span>
      </div>

      <strong
        className={
          transaction.type === "income" ? "amount income" : "amount expense"
        }
      >
        {transaction.type === "income" ? "+" : "-"}₹
        {transaction.amount.toLocaleString("en-IN")}
      </strong>
    </div>
  );
}