import { useEffect } from "react";
import sal from "sal.js";
import "sal.js/dist/sal.css";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

// this is a layout that will initialize sal.js on every page that use this layout
const SalLayout = ({ children }) => {
  const location = useLocation();
  // initialize Sal on every route change
  useEffect(() => {
    sal();
  }, [location]);

  return <>{children}</>;
};

SalLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SalLayout;
