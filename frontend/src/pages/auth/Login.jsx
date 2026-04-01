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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/Auth";
import axios from "axios";
import { KeyRoundIcon } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/v1/user/login`,
      { email, password, role }
    );

    if (res.data.success) {
      setAuth({
        user: res.data.user,
        token: res.data.token,
      });

      localStorage.setItem(
        "auth",
        JSON.stringify(res.data)
      );

      navigate("/");
      console.log(res.data.token);

    }
  } catch (error) {
    console.log(error.response?.data?.message || "Login failed");
  }
};


  return (
    <Layout>
      <div className="lg:max-w-4xl lg:py-50 px-20 mx-auto lg:flex  justify-cente items-center lg:gap-4 lg:justify-around lg:shadow-2xl border-r-1 lg:max-h-[200vh] lg:border-1 border-zinc-200 rounded-lg">
        <div className="flex items-center  lg:flex-col lg:w-[180px] lg:h-[50vh] py-5">
          <div className="hidden lg:inline-block">
            <h1 className="text-indigo-700 font-bold text-xl">
              Jobs<span className="text-zinc-900">X</span>
            </h1>
          </div>
          <div className="flex items-center border-b-4 border-indigo-800">
            <div>
            <h1 className="text-4xl p-2 font-semibold text-white">Sign in</h1>
            </div>
            <div>
            <KeyRoundIcon className="text-zinc-100"/>
            </div>
          </div>
        </div>
        <div className="  ">
          <form
            action=""
            onSubmit={handleSubmit}
            className="w-[350px] max-w-sm"
          >
            <FieldGroup>
              <Field>
                <FieldLabel className="text-white" htmlFor="form-email">Email</FieldLabel>
                <Input
                  className="text-white"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  id="form-email"
                  type="email"
                  placeholder="john@example.com"
                />
              </Field>
              <Field>
                <FieldLabel className="text-white" htmlFor="form-password">Password</FieldLabel>
                <Input
                  className="text-white"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  id="form-password"
                  type="password"
                  placeholder="password"
                />
              </Field>
              <RadioGroup
                value={role}
                onValueChange={(value) => setRole(value)}
              >
                <Label className="pb-3 text-white" htmlFor="Role">
                  Role
                </Label>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="student" id="student" />
                  <Label className="text-white" htmlFor="student">
                    Student
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="recruiter" id="recruiter" />
                  <Label className="text-white" htmlFor="recruiter">
                    Recruiter
                  </Label>
                </div>
              </RadioGroup>
              <Field orientation="horizontal">
                <Button type="button text-white" variant="outline">
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

export default Login;
