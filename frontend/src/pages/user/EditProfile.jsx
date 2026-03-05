import Layout from "@/components/shared/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/context/Auth";

function EditProfile() {
  const params = useParams();
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [resume, setResume] = useState(null);
  const [user, setUser] = useState({
    fullname: "",
    phone: "",
    role: "",
    profile: {
      bio: "",
      skills: [],
      resume: "",
      resumeOriginalName: "",
      company: "",
      profilePhoto: "",
    },
  });

  const [loading, setLoading] = useState(false);

  // 🔹 Fetch profile
  const getUserProfile = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/user/profile`,
      );

      if (res?.data?.success) {
        // 1️⃣ Update local state
        setUser(res.data.user);

        // 2️⃣ Update AuthContext
        setAuth({
          ...auth,
          user: res.data.user,
        });

        // 3️⃣ Update localStorage
        const ls = JSON.parse(localStorage.getItem("auth"));
        ls.user = res.data.user;
        localStorage.setItem("auth", JSON.stringify(ls));

        // alert("Profile Updated Successfully 🚀");
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  // 🔹 Update profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("fullname", user.fullname);
    formData.append("phone", user.phone);
    formData.append("bio", user.profile.bio);
    formData.append("skills", user.profile.skills.join(","));
    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto);
    }

    if (resume) {
      formData.append("resume", resume);
    }

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/user/profile/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (res?.data?.success) {
        setUser(res.data.user); // 🔥 update state instantly
        console.log(res.data.user);
        navigate("/profile");

        // alert("Profile Updated Successfully 🚀");
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    }

    setLoading(false);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto ">
          <Card className="rounded-3xl shadow-2xl bg-white/90 backdrop-blur ">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Edit Profile</CardTitle>
            </CardHeader>

            <Separator />

            <CardContent className="py-8">
              <form onSubmit={handleUpdate} className="space-y-6">
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    placeholder="Full Name"
                    value={user.fullname}
                    onChange={(e) =>
                      setUser({ ...user, fullname: e.target.value })
                    }
                  />

                  <Input
                    placeholder="Phone"
                    value={user.phone}
                    onChange={(e) =>
                      setUser({ ...user, phone: e.target.value })
                    }
                  />
                </div>

                {/* Bio */}
                <Textarea
                  placeholder="Write something about yourself..."
                  value={user.profile?.bio || ""}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      profile: {
                        ...user.profile,
                        bio: e.target.value,
                      },
                    })
                  }
                />

                {/* Skills (String) */}
                <div>
                  <Input
                    placeholder="Skills (comma separated)"
                    value={user.profile?.skills?.join(", ") || ""}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        profile: {
                          ...user.profile,
                          skills: e.target.value.split(","),
                        },
                      })
                    }
                  />
                  <div className="flex flex-wrap gap-2 mt-3">
                    {user.profile?.skills?.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill.trim()}
                      </Badge>
                    ))}
                  </div>{" "}
                </div>

                {/* Resume Upload */}
                <div>
                  <label className="text-sm font-medium">Upload Resume</label>
                  <Input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setResume(e.target.files[0])}
                  />
                </div>

                {/* Profile Photo Upload */}
                <div>
                  <label className="text-sm font-medium">
                    Upload Profile Photo
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfilePhoto(e.target.files[0])}
                  />
                </div>

                {/* Save Button */}
                <Button
                  type="submit"
                  className="w-full rounded-full text-lg"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Save Changes"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

export default EditProfile;
