import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

    const [scrolledBotton, setScrolledBottom] = useState(false);
    const [prevProsition, setPrevProsition] = useState(window.scrollY)
    
    useEffect(() => {
        const navbarHandler = () => {
            console.log("scrolled");
            setScrolledBottom(window.scrollY > prevProsition)
            setPrevProsition(window.scrollY)
        }

        window.addEventListener('scroll', navbarHandler);

        console.log("use effect active");

        return () => {
        window.removeEventListener("scroll", navbarHandler);
        };
    }, [prevProsition])


	return (
		<>
			<nav className={`border-b-1 bg-white border-gray-200 fixed left-0 top-0 w-full z-50 ${scrolledBotton ? "-translate-y-full" : "tracking-y-9"}transition-all duration-150`} id="navBar">
				<div className='flex h-[70px] md:h-[70px] max-w-[1200px] mx-auto px-2 justify-between items-center'>
					<div className='text-xl font-[400]'><Link to='/'>My<span className="text-blue-600 ">Ones</span></Link></div>
					<div>
						<button className='bg-blue-600 text-white font-[400] p-2 rounded-sm text-[0.8rem] hover:opacity-80 cursor-pointer'>
							<Link to='/create-contact'>Create New Contact</Link>
						</button>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
