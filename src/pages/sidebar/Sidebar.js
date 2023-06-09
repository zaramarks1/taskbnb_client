import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import {useEffect } from "react";
import authService from '../../service/auth.service';

const Nav = styled.div`
  background: #6D41F3;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 1.5rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  color:white;
  align-items: center;

  &:hover {
    cursor: pointer;
    color:black;
  }
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();

    useEffect(() => {
        const user = authService.getCurrentUser();

        if (user) {
        setCurrentUser(user);
        }
    }, []);

    const logOut = () => {
        authService.logout();
        navigate('/'); 
        window.location.reload();
    };


  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
        {currentUser && 
            <NavIcon to='#'>
                <FaIcons.FaBars onClick={showSidebar} />
            </NavIcon>
        }
          <NavIcon to='/'>Home</NavIcon>

          <NavIcon to='/view-listings'>View All Listings</NavIcon>

          {currentUser ? (
                <>
                {/* <NavIcon to='/view-units'>View All Units</NavIcon> */}
                {currentUser.role === 'ADMIN' &&
                  <>
                      <NavIcon to='/view-units' >View all units</NavIcon>
                      <NavIcon to='/register' >Register new user</NavIcon>
                  </>
                  
                }
                 <NavIcon onClick={logOut} >Logout</NavIcon>
                </>

            ) : (
                <>
                <NavIcon to='/login'>Login</NavIcon>
                </>
            )}
           
       

        </Nav>

        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>

      </IconContext.Provider>
  
    </>
  );
};

export default Sidebar;
