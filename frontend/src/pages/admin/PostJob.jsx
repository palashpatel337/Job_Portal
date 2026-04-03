// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import {
//   Field,
//   FieldDescription,
//   FieldGroup,
//   FieldLabel,
//   FieldSet,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useAuth } from "@/context/Auth";

// function PostJob() {
//   const { auth, setAuth } = useAuth();
//   const [title, setTitle] = useState("");
//   const [jobType, setJobType] = useState("");
//   const [salary, setSalary] = useState("");
//   const [description, setDescription] = useState("");
//   const [location, setLocation] = useState("");
//   const [requirements, setRequirements] = useState("");
//   const [position, setPosition] = useState("");
//   const [experienceLevel, setExperienceLevel] = useState("");

//   const [companyList, setCompanyList] = useState([]); // all companies
//   const [companyId, setCompanyId] = useState(""); // selected company

//   const handlePost = async (e) => {
//     e.preventDefault();

//     try {
//       // const jobData = new FormData();
//       // jobData.append("title", title);
//       // jobData.append("jobType", jobType);
//       // jobData.append("salary", salary);
//       // jobData.append("description", description);
//       // jobData.append("location", location);
//       // jobData.append("requirements", requirements);
//       // jobData.append("companyId", companyId);
//       // jobData.append("position", position);
//       // jobData.append("experienceLevel", experienceLevel);

//       const { data } = await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/v1/job/post`,
//         {
//           title,
//           jobType,
//           salary,
//           description,
//           location,
//           requirements,
//           companyId,
//           position,
//           experienceLevel,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         },
//       );

//       if (data?.success) {
//         console.log("Job Created:", data);

//         // Reset form
//         setTitle("");
//         setJobType("");
//         setSalary("");
//         setDescription("");
//         setLocation("");
//         setRequirements("");
//         setCompanyId("");
//         setPosition("");
//         setExperienceLevel("");
//       }
//     } catch (error) {
//       console.log(error.response?.data?.message || "Error");
//     }
//   };

