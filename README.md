# Split-App

# 🧾 Split App – Backend

A simple expense splitting backend system built with **Node.js**, **Express**, and **MongoDB**. Inspired by Splitwise, this app helps groups track shared expenses and calculate fair settlements.

---

## 🚀 Features

- ✅ Add, update, delete, and list expenses
- ✅ Automatically tracks unique people involved
- ✅ Calculates each person's balance (how much they owe or are owed)
- ✅ Returns simplified settlements (minimized transactions)
- ✅ Full input validation and error handling

---

## 🔌 API Endpoints

### 📁 Expense Management

| Method | Endpoint         | Description               |
|--------|------------------|---------------------------|
| GET    | `/expenses`      | List all expenses         |
| POST   | `/expenses`      | Add a new expense         |
| PUT    | `/expenses/:id`  | Update an expense         |
| DELETE | `/expenses/:id`  | Delete an expense         |

### 📁 Settlements & People

| Method | Endpoint          | Description                        |
|--------|-------------------|------------------------------------|
| GET    | `/people`         | List all unique people             |
| GET    | `/balances`       | Show balance for each person      |
| GET    | `/settlements`    | Get simplified settlement summary |

---

## 📥 Example Payload

### ➕ Add Expense

```json
POST /expenses

{
  "amount": 600,
  "description": "Dinner at restaurant",
  "paid_by": "Shantanu",
  "shared_with": ["Shantanu", "Sanket", "Om"],
  "split_type": "equal"
}


📬 Postman Collection:
https://gist.github.com/shivajirp/6cc00aafee0db017c30fe06d4a48f099