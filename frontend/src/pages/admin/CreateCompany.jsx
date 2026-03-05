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

function CreateCompany() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [companies, setCompanies] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const companyData = new FormData();
      companyData.append("name", name);
      companyData.append("website", url);
      companyData.append("logo", logo);

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/company/register-company`,
        companyData
      );

      if (data?.success) {
        getAllCompany();
      }

      setName("");
      setUrl("");
      setLogo(null);
      setPreview(null);
    } catch (error) {
      console.log(error.response?.data?.message || "Error");
    }
  };

  const getAllCompany = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/company/get-company`
      );
      if (data?.success) {
        setCompanies(data?.companies || []);
      }
    } catch (error) {
      console.log(error.response?.data?.message || "Error");
    }
  };

  useEffect(() => {
    getAllCompany();
  }, []);

return (
  <div className="min-h-screen bg-transparent -gradient-to-br from-indigo-50 via-white to-purple-50 p-8 lg:ml-[10vw]">

    {/* Page Header */}
    <div className="max-w-6xl mx-auto mb-12">
      <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
        Company Management
      </h1>
      <p className="text-gray-500 mt-2">
        Create and manage your recruiting companies
      </p>
    </div>

    <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">

      {/* ================= FORM CARD ================= */}
      <div className="bg-white/50 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-8 transition hover:shadow-2xl">

        <h2 className="text-2xl font-semibold mb-8 text-gray-800">
          Create New Company
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Company Name */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Company Name
            </label>
            <Input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Enter company name"
              required
              className="mt-2"
            />
          </div>

          {/* Website */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Website URL
            </label>
            <Input
              onChange={(e) => setUrl(e.target.value)}
              value={url}
              type="text"
              placeholder="https://company.com"
              className="mt-2"
            />
          </div>

          {/* Logo Upload */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Company Logo
            </label>

            <Input
              type="file"
              accept="image/*"
              className="mt-2 cursor-pointer"
              onChange={(e) => {
                setLogo(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />

            {preview && (
              <div className="mt-4 flex items-center gap-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="h-20 w-20 object-cover rounded-xl border shadow-sm"
                />
                <p className="text-sm text-gray-500">
                  Logo Preview
                </p>
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-2 transition"
          >
            Create Company
          </Button>
        </form>
      </div>

      {/* ================= COMPANY LIST ================= */}
      <div className="bg-white/50 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-8 transition hover:shadow-2xl">

        <h2 className="text-2xl font-semibold mb-8 text-gray-800">
          Your Companies
        </h2>

        {companies.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">
              No companies created yet.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {companies.map((c) => (
              <div
                key={c._id}
                className="flex items-center justify-between p-5 bg-white rounded-2xl border hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4">

                  {c.logo ? (
                    <img
                      src={c.logo}
                      alt={c.name}
                      className="h-14 w-14 rounded-xl object-cover border"
                    />
                  ) : (
                    <div className="h-14 w-14 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-lg">
                      {c.name.charAt(0)}
                    </div>
                  )}

                  <div>
                    <p className="font-semibold text-gray-800">
                      {c.name}
                    </p>
                    {c.website && (
                      <a
                        href={c.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-indigo-600 hover:underline"
                      >
                        {c.website}
                      </a>
                    )}
                  </div>
                </div>

                <button className="px-4 py-2 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition">
                  Manage
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  </div>
);
}

export default CreateCompany;
