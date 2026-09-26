# Cartivo E-commerce

A MERN storefront and admin dashboard built with React, Vite, Express, and MongoDB.

## Features

- Product catalog, product details, search, filters, cart, and wishlist
- Customer registration, login, and authenticated checkout
- Admin dashboard, product creation and deletion, and order management
- Product ratings and customer reviews
- MongoDB-backed products, accounts, orders, and reviews

## Local development

Requirements: Node.js 18 or newer and MongoDB.

1. Install dependencies:

   ```sh
   npm install
   npm install --prefix server
   npm install --prefix client
   ```

2. Create `server/.env` with:

   ```dotenv
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
   JWT_SECRET=<a-unique-random-value-at-least-32-characters>
   CLIENT_URL=http://localhost:5173
   ```

3. Start the API and storefront:

   ```sh
   npm run dev
   ```

   The API health endpoint is `http://localhost:5000/api/health`. The Vite development server proxies `/api` requests to it.

## Production deployment

Deploy the `server` and `client` folders as separate services. Set these values in the backend host:

```dotenv
NODE_ENV=production
PORT=<provided-by-host>
MONGO_URI=<mongodb-atlas-connection-string>
JWT_SECRET=<unique-random-value-at-least-32-characters>
CLIENT_URL=https://<frontend-domain>
```

Set this value in the frontend build environment:

```dotenv
VITE_API_URL=https://<backend-domain>
```

Backend install/start commands: `npm ci` and `npm start` from `server/`.

Frontend build command: `npm ci && npm run build` from `client/`. Publish the generated `client/dist` directory and configure the host to serve `index.html` for application routes (SPA fallback).

Never commit real environment files or credentials. `.env.example` documents the variable names; replace its placeholders in the host settings.

## First admin account

Register a normal account, then promote that account in MongoDB by setting `isAdmin` to `true` and `role` to `admin`. Admin API routes verify this role on the server. Do not add a public admin-registration flow.

## Current limitations

- Checkout currently supports cash on delivery; online payment processing is not enabled.
- The product admin supports adding and deleting products; editing products is not implemented yet.
- The customer order API exists, but there is not yet a customer-facing order-history page.
- Product image uploads are stored in MongoDB as compressed data URLs. For a larger catalog, use image storage such as Cloudinary or object storage and save the resulting URL in MongoDB.
- Demo catalog and preview checkout are for local development only. Add real products to the production database before launch.
