import { FaBars, FaTimes } from 'react-icons/fa';
//import '../Styles/Navbar.css';
import { useState } from 'react';

const Nav = () => {
    const [toggle, setToggle] = useState(false);
    const handleClick = () => setToggle(!toggle);
    const closeMenu = () => setToggle(false);

    
    return (
        <div className='header'>
            <nav className='navbar'>
                <div className='toggled' onClick={handleClick}>
                    {/*Logic responsible for changing the dropdown menu icon from bars to "x" on mobile devices*/}
                    {toggle ? (<FaTimes size={30} style={{color: '#ffffff'}}/>) : (<FaBars size={30} style={{color: '#ffffff'}}/>)}
                </div>
                {/*If toggle variable is equal to true set className to 'nav-links active', if it is false set it to 'nav-links'*/}
                <ul className={toggle ? 'navLinks active' : 'navLinks'}>
                    <li className='navItem'>
                        <a href='/' onClick={closeMenu}>Homepage</a>
                    </li>
                    <li className='navItem'>
                        <a href='/watched' onClick={closeMenu}>Watched</a>
                    </li>
                    <li className='navItem'>
                        <a href='/toWatch' onClick={closeMenu}>To Watch</a>
                    </li>
                    <li className='navItem'>
                        <a href='/favourite' onClick={closeMenu}>Favourite</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
 
export default Nav;