### Mini HRMS SYSTEM
This is a Full Stack HRMS Application With Role Bases Access Control. Both Admin/HR has different views. HR /Admin can manage employee, salary, leaves and payroll. Employee can view its own data, mark attendance and apply for leaves. Proper access control has been implemented in both backend and frontend through Guards and middlewares. Built on the MERN (MongoDB, Express.js, React, Node.js)

## Tech Stack 🛠️

- **FRONTEND:** **ReactJs**, **Bootstrap**
- **BACKEND:** **Node.js**, **Express.js**, **MongoDB**.
- **AUTHENTICATION:** **JWT (JSON Web Tokens)**.
- **ROLE-BASED ACCESS CONTROL (RBAC):** Admin/Hr and Employee have different permissions.

- **Demo account to see data.**
```bash
ADMIN: admin@gmail.com  admin@123

EMPLOYEE: abhay@gmail.com  abhay@123
EMPLOYEE: sumesh@gmail.com sumesh@123
```

## Features ✨

### **Authentication and Authorization**
- **Login** with email and password.
- **Role-based access control (RBAC):**
  - **Admin/HR**: Can manage employee (creation, updation).
  - **Employee**: Employees can check in and checkout, apply for leaves etc.
- **Input validation** for all forms (e.g., email, password).
- **Authorization** Proper access control has been implemented in both backend and frontend through Guards and middlewares.

### **Admin**
- **Manage Admin**: Admin/HR can create new employee as admin/hr role, view its details and update its details.

### **Attendance**
- **View Attendance**: Admin/HR can view attendance details of each employee with different filters available. Employees can view all its attendance details
- **CheckIn and CheckOut**: Employee can check in and check out during working hour(9AM to 7PM). Employee can only check in and check out once in a day. Proper validation has been implemented from backend side for this.

### **Leaves**
- **Manage Leaves**: Admin/HR can view all the applied leaves and its details. Admin/HR can approve or reject the leave based on the details. Employees can view all its leaves applied.
- **Leave application**: Employees can apply different kind of leaves(Casual Leave (CL), Sick Leave (SL), Earned Leave (EL)) through leave application form.
- **Input Handling**: Proper error messages are displayed for invalid inputs or failed API requests.

### **Salary**
- **Manage Leaves**: Admin/HR can view salary details of all the employees. Admin/HR can create and edit salary details of an employee through a form.
- **Input Handling**: Proper error messages are displayed for invalid inputs or failed API requests.

### **Payroll**
- **Payroll Management**: Automatic payroll is generated for the previous month of each employees based on the formula (Base Salary / Total working days) * (Total days employee was present). A cronjob runs on 12AM of first day of each month and generate the payroll for each employee for the previous month based on the formula. The payroll is stored in the database with all its details. Employee can view the payroll for the previous month. 



## Installation 🛠️

Follow these steps to set up the Github User Repo Explorer on your local machine:

- **Clone the client and server repositories.**
```bash
git clone https://github.com/absiemon/mini-hrms.git
git clone https://github.com/absiemon/mini-hrms-server.git
```
- **Move to the project directories of client and server.**
```bash
cd client
cd server
```
- **Install required packages in both the repos.**
```bash
npm install
```

- **Naviage to server, create env file and add your credentials into it**
```bash
NODE_ENV: 'DEVELOPMENT || PRODUCTION'
ACCESS_TOKEN_SECRET_KEY: ''
REFRESH_TOKEN_SECRET_KEY: ''
BASE_URL: ''
DB_URL: ''
CLIENT_URL: ''
TYPE_FORGOT_PASSWORD=2
WEBSITE_NAME=Mini HRMS
BCRYPT_PASSWORD_SALT_FACTOR=10
```

- **Naviage to CLIENT, create env file and add your credentials into it**
```bash
REACT_APP_MODE: 'DEVELOPMENT || PRODUCTION'
REACT_APP_DEV_BASE_URL: 'DE BASE URL OF SERVER'
REACT_APP_PROD_BASE_URL: 'PROD BASE URL OF SERVER'
```

- **Run the app.**
```bash
cd client
npm start
cd ..
cd server
npm run dev
```


