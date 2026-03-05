import Layout from "@/components/shared/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, FileText, Calendar } from "lucide-react";
import { NavLink } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);

  const getUserProfile = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/user/profile`,
      );

      if (res?.data?.success) {
        setUser(res.data.user);
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br  py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {user ? (
            <Card className="backdrop-blur-xl bg-white/80 shadow-2xl rounded-3xl border-0 overflow-hidden">
              {/* HEADER SECTION */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden shadow-xl">
                    <img
                      src={`${import.meta.env.VITE_API_URL}/uploads/${user?.profile?.profilePhoto}`}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">{user.fullname}</h1>
                    <Badge className="mt-2 bg-white text-indigo-600 hover:bg-white">
                      {user.role}
                    </Badge>
                  </div>
                </div>
              </div>

              <CardContent className="p-10 space-y-10">
                {/* CONTACT CARDS */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-indigo-50 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3 text-indigo-600 font-semibold">
                      <Mail size={18} />
                      Email
                    </div>
                    <p className="text-zinc-700 mt-2">{user.email}</p>
                  </div>

                  <div className="p-6 rounded-2xl bg-purple-50 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3 text-purple-600 font-semibold">
                      <Phone size={18} />
                      Phone
                    </div>
                    <p className="text-zinc-700 mt-2">
                      {user.phone || "Not Provided"}
                    </p>
                  </div>
                </div>

                {/* BIO */}
                <div>
                  <h2 className="text-xl font-semibold mb-3">About Me</h2>
                  <p className="text-zinc-600 leading-relaxed">
                    {user.profile.bio || "No bio added yet."}
                  </p>
                </div>

                {/* SKILLS */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Skills</h2>
                  <div className="flex flex-wrap gap-3">
                    {user.profile.skills?.length > 0 ? (
                      user.profile.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          className="px-4 py-2 text-sm rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:scale-105 transition-transform"
                        >
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-zinc-500">No skills added</p>
                    )}
                  </div>
                </div>

                {/* EXPERIENCE & EDUCATION */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-6 rounded-2xl border hover:shadow-lg transition">
                    <h3 className="text-lg font-semibold mb-2">Experience</h3>
                    <p className="text-zinc-600">
                      {user.experience || "No experience added"}
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl border hover:shadow-lg transition">
                    <h3 className="text-lg font-semibold mb-2">Education</h3>
                    <p className="text-zinc-600">
                      {user.education || "No education added"}
                    </p>
                  </div>
                </div>

                {/* RESUME */}
                <div className="flex items-center justify-between bg-zinc-100 p-6 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <FileText size={20} className="text-indigo-600" />
                    {user.profile.resume ? (
                      <a
                        href={`${import.meta.env.VITE_API_URL}/uploads/${user?.profile?.resume}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-600 font-medium hover:underline"
                      >
                        View Resume
                      </a>
                    ) : (
                      <span className="text-zinc-500">No resume uploaded</span>
                    )}
                  </div>
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between pt-6 border-t">
                  <div className="flex items-center gap-2 text-sm text-zinc-500">
                    <Calendar size={16} />
                    Joined on {new Date(user.createdAt).toLocaleDateString()}
                  </div>

                  <Button className="rounded-full px-6 shadow-md hover:shadow-xl transition">
                    <NavLink to={`/profile/update`}>Edit Profile</NavLink>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <p className="text-center text-zinc-500">Loading profile...</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
