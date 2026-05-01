import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("Verifying email...");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/auth/verify-email/${token}`
        );

        setMessage(res.data.message);
        setSuccess(true);

        // redirect after 2 sec
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        setMessage(error.response?.data?.message || "Verification failed");
        setSuccess(false);
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>{message}</h2>

      {success ? (
        <p style={{ color: "green" }}>Redirecting to login...</p>
      ) : (
        <p style={{ color: "red" }}>Please try again.</p>
      )}
    </div>
  );
}