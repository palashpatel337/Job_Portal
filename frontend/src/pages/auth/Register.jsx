import Layout from "@/components/shared/Layout";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { useAuth } from "@/context/Auth";
import axios from "axios";
import { KeyRoundIcon, LogInIcon } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  // const [auth, setAuth] = useAuth()
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
const formData = new FormData();
formData.append("fullname", fullname);
formData.append("email", email);
formData.append("phone", phone);
formData.append("password", password);
formData.append("role", role);
if (photo) formData.append("photo", photo);

const res = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/v1/user/register`,
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
      );
      if (res.data.success) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Layout>
      <div className="max-w-3xl py-5 my-10 mx-auto flex flex-col items-center justify-center shadow-xl border-r-1 max-h-[200vh] border-b-1 border-zinc-400">
        <div className="w-[70%]">
          <div className="flex gap-4 items-center border-b-4 mb-4 border-indigo-800 w-[250px]">
            <h1 className="text-2xl ">New User, Sign up</h1>
            <KeyRoundIcon />
          </div>
          <form
            action=""
            onSubmit={handleSubmit}
            className=""
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="form-fullname">Name</FieldLabel>
                <Input
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullname}
                  id="form-fullname"
                  type="text"
                  placeholder="Evil Rabbit"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="form-email">Email</FieldLabel>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  id="form-email"
                  type="email"
                  placeholder="john@example.com"
                />
                <FieldDescription>
                  We&apos;ll never share your email with anyone.
                </FieldDescription>
              </Field>
              <div className="max-w-5xl">
                <Field>
                  <FieldLabel htmlFor="form-phone">Phone</FieldLabel>
                  <Input
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    id="form-phone"
                    type="tel"
                    placeholder="934-123-4567"
                  />
                </Field>
                {/* <Field>
            <FieldLabel htmlFor="form-country">Country</FieldLabel>
            <Select defaultValue="us">
              <SelectTrigger id="form-country">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
              </SelectContent>
            </Select>
          </Field> */}
              </div>
              <Field>
                <FieldLabel htmlFor="form-password">Password</FieldLabel>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  id="form-password"
                  type="password"
                  placeholder="password"
                />
              </Field>
              <div className="flex items-start justify-between">
                <div className="">
                  <RadioGroup
                    value={role}
                    onValueChange={(value) => setRole(value)}
                  >
                    <Label className="pb-" htmlFor="Role">
                      Role
                    </Label>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="student" id="student" />
                      <Label className="text-zinc-500" htmlFor="student">
                        Student
                      </Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="recruiter" id="recruiter" />
                      <Label className="text-zinc-500" htmlFor="recruiter">
                        Recruiter
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <Label className="pb-3" htmlFor="profile">
                    Profile Photo
                  </Label>
<Input
  id="profile-photo"
  type="file"
  accept="image/*"
  onChange={(e) => setPhoto(e.target.files[0])}
/>
                </div>
              </div>
              <Field orientation="horizontal">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button className="bg-indigo-800 text-white" type="submit">
                  Submit
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Register;
