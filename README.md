# Express Subscription Workflow API

## Overview
This project is a subscription management API built with Express.js, MongoDB (via Mongoose), and integrates workflow automation for handling subscription renewals and reminders. It features authentication, centralized error handling, environment-based configurations, and email notifications using Nodemailer.

## Features
- **Express.js Generator Setup**: Created using `npx express-generator --no-view --git`.
- **ESLint Integration**: Configured with best practices for linting.
- **Environment Variables**: Supports both development and production configurations.
- **MongoDB Atlas & Mongoose**: Database integration with schemas for users and subscriptions.
- **Centralized Error Handling**: Ensures errors are properly managed within the application.
- **Authentication**: Uses JWT for secure user authentication.
- **Atomic Transactions**: Ensures data integrity using `mongoose.startSession` and `startTransaction`.
- **Rate Limiting & Security**: Implements Arcjet for backend security and rate limiting.
- **Workflow Automation**: Implements task scheduling to handle subscription renewals and reminders.
- **Email Notifications**: Uses Nodemailer to send automated reminder emails before subscription renewal.
- **Modular Structure**: Organized into `config`, `controllers`, `database`, `middlewares`, `models`, `routes`, and `utils` directories.
- **ESM (ECMAScript Modules)**: Uses `module` type in `package.json` for modern JavaScript imports.

## Folder Structure
```
project-root/
│── config/               # Configuration files
│── controllers/          # Route handlers
│── database/             # Database connection logic
│── middlewares/          # Express middlewares (including error handling)
│── models/               # Mongoose models (User, Subscription)
│── routes/               # Express route definitions
│── utils/                # Utility functions
│── .env.development.local # Environment variables for development
│── .env.production.local  # Environment variables for production
│── app.js                # Main entry point
│── package.json          # Project dependencies
```

## Installation & Setup

### Prerequisites
- Node.js (>= 16.x)
- MongoDB Atlas (or local MongoDB instance)
- Git

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/yvesHakizimana/subscritption-api
   cd subscription-api
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Configure environment variables:
   Create `.env.development.local` and `.env.production.local` files and populate them with:
   ```env
   # PORT
   PORT=3000
   SERVER_URL=http://localhost:3000

   # ENVIRONMENT
   NODE_ENV=development

   # DATABASE
   DB_URI=<your-mongodb-uri>

   # JWT
   JWT_SECRET=<your-jwt-secret>
   JWT_EXPIRES_IN='7d'

   # ARCJET
   ARCJET_KEY=<your-arcjet-key>
   ARCJET_ENV=development

   # UPSTASH
   QSTASH_URL=http://localhost:8080
   QSTASH_TOKEN=<your-qstash-token>
   QSTASH_CURRENT_SIGNING_KEY=<your-current-signing-key>
   QSTASH_NEXT_SIGNING_KEY=<your-next-signing-key>

   # NODEMAILER
   EMAIL_USERNAME=<your-email-username>
   EMAIL_PASSWORD=<your-email-password>
   ```

4. Start the application:
   ```sh
   npm start
   ```
   or for development mode:
   ```sh
   npm run dev
   ```

## Subscription Workflow
### **1. Triggering the Workflow**
- The workflow begins when a user creates a new subscription.
- The `subscriptionId` is passed to the workflow.

### **2. Retrieving Subscription Details**
- The process extracts the `subscriptionId` and searches for the subscription in the database.

### **3. Validation Checks**
- If the subscription doesn't exist, an error is logged, and the process terminates.
- If the subscription exists, its status is checked:
    - **Inactive**: Status is logged, and the process exits.
    - **Active**: The renewal date is verified.
    - **Expired**: The renewal date has passed.

### **4. Renewal Date Evaluation**
- If the renewal date has passed, the process exits.
- If the renewal date is in the future, the **Reminder Loop** begins.

### **5. Reminder Scheduling**
- The system schedules reminders **5, 2, and 1 day(s)** before the renewal date.
- Each scheduled reminder triggers an email notification.

### **6. Completion**
- Once reminders are sent, the workflow ends.

## API Endpoints
### **Authentication**
| Method | Endpoint          | Description         |
|--------|------------------|---------------------|
| POST   | `/auth/signup`   | Register a new user |
| POST   | `/auth/login`    | Authenticate user   |

### **Subscription Management**
| Method | Endpoint                           | Description                    |
|--------|------------------------------------|--------------------------------|
| POST   | `/subscriptions`                   | Create a new subscription      |
| GET    | `/subscriptions/:id`               | Get subscription details       |
| PUT    | `/subscriptions/:id`               | Update subscription status     |
| DELETE | `/subscriptions/:id`               | Delete a subscription          |
| GET    | `/subscriptions/user/:id`          | Get subscriptions of the user. |
| GET    | `/subscriptions/upcoming-renewals` | Get the upcoming renewals api. |
| PATCH  | `/subscriptions/:id/cancel`        | Cancel a subscription          |

## Error Handling
- Centralized error handling middleware ensures all errors are processed consistently.
- The middleware is positioned **after all routes and middlewares** to catch and format errors correctly.

## Security Features
- **JWT Authentication**: Secure token-based authentication.
- **Rate Limiting**: Implements Arcjet for request rate-limiting.
- **Environment Variables**: Uses `.env` files to store sensitive information.

## Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Email Service**: Nodemailer
- **Security**: Arcjet for rate limiting & protection
- **Workflow Automation**: Task Scheduling & Qstash

## Future Improvements
- Implement WebSockets for real-time notifications.
- Add an admin panel for monitoring subscriptions.
- Enhance logging & monitoring with tools like Winston & Datadog.

## License
This project is licensed under the MIT License.

## Author
Yves HAKIZIMANA - yvhakizimana123@gmail.com