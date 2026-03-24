import axios from "axios";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/Auth";

function CreateCompany() {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

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

      // Step 1: Upload image
      if (logo) {
        logoUrl = await handleUpload(logo);
      }

      // Step 2: Send data to backend
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
        }
      );
      console.log("UPLOAD URL:", `${import.meta.env.VITE_API_URL}/api/upload`);

      if (data?.success) {
        // getAllCompany();

      setName("");
      setUrl("");
      setLogo(null);
      setPreview(null);
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
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/company/get-company`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      if (data?.success) {
        setCompanies(data?.companies || []);
      }
    } catch (error) {
      console.log( error.response?.data?.message || "Errorss");
    }
  };

  useEffect(() => {
    getAllCompany();
  }, []);

  return (
    <div className="min-h-screen p-8 lg:ml-[10vw]">
      <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">

        {/* FORM */}
        <div className="bg-white p-8 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-6">Create Company</h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Company Name"
              required
            />

            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Website URL"
            />

            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setLogo(file);
                setPreview(URL.createObjectURL(file));
              }}
            />

            {preview && (
              <img
                src={preview}
                className="h-20 w-20 rounded-lg object-cover"
              />
            )}

            <Button disabled={loading} className="w-full">
              {loading ? "Uploading..." : "Create Company"}
            </Button>
          </form>
        </div>

        {/* COMPANY LIST */}
        <div className="bg-white p-8 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-6">Companies</h2>

          {companies.length === 0 ? (
            <p>No companies found</p>
          ) : (
            companies.map((c) => (
              <div
                key={c._id}
                className="flex items-center gap-4 mb-4"
              >
                {c.logo ? (
                  <img
                    src={c.logo}   // ✅ Cloudinary URL
                    className="h-12 w-12 rounded object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 bg-gray-200 flex items-center justify-center">
                    {c.name[0]}
                  </div>
                )}

                <div>
                  <p>{c.name}</p>
                  <p className="text-sm text-gray-500">{c.website}</p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default CreateCompany;