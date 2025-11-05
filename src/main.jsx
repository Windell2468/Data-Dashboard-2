import React from 'react' //
import ReactDOM from 'react-dom/client' // React DOM for rendering to the DOM
import { BrowserRouter, Routes, Route } from 'react-router-dom' // React Router components routing
import App from './App' //
import DetailView from './routes/DetailView' // Detail view  for individual Disney Character
import Layout from './routes/Layout' // Layout component, common UI wrapper
import './index.css'  // only if you have this file
//
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    {/*Routing structure */}
  <Routes>
    {/* Root route "/" renders Layout component*/}
    <Route path="/" element={<Layout />}>
    {/* Index router renders the main App component (dashboard) */}
      <Route index element={<App />} />
      {/* A route for showing details of a specific disney character ID */}
      <Route path="character/:id" element={<DetailView />} />
    </Route>
  </Routes>
</BrowserRouter>
  </React.StrictMode>
)
