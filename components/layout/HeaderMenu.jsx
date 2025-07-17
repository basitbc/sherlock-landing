import React from 'react'
import Logo from "../../public/assets/images/logo/company-logo.png"
import CrossIcon from "../../public/assets/images/header-section/close.png"
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const HeaderMenu = ({ isOpen, toggleMenu }) => {
    const router = useRouter();
  const { pathname } = router;
  const isActive = (path) => pathname === path;

  const handleLinkClick = async (path) => {
    await router.push(path);
    toggleMenu();
  };
  return (
    <div className={`mobile-menu-container  ${isOpen ? 'open' : ''}`}>

        <div className=' menu-main d-flex flex-row justify-content-between align-items-center'>
          <Image width={100} height={30} className=' menu-logo' src={Logo} alt='logo' />
          <Image width={20} height={20} className=' close-btn' src={CrossIcon} alt="image" onClick={() => { toggleMenu() }} />
        </div>
        <div className="menu-links d-flex flex-column align-items-center justify-content-center">
          <span className={`brandon-medium fs-20-10 ${isActive('/') ? 'active' : 'grey-5A5'}`} onClick={() => handleLinkClick('/')}>Home</span>
          <span className={`brandon-medium fs-20-10 ${isActive('/about') ? 'active' : 'grey-5A5'}`} onClick={() => handleLinkClick('/about')}>Packages</span>
           <span className={`brandon-medium fs-20-10 ${isActive('/about') ? 'active' : 'grey-5A5'}`} onClick={() => handleLinkClick('/about')}>Blogs</span>
         <span className={`brandon-medium fs-20-10 ${isActive('/work') ? 'active' : 'grey-5A5'}`} onClick={() => handleLinkClick('/work')}>About</span>
         <span className={`primary-btn text-center align-content-center ${isActive('/contact') ? 'active' : ''}`} onClick={() => handleLinkClick('/contact')}>Contact &#8594;</span>
        </div>

    </div>
  )
}

export default HeaderMenu
