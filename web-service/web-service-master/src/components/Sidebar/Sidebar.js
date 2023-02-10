import React from "react";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { Divider } from "@material-ui/core";
//icons 
import { BiBarChartAlt2, BiWorld, BiSearch } from "react-icons/bi";



const SideBar = ({ isOpen, toggle }) => (
  <div className={classNames("sidebar", { "is-open": isOpen })}>
    <div className="sidebar-header">
      <span onClick={toggle} style={{ color: "black" }}>
        &times;ffff
      </span>
    </div>
    <Divider/> 
    <div className="side-menu">
      <Nav vertical className="list-unstyled">
        
        <NavItem>
          <NavLink tag={Link} to={"/dashboard"}>
          <BiWorld size="25px"/>
            Dashboard
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="nav-link" tag={Link} to={"/analytics"}>
          <BiBarChartAlt2 size="25px"/>
            Analytics
          </NavLink>
        </NavItem>
        <NavItem> 
          <NavLink className="nav-link" tag={Link} to={"/explore"}>
          <BiSearch size="25px"/>

            Explore
          </NavLink>
        </NavItem>
      
      </Nav>
    </div>
  </div>
);


export default SideBar;
//            <FontAwesomeIcon icon={faChartLine} className="nav-item-icon" />
