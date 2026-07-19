
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";



const VerifyEmail = () => {
    //to get token for verification of email 
    const { token } = useParams()
    const [status, setStatus] = useState("Verifying...")
    const navigate = useNavigate()

    // const verifyEmail = async () => {
    //     try {
    //         const res = await axios.post(`http://localhost:8000/api/v1/user/verify`, {}, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         })
    //         if (res.data.success) {
    //             setStatus('☑️Email Verified Successfully')
    //             setTimeout(() => {
    //                 navigate('/login')
    //             }, 2000);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         setStatus("❌ Verification failed, Please try again")
    //     }
    // }

    

    // this code correct by gpt
    useEffect( () => {
        if (!token) return;
        const verifyEmail = async () => {
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/user/verify`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res.data.success) {
                setStatus('☑️Email Verified Successfully')
                setTimeout(() => {
                    navigate('/login')
                }, 2000);
            }
        } catch (error) {
            console.log(error);
            setStatus("❌ Verification failed, Please try again")
        }
    };
    verifyEmail();
    },[token, navigate])


    // useEffect(() => {
    //   verifyEmail();
    // },[token])
    return (
        <div className="relative w-full h-[700px] bg-pink-100 overflow-hidden">
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-white p-6 rounded-2xl shadow-md text-center w-[90%] max-w-md">
                    <h2 className="text-xl font-semibold text-gray-800">{status}</h2>
                </div>
            </div>
        </div>
    )
}
export default VerifyEmail