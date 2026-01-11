"use client";

import type { FC } from "react";
import { useState, useRef } from "react";

interface ApplyNowFormProps {
  className?: string;
}

const ApplyNowForm: FC<ApplyNowFormProps> = ({ className = "" }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      mobile: formData.get("mobile") as string,
      attempts: formData.get("attempts") as string,
      course: formData.get("course") as string,
    };

    console.log("🚀 Submitting form data:", data);

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("📥 Response status:", response.status);

      const result = await response.json();
      console.log("📦 Response data:", result);

      if (response.ok) {
        setMessage({ type: "success", text: "Form submitted successfully!" });
        formRef.current?.reset(); // Use ref instead of e.currentTarget
      } else {
        setMessage({ type: "error", text: result.error || "Failed to submit form" });
      }
    } catch (error) {
      console.error("❌ Network error:", error);
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`border rounded-lg p-4 bg-gray-50 ${className}`}>
      <h2 className="text-lg font-semibold mb-3 border-l-4 border-primary pl-2">
        Apply Now
      </h2>
      
      {message && (
        <div
          className={`mb-3 p-3 rounded-md text-sm ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <form ref={formRef} className="space-y-3" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          disabled={isSubmitting}
          className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-200"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          disabled={isSubmitting}
          className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-200"
        />
        <input
          type="tel"
          name="mobile"
          placeholder="Your Mobile No."
          required
          pattern="[0-9]{10}"
          disabled={isSubmitting}
          className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-200"
        />

        <select
          name="attempts"
          required
          disabled={isSubmitting}
          className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-200"
        >
          <option value="">No. of Attempts</option>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>

        <select
          name="course"
          required
          disabled={isSubmitting}
          className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-200"
        >
          <option value="">Select Course</option>
          <option value="moksha-2026">Moksha Plus-2026</option>
          <option value="moksha-2027">Moksha Plus-2027</option>
          <option value="anthropology-beginner-2026">Anthropology Beginner 2026</option>
          <option value="anthropology-advance-2026">Anthropology Advance 2026</option>
          <option value="prelims-nirvana-2026">Prelims Nirvana-2026</option>
          <option value="pyq-mains">PYQ-Based Mains Revision Course</option>
          <option value="psir-2026">PSIR Plus-2026</option>
          <option value="sociology-2026">Sociology Plus-2026</option>
          <option value="geography-2026">Geography Plus-2026</option>
          <option value="mains-warrior">Mains-Warrior</option>
          <option value="samarth-2026">Samarth Answer Writing 2026</option>
          <option value="prelims-kaushal-2026">Prelims Kaushal 2026</option>
          <option value="anthropology-crash">Anthropology Mains Crash Course</option>
        </select>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ApplyNowForm;
