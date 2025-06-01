# Expense-Management

 Expense Management App

A basic web application that allows users to register, log in, create groups, and manage shared expenses with other users. Designed with a focus on collaboration, security, and ease of use.
🚀 Features
🔐 User Authentication

    User Registration & Login:

        Unified interface for sign-up and login

        Sign-up includes: Name, Email, Phone Number, and Password

        Smooth toggle between login and registration forms

👥 Group Expense Management

    Group Creation: Users can create groups to share expenses

    Invite Members: Members can be invited via email

    Unique Group ID: Each group member is assigned a unique identifier

    Expense Management:

        Add, view, and manage expenses in each group

        Split costs among group members automatically

📧 Email Notifications

    Sends automatic email invitations when a user is added to a group

    New users receive registration instructions via email

🔒 API Security

    All endpoints are protected using OAuth 2.0

    Only authenticated users can access application features

🛠️ Tech Stack (Suggested)
Layer	Tech/Framework
Frontend	**TypeScript**,React 
Backend	Express 
Authentication	OAuth 2.0, JWT
Database	MongoDB
Email Service	Nodemailer

🧑‍💻 Getting Started
1. Clone the repository

git clone https://github.com/Saif-Siddiqui16/Expense-Management.git
cd expense-management-app

2. Install dependencies

npm install

3. Configure environment variables

Create a .env file with:

MONGO_URL=
JWT_SECRET=
JWT_REFRESH_SECRET=
EMAIL_USER=
EMAIL_PASS=

4. Run the application

frontend: npm run dev
backend: npm run start
