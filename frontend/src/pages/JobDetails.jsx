import Layout from "@/components/shared/Layout";
import { useAuth } from "@/context/Auth";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function JobDetails() {
  const params = useParams();
  const [job, setJob] = useState(null);
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);

const getJob = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/job/get/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      }
    );

    if (res?.data?.success) {
      setJob(res.data.job);

      // 🔥 check if user already applied
      const alreadyApplied = res.data.job.applications?.some(
        (app) => app.applicant === auth?.user?._id
      );

      setApplied(alreadyApplied);
    }

  } catch (error) {
    console.log(error.response?.data?.message);
  } finally {
    setLoading(false);
  }
};
const handleApplication = async () => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/v1/application/apply/${params.id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      }
    );

    if (res?.data?.success) {
      setApplied(true);
      alert("Application submitted successfully!");
    }

  } catch (error) {
    if (error.response?.status === 400) {
      alert("You have already applied for this job.");
      setApplied(true);
    } else if (error.response?.status === 401) {
      alert("Please login first.");
    } else {
      alert("Something went wrong.");
    }
  }
};
  useEffect(() => {
    if (auth?.token) {
      getJob();
      console.log(auth.token);
      
    }
  }, [auth?.token]);

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-20 text-lg font-medium">
          Loading job details...
        </div>
      </Layout>
    );
  }

  // ✅ If job not found
  if (!job) {
    return (
      <Layout>
        <div className="text-center py-20 text-lg font-medium text-red-500">
          Job not found
        </div>
      </Layout>
    );
  }

return (
  <Layout>
    <div className="max-w-6xl mx-auto my-12 px-4">
      <div className="grid md:grid-cols-3 gap-8">
        
        {/* LEFT SIDE - MAIN DETAILS */}
        <div className="md:col-span-2 space-y-6">
          <Card className="shadow-xl border rounded-2xl">
            <CardHeader>
              <div className="flex items-start justify-between flex-wrap gap-4">
                
                {/* Job Info */}
                <div>
                  <CardTitle className="text-3xl font-bold text-gray-800 capitalize">
                    {job?.title}
                  </CardTitle>

                  <p className="text-gray-500 mt-2 text-lg">
                    {job.companyId?.name} • {job.location}
                  </p>

                  <div className="flex gap-3 mt-4 flex-wrap">
                    <Badge className="bg-indigo-100 text-indigo-700">
                      {job.jobType}
                    </Badge>
                    <Badge className="bg-green-100 text-green-700">
                      {job.experienceLevel}+ Years
                    </Badge>
                    <Badge className="bg-yellow-100 text-yellow-700">
                      {job.position} Positions
                    </Badge>
                    <Badge className="bg-rose-100 text-rose-700 font-semibold">
                      ₹{job.salary} LPA
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>

            <Separator />

            <CardContent className="space-y-8 py-8">
              
              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold mb-3 text-gray-800">
                  Job Description
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {job.description}
                </p>
              </div>

              {/* Requirements */}
              <div>
                <h2 className="text-xl font-semibold mb-3 text-gray-800">
                  Requirements
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {job.requirements}
                </p>
              </div>

              <div className="text-sm text-gray-400">
                Posted on {new Date(job.createdAt).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDE - APPLY CARD */}
        <div className="sticky top-24 h-fit">
          <Card className="shadow-xl border rounded-2xl p-6 space-y-6">
            
            <div>
              <p className="text-sm text-gray-500">Salary</p>
              <p className="text-2xl font-bold text-indigo-600">
                ₹{job.salary} LPA
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{job.location}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Experience</p>
              <p className="font-medium">
                {job.experienceLevel}+ Years
              </p>
            </div>

            <Button
              onClick={handleApplication}
              disabled={applied}
              className={`w-full py-6 text-lg text-white font-semibold rounded-xl transition-all duration-300 ${
                applied
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 hover:scale-105"
              }`}
            >
              {applied ? "Already Applied" : "Apply Now"}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  </Layout>
);
}

export default JobDetails;
