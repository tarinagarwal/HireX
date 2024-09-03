import CreatedApplications from "@/components/ui/CreatedApplications";
import CreatedJobs from "@/components/ui/CreatedJobs";
import { useUser } from "@clerk/clerk-react";
import React from "react";
import { HashLoader } from "react-spinners";

const MyJobs = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <HashLoader size={"100"} color="#9333ea" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen text-gray-100">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text text-center bg-gradient-to-r from-purple-400 to-pink-600">
            {user?.unsafeMetadata?.role === "candidate"
              ? "My Applications"
              : "My Jobs"}
          </h1>
          {user?.unsafeMetadata?.role === "candidate" ? (
            <CreatedApplications />
          ) : (
            <CreatedJobs />
          )}
        </div>
      </section>
    </div>
  );
};

export default MyJobs;
