import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from "react-redux"
import rootReducer from './reducer/index.js'
import { configureStore } from '@reduxjs/toolkit'
import {Toaster} from "react-hot-toast"
import { GoogleOAuthProvider } from '@react-oauth/google'
const store = configureStore({
  reducer : rootReducer
})

if (import.meta.env.VITE_NODE_ENV) {
  console.log = () => {};
}
createRoot(document.getElementById('root')).render(

  <GoogleOAuthProvider clientId="972120141066-jm9tmb41fgf77tipmvvaopols0h78qrs.apps.googleusercontent.com">
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </Provider>
  </GoogleOAuthProvider>
  
    
)
