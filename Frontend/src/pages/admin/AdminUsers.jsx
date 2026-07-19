import { Input } from "@/components/ui/input";
import axios from "axios";
import { Edit, Eye, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import UserLogo from "../../assets/user.png"
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AdminUsers = () => {
    const [users, setUsers] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate()

    const getAllUsers = async () => {
        const accessToken = localStorage.getItem("accessToken")
        try {
            const res = await axios.get('http://localhost:8000/api/v1/user/all-user', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (res.data.success) {
                setUsers(res.data.users)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const filteredUsers = users.filter(user=>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    useEffect(() => {
        getAllUsers()
    }, [])
    return (
        <div className="pl-[70px] py-25 pr-25 mx-auto px-4">
            <h1 className="font-bold text-2xl">User Management</h1>
            <p>View and manage registered users</p>
            <div className="flex relative w-[300px] mt-6">
                <Search className="absolute left-2 top-1 text-gray-600 w-5" />
                <Input 
                className="pl-10" 
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
                placeholder="Search Users..." />
            </div>
            <div className="grid grid-cols-3 gap-7 mt-7">
                {
                    filteredUsers.map((user, index) => {
                        return <div key={index} className="bg-pink-100 p-5 rounded-lg">
                            <div className="flex items-center gap-2">
                                <img src={user?.profilePic || UserLogo} atl="" className="rounded-full w-16 aspect-square object-cover border border-pink-600" />
                                <div>
                                    <h1 className="font-semobold">{user?.firstName} {user?.lastName}</h1>
                                    <h3>{user?.email}</h3>
                                </div>
                            </div>
                            <div className="flex gap-3 mt-3">
                                <Button onClick={()=>navigate(`/dashboard/users/${user?._id}`)} variant="outline"><Edit/>Edit</Button>
                                <Button onClick={()=>navigate(`/dashboard/users/orders/${user?._id}`)}><Eye/>Show Orders</Button>
                            </div>
                        </div>
                        
                    })
                }
        </div>
        </div >
    )
}

export default AdminUsers