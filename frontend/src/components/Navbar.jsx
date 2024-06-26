import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
} from "react";
import logo1 from "../assets/logo1.png";
import { LiaCrossSolid } from "react-icons/lia";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link, useSearchParams } from "react-router-dom";
import { DataContext } from "../context/DataProvider";
import FavouriteReducer, { InitialState } from "../store/FavouriteReducer";
import { useSelector } from "react-redux";
import emailjs from "@emailjs/browser";
import ContactUsModal from "./ContactUsModal";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import Axios from "axios";
import Translatore from "./Translatore";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const Navbar = () => {
  // const { magazineId } = useContext(DataContext);
  const [openModal, setOpenModal] = useState(false);
  const [state, dispatch] = useReducer(FavouriteReducer, InitialState);
  const counter = useSelector((state) => state.favourites.value);
  useEffect(() => {
    counter;
  }, [counter]);

  const [openmenu, setOpenmenu] = useState(false);
  const [openAboutmenu, setOpenAboutmenu] = useState(false);
  const [openMinsteries, setOpenMinsteries] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [openHamburgerMenu, setOpenHamburgerMenu] = useState(true);

  const handlePayment = async (e) => {
    const API_URL = "http://localhost:4000";
    e.preventDefault();
    const orderUrl = `${API_URL}/order`;
    const response = await Axios.get(orderUrl);
    const { data } = response;

    const options = {
      key: "rzp_test_aIGcS929AXCx85",
      name: "Aruputha Deva Kirubai Magazine",
      description: "Thanks",
      order_id: data.id,
      handler: async (response) => {
        try {
          const paymentId = response.razorpay_payment_id;
          const url = `${API_URL}capture/${paymentId}`;
          Axios.post(url, {});
          console.log(captureResponse.data);
        } catch (err) {
          console.log(err);
        }
      },
    };
    const rzpl = new window.Razorpay(options);
    rzpl.open();
  };

  const handlechange = () => {
    dispatch({ type: "add" });
  };

  return (
    <>
      <div className="bg-blue-200 flex lg:flex-row flex-col lg:justify-between lg:items-center font-bold px-2 lg:px-10 py-3">
        <p>
          Prayer Helpline:
          <a href="tel:9443068599" className="underline">
            9443068599
          </a>
          <span className="lg:px-4">
            Email:
            <a href="mailto:arputhadevakirubaimag@gmail.com" className="underline">
            arputhadevakirubaimag@gmail.com
            </a>
          </span>
        </p>
        <p className="flex gap-2 pt-2">
          <span
            onClick={() => setOpenModal(true)}
            className="underline cursor-pointer"
          >
            Language
          </span>
          <div className="absolute w-80">
            <Modal show={openModal} onClose={() => setOpenModal(false)} popup>
              <Modal.Header />
              <Modal.Body>
                <div className="flex justify-center items-center gap-4">
                  <Translatore openModal={openModal} />
                </div>

                <div className="flex flex-roe justify-center p-2">
                  <Button
                    className="bg-red-900"
                    onClick={() => setOpenModal(false)}
                  >
                    close
                  </Button>
                </div>
              </Modal.Body>
            </Modal>
          </div>

          {/* <Translatore/> */}
          <span
            onClick={() => setOpenContact(true)}
            className="cursor-pointer underline"
          >
            Subscribe
          </span>
        </p>
      </div>
      <div className="hidden  lg:flex flex-row  justify-between items-center bg-gray-200 ">
        <Link to="/">
          <img src={logo1} className="w-48 h-20 object-cover mx-5 " />
        </Link>
        <div className="flex flex-row  justify-between items-center gap-4 px-10 font-semibold text-xl">
          <div>
            <p
              className="
           border-black/50 w-full text-center
           p-2 pl-10 cursor-pointer flex justify-center items-center "
              onMouseEnter={() => setOpenMinsteries(true)}
              onMouseLeave={() => setOpenMinsteries(false)}
            >
              {" "}
              Our Ministiries
              <RiArrowDropDownLine
                size={30}
                className={` ${
                  openMinsteries
                    ? "rotate-180 transition-transform duration-500 ease-in-out"
                    : "rotate-360 transition-transform duration-500 ease-in-out"
                }`}
              />
            </p>
            {openMinsteries && (
              <div
                className="flex flex-col absolute bg-gray-200 border-2 px-4 justify-center items-center"
                onMouseEnter={() => setOpenMinsteries(true)}
                onMouseLeave={() => setOpenMinsteries(false)}
              >
                <Link
                  to="chruchActivites"
                  className="hover:border-b-2
           border-black/50 w-60 text-center py-2 cursor-pointer"
                >
                  Chruch Activities
                </Link>
                <Link
                  to="TrustActivities"
                  className="hover:border-b-2
           border-black/50 w-full text-center cursor-pointer py-2"
                >
                  Trust Activities
                </Link>
                <Link
                  to="Childrenshome"
                  className="hover:border-b-2
           border-black/50 w-full text-center cursor-pointer py-2"
                >
                  Children's Home
                </Link>
              </div>
            )}
          </div>
          {/* <p className='border-r-2 border-black/50 px-2 cursor-pointer flex items-center'
           onMouseEnter={() => setOpenmenu(!openmenu)} onMouseLeave={() => setOpenmenu(!openmenu)}><span>Watch</span>
            <RiArrowDropDownLine size={30}
              className={` ${openmenu ? "rotate-180 transition-transform duration-500 ease-in-out"
                : "rotate-360 transition-transform duration-500 ease-in-out"}`} /></p> */}
          {/* <p className='border-r-2 border-black/50 pr-4 cursor-pointer flex items-center'>Testimonies
          </p>
          <p className='border-r-2 border-black/50 pr-2 cursor-pointer flex items-center'>Aruputha Manna</p> */}
          <div>
            <p
              className="
border-black/50 w-full text-center
p-2 pl-10 cursor-pointer flex justify-center items-center "
              onMouseEnter={() => setOpenAboutmenu(true)}
              onMouseLeave={() => setOpenAboutmenu(false)}
            >
              {" "}
              About Us
              <RiArrowDropDownLine
                size={30}
                className={` ${
                  openAboutmenu
                    ? "rotate-180 transition-transform duration-500 ease-in-out"
                    : "rotate-360 transition-transform duration-500 ease-in-out"
                }`}
              />
            </p>
            {openAboutmenu && (
              <div
                className="flex flex-col absolute bg-gray-200 border-2 px-4 justify-center items-center"
                onMouseEnter={() => setOpenAboutmenu(true)}
                onMouseLeave={() => setOpenAboutmenu(false)}
              >
                <button
                  className="hover:border-b-2
           border-black/50 w-full p-2"
                  onClick={() => {
                    setOpenContact(true);
                  }}
                >
                  Contact Us
                </button>
                <Link
                  to="/founder"
                  className="hover:border-b-2
           border-black/50 w-full text-center
            p-2"
                >
                  Founder
                </Link>
                <Link
                  to="meetwriter"
                  className="hover:border-b-2
           border-black/50 w-full text-center
           p-2 pb-4"
                >
                  Meet the Writer
                </Link>
              </div>
            )}
          </div>

          {counter > 0 && (
            <p className="absolute right-48 z-10 mb-10 bg-red-500 rounded-full px-2 p-0.5 text-center text-sm font-bold ">
              {counter}
            </p>
          )}
          <Link title="Bookmarks" className="pr-4" to="/fav">
            <LiaCrossSolid
              size={20}
              className=" rounded-full  w-10 h-10  cursor-pointer hover:scale-90 duration-150 translate-x-2 transition-transform ease-in-out"
            />
          </Link>
          <button
            className="bg-rose-600 text-white text-sm subpixel-antialiased px-6 p-1 rounded-md"
            // onClick={handlePayment}
            onClick={() => {
              setOpenContact(true);
            }}
          >
            DONATE US
          </button>
        </div>
      </div>

      <div className="lg:hidden font-semibold z-50">
        <div className="flex justify-between items-center p-2 md:px-10 ">
          <Link to="/">
            <img
              src={logo1}
              className="h-16 w-40 object-cover"
              onClick={() => setOpenHamburgerMenu(true)}
            />
          </Link>
          {openHamburgerMenu ? (
            <GiHamburgerMenu
              className="text-3xl mx-5 border border-black/20 rounded-lg p-1"
              onClick={() => setOpenHamburgerMenu(false)}
            />
          ) : (
            <IoCloseSharp
              className="text-3xl mx-5 border border-black/20 rounded-lg p-1"
              onClick={() => setOpenHamburgerMenu(true)}
            />
          )}
        </div>
        {!openHamburgerMenu && (
          <div className="flex flex-col  items-center gap-4 transition-transform duration-500 p-5  rounded-md">
            {/* <p className='flex justify-center items-center' onClick={() => setOpenmenu(!openmenu)} >
        
              <span>Watch</span>
              <RiArrowDropDownLine size={30} className={` ${openmenu ? "rotate-180 transition-transform duration-500 ease-in-out" : "rotate-360 transition-transform duration-500 ease-in-out"}`} />
            </p> */}
            {/* <p onClick={() => setOpenHamburgerMenu(true)}>Testimonies</p>
            <p onClick={() => setOpenHamburgerMenu(true)}>Aruputha Manna</p> */}
            <p
              onClick={() => {
                setOpenMinsteries(!openMinsteries);
              }}
              className="flex  justify-center items-center"
            >
              Our Ministiries
              <RiArrowDropDownLine
                size={30}
                className={` ${
                  openMinsteries
                    ? "rotate-180 transition-transform duration-500 ease-in-out"
                    : "rotate-360 transition-transform duration-500 ease-in-out"
                }`}
              />
            </p>
            {openMinsteries && (
              <div className="flex flex-col gap-4 justify-center items-center">
                <Link
                  to="chruchActivites"
                  onClick={() => setOpenHamburgerMenu(true)}
                >
                  Chruch Activities
                </Link>
                <Link
                  to="TrustActivities"
                  onClick={() => setOpenHamburgerMenu(true)}
                >
                  Trust Activities
                </Link>
                <Link
                  to="Childrenshome"
                  onClick={() => setOpenHamburgerMenu(true)}
                >
                  Children's Home
                </Link>
              </div>
            )}
            <p
              onClick={() => setOpenAboutmenu(!openAboutmenu)}
              className="flex justify-center items-center"
            >
              About Us
              <RiArrowDropDownLine
                size={30}
                className={` ${
                  openAboutmenu
                    ? "rotate-180 transition-transform duration-500 ease-in-out"
                    : "rotate-360 transition-transform duration-500 ease-in-out"
                }`}
              />
            </p>
            {openAboutmenu && (
              <div className="flex flex-col gap-4 justify-center items-center">
                <button
                  onClick={() => {
                    setOpenContact(true);
                    setOpenHamburgerMenu(true);
                  }}
                >
                  Contact Us
                </button>
                <Link to="/founder" onClick={() => setOpenHamburgerMenu(true)}>
                  Founder
                </Link>
                <Link
                  to="meetwriter"
                  onClick={() => setOpenHamburgerMenu(true)}
                >
                  Meet the Writer
                </Link>
              </div>
            )}

            <Link title="Bookmarks" to="/fav" className="relative">
              {counter > 0 && (
                <p className="bg-gray-200 text-black text-sm rounded-full  p-1 text-center w-6 h-6 ">
                  {counter}
                </p>
              )}
              <LiaCrossSolid size={40} />
            </Link>
            <button
              className="bg-rose-600 text-white subpixel-antialiased px-10 p-1 rounded-md font-semibold"
              onClick={() => {
                setOpenContact(true);
              }}
            >
              DONATE US
            </button>
          </div>
        )}
      </div>
      {openContact && (
        <div className="absolute h-[1000px] z-50 bg-black/40 w-screen top-0">
          <ContactUsModal setOpenContact={setOpenContact} />
        </div>
      )}
    </>
  );
};

