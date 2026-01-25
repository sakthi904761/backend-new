# Student Registration & Login - Quick Start Guide

## 🚀 Quick Test

### Step 1: Start Your Backend
```bash
cd backend
npm run dev
```

### Step 2: Start Your Frontend
```bash
cd frontend
npm run dev
```

### Step 3: Access Student SignIn Page
Open: http://localhost:5173/student-signIn

---

## 📝 Registration Example

**Click "Register here" tab and fill:**

| Field | Value |
|-------|-------|
| Full Name | `Raj Kumar` |
| Roll Number | `10050` |
| Class/Grade | `10-A` |
| Email Address | `raj@school.com` |
| Password | `raj123456` |
| Confirm Password | `raj123456` |

**Click "✅ Register"**

✅ Should show: "Registration successful! Please login to continue."

---

## 🔓 Login Example

**On the "Sign In" tab, fill:**

| Field | Value |
|-------|-------|
| Email Address | `raj@school.com` |
| Password | `raj123456` |

**Click "🔓 Sign In"**

✅ Should redirect to: `/student/dashboard`

---

## ✅ Form Validations

### Registration Validations:
- ❌ Empty fields → "Please fill in all required fields!"
- ❌ Password < 6 chars → "Password must be at least 6 characters!"
- ❌ Passwords don't match → "Passwords do not match!"
- ❌ Email already registered → "Email already registered! Please use a different email."
- ❌ Roll number exists → "Registration number already exists!"

### Login Validations:
- ❌ Empty email/password → "Please fill in all fields!"
- ❌ Wrong email/password → "Invalid email or password!"

---

## 🗄️ Database Structure

**Student Collection:**
```javascript
{
  _id: ObjectId,
  name: "Raj Kumar",
  registrationNumber: "10050",
  class: "10-A",
  email: "raj@school.com",
  password: "[HASHED]", // bcrypt hashed
  parentName: "",
  parentEmail: "",
  parentPhone: "",
  createdAt: 2026-01-25T...
}
```

---

## 🔗 API Endpoints

### Register
```
POST http://localhost:5000/api/v1/students/register

Body:
{
  "name": "Student Name",
  "registrationNumber": "10050",
  "class": "10-A",
  "email": "student@school.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

### Login
```
POST http://localhost:5000/api/v1/students/login

Body:
{
  "email": "student@school.com",
  "password": "password123"
}
```

---

## 📱 Features

✅ Modern UI with gradient background
✅ Real-time form validation
✅ Error/Success messages
✅ Loading states
✅ Password hashing (bcrypt)
✅ Email uniqueness validation
✅ Roll number uniqueness validation
✅ Auto-redirect to dashboard on login
✅ localStorage for auth state
✅ Toggle between login/register modes

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 5000 already in use | Change port in backend config |
| Port 5173 already in use | Change port in Vite config |
| CORS error | Check CORS in backend app.js |
| "Invalid email or password" | Check email and password are correct |
| Email shows as registered | Try different email or register with same |
| Can't access /student/dashboard | Need to login first |

---

## 📁 Files Modified

**Backend:**
- ✅ `backend/models/studentSchema.js` - Added password field & methods
- ✅ `backend/controllers/studentController.js` - Added register/login functions
- ✅ `backend/router/studentRouter.js` - Added register/login routes

**Frontend:**
- ✅ `frontend/src/components/StudentSignIn.jsx` - Complete registration/login UI

---

## 🎯 What Students Can Do Now

1. **Register Account**
   - Create new account with email and password
   - Provide name, roll number, and class
   - Password securely hashed with bcrypt

2. **Login to Portal**
   - Login with registered email and password
   - Access student dashboard and all features
   - Stay logged in across page refreshes

3. **Data Validation**
   - System prevents duplicate emails
   - System prevents duplicate roll numbers
   - Passwords must be 6+ characters

---

**Status:** ✅ Ready to Use!

Try it now by visiting: http://localhost:5173/student-signIn
