import React, {useState} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import {SidebarData} from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';

export default function Navbar() {
    const [sidebar, setSidebar] = useState(false)
    const showsidebar = () => setSidebar(!sidebar)
    return (
            <IconContext.Provider value={{color: 'grey'}}>
            <div className='navbar'>
            <Link to='#'className='menu-bars'>
                <FaIcons.FaBars onClick={showsidebar}/>
            </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active':'nav-menu'}>
                <ul className='nav-menu-items' onClick={showsidebar}>
                    <li className='navbar-toggle'>
                        <Link to='#' className='menu-bars'>
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                    <li className='nav-text'>
                        <Link to={{ pathname: "https://github.com/madhour" }} target="_blank">
                        <AiIcons.AiFillGithub/>
                        <span>Github</span>
                        </Link>
                    </li>
                </ul>
            </nav>
            </IconContext.Provider>
    )
}
