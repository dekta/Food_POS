# POS System for Food Business
This project focuses on developing a scalable and user-friendly Point of Sale (POS) system tailored for food businesses. The system empowers restaurant staff to efficiently manage operations and allows customers to place orders seamlessly.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)

## Features

### Register and Login with Role-Based Access:

**1. Admin Login**:
- Admins have complete access to the entire website, including all features and functionalities.
- Admins can:
    - Manage menu items.
    - Process and monitor customer orders.
    - Register and manage staff accounts, assigning specific permissions based on roles.

**2. Staff Registration and Login**:
- Admins can register staff members and assign them role-based permissions, limiting their access to specific sections of the system (e.g., menu management or order processing).
- Staff members can log in to perform their designated tasks efficiently.

**3. Customer Registration and Login**:
- Customers can register and log in to the system.
- Once logged in, customers can:
    - Browse the menu.
    - Add food items to their cart for placing orders.

### Menu Management:

**1. View Menu Items:**
- Display all available menu items for the restaurant.
- Includes item details such as name, price, and description.

**2. Add New Menu Items:**
- Allows staff to create and add new dishes to the menu.

**3. Update Menu Items:**
- Edit existing menu items to reflect changes in price, availability, or descriptions.

**4. Delete Menu Items:**
- Remove items that are no longer available or relevant from the menu.

### Checkout Page

**1. Update Quantity:**
- Customers can modify the quantity of items in their cart directly on the checkout page.
- The total price is updated dynamically based on the changes.

**2. Delete Items:**
- Customers can remove items from their cart if they no longer wish to purchase them.

**3. Place Order:**
- Once satisfied with the cart, customers can proceed to place their order.

### Order Management Page
**1. View Orders:**
- Admins can see a detailed list of all orders placed by customers.
- Each order displays information such as customer details, items ordered, quantities, total price, and order status.

**2. Update Order Status:**
- Admins can manage the order lifecycle by changing the status of an order.
- Statuses include:
   - Pending: When the order is placed and awaiting processing.
   - Completed: When the order is fulfilled and delivered to the customer.


## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/dekta/Food_POS.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd Food_POS
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Run the application**:
    ```bash
    npm start
    ```

5. **Open the application**:
    - Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **CSS Modules**: Scoped and modular styling for components.
- **Local Storage**: For persisting workflow data across sessions.


## Project Structure

```bash
Food_Pos
└── Food_POS
    ├── client
    │   ├── .gitignore
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── public
    │   │   ├── favicon.ico
    │   │   ├── index.html
    │   │   ├── logo192.png
    │   │   ├── logo512.png
    │   │   ├── manifest.json
    │   │   └── robots.txt
    │   ├── README.md
    │   └── src
    │       ├── App.css
    │       ├── App.js
    │       ├── App.test.js
    │       ├── assets
    │       │   └── react.svg
    │       ├── components
    │       │   ├── Auth
    │       │   │   ├── LoginForm.js
    │       │   │   └── RegisterForm.js
    │       │   ├── Menu
    │       │   │   ├── MenuForm.js
    │       │   │   └── MenuList.js
    │       │   ├── Navbar.js
    │       │   ├── Orders
    │       │   │   └── OrderList.js
    │       │   └── ProtectedRoute.js
    │       ├── index.css
    │       ├── index.js
    │       ├── logo.svg
    │       ├── pages
    │       │   ├── CheckoutPage.js
    │       │   ├── LoginPage.js
    │       │   ├── MenuPage.js
    │       │   ├── OrderPage.js
    │       │   └── RegisterPage.js
    │       ├── reportWebVitals.js
    │       ├── services
    │       │   └── apiService.js
    │       ├── setupTests.js
    │       └── utils
    │           └── helper.js
    ├── README.md
    └── server
        ├── .gitignore
        ├── config
        │   └── db.js
        ├── controllers
        │   ├── authController.js
        │   ├── menuController.js
        │   └── orderController.js
        ├── middleware
        │   └── authMiddleware.js
        ├── models
        │   ├── menuItemModel.js
        │   ├── orderModel.js
        │   └── userModal.js
        ├── package-lock.json
        ├── package.json
        ├── routes
        │   ├── authRoutes.js
        │   ├── menuRoutes.js
        │   └── orderRoutes.js
        └── server.js

```