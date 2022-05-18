import React from "react";
import { HiMenuAlt4 } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillTwitterSquare } from "react-icons/ai";

import { useSpring, animated } from 'react-spring'

import logo from '../../images/logo.png'

const NavbarItem = ({ title, classProps }) => {
    return (
        <li className={`mx-4 cursor-pointer ${classProps}`}>
            {title}
        </li>
    )
}

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = React.useState(false);
    const animationProps = useSpring({ to: { opacity: toggleMenu ? 1 : 0, transform: toggleMenu ? 'translateY(0%)' : 'translateY(-100%)' }});

    return (
        <nav className="w-full flex md:justify-center justify-between items-center p-4 font-sans">
            <div className="md:flex-[0.5] justify-center items-center">
                <img src={logo} alt="Krypt Logo" className="w-32 cursor-pointer" />
            </div>
            <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
                {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
                    <NavbarItem key={item + index} title={item} />
                ))}
                <li className="bg-[#2952e3] hover:bg-[#2546bd] transition-colors duration-300 py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
                    Login
                </li>
            </ul>
            <div className="flex relative">
                {toggleMenu
                ? <AiOutlineClose fontSize={28}  className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
                : <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} /> }
                {toggleMenu && (
                    /* This will only show when toggleMenu is true, also the - in front of "right" means minus */
                    <animated.ul style={animationProps} className="z-10 fixed top-0 -right-0 pl-0 w-[100vw] h-screen md:hidden list-none flex flex-col justify-start items-center blue-glassmorphism text-white">
                        <li className="text-xl w-full my-2">
                            <AiOutlineClose className="cursor-pointer" onClick={() => setToggleMenu(false)} />
                        </li>
                        {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => {
                            return <NavbarItem key={item + index} title={item} classProps="my-2 text-4xl" />
                        })}
                        <div className="w-full flex justify-center items-center">
                            <a href="https://www.linkedin.com" target="_blank"><AiFillLinkedin className="cursor-pointer text-4xl mx-1 text-linkedin-blue rounded-2xl" /></a>
                            <a href="https://www.twitter.com" target="_blank"><AiFillTwitterSquare className="cursor-pointer text-4xl mx-1 text-twitter-blue rounded-2xl" /></a>
                        </div>
                    </animated.ul>
                )}
            </div>
        </nav>
    )
}

export default Navbar