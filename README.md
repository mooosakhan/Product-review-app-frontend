# ⭐ MERN Wishlist & Product Review App

A full-stack MERN application where users can browse products, leave reviews, and see average ratings — all in real-time.

---

## 🚀 Features

- 🔐 JWT-based user authentication
- ⭐ Add, edit, and delete one review per product
- 📊 Auto-updating average product rating
- 🔎 Filter products by minimum rating
- 📝 Review form with star rating UI
- 💅 Responsive design using TailwindCSS

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (JSON Web Tokens)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/mooosakhan/Product-review-app-frontend/
cd Product-review-app-frontend/
````

---

### 2. Setup Backend

```bash
cd https://github.com/mooosakhan/Product-review-app-backend
npm Product-review-app-backend
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the server:

```bash
npm run dev
```

---

### 3. Setup Frontend

```bash
npm install
npm run dev
```

> Make sure to update the API base URL in frontend Axios config if needed.
