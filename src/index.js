import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider, useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'core-js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'

import App from './App'
import store, { setIsLastActiveThree } from './store'
import ErrorBoundary from './ErrorBoundary'
import EnquiryForm from './pages/EnquiryForm'
import EnquiryFormTimer from './pages/EnquiryFormTimer'

const root = createRoot(document.getElementById('root'))

const RootComponent = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setIsLastActiveThree(true))
    }, 120000)
    return () => clearTimeout(timer)
  }, [dispatch])

  return (
    <>
      <ErrorBoundary>
        <App />
        <EnquiryFormTimer key={1} />
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
          theme="light"
        />
      </ErrorBoundary>
    </>
  )
}

root.render(
  <Provider store={store}>
    <RootComponent />
  </Provider>,
)
