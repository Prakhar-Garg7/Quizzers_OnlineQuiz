import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './components/home/home.jsx'
import About from './components/AboutUs/About.jsx'
import ContactUs from './components/contact/ContactUs.jsx'
import User from './components/user/user.jsx'
import Github from './components/github/github.jsx'
import Login from './components/login/Login.jsx'
import Signup from './components/signup/Signup.jsx'
import CreateQuiz from './components/createquiz/Create.jsx'
import ForgotPassword from './components/forgotpass/Forgotpassword.jsx'
import VerifyOTP from './components/Verifyotp/Verifyotp.jsx'
import ResetPassword from './components/Resetnewpassword/Resetnewpass.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<ContactUs />} />
      <Route path='user/:id' element={<User />} />
      <Route path='github' element={<Github />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='createquiz' element={<CreateQuiz />} />
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route path='verify-otp' element={<VerifyOTP />} />
      <Route path='reset-password' element={<ResetPassword />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
