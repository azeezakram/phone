import { useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const Home = () => {

    const contacts = [1, 2, 3, 4]

    // const [user, setUsers] = useState(null)
    
    // const getUSers = async () => {

    

    return (
        <>
            <AnimatePresence>
                <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full bg-amber-300 mt-[70px] md:mt-[70px]"
                >
                    
                    <div className="bg-amber-400 max-w-[1200px] mx-auto px-2 flex gap-2">
                        {contacts.map((contact, key) => <div key={key}>{contact}</div>)}    
                    </div>
                    
                </motion.section>
            </AnimatePresence>
        </>
    )
}

export default Home;