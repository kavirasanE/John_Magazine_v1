import React, { useContext, useEffect, useReducer, useState } from 'react'
import magazine from '../assets/magazine.jpg'
import { LiaCrossSolid } from "react-icons/lia";
import { DataContext } from '../context/DataProvider';
import { InitialState } from '../store/FavouriteReducer';
import FavouriteReducer from '../store/FavouriteReducer'
const Magazine_Card = ({ datas, index }) => {
  const [bookmarkcolor, setBookmarkColor] = useState(false)
  const { setmagazineId } = useContext(DataContext);
  const [state, dispatch] = useReducer(FavouriteReducer, InitialState)
  useEffect(() => {
    const storedColor = localStorage.getItem(`color_${datas.id}`);
    if (storedColor) {
      setBookmarkColor(JSON.parse(storedColor));
    }
  }, []);

  const handleBookmark = (e) => {
    e.preventDefault();
    setBookmarkColor(!bookmarkcolor);
    localStorage.setItem(`color_${datas.id}`, JSON.stringify(!bookmarkcolor));
    setmagazineId((prevState) => {
      return [
        ...prevState,
        { id: datas.id }
      ];
    });
  };
  // const handleBookmark =() => {
  //   setBookmarkColor(!bookmarkcolor)
  //    setmagazineId(prevstate => {
  //     const name = "id"
  //     return {
  //       ...prevstate,
  //        [name] : datas.id
  //    }
  //    })
  // }

  // const handleBookmark = () => {
  //   setBookmarkColor(!bookmarkcolor)
  //   if (bookmarkcolor) {
  //     dispatch({ type: "removeBookmark", payload: datas.id })
  //   } else {
  //     dispatch({ type: "AddBookmark", payload: datas })
  //   }
  // }
  return (
    <div className='p-10' key={index}>
      <div className='border-2 rounded-md bg-rose-100 '>
        <button title=" Click to Bookmark" onClick={handleBookmark}>
          <LiaCrossSolid size={20} color={bookmarkcolor ? "red" : "gray"} className={` ${bookmarkcolor ? "bg-gray-600" : "bg-white"} rounded-full 
           w-10 h-10  ml-64 mt-4 cursor-pointer hover:scale-90 
           duration-150 translate-x-2 transition-transform ease-in-out`} />
        </button>
        <div className='flex flex-col justify-start px-4  py-2 items-center '>
          <p className='font-bold text-xl text-start text-nowrap '>{datas.Title}</p>
          <p className='font-semibold text-xl text-start '> {datas.Year}</p>
          {/* <p className='w-10 h-10  pl-10 cursor-pointer hover:scale-75' > */}
          {/* </p> */}
        </div>
        <div className='flex jusitify-center items-start p-5'>
          <img src={magazine} className='w-40 shadow-black shadow-lg' />
          <div className='p-3  flex flex-col gap-4 '>
            <p className='text-sm'><span className='font-semibold text-md'>Features :</span> A Sure Foundation</p>
            <p className='text-sm'><span className='font-semibold text-md'>Articles : </span> Dare to Dream</p>
            <p className='text-sm'><span className='font-semibold text-md'>Meet the Writer</span> {datas.Writer}</p>
          </div>
        </div>
        <div className='flex justify-between items-center px-4 py-6 '>
          <a href={datas.ReadPdf} target='_blank' className='bg-indigo-800 text-white p-1 px-4' >Read Online</a>
          <button className='bg-indigo-800 text-white p-1 px-4'>Download Pdf</button>
        </div>
      </div>
    </div>
  )
}

export default Magazine_Card