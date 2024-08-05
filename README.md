# AlgoUniversity Online Judge Platform

## Introduction

This is an online judge platform developed as part of the AlgoUniversity Dev Season. The platform allows users to submit code solutions for various programming problems and receive feedback on their solutions.
The Online Judge Platform is designed to facilitate competitive programming and coding challenges. Users can submit their code, which will be evaluated against predefined test cases. The platform is built using the MERN stack (MongoDB, Express.js, React.js, Node.js).

## How to Run

### Backend Setup

1. **Clone Repository**: Clone the repository to your local machine.

   ```bash
   git clone <repository_url>
   ```

2. **Navigate to Backend Directory**: Move into the backend directory.

   ```bash
   cd Backend
   ```

3. **Install Dependencies**: Install the required dependencies.

   ```bash
   npm install
   ```

4. **Setup Environment Variables**: Create a `.env` file in the root of the backend directory and add your environment variables.

   ```
   MONGOOSE_API_KEY=<mongo URI>
   JWT_ACCESS_KEY=<jwt access key>
   JWT_SECRET_KEY=<jwt secret key>
   NODE_ENV=development


   ```

5. **Start Backend Server**: Start the backend server.

   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to Frontend Directory**: Move into the frontend directory.

   ```bash
   cd Frontend/online-judge
   ```

2. **Install Dependencies**: Install the required dependencies.

   ```bash
   npm install
   ```

3. **Setup Dotenv file **:

   ```
    REACT_APP_BACK_END_URL = http://localhost:3000
    PORT=3001
   ```

4. **Start Frontend Server**: Start the frontend server.

   ```bash
   npm start
   ```

5. **Access the Application**: Access the application at `http://localhost:<port>` in your web browser.

## Mentors

- Bhavya Surana
- Bhavesh Garg
