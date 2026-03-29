import React from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";
import {Helmet} from "react-helmet";
import { ToastContainer } from 'react-toastify';


const Layout = ({children, description,title, author, keywords}) => {
  
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />                
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Navbar className='z-100' />
      <main className="flex-grow min-h-[79vh] bg-purple-900 from-indigo-50 via-white to-purple-50 relative z-0"
       style={{
          background: 'linear-gradient(135deg, #0D0A1A 0%, #1E1333 40%, #2D1B5E 70%, #3B1F7A 100%)',
        }}
      >
                <ToastContainer/>
                {children} 
              </main>
          <Footer />
    </div>
  );
}
Layout.defaultProps = {
  title: "Job Portal App",
  description: "MERN stack project",
  author: "Palash"
}

export default Layout