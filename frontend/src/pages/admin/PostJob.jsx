import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/Auth";

function PostJob() {
  const { auth, setAuth } = useAuth();
  const [title, setTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [requirements, setRequirements] = useState("");
  const [position, setPosition] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");

  const [companyList, setCompanyList] = useState([]); // all companies
  const [companyId, setCompanyId] = useState(""); // selected company

  const handlePost = async (e) => {
    e.preventDefault();

    try {
      // const jobData = new FormData();
      // jobData.append("title", title);
      // jobData.append("jobType", jobType);
      // jobData.append("salary", salary);
      // jobData.append("description", description);
      // jobData.append("location", location);
      // jobData.append("requirements", requirements);
      // jobData.append("companyId", companyId);
      // jobData.append("position", position);
      // jobData.append("experienceLevel", experienceLevel);

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/job/post`,
        {
          title,
          jobType,
          salary,
          description,
          location,
          requirements,
          companyId,
          position,
          experienceLevel,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      if (data?.success) {
        console.log("Job Created:", data);

        // Reset form
        setTitle("");
        setJobType("");
        setSalary("");
        setDescription("");
        setLocation("");
        setRequirements("");
        setCompanyId("");
        setPosition("");
        setExperienceLevel("");
      }
    } catch (error) {
      console.log(error.response?.data?.message || "Error");
    }
  };

  const getAllCompany = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/company/get-company`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        },
      );
      console.log("API DATA:", data); // 🔥 check this

      if (data?.success) {
        setCompanyList(data?.companies || []);
      }
    } catch (error) {
      console.log(error);
      console.log(error.response?.data?.message || "Error");
    }
  };

  useEffect(() => {
    getAllCompany();
  }, []);

  return (
    <div className="min-h-screen bg-transparent p-8 ml-[10vw]">
      <h1 className="text-3xl font-bold text-left text-white w-full ml-8">
        Post a New Job
      </h1>
      <div className="ml-8 p-[1px] rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-700 to-fuchsia-800"></div>


      <div className="max-w-4xl mx-auto bg-transparent p-8 rounded-2xl shadow-lg">
        <form onSubmit={handlePost}>
          <FieldSet className="space-y-6 w-[40vw]">
            <FieldGroup>
              <Field>
                <FieldLabel className="text-white">Job Title</FieldLabel>
                <Input
                  className="text-zinc-200"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Frontend Developer"
                  required
                />
              </Field>

              <Field>
                <FieldLabel className="text-white">Job Type</FieldLabel>
                <select
                  className="w-full border rounded-md p-2 bg-transparent text-zinc-200"
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  required
                >
                  <option value="">Select Job Type</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                </select>
              </Field>

              <Field>
                <FieldLabel className="text-white">Experience Level</FieldLabel>
                <select
                  className="w-full border rounded-md p-2 bg-transparent text-zinc-200"
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  required
                >
                  <option value="">Select Experience Level</option>
                  <option value="Fresher">Fresher</option>
                  <option value="1-2 Years">1-2 Years</option>
                  <option value="3-5 Years">3-5 Years</option>
                  <option value="5+ Years">5+ Years</option>
                </select>
              </Field>

              <Field>
                <FieldLabel className="text-white">Salary (₹) in Lakh Per Annum (LPA)</FieldLabel>
                <Input
                  type="number"
                  className="text-zinc-200"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel className="text-white">No. of vacant positions </FieldLabel>
                <Input
                  type="number"
                  className="text-zinc-200"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel className="text-white">Location</FieldLabel>
                <Input
                  className="text-zinc-200"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel className="text-white">Requirements</FieldLabel>
                <textarea
                  className="w-full border rounded-md p-2 bg-transparent text-zinc-200"
                  rows="3"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel className="text-white">Job Description</FieldLabel>
                <textarea
                  className="w-full border rounded-md p-2 bg-transparent text-zinc-200"
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Field>

              {/* FIXED SELECT */}
              <Field>
                <FieldLabel className="text-white">Select Company</FieldLabel>
                <select
                  className="w-full border rounded-md p-2 bg-transparent text-zinc-200"
                  value={companyId}
                  onChange={(e) => setCompanyId(e.target.value)}
                  required
                >
                  <option value="">Choose Company</option>
                  {companyList?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c?.name}
                    </option>
                  ))}
                </select>
                <FieldDescription>
                  Select the company for this job post.
                </FieldDescription>
              </Field>

              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Post Job
              </Button>
            </FieldGroup>
          </FieldSet>
        </form>
      </div>
    </div>
  );
}

export default PostJob;
