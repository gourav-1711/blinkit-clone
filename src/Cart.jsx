import React, { useContext, useEffect, useState } from 'react'
import Header from './Comman/Header'
import Footer from './Comman/Footer'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { MdLibraryBooks } from 'react-icons/md'
import { GiScooter } from 'react-icons/gi'
import { FiInfo } from 'react-icons/fi'
import { FaArrowLeft, FaShoppingBag } from 'react-icons/fa'
import { MyContext } from './Context/ContextProvider'
import { useNavigate } from 'react-router-dom'

export default function Cart() {
    // cart
    let { myCart, setMyCart } = useContext(MyContext)

    let { num, setNum } = useContext(MyContext)



    // back navigation

    const navigate = useNavigate();
    const onClickBack = () => navigate(-1)


    return (
        <>
            <Header />

            <div className="cart">
                <div className='z-[100] right-0 top-0 w-[98%] lg:w-[90%] mx-auto  bg-[#F5F7FD] py-[20px]  '>

                    {/* back arrow */}
                    <div className="flex gap-1.5 items-center p-4 bg-white rounded-2xl w-[97%] mx-auto  ">
                        <span onClick={onClickBack} className=' text-2xl cursor-pointer'> <FaArrowLeft /></span>
                        <h1 className="text-[18px] font-bold text-gray-800">My Cart</h1>

                    </div>


                    {/* item details */}
                    <div className=" p-2 lg:p-4 space-y-4">

                        <div className="bg-white rounded-lg p-4">

                            {/* shipment */}
                            <div className="flex items-center gap-4">
                                <div className="bg-gray-100 rounded-[10px] p-3">
                                    <img src='/images/15-mins.png' className="text-green-700 w-10 " />
                                </div>
                                <div>
                                    <h2 className="text-[16px] font-bold">Delivery in 8 minutes</h2>
                                    <p className="text-gray-500 text-[15px]">Shipment of {myCart.length} item</p>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 my-4"></div>


                            {/* product details */}
                            <div className="products">

                                {/* items */}

                                {
                                    myCart.length > 0 ?

                                        myCart.map((v, i) => {
                                            return (

                                                <CartBox v={v} key={i} i={i} />
                                            )

                                        })
                                        :
                                        <div className=" text-2xl capitalize text-center">
                                            No items in cart
                                        </div>
                                }



                            </div>

                        </div>


                        {/* bill  */}
                        <Bil/>

                    </div>

                   


                </div>
            </div>

            <Footer />
        </>
    )
}


let CartBox = ({ v, i }) => {
    let { myCart, setMyCart } = useContext(MyContext)


    // quantity increase function 
    let [myCartQ, setQuantity] = useState(v.quantity || 1)



    const dec = () => {
        if (v.quantity > 1) {
            v.quantity--
            setQuantity(v.quantity);
        }
        else {
            let deleteData = myCart.filter((value, index) => i != index)
            setMyCart(deleteData)
        }
    }
    const inc = () => {
        v.quantity++
        setQuantity(v.quantity);
    }

    let update = () => {
        let newData = myCart.filter((value, index) => {
            if (i == index) {
                return value.quantity = myCartQ
            }
            return value
        })
        setMyCart(newData)
    }

    useEffect(() => {
        update()
    }, [myCartQ])

    return (
        <>
            {/* item detail box */}
            <div className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-3">
                    <div className="w-16 h-16 relative">
                        <img src={v.image} alt="" />
                    </div>
                    <div>
                        <h3 className="font-medium text-[14px] text-gray-800"> {v.title} </h3>
                        <p className="text-gray-500 text-[12px]"> {
                            v.brand} </p>
                        <p className="font-medium">₹ {v.price}</p>
                    </div>
                </div>

                <div className="flex items-center bg-green-600 text-white rounded-md">
                    <button onClick={dec} className="px-1 py-1 text-white cursor-pointer"  >
                        <AiOutlineMinus />
                    </button>
                    <span className="px-1 py-1"> {myCartQ} </span>
                    <button onClick={inc} className="px-1 py-1 text-white cursor-pointer" >
                        <AiOutlinePlus />
                    </button>
                </div>
            </div>
        </>
    )
}

let Bil = () => {

    let { myCart, setMyCart } = useContext(MyContext)

    let [price, setPrice] = useState(0)
    let [gst,setGst] = useState(0)
    let [delCharge , setDelCharge] = useState(0)
    let total = 0

    // total function


    useEffect(()=>{
        myCart.forEach(sum => {
            total += Number((sum.price) * (sum.quantity))
        });
        setPrice(Number((total).toFixed(2)))

        setGst(price * 18 / 100)

        // console.log(gst,price);

        let delFun = ()=>{
            { price > 499 ? setDelCharge(50) : setDelCharge(0)}
        }
        delFun()

    },[myCart,price])


    // console.log(total , price);
    
    return (
        <>
            <div className="bg-white rounded-lg p-4">
                <h2 className="text-[16px] font-bold mb-4">Bill details</h2>

                <div className="space-y-1">

                    {/* items total */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <span><MdLibraryBooks /></span>
                            <span className=" text-[14px] font-bold text-gray-700"> Items total</span>
                        </div>
                        <span className=" text-[16px] font-medium">₹ {price}</span>
                    </div>

                    {/* delievery charge */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <span><GiScooter /></span>
                            <span className="text-gray-700 text-[14px] font-bold">Delivery charge</span>
                            <FiInfo className="text-gray-400" />
                        </div>
                        <span className="font-medium text-[16px]">₹ {delCharge} </span>
                    </div>

                    {/* handling charge */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <span><FaShoppingBag /></span>
                            <span className="text-gray-700 text-[14px] font-bold ">GST</span>
                            <FiInfo className="text-gray-400" />
                        </div>
                        <span className="font-medium text-[16px]">₹ {(gst).toFixed(2)} </span>
                    </div>


                    {/* total */}
                    <div className="border-t border-gray-100 pt-2">
                        <div className="flex justify-between items-center">
                            <span className="text-[16px] font-bold">Grand total</span>
                            <span className=" text-[16px] font-bold">₹ {(price+gst + delCharge).toFixed(2)} </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg p-4">
                <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                        <div className="">
                            <img src="/images/8(2).png" alt="" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-800">Feeding India donation</h3>
                            <p className="text-gray-500 text-sm">
                                Working towards a malnutrition free India. Feeding India...
                                <span className="text-gray-400">read more</span>
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-medium">₹1</span>
                        <input type="checkbox"  className="h-4 w-4 border-gray-300 rounded" />
                    </div>
                </div>
            </div>

             {/* button to buy */}
             <div className="bg-white w-[90%] lg:w-[50%] right-0  p-[20px] rounded-2xl ms-5 ">
                        <div className="  cursor-pointer capitalize  bg-green-600  rounded-2xl py-[5px] flex justify-between text-white items-center px-[20px] ">
                            <div className="total font-bold flex flex-col items-center">
                                <div className="">{(price+gst + delCharge).toFixed(2)}</div>
                                <div className=" font-light">total</div>
                            </div>
                            <div className="">proceed to pay</div>
                        </div>
                    </div>
        </>
    )
}