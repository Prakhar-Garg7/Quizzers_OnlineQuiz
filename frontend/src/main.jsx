import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './components/home/home.jsx'
import About from './components/AboutUs/About.jsx'
import ContactUs from './components/contact/ContactUs.jsx'
import User from './components/user/user.jsx'
import Login from './components/login/Login.jsx'
import Signup from './components/signup/Signup.jsx'
import CreateQuiz from './components/createquiz/Create.jsx'
import ForgotPassword from './components/forgotpass/Forgotpassword.jsx'
import VerifyOTP from './components/Verifyotp/Verifyotp.jsx'
import ResetPassword from './components/Resetnewpassword/Resetnewpass.jsx'
import VerifyEmailSent from './components/signup/Verifyemailsent.jsx'
import VerifyEmail from './components/signup/Verifyemail.jsx'
import AllQuizzes from './components/Allquizes/Allquiz.jsx'
import { Provider, useSelector } from 'react-redux'
import { store, persistor } from "./store/index.js"
import { PersistGate } from "redux-persist/integration/react"
import LoadingPage from './components/LoadingPage/LoadingPage.jsx'
import TakeQuiz from './components/takeQuiz/TakeQuiz.jsx'
import ProtectedRoute from './components/Protectedroutes/Protectedroute.jsx'
import Adminprofile from './components/adminprofile/Adminprofile.jsx'
import QuizReport from './components/quizReportPage/quizReport.jsx'
import ErrorPage from './components/ErrorPage/ErrorPage.jsx'
import TeacherProfile from './components/adminprofile/Adminprofile.jsx'

const router = createBrowserRouter(
  createRoutesFromElements( 
    <Route path='/' element={<App />}>
      <Route path='' element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<ContactUs />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route path='verify-otp' element={<VerifyOTP />} />
      <Route path='reset-password' element={<ResetPassword />} />
      <Route path='verifyemailsent' element={<VerifyEmailSent />} />
      <Route path='verify-email/:token/:email' element={<VerifyEmail />} />

      <Route element={<ProtectedRoute allowedRole="teacher" />}>
        <Route path='admin' element={<TeacherProfile/>} />
        <Route path='createquiz' element={<CreateQuiz />} />
      </Route>

      <Route element={<ProtectedRoute allowedRole="student" />}>
        <Route path='takequiz/:quizId' element={<TakeQuiz />} />
        <Route path='report/:quizId' element={<QuizReport />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path='allquizes' element={<AllQuizzes />} />
        <Route path='user/:id' element={<User />} />

      </Route>

    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<LoadingPage />} persistor={persistor}>
          <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
