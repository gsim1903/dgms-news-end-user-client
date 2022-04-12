import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Articles from './Components/Articles.jsx'
import Article from './Components/Article.jsx'
import NavBar from './Components/NavBar.jsx'
import ArticleGroup from './Components/ArticleGroup.jsx'
import Footer from './Components/Footer.jsx'
import Login from './Components/Login.jsx'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/article/:id" element={<Article  />} />
        <Route path="/:category" element={<ArticleGroup />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
      <div
        style={{
          position: 'fixed',
          left: 0,
          bottom: 0,
          right: 0,
        }}
      >
        <Footer />
      </div>
      <div data-cy="flash-message">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  )
}
export default App
