import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Logo } from '../assets'
import { data } from 'autoprefixer'

const navItem = [
  {name: 'Work', url: '/Work'},
  {name: 'About', url: '/About'},
  {name: 'Services', url: '/Services'},
  {name: 'Ideas', url: '/Ideas'},
  {name: 'Careers', url: '/Careers'},
  {name: 'Contact', url: '/Contact'},
]

const header = () => {
  const location = useLocation()
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  const navbarStyles = {
    position: 'fixed',
    top: visible ? 0 : '-100px',
    width: '100%',
    zIndex: 1000,
    transition: 'top 0.3s ease-in-out, opacity 0.5s ease-in-out',
    opacity: visible ? 1 : 0,
    pointerEvents: visible ? 'auto' : 'none',
  };
  

  return (
    <>
      <nav style={navbarStyles} className=" w-full bg-primary flex items-center justify-between px-32 py-7 text-white text-xl">
        <NavLink to={'/'}>
          <img src={Logo} alt="logo" className="h-20 w-auto"/>
        </NavLink>
        <ul className="flex flex-row items-center gap-8 ">
          {navItem.map(data => (
            <li key={data.name}>
              <NavLink 
                to={data.url} 
                className={`pb-2 border-b-4 ${location.pathname === data.url ? "border-white" : "border-transparent hover:border-white transition duration-300 ease-in"}`}>
                  {data.name}
              </NavLink>
            </li> 
          ))}
        </ul>
      </nav>
    </>
  )
}

export default header