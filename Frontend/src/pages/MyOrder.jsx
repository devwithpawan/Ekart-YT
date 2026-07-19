import OrderCard from "@/components/OrderCard";
import axios from "axios";
import React, { useEffect, useState } from "react";

const MyOrder = () => {

    const [userOrder, setUserOrder] = useState(null)
    //fatch api from backend
    const getUserOrders = async () => {
        const accessToken = localStorage.getItem("accessToken")
        const res = await axios.get(`${import.meta.env.VITE_URL}/api/v1/orders/myorder`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (res.data.success) {
            setUserOrder(res.data.orders)
        }
    }
    useEffect(() => {
        getUserOrders()
    }, [])
    return (
        <>
        <OrderCard userOrder={userOrder}/>
        </>
    )
}

export default MyOrder