import { Button } from '@/components/ui/button';
import axios from 'axios';
import { ChevronRight, MoveRight, PanelRight } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const params = useParams()

  const getAllJobs = async() => {
    try {
          // const token = localStorage.getItem("token");

      const {data} = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/job/get/admin`,
              {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      )
      if(data?.success){
        setJobs(data?.jobs)
        
      }
    } catch (error) {
      console.log(error.response?.data?.message || "Error");
    }
  }

  useEffect(() => {
    getAllJobs()
    
  },[]);


  return (
  <div className="min-h-screen bg-gray-100 p-8 ml-[8vw] bg-gradient-to-br form-purple-300 to-red-400">
    <h1 className="text-3xl font-bold mb-8 text-gray-800">
      My Posted Jobs
    </h1>

    {jobs.length === 0 ? (
      <div className="text-center text-gray-500 text-lg">
        No jobs posted yet.
      </div>
    ) : (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((j) => (
          <div
            key={j._id}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300 border"
          >
            {/* Job Title */}
            <h2 className="text-xl font-bold text-indigo-600 mb-3">
              {j.title}
            </h2>

            {/* Company */}
            <p className="text-gray-700 text-sm mb-1">
              🏢 <span className="font-medium">Company Name:</span> {j.companyId.name}
            </p>

            {/* Job Type */}
            <p className="text-gray-700 text-sm mb-1">
              💼 <span className="font-medium">Type:</span> {j.jobType}
            </p>

            {/* Location */}
            <p className="text-gray-700 text-sm mb-1">
              📍 <span className="font-medium">Location:</span> {j.location}
            </p>

            {/* Salary */}
            <p className="text-gray-700 text-sm mb-1">
              💰 <span className="font-medium">Salary:</span> ₹{j.salary}
            </p>

            {/* Experience */}
            <p className="text-gray-700 text-sm mb-1">
              👨‍💻 <span className="font-medium">Experience:</span> {j.experienceLevel} years
            </p>

            {/* Vacant Positions */}
            <p className="text-gray-700 text-sm mb-3">
              🪑 <span className="font-medium">Positions:</span> {j.position}
            </p>

            {/* Requirements */}
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-800">
                📋 Requirements:
              </p>
              <p className="text-gray-600 text-sm line-clamp-3">
                {j.requirements}
              </p>
            </div>

            {/* Description */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-800">
                📝 Description:
              </p>
              <p className="text-gray-600 text-sm line-clamp-3">
                {j.description}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <button className="bg-indigo-600 text-white px-12 py-2 rounded-md hover:bg-indigo-700">
                Edit
              </button>

              <button className="bg-red-500 text-white px-9 py-2 rounded-md hover:bg-red-600">
                Delete
              </button>
            </div>

            <div className='mt-4 flex'>
              <Button className="px-16">
                <NavLink className={' '} to={`${j._id}/applicants`}>View Applicants </NavLink>
                <ChevronRight/>
              </Button>
            </div>

          </div>
        ))}
      </div>
    )}
  </div>
  )
}

export default MyJobs