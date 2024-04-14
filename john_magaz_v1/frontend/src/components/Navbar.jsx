import React, { useContext, useReducer, useState } from 'react'
import logo from '../assets/logo.png'
import { LiaCrossSolid } from "react-icons/lia";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { DataContext } from '../context/DataProvider';
import FavouriteReducer, { InitialState } from '../store/FavouriteReducer';
const Navbar = () => {
  const { magazineId } = useContext(DataContext);
  const [state, dispatch] = useReducer(FavouriteReducer, InitialState);
  const [openmenu, setOpenmenu] = useState(false);
  const [openAboutmenu, setOpenAboutmenu] = useState(false);
  const [openMinsteries, setOpenMinsteries] = useState(false)
  const handlechange = () => {
    dispatch({ type: "add" })
  }
  return (
    <>
      <div className='p-3 flex flex-row justify-between items-center bg-gray-200'>
        <img src={logo} className='w-40 h-20' />
        <div className='flex justify-between items-center gap-4 px-10 font-semibold text-xl'>
          <p className='border-r-2 border-black/50 px-2 cursor-pointer flex items-center' onMouseEnter={() => setOpenmenu(!openmenu)} onMouseLeave={() => setOpenmenu(!openmenu)}><span>Watch</span>
            <RiArrowDropDownLine size={30}
              className={` ${openmenu ? "rotate-180 transition-transform duration-500 ease-in-out"
                : "rotate-360 transition-transform duration-500 ease-in-out"}`} /></p>
          <p className='border-r-2 border-black/50 pr-4 cursor-pointer flex items-center'>Testimonies
          </p>
          <p className='border-r-2 border-black/50 pr-2 cursor-pointer flex items-center'>Aruputha Manna</p>
          <p className='border-r-2 border-black/50 px-2 cursor-pointer flex items-center'
            onMouseEnter={() => setOpenAboutmenu(true)}
            onMouseLeave={() => setOpenAboutmenu(false)}>About  <RiArrowDropDownLine size={30}
              className={` ${openAboutmenu ? "rotate-180 transition-transform duration-500 ease-in-out"
                : "rotate-360 transition-transform duration-500 ease-in-out"}`} /></p>
          {openAboutmenu &&
            <div className='absolute  w-60 top-[115px] right-44  font-semibold text-xl 
             bg-gray-200 flex flex-col justify-start items-center text-nowrap  pt-4'
              onMouseEnter={() => setOpenAboutmenu(true)}
              onMouseLeave={() => setOpenAboutmenu(false)}>
              <button className='hover:border-b-2
           border-black/50 w-full p-2'>Contact Us</button>
              <button className='hover:border-b-2
           border-black/50 w-full text-center
            p-2'>Founder</button>
              <button className='hover:border-b-2
           border-black/50 w-full text-center
           p-2 pb-4'>Meet the Writer</button>
              <p className='hover:border-b-2
           border-black/50 w-full text-center
           p-2 pl-10 cursor-pointer flex justify-center items-center '
                onMouseEnter={() => setOpenMinsteries(true)}
                onMouseLeave={() => setOpenMinsteries(false)}> Our Ministiries
                <RiArrowDropDownLine size={30}
                  className={` ${openMinsteries ? "rotate-180 transition-transform duration-500 ease-in-out"
                    : "rotate-360 transition-transform duration-500 ease-in-out"}`} />
              </p>
              {openMinsteries &&
                <div className='flex flex-col  border-2 justify-center items-center'
                  onMouseEnter={() => setOpenMinsteries(true)}
                  onMouseLeave={() => setOpenMinsteries(false)}>
                  <p className='hover:border-b-2
           border-black/50 w-60 text-center py-2 cursor-pointer'>Chruch Activities</p>
                  <p className='hover:border-b-2
           border-black/50 w-full text-center cursor-pointer py-2' >Trust Activities</p>
                  <p className='hover:border-b-2
           border-black/50 w-full text-center cursor-pointer py-2' >Children's Home</p>
                </div>
              }

            </div>
          }
          <Link title="Bookmarks" className='pr-4' to="/fav">
            <LiaCrossSolid size={20} className=' rounded-full  w-10 h-10  cursor-pointer hover:scale-90 duration-150 translate-x-2 transition-transform ease-in-out' />
          </Link>
          <button className='bg-rose-600 text-white subpixel-antialiased px-6 p-1 rounded-md'>GIVE</button>
        </div>

      </div>



    </>
  )
}

export default Navbar


// Testimonies  ==  month wise

// Read == daily passage

// About -- Countact us , Founder,  Ministiries -- chruch , trust , Childrens Home, Meet the writer  