import React from 'react';
import Footer from './Footer';
import NavBar from './NavBar';
import { withRouter } from 'react-router-dom';

const Layout = (props) => {
  return (
    <>
      <NavBar />
      {props.children}
      <Footer />
    </>
  );
};
export default withRouter(Layout);
