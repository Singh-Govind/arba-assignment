# Arba

## Introduction

This document outlines the design and functionality of a web application for user authentication, product management, and shopping cart functionality.

## User Flow

1. **Login Page**:

   - Upon accessing the application, users are directed to the login page.
   - Existing users can input their credentials (username and password) to log in.
   - New users can navigate to the signup page to create an account.

2. **Signup Page**:

   - Users without an existing account can navigate to the signup page from the login page.
   - The signup page allows users to register by providing required details such as username, email, password, etc.
   - After successful signup, users are automatically redirected to the login page.

3. **Home Page**:

   - After logging in, users are directed to the home page.
   - The home page serves as the central hub of the application, displaying available products and user-related actions.
   - It features a navigation bar with options to view products, manage the shopping cart, update profile, change password, and log out.

4. **MyStore Page**:

   - Users can access the MyStore page from the home page.
   - On the MyStore page, users can create categories for products.
   - Each category requires a name, slug, and image upload.
   - Categories are used to organize and classify products.

5. **Product Management**:

   - Users can access the product management functionality from the MyStore page.
   - Products can be added and related to existing categories.
   - Each product requires a title, description, image upload, price, and association with a category.

6. **Shopping Cart**:

   - Users can view the contents of their shopping cart from any page.
   - They can add or remove items, update quantities, and proceed to checkout.

7. **Profile Management**:

   - Users can update their profile information from the profile page.
   - They can change their name, and other personal details.
   - Profile updates are reflected in the database and displayed on subsequent logins.

8. **Password Management**:
   - Users can change their password from the profile page.
   - They are required to input their current password and provide a new one for security purposes.
   - Password changes are securely processed and stored in the database.

## Technical Implementation

1. **Frontend**:

   - The frontend of the application is built using modern web technologies such as React.js.
   - Material-UI framework is utilized for designing user interfaces with a consistent and responsive layout.
   - Routing is implemented using React Router to manage navigation between different pages.

2. **Backend**:

   - The backend is developed using Node.js with Express.js framework for handling HTTP requests and responses.
   - MongoDB is used as the database for storing user accounts, product information, and categories.
   - Data relationships are established through document references to maintain data integrity and enable efficient querying.

3. **Authentication**:
   - User authentication is managed using basic authentication for secure and stateless access.
   - Passwords are hashed before storing them in the database using bcrypt for security.

## Conclusion

This document outlines the user flow, technical implementation, and functionality of the web application for user authentication, product management, and shopping cart functionality. It provides a structured overview of the system's architecture and serves as a guide for development and testing phases.
