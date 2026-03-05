import { useAuth } from "@/context/Auth";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/shared/Layout";
import { NavLink } from "react-router-dom";

function MyApplications() {
  const [auth, setAuth] = useAuth();
  const [application, setApplication] = useState([]);

  const getApplications = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/application/get`,
      );
      if (data?.success) {
        setApplication(data?.application);
        console.log(data?.application.job);
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getApplications();
      console.log(auth?.token);
    }
  }, [auth?.token]);

return (
  <Layout>
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* PAGE TITLE */}
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            My Applications
          </h1>
          <p className="text-zinc-500 mt-2">
            Track all the jobs you’ve applied for
          </p>
        </div>

        {/* EMPTY STATE */}
        {application?.length === 0 && (
          <div className="text-center py-20 bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl">
            <h2 className="text-xl font-semibold text-zinc-700">
              No Applications Yet
            </h2>
            <p className="text-zinc-500 mt-2">
              Start applying to jobs to see them here.
            </p>
          </div>
        )}

        {/* APPLICATION CARDS */}
        <div className="grid gap-6">
          {application?.map((a) => (
            <Card
              key={a._id}
              className="rounded-3xl border-0 bg-white/80 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <CardContent className="p-8 space-y-6">

                {/* TOP SECTION */}
                <div className="flex justify-between items-start flex-wrap gap-6">

                  <div className="flex gap-5 items-start">

                    {/* Company Logo Placeholder */}
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center text-lg font-bold shadow-md">
                      {a.job?.companyId?.name?.charAt(0)}
                    </div>

                    <div>
                      <h2 className="text-2xl font-semibold capitalize">
                        {a.job?.title}
                      </h2>

                      <p className="text-zinc-500 mt-1">
                        {a.job?.companyId?.name} • {a.job?.location}
                      </p>

                      <div className="flex gap-3 mt-4 flex-wrap">
                        <Badge variant="outline">
                          {a.job?.jobType}
                        </Badge>

                        <Badge variant="secondary">
                          {a.job?.experienceLevel}+ Years
                        </Badge>

                        <Badge variant="outline">
                          ₹{a.job?.salary}L
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* STATUS BADGE */}
                  <Badge
                    className={`px-4 py-2 rounded-full text-white capitalize text-sm shadow-md
                      ${
                        a.status === "accepted"
                          ? "bg-green-500"
                          : a.status === "rejected"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                  >
                    {a.status}
                  </Badge>
                </div>

                {/* DESCRIPTION */}
                <p className="text-zinc-600 line-clamp-2 leading-relaxed">
                  {a.job?.description}
                </p>

                {/* FOOTER */}
                <div className="flex justify-between items-center pt-4 border-t">

                  <span className="text-sm text-zinc-500">
                    Applied on{" "}
                    {new Date(a.createdAt).toLocaleDateString()}
                  </span>

                  <Button
                    className="rounded-full px-6 shadow-md hover:shadow-xl transition"
                    asChild
                  >
                    <NavLink to={`/get/${a.job._id}`}>
                      View Job
                    </NavLink>
                  </Button>

                </div>

              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </div>
  </Layout>
);
}

export default MyApplications;