//   const getAllCompany = async () => {
//     try {
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_API_URL}/api/v1/company/get-company`,
//         {
//           headers: {
//             Authorization: `Bearer ${auth?.token}`,
//           },
//         },
//       );
//       console.log("API DATA:", data); // 🔥 check this

//       if (data?.success) {
//         setCompanyList(data?.companies || []);
//       }
//     } catch (error) {
//       console.log(error);
//       console.log(error.response?.data?.message || "Error");
//     }
//   };

//   useEffect(() => {
//     getAllCompany();
//   }, []);

//   return (
//     <div className="min-h-screen bg-transparent p-8 ml-[10vw] shadow-lg rounded-2xl">
//       <h1 className="text-3xl font-bold text-left text-white w-full ml-8">
//         Post a New Job
//       </h1>
//       <div className="ml-8 p-[1px] rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-700 to-fuchsia-800"></div>


//       <div className="max-w-4xl mx-auto bg-transparent p-8 rounded-2xl shadow-lg">
//         <form onSubmit={handlePost}>
//           <FieldSet className="space-y-6 w-[40vw]">
//             <FieldGroup>
//               <Field>
//                 <FieldLabel className="text-white">Job Title</FieldLabel>
//                 <Input
//                   className="text-zinc-200"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   placeholder="Frontend Developer"
//                   required
//                 />
//               </Field>

//               <Field>
//                 <FieldLabel className="text-white">Job Type</FieldLabel>
//                 <select
//                   className="w-full border rounded-md p-2 bg-transparent text-zinc-200"
//                   value={jobType}
//                   onChange={(e) => setJobType(e.target.value)}
//                   required
//                 >
//                   <option value="">Select Job Type</option>
//                   <option value="Full-Time">Full-Time</option>
//                   <option value="Part-Time">Part-Time</option>
//                   <option value="Internship">Internship</option>
//                   <option value="Remote">Remote</option>
//                 </select>
//               </Field>

//               <Field>
//                 <FieldLabel className="text-white">Experience Level</FieldLabel>
//                 <select
//                   className="w-full border rounded-md p-2 bg-transparent text-zinc-200"
//                   value={experienceLevel}
//                   onChange={(e) => setExperienceLevel(e.target.value)}
//                   required
//                 >
//                   <option value="">Select Experience Level</option>
//                   <option value="Fresher">Fresher</option>
//                   <option value="1-2 Years">1-2 Years</option>
//                   <option value="3-5 Years">3-5 Years</option>
//                   <option value="5+ Years">5+ Years</option>
//                 </select>
//               </Field>

//               <Field>
//                 <FieldLabel className="text-white">Salary (₹) in Lakh Per Annum (LPA)</FieldLabel>
//                 <Input
//                   type="number"
//                   className="text-zinc-200"
//                   value={salary}
//                   onChange={(e) => setSalary(e.target.value)}
//                 />
//               </Field>

//               <Field>
//                 <FieldLabel className="text-white">No. of vacant positions </FieldLabel>
//                 <Input
//                   type="number"
//                   className="text-zinc-200"
//                   value={position}
//                   onChange={(e) => setPosition(e.target.value)}
//                 />
//               </Field>

//               <Field>
//                 <FieldLabel className="text-white">Location</FieldLabel>
//                 <Input
//                   className="text-zinc-200"
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                 />
//               </Field>

//               <Field>
//                 <FieldLabel className="text-white">Requirements</FieldLabel>
//                 <textarea
//                   className="w-full border rounded-md p-2 bg-transparent text-zinc-200"
//                   rows="3"
//                   value={requirements}
//                   onChange={(e) => setRequirements(e.target.value)}
//                 />
//               </Field>

//               <Field>
//                 <FieldLabel className="text-white">Job Description</FieldLabel>
//                 <textarea
//                   className="w-full border rounded-md p-2 bg-transparent text-zinc-200"
//                   rows="4"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                 />
//               </Field>

//               {/* FIXED SELECT */}
//               <Field>
//                 <FieldLabel className="text-white">Select Company</FieldLabel>
//                 <select
//                   className="w-full border rounded-md p-2 bg-transparent text-zinc-200"
//                   value={companyId}
//                   onChange={(e) => setCompanyId(e.target.value)}
//                   required
//                 >
//                   <option value="">Choose Company</option>
//                   {companyList?.map((c) => (
//                     <option key={c._id} value={c._id}>
//                       {c?.name}
//                     </option>
//                   ))}
//                 </select>
//                 <FieldDescription>
//                   Select the company for this job post.
//                 </FieldDescription>
//               </Field>

//               <Button
//                 type="submit"
//                 className="w-full bg-[#210042] hover:bg-[#310061] text-white"
//               >
//                 Post Job
//               </Button>
//             </FieldGroup>
//           </FieldSet>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default PostJob;




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

  const [companyList, setCompanyList] = useState([]);
  const [companyId, setCompanyId] = useState("");

  const [loading, setLoading] = useState(false);

  const handlePost = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

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
            Authorization: `Bearer ${auth?.token}`,
          },
          withCredentials: true,
        }
      );

      if (data?.success) {
        console.log("Job Created:", data);

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
    } finally {
      setLoading(false);
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
        }
      );

      if (data?.success) {
        setCompanyList(data?.companies || []);
      }
    } catch (error) {
      console.log(error.response?.data?.message || "Error");
    }
  };

  useEffect(() => {
    if (auth?.token) getAllCompany();
  }, [auth?.token]);

  return (
        <div
      className="min-h-screen relative overflow-hidden sm:px-8 lg:pl-16 lg:pr-32 py-12"
      style={{
        background:
          "linear-gradient(135deg, #0D0A1A 0%, #1E1333 40%, #2D1B5E 70%, #3B1F7A 100%)",
      }}
    >

    <div className="relative overflow-hidden min-h-screen px-6 py-10 lg:pl-20 ">
      {/* Glow Orbs */}
      <div
        className="fixed top-0 right-0 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-25"
        style={{
          background: "radial-gradient(circle, #7C3AED, transparent 70%)",
        }}
      />
      <div
        className="fixed bottom-1/3 left-0 w-72 h-72 rounded-full pointer-events-none blur-3xl opacity-20"
        style={{
          background: "radial-gradient(circle, #9D5CF6, transparent 70%)",
        }}
      />

      {/* Page Title */}
      <div className="relative z-10 mb-10">
        <h1 className="text-3xl font-bold text-white">Post a New Job</h1>
        <p className="text-sm mt-2 text-white/50">
          Create a job listing and start receiving applications.
        </p>

        {/* Gradient line */}
        <div className="mt-5 h-[1px] w-full rounded-2xl bg-gradient-to-r from-purple-500/60 via-fuchsia-500/40 to-indigo-500/20" />
      </div>

      {/* Main Form Card */}
      <div
        className="relative z-10 max-w-4xl lg:w-[50vw] p-8 mx-auto rounded-2xl border backdrop-blur-xl shadow-lg"
        style={{
          background: "rgba(255,255,255,0.04)",
          borderColor: "rgba(196,181,253,0.15)",
        }}
      >
        <form onSubmit={handlePost}>
          <FieldSet className="space-y-6">
            <FieldGroup className="space-y-5">
              <Field>
                <FieldLabel className="text-zinc-200 ">Job Title</FieldLabel>
                <Input
                  className="bg-transparent text-zinc-200 border-white/10 focus:border-purple-400 focus:ring-purple-500/30"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Frontend Developer"
                  required
                />
              </Field>

              <Field>
                <FieldLabel className="text-zinc-200 ">Job Type</FieldLabel>
                <select
                  className="w-full border rounded-xl px-3 py-2 bg-transparent text-zinc-200 outline-none focus:border-purple-400"
                  style={{
                    borderColor: "rgba(196,181,253,0.2)",
                  }}
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  required
                >
                  <option value="" className="text-zinc-200 ">
                    Select Job Type
                  </option>
                  <option value="Full-Time" className="text-zinc-200 ">
                    Full-Time
                  </option>
                  <option value="Part-Time" className="text-zinc-200 ">
                    Part-Time
                  </option>
                  <option value="Internship" className="text-zinc-200 ">
                    Internship
                  </option>
                  <option value="Remote" className="text-zinc-200 ">
                    Remote
                  </option>
                </select>
              </Field>

              <Field>
                <FieldLabel className="text-zinc-200 ">Experience Level</FieldLabel>
                <select
                  className="w-full border rounded-xl px-3 py-2 bg-transparent text-zinc-200 outline-none focus:border-purple-400"
                  style={{
                    borderColor: "rgba(196,181,253,0.2)",
                  }}
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  required
                >
                  <option value="" className="text-zinc-200 ">
                    Select Experience Level
                  </option>
                  <option value="Fresher" className="text-zinc-200 ">
                    Fresher
                  </option>
                  <option value="1-2 Years" className="text-zinc-200 ">
                    1-2 Years
                  </option>
                  <option value="3-5 Years" className="text-zinc-200 ">
                    3-5 Years
                  </option>
                  <option value="5+ Years" className="text-zinc-200 ">
                    5+ Years
                  </option>
                </select>
              </Field>

              <Field>
                <FieldLabel className="text-zinc-200 ">
                  Salary (₹) in Lakh Per Annum (LPA)
                </FieldLabel>
                <Input
                  type="number"
                  className="bg-transparent text-zinc-200 border-white/10 focus:border-purple-400 focus:ring-purple-500/30"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="10"
                />
              </Field>

              <Field>
                <FieldLabel className="text-zinc-200 ">
                  No. of Vacant Positions
                </FieldLabel>
                <Input
                  type="number"
                  className="bg-transparent text-zinc-200 border-white/10 focus:border-purple-400 focus:ring-purple-500/30"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="5"
                />
              </Field>

              <Field>
                <FieldLabel className="text-zinc-200 ">Location</FieldLabel>
                <Input
                  className="bg-transparent text-zinc-200 border-white/10 focus:border-purple-400 focus:ring-purple-500/30"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Mumbai"
                />
              </Field>

              <Field>
                <FieldLabel className="text-zinc-200 ">Requirements</FieldLabel>
                <textarea
                  className="w-full border rounded-xl px-3 py-2 bg-transparent text-zinc-200 outline-none focus:border-purple-400"
                  style={{
                    borderColor: "rgba(196,181,253,0.2)",
                  }}
                  rows="3"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="React, Tailwind, REST APIs..."
                />
              </Field>

              <Field>
                <FieldLabel className="text-zinc-200 ">Job Description</FieldLabel>
                <textarea
                  className="w-full border rounded-xl px-3 py-2 bg-transparent text-zinc-200 outline-none focus:border-purple-400"
                  style={{
                    borderColor: "rgba(196,181,253,0.2)",
                  }}
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write job details here..."
                />
              </Field>

              <Field>
                <FieldLabel className="text-zinc-200 ">Select Company</FieldLabel>
                <select
                  className="w-full border rounded-xl px-3 py-2 bg-transparent text-zinc-200 outline-none focus:border-purple-400"
                  style={{
                    borderColor: "rgba(196,181,253,0.2)",
                  }}
                  value={companyId}
                  onChange={(e) => setCompanyId(e.target.value)}
                  required
                >
                  <option value="" className="text-zinc-200 ">
                    Choose Company
                  </option>
                  {companyList?.map((c) => (
                    <option key={c._id} value={c._id} className="text-zinc-200 ">
                      {c?.name}
                    </option>
                  ))}
                </select>

                <FieldDescription className="text-white/40">
                  Select the company for this job post.
                </FieldDescription>
              </Field>

              <Button
                type="submit"
                disabled={loading}
                className="w-full py-6 rounded-xl font-semibold text-zinc-200  transition-all hover:opacity-90 disabled:opacity-50"
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #9D5CF6)",
                }}
              >
                {loading ? "Posting..." : "Post Job →"}
              </Button>
            </FieldGroup>
          </FieldSet>
        </form>
      </div>

      <div className="h-20"></div>
    </div>
    </div>
  );
}

export default PostJob;