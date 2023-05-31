import React from 'react'
import SearchBar from '../SearchBar/SearchBar';
import NavbarIcons from '../NavbarIcons/NavbarIcons';
import { StyledNavbar } from './Navbar.style';

function Navbar() {
  return (
    <StyledNavbar>
        <NavbarIcons/>
    </StyledNavbar>
  )
}

export default Navbar