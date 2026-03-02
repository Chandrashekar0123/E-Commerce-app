# Mini E-Commerce

This workspace contains a simple MERN (MongoDB, Express, React, Node) mini e-commerce application.

<img width="1589" height="762" alt="image" src="https://github.com/user-attachments/assets/a7dae151-ed93-46e8-9b69-fadcda8b1575" />

## Backend

Located in `backend/`

- **Server**: `server.js` starts Express and connects to MongoDB (default `mongodb://127.0.0.1:27017/mini_ecom`).
- **Models**: `Product` and `CartItem` in `models/`.
- **Routes**:
  - `POST /api/products` - add a product
  - `GET /api/products` - list all (supports `?search=keyword`)
  - `GET /api/products/:id` - get single product
  - `POST /api/cart` - add to cart
  - `GET /api/cart` - get cart contents
  - `PUT /api/cart/:id` - update quantity
  - `DELETE /api/cart/:id` - remove item

- **Seeding**: run `node seed.js` to insert demo products.
- **Scripts**: `npm install`, `npm run dev` (requires Node, optionally adjust PowerShell execution policy), `npm start`.

## Frontend

Located in `frontend/` built with Vite + React.

- Pages:
  - `/products` - home with product list & search. Includes category sidebar, pagination, and a hero banner for a more realistic feel.
  - `/products/:id` - product detail with image, rating, prime badge, and add-to-cart.
  - `/cart` - cart page with item thumbnails, quantity controls, total calculation, and placeholder "Place Order" button.
  - `/add-product` - form to create new products (name, description, price, category, stock, image URL).

- The header mimics an e-commerce layout: dark bar, search input, and cart count.
- Styling uses simple CSS but aims for a clean, responsive, “Amazon-like” interface.
- The backend provides category filtering and search; the frontend uses URL query parameters so links can be shared/bookmarked.
- Dev server proxies `/api` to backend port 5000.

### Setup

1. Ensure [Node.js](https://nodejs.org/) is installed.
2. For PowerShell run:
   ```powershell
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
   ```
3. Start backend:
   ```powershell
   cd backend
   npm install
   npm run dev
   # optionally run `node seed.js` once
   ```
4. Start frontend in another terminal:
   ```powershell
   cd frontend
   npm install
   npm run dev
   ```
5. Visit `http://localhost:5173` (or shown port) for the frontend.

## Notes

- The "Place Order" button only shows an alert; no actual order processing.
- The code is intended for learning and demonstration.


<img width="1579" height="773" alt="image" src="https://github.com/user-attachments/assets/78d95835-0a26-4e4d-83d9-5e7b4d24a930" />

<img width="1584" height="298" alt="image" src="https://github.com/user-attachments/assets/30fc5507-7190-4a9d-903a-ab5b7d4cf6c2" />

<img width="1593" height="621" alt="image" src="https://github.com/user-attachments/assets/0808eeb8-5dea-4f4e-8620-e4dd22d3b076" />



<img width="1474" height="711" alt="image" src="https://github.com/user-attachments/assets/c3131e59-eab0-404a-bbff-e25e1e15bf88" />

<img width="1474" height="711" alt="image" src="https://github.com/user-attachments/assets/0e46cb89-9c63-4ff8-af3b-4f1cad0699da" />



Enjoy exploring and tweaking the module!
