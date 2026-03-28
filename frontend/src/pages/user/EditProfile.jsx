import Layout from "@/components/shared/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/Auth";

function EditProfile() {
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

  // ======================================
  // Upload File Function (Cloudinary Route)
  // ======================================
  const uploadFile = async (file, type) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      // const endpoint =
      //   type === "resume" ? "/upload/resume" : "/upload/image";

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return data?.url;
    } catch (error) {
      console.log("UPLOAD ERROR:", error.response?.data || error.message);
      return null;
    }
  };

  // =====================
  // Fetch Profile
  // =====================
  const getUserProfile = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (res?.data?.success) {
        setUser(res.data.user);

        setAuth({
          ...auth,
          user: res.data.user,
        });

        const ls = JSON.parse(localStorage.getItem("auth"));
        ls.user = res.data.user;
        localStorage.setItem("auth", JSON.stringify(ls));
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getUserProfile();
    }
  }, [auth?.token]);

  // =====================
  // Update Profile
  // =====================
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let profilePhotoUrl = user.profile.profilePhoto;
      let resumeUrl = user.profile.resume;

      // Upload profile photo
      if (profilePhoto) {
        const uploadedPhoto = await uploadFile(profilePhoto, "image");
        if (uploadedPhoto) profilePhotoUrl = uploadedPhoto;
      }

      // Upload resume pdf
      if (resume) {
        const uploadedResume = await uploadFile(resume, "resume");
        if (uploadedResume) resumeUrl = uploadedResume;
      }

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/user/profile/update`,
        {
          fullname: user.fullname,
          phone: user.phone,
          bio: user.profile.bio,
          skills: user.profile.skills.join(","),
          profilePhoto: profilePhotoUrl,
          resume: resumeUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (res?.data?.success) {
        setUser(res.data.user);

        setAuth({
          ...auth,
          user: res.data.user,
        });

        const ls = JSON.parse(localStorage.getItem("auth"));
        ls.user = res.data.user;
        localStorage.setItem("auth", JSON.stringify(ls));

        navigate("/profile");
      }
    } catch (error) {
      console.log("UPDATE ERROR:", error.response?.data || error.message);
    }

    setLoading(false);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="rounded-3xl shadow-2xl bg-white/90 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Edit Profile</CardTitle>
            </CardHeader>

            <Separator />

            <CardContent className="py-8">
              <form onSubmit={handleUpdate} className="space-y-6">
                {/* Fullname + Phone */}
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

                {/* Skills */}
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
                  </div>
                </div>

                {/* Resume Upload */}
                <div>
                  <label className="text-sm font-medium">Upload Resume</label>
                  <Input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setResume(e.target.files[0])}
                  />

                  {user.profile.resume && (
                    <p className="text-sm mt-2 text-indigo-600">
                      Current Resume:{" "}
                      <a
                        href={user.profile.resume}
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                      >
                        View Resume
                      </a>
                    </p>
                  )}
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

                  {user.profile.profilePhoto && (
                    <img
                      src={user.profile.profilePhoto}
                      alt="profile"
                      className="h-20 w-20 rounded-full mt-3 object-cover border"
                    />
                  )}
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