// // import axios from "axios";
// // import React, { useEffect, useState } from "react";
// // import { Input } from "@/components/ui/input";
// // import { Button } from "@/components/ui/button";
// // import { useAuth } from "@/context/Auth";

// // function CreateCompany() {
// //   const { auth, setAuth } = useAuth();
// //   const [name, setName] = useState("");
// //   const [url, setUrl] = useState("");
// //   const [logo, setLogo] = useState(null);
// //   const [preview, setPreview] = useState(null);
// //   const [companies, setCompanies] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   // =========================
// //   // Upload to Cloudinary
// //   // =========================
// //   const handleUpload = async (file) => {
// //     const formData = new FormData();
// //     formData.append("file", file);

// //     const res = await axios.post(
// //       `${import.meta.env.VITE_API_URL}/api/upload`,
// //       formData,
// //     );
// //   console.log("UPLOAD RESPONSE:", res.data); // 👈 ADD THIS
// //   console.log(`${import.meta.env.VITE_API_URL}/api/upload`);
  

// //     return res.data.url;
// //   };

// //   // =========================
// //   // Submit Company
// //   // =========================
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       setLoading(true);

// //       let logoUrl = "";

// //       // Step 1: Upload image
// //       if (logo) {
// //         logoUrl = await handleUpload(logo);
// //       }

// //       // Step 2: Send data to backend
// //       const { data } = await axios.post(
// //         `${import.meta.env.VITE_API_URL}/api/v1/company/register-company`,
// //         {
// //           name,
// //           website: url,
// //           logo: logoUrl,
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${auth?.token}`,
// //           },
// //         }
// //       );
// //       console.log("UPLOAD URL:", `${import.meta.env.VITE_API_URL}/api/upload`);
// //     console.log("FINAL DATA SENT:", { name, url, logoUrl });

// //       if (data?.success) {
// //         // getAllCompany();

// //       setName("");
// //       setUrl("");
// //       setLogo(null);
// //       setPreview(null);
// //       }
// //     } catch (error) {
// //       console.log(error.response?.data?.message || "Error");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // =========================
// //   // Get Companies
// //   // =========================
// //   const getAllCompany = async () => {
// //     try {
// //       const { data } = await axios.get(
// //         `${import.meta.env.VITE_API_URL}/api/v1/company/get-company`,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${auth?.token}`,
// //           },
// //         }
// //       );
// //       if (data?.success) {
// //         setCompanies(data?.companies || []);
// //       }
// //     } catch (error) {
// //       console.log( error.response?.data?.message || "Errorss");
// //     }
// //   };

// //   useEffect(() => {
// //     getAllCompany();
// //   }, []);

// //   return (
// //     <div className="min-h-screen p-8 lg:ml-[10vw] shadow-lg rounded-2xl">
// //       <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">

// //         {/* FORM */}
// //         <div className="bg-transparent p-8 rounded-2xl shadow">
// //           <h2 className="text-xl font-semibold mb-6">Create Company</h2>

// //           <form onSubmit={handleSubmit} className="space-y-4">

// //             <Input
// //               value={name}
// //               onChange={(e) => setName(e.target.value)}
// //               placeholder="Company Name"
// //               required
// //             />

// //             <Input
// //               value={url}
// //               onChange={(e) => setUrl(e.target.value)}
// //               placeholder="Website URL"
// //             />

// //             <Input
// //               type="file"
// //               accept="image/*"
// //               onChange={(e) => {
// //                 const file = e.target.files[0];
// //                 setLogo(file);
// //                 setPreview(URL.createObjectURL(file));
// //               }}
// //             />

// //             {preview && (
// //               <img
// //                 src={preview}
// //                 className="h-20 w-20 rounded-lg object-cover"
// //               />
// //             )}

// //             <Button disabled={loading} className="w-full">
// //               {loading ? "Uploading..." : "Create Company"}
// //             </Button>
// //           </form>
// //         </div>

// //         {/* COMPANY LIST */}
// //         <div className="bg-transparent p-8 rounded-2xl shadow blur-sm">
// //           <h2 className="text-xl font-semibold mb-6">Companies</h2>

// //           {companies.length === 0 ? (
// //             <p>No companies found</p>
// //           ) : (
// //             companies.map((c) => (
// //               <div
// //                 key={c._id}
// //                 className="flex items-center gap-4 mb-4"
// //               >
// //                 {c.logo ? (
// //                   <img
// //                     src={c.logo}   // ✅ Cloudinary URL
// //                     className="h-12 w-12 rounded object-cover"
// //                   />
// //                 ) : (
// //                   <div className="h-12 w-12 bg-gray-200 flex items-center justify-center">
// //                     {c.name[0]}
// //                   </div>
// //                 )}

// //                 <div>
// //                   <p>{c.name}</p>
// //                   <p className="text-sm text-gray-500">{c.website}</p>
// //                 </div>
// //               </div>
// //             ))
// //           )}
// //         </div>

// //       </div>
// //     </div>
// //   );
// // }

// // export default CreateCompany;



// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useAuth } from "@/context/Auth";
// import { Building2, Link2, Upload } from "lucide-react";

// function CreateCompany() {
//   const { auth } = useAuth();

//   const [name, setName] = useState("");
//   const [url, setUrl] = useState("");
//   const [logo, setLogo] = useState(null);
//   const [preview, setPreview] = useState(null);

//   const [companies, setCompanies] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // =========================
//   // Upload to Cloudinary
//   // =========================
//   const handleUpload = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);

//     const res = await axios.post(
//       `${import.meta.env.VITE_API_URL}/api/upload`,
//       formData
//     );

//     return res.data.url;
//   };

//   // =========================
//   // Submit Company
//   // =========================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       let logoUrl = "";

//       if (logo) {
//         logoUrl = await handleUpload(logo);
//       }

//       const { data } = await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/v1/company/register-company`,
//         {
//           name,
//           website: url,
//           logo: logoUrl,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${auth?.token}`,
//           },
//         }
//       );

//       if (data?.success) {
//         setName("");
//         setUrl("");
//         setLogo(null);
//         setPreview(null);
//         getAllCompany();
//       }
//     } catch (error) {
//       console.log(error.response?.data?.message || "Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =========================
//   // Get Companies
//   // =========================
//   const getAllCompany = async () => {
//     try {
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_API_URL}/api/v1/company/get-company`,
//         {
//           headers: {
//             Authorization: `Bearer ${auth?.token}`,
//           },
//         }
//       );

//       if (data?.success) {
//         setCompanies(data?.companies || []);
//       }
//     } catch (error) {
//       console.log(error.response?.data?.message || "Error fetching companies");
//     }
//   };

//   useEffect(() => {
//     if (auth?.token) getAllCompany();
//   }, [auth?.token]);

//   return (
//     <div
//       className="min-h-screen relative overflow-hidden sm:px-8 lg:pl-16 lg:pr-48 py-12 w-full"
//       style={{
//         background:
//           "linear-gradient(135deg, #0D0A1A 0%, #1E1333 40%, #2D1B5E 70%, #3B1F7A 100%)",
//       }}
//     >
//       {/* Glow Orbs */}
//       <div
//         className="fixed top-0 right-0 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-25"
//         style={{
//           background: "radial-gradient(circle, #7C3AED, transparent 70%)",
//         }}
//       />
//       <div
//         className="fixed bottom-1/3 left-0 w-72 h-72 rounded-full pointer-events-none blur-3xl opacity-20"
//         style={{
//           background: "radial-gradient(circle, #9D5CF6, transparent 70%)",
//         }}
//       />

//       <div className="relative z-10 max-w-6xl mx-auto flex flex-col mb-16">
//         <div className="mb-10 ">
//         {/* Page Title */}
//         <div className="">
//           <h1 className="text-3xl font-bold text-white">Company Management</h1>
//           <p className="text-sm mt-2 text-white/50">
//             Create and manage your recruiter companies.
//           </p>
//         </div>

//         <div className=" mt-10">
//           {/* FORM */}
//           <div
//             className="p-8 rounded-2xl border backdrop-blur-xl"
//             style={{
//               background: "rgba(255,255,255,0.04)",
//               borderColor: "rgba(196,181,253,0.15)",
//             }}
//           >
//             <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
//               <Building2 className="text-purple-300" size={20} />
//               Create Company
//             </h2>

//             <form onSubmit={handleSubmit} className="space-y-5">
//               <div className="space-y-2">
//                 <p className="text-xs font-semibold tracking-widest uppercase text-white/50">
//                   Company Name
//                 </p>
//                 <Input
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="Enter company name"
//                   required
//                   className="lg:w-[50vw] lg:h-8 bg-transparent text-white border-white/10 focus:border-purple-400 focus:ring-purple-500/30"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <p className="text-xs font-semibold tracking-widest uppercase text-white/50 flex items-center gap-2">
//                   <Link2 size={14} className="text-purple-300" />
//                   Website URL
//                 </p>
//                 <Input
//                   value={url}
//                   onChange={(e) => setUrl(e.target.value)}
//                   placeholder="https://company.com"
//                   className="bg-transparent text-white border-white/10 focus:border-purple-400 focus:ring-purple-500/30"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <p className="text-xs font-semibold tracking-widest uppercase text-white/50 flex items-center gap-2">
//                   <Upload size={14} className="text-purple-300" />
//                   Upload Logo
//                 </p>
//                 <Input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => {
//                     const file = e.target.files[0];
//                     setLogo(file);
//                     setPreview(URL.createObjectURL(file));
//                   }}
//                   className="bg-transparent text-white border-white/10 cursor-pointer file:text-white file:bg-purple-500/20 file:border-0 file:rounded-lg file:px-3 file:py-1"
//                 />
//               </div>

//               {preview && (
//                 <div className="flex items-center gap-4 mt-2">
//                   <img
//                     src={preview}
//                     className="h-16 w-16 rounded-xl object-cover border"
//                     style={{
//                       borderColor: "rgba(196,181,253,0.2)",
//                     }}
//                   />
//                   <p className="text-sm text-white/50">Logo Preview</p>
//                 </div>
//               )}

//               <Button
//                 disabled={loading}
//                 className="w-full py-6 rounded-xl font-semibold text-white hover:opacity-90 transition"
//                 style={{
//                   background: "linear-gradient(135deg, #7C3AED, #9D5CF6)",
//                 }}
//               >
//                 {loading ? "Uploading..." : "Create Company"}
//               </Button>
//             </form>
//           </div>
//         </div>

//           {/* COMPANY LIST */}
//           <div
//             className="p-8 rounded-2xl border backdrop-blur-xl w-full mt-10"
//             style={{
//               background: "rgba(255,255,255,0.04)",
//               borderColor: "rgba(196,181,253,0.15)",
//             }}
//           >
//             <h2 className="text-xl font-semibold text-white mb-6 px-8">
//               Your Companies
//             </h2>

//             {companies.length === 0 ? (
//               <p className="text-white/50 text-sm">No companies found.</p>
//             ) : (
//               <div className="space-y-4">
//                 {companies.map((c) => (
//                   <div
//                     key={c._id}
//                     className="flex items-center gap-4 p-4 rounded-2xl border"
//                     style={{
//                       background: "rgba(255,255,255,0.03)",
//                       borderColor: "rgba(196,181,253,0.12)",
//                     }}
//                   >
//                     {c.logo ? (
//                       <img
//                         src={c.logo}
//                         className="h-12 w-12 rounded-xl object-cover border"
//                         style={{
//                           borderColor: "rgba(196,181,253,0.2)",
//                         }}
//                       />
//                     ) : (
//                       <div
//                         className="h-12 w-12 flex items-center justify-center rounded-xl font-bold text-white"
//                         style={{
//                           background:
//                             "linear-gradient(135deg, rgba(124,58,237,0.6), rgba(157,92,246,0.4))",
//                         }}
//                       >
//                         {c.name?.charAt(0)}
//                       </div>
//                     )}

//                     <div className="flex-1">
//                       <p className="text-white font-semibold truncate">
//                         {c.name}
//                       </p>
//                       <p className="text-sm text-white/50 truncate">
//                         {c.website || "No website added"}
//                       </p>
//                     </div>

//                     <span className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60">
//                       Active
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="h-20"></div>
//       </div>
//     </div>
//   );
// }

// export default CreateCompany;




import axios from "axios";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/Auth";
import { Building2, Link2, Upload } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

function CreateCompany() {
  const { auth } = useAuth();

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCompanies, setLoadingCompanies] = useState(false);

  // =========================
  // Upload to Cloudinary
  // =========================
  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/upload`,
      formData,
    );

    return res.data.url;
  };

  // =========================
  // Submit Company
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      let logoUrl = "";

      if (logo) {
        logoUrl = await handleUpload(logo);
      }

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/company/register-company`,
        {
          name,
          website: url,
          logo: logoUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        },
      );

      if (data?.success) {
        setName("");
        setUrl("");
        setLogo(null);
        setPreview(null);
        getAllCompany();
      }
    } catch (error) {
      console.log(error.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Get Companies
  // =========================
  const getAllCompany = async () => {
    try {
      setLoadingCompanies(true);

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/company/get-company`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        },
      );

      if (data?.success) {
        setCompanies(data?.companies || []);
      }
    } catch (error) {
      console.log(error.response?.data?.message || "Error fetching companies");
    } finally {
      setLoadingCompanies(false);
    }
  };

  useEffect(() => {
    if (auth?.token) getAllCompany();
  }, [auth?.token]);

  // =========================
  // Skeleton Card Component
  // =========================
  const CompanySkeleton = () => {
    return (
      <div
        className="flex items-center gap-4 p-4 rounded-2xl border"
        style={{
          background: "rgba(255,255,255,0.03)",
          borderColor: "rgba(196,181,253,0.12)",
        }}
      >
        <Skeleton className="h-12 w-12 rounded-xl bg-white/10" />

        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-[60%] bg-white/10" />
          <Skeleton className="h-3 w-[40%] bg-white/10" />
        </div>

        <Skeleton className="h-6 w-16 rounded-full bg-white/10" />
      </div>
    );
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden sm:px-8 lg:pl-16 lg:pr-48 py-5 w-full"
      style={{
        background:
          "linear-gradient(135deg, #0D0A1A 0%, #1E1333 40%, #2D1B5E 70%, #3B1F7A 100%)",
      }}
    >
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

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col mb-16">
        <div className="mb-10">
          {/* Page Title */}
          <div>
            <h1 className="text-3xl font-bold text-white">
              Company Management
            </h1>
            <p className="text-sm mt-2 text-white/50">
              Create and manage your recruiter companies.
            </p>
          </div>

          <div className="mt-10">
            {/* FORM */}
            <div
              className="p-8 rounded-2xl border backdrop-blur-xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                borderColor: "rgba(196,181,253,0.15)",
              }}
            >
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Building2 className="text-purple-300" size={20} />
                Create Company
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <p className="text-xs font-semibold tracking-widest uppercase text-white/50">
                    Company Name
                  </p>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter company name"
                    required
                    className="lg:w-[50vw] lg:h-8 bg-transparent text-white border-white/10 focus:border-purple-400 focus:ring-purple-500/30"
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold tracking-widest uppercase text-white/50 flex items-center gap-2">
                    <Link2 size={14} className="text-purple-300" />
                    Website URL
                  </p>
                  <Input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://company.com"
                    className="bg-transparent text-white border-white/10 focus:border-purple-400 focus:ring-purple-500/30"
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold tracking-widest uppercase text-white/50 flex items-center gap-2">
                    <Upload size={14} className="text-purple-300" />
                    Upload Logo
                  </p>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setLogo(file);
                      setPreview(URL.createObjectURL(file));
                    }}
                    className="bg-transparent text-white border-white/10 cursor-pointer file:text-white file:bg-purple-500/20 file:border-0 file:rounded-lg file:px-3 file:py-1"
                  />
                </div>

                {preview && (
                  <div className="flex items-center gap-4 mt-2">
                    <img
                      src={preview}
                      className="h-16 w-16 rounded-xl object-cover border"
                      style={{
                        borderColor: "rgba(196,181,253,0.2)",
                      }}
                    />
                    <p className="text-sm text-white/50">Logo Preview</p>
                  </div>
                )}

                <Button
                  disabled={loading}
                  className="w-full py-6 rounded-xl font-semibold text-white hover:opacity-90 transition"
                  style={{
                    background: "linear-gradient(135deg, #7C3AED, #9D5CF6)",
                  }}
                >
                  {loading ? "Uploading..." : "Create Company"}
                </Button>
              </form>
            </div>
          </div>

          {/* COMPANY LIST */}
          <div
            className="p-8 rounded-2xl border backdrop-blur-xl w-full mt-10"
            style={{
              background: "rgba(255,255,255,0.04)",
              borderColor: "rgba(196,181,253,0.15)",
            }}
          >
            <h2 className="text-xl font-semibold text-white mb-6 px-2">
              Your Companies
            </h2>

            {/* Skeleton Loading */}
            {loadingCompanies && (
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <CompanySkeleton key={i} />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loadingCompanies && companies.length === 0 && (
              <p className="text-white/50 text-sm">No companies found.</p>
            )}

            {/* Companies List */}
            {!loadingCompanies && companies.length > 0 && (
              <div className="space-y-4">
                {companies.map((c) => (
                  <div
                    key={c._id}
                    className="flex items-center gap-4 p-4 rounded-2xl border"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      borderColor: "rgba(196,181,253,0.12)",
                    }}
                  >
                    {c.logo ? (
                      <img
                        src={c.logo}
                        className="h-12 w-12 rounded-xl object-cover border"
                        style={{
                          borderColor: "rgba(196,181,253,0.2)",
                        }}
                      />
                    ) : (
                      <div
                        className="h-12 w-12 flex items-center justify-center rounded-xl font-bold text-white"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(124,58,237,0.6), rgba(157,92,246,0.4))",
                        }}
                      >
                        {c.name?.charAt(0)}
                      </div>
                    )}

                    <div className="flex-1">
                      <p className="text-white font-semibold truncate">
                        {c.name}
                      </p>
                      <p className="text-sm text-white/50 truncate">
                        {c.website || "No website added"}
                      </p>
                    </div>

                    <span className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="h-20"></div>
      </div>
    </div>
  );
}

export default CreateCompany;