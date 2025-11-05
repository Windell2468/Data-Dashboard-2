import React from 'react' //
import ReactDOM from 'react-dom/client' //
import { BrowserRouter, Routes, Route } from 'react-router-dom' // React Router components routing
import App from './App' //
import DetailView from './routes/DetailView' // Detail view  for individual Disney Character
import Layout from './routes/Layout' // Layout conponents, common UI wrapper
import './index.css'  // only if you have this file

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> 
  <Routes>
    <Route path="/" element={<Layout />}> 
      <Route index element={<App />} />
      <Route path="character/:id" element={<DetailView />} />
    </Route>
  </Routes>
</BrowserRouter>
  </React.StrictMode>
)
