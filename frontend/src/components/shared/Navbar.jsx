import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { useAuth } from "@/context/Auth";
import { NavLink } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const [auth, setAuth] = useAuth();
    const [user, setUser] = useState(null);
  
  const getUserProfile = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/user/profile`
      );

      if (res?.data?.success) {
        setUser(res.data.user);
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);


  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };

  return (
      <div className="sticky top-0 z-50 backdrop-blur-lg bg-white/40 borde border-white/20 shadow-l flex justify-between items-center mx-auto max-w-7xl h-16 px-8 rounded-2x mt-2">      <div>
        <h1 className="text-indigo-700 font-bold text-xl">
          <NavLink to="/">
            Jobs<span className="text-zinc-900">X</span>
          </NavLink>
        </h1>
      </div>
      <div className="flex gap-12 items-center justify-between">
        <ul className="flex gap-6 mr-8">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/application/get">My Application</NavLink>
          </li>
          <li>Saved Jobs</li>
        </ul>
        {!auth?.user ? (
          <div className="flex gap-4">
            <Button>
              <NavLink to="/login">Login</NavLink>
            </Button>
            <Button className="bg-indigo-800 text-white" variant="outline">
              <NavLink to="/register">Signup</NavLink>
            </Button>
          </div>
        ) : (
          <Popover className='bg-red-500'>
            <PopoverTrigger asChild>
              <Avatar>
                <AvatarImage src={`${import.meta.env.VITE_API_URL}/uploads/${user?.profile?.profilePhoto}`}
 />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className='bg-slate-100 mr-28'>
              <div className="z-100 bg-slate-100">
                <div className="flex gap-2 my-2 cursor-pointer">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="">
                    <h1>{user?.fullname}</h1>
                    <p className="text-zinc-500 text-sm lg:truncate truncate w-[200px]">
                      {user?.email}
                      </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 my-2 ">
                  <div className="flex items-center">
                    <User2 />
                    <Button variant="link">
                      {auth?.user?.role=="recruiter" ?(
                        <NavLink to="/dashboard/recruiter">View Profile</NavLink>
                      ):(
                        <NavLink to="/profile">View Profile</NavLink>
                      )}

                    </Button>
                  </div>
                  <div className="flex items-center">
                    <LogOut />
                    <Button onClick={handleLogout} variant="link">
                      <NavLink to="/login">Logout</NavLink>
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}

export default Navbar;
