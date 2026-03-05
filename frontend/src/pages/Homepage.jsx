import React, { useEffect } from 'react'
import Layout from "../components/shared/Layout";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  // CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';


function Homepage() {
  const [jobs,setJobs] = useState([])

  const getAllJobs = async() => {
    try {
      const {data} = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/job/get`
      )
      if(data?.success){
        setJobs(data?.jobs || [])
        console.log(data.jobs);
        
      }
    } catch (error) {
      console.log(error.response?.data?.message || "Error")
      
    }
  }
  useEffect(() => {
    getAllJobs()
  },[])
  return (
    <Layout>
<div className="relative top-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 px-36 py-8">
  {jobs.map((j) => (
    <Card key={j._id} className="w-full">
      <CardHeader>
        <Badge className={"capitalize"} variant="secondary">{j.jobType}</Badge>

        <CardTitle className="text-lg font-semibold capitalize">
          {j.title}
        </CardTitle>

        <CardDescription>
          {j.companyId.name} • {j.location}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between">
        <span className="text-sm text-zinc-500">
          {j.salary && j.salary
            ? `Salary: ₹${j.salary}LPA`
            : "Salary Not Disclosed"}
        </span>

        <Button size="sm">
          <NavLink to={`/get/${j._id}`}>View</NavLink>
        </Button>
      </CardFooter>
    </Card>
  ))}
</div>
     </Layout>
  )
}

export default Homepage