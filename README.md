# 🎓 Online Course Management Portal – Frontend

This is the **frontend** of the Online Course Management Portal, built using **React.js with Vite**.  
It provides the **user interface** for students and admins to interact with the system, consuming REST APIs from the backend.  

The frontend integrates with the backend (Spring Boot + MySQL) and supports **authentication, course catalog, enrollment, and dashboards**.  


## 🚀 Features
- Vite-powered **React.js** frontend (fast development build tool)  
- Role-based UI for **Admin** and **Student**  
- Integration with backend REST APIs (Spring Boot)  
- JWT token storage and handling for authentication  
- Course catalog with enrollment and mock payment flow  
- Student dashboard for progress tracking  
- Admin dashboard for course management (CRUD)  
- Responsive UI with modern styling (CSS/Tailwind/Material-UI, as used)  

---

## 📦 Tech Stack
- **Frontend Framework**: React (with Vite)  
- **Package Manager**: npm / yarn  
- **HTTP Client**: Axios  
- **Routing**: React Router  
- **Styling**: CSS / Tailwind / Material-UI  

## ⚙️ Running the Frontend

### 1. Clone the repository
git clone https://github.com/beeragownivari/Course_portal_frontend.git
2. Navigate into the project

cd Online_Course_Management_Portal_FrontEnd

3. Install dependencies

npm install
(or if you use Yarn)
yarn install

4. Configure backend API URL
In Vite, environment variables are stored in a .env file.
Create or update .env in the project root with your backend API URL:
VITE_API_URL=http://localhost:8080/api
const apiUrl = import.meta.env.VITE_API_URL;

6. Run the application

npm run dev
(or)
yarn dev

The application will start on:
👉 http://localhost:5173
