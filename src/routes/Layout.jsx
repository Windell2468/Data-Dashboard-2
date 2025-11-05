import { Outlet, Link } from 'react-router-dom' //

function Layout() { //
  return (
    <div>
      <nav style={{ padding: '10px' }}> 
        {/* Navigation links go inside the nav tag */} 
        <Link to="/" style={{ fontWeight: 'bold', marginRight: '10px' }}>
          Home
        </Link>
      </nav>

      {/* This renders the child routes (like App or DetailView) */}
      <Outlet />
    </div>
  )
}

export default Layout