export default Navbar;

// Testimonies  ==  month wise

// Read == daily passage

// About -- Countact us , Founder,  Ministiries -- chruch , trust , Childrens Home, Meet the writer

{
  /* <p
className="border-r-2 border-black/50 px-2 cursor-pointer flex items-center"
onMouseEnter={() => setOpenAboutmenu(true)}
onMouseLeave={() => setOpenAboutmenu(false)}
>
About Us{" "}
<RiArrowDropDownLine
  size={30}
  className={` ${
    openAboutmenu
      ? "rotate-180 transition-transform duration-500 ease-in-out"
      : "rotate-360 transition-transform duration-500 ease-in-out"
  }`}
/>
</p>
{openAboutmenu && (
<div
  className="absolute  w-60 top-[100px] right-48  font-semibold text- 
 bg-gray-200 lg:flex flex-col justify-start items-center text-nowrap  pt-4"
  onMouseEnter={() => setOpenAboutmenu(true)}
  onMouseLeave={() => setOpenAboutmenu(false)}
>
  <button
    className="hover:border-b-2
border-black/50 w-full p-2"
    onClick={() => {
      setOpenContact(true);
    }}
  >
    Contact Us
  </button>
  <Link
    to="/founder"
    className="hover:border-b-2
border-black/50 w-full text-center
p-2"
  >
    Founder
  </Link>
  <Link
    to="meetwriter"
    className="hover:border-b-2
border-black/50 w-full text-center
p-2 pb-4"
  >
    Meet the Writer
  </Link>
</div>
)} */
}
