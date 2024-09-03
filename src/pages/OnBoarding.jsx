import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { BarLoader, HashLoader } from "react-spinners";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, Building2, User, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
const OnBoarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const handleRoleSelection = async (role) => {
    await user
      .update({
        unsafeMetadata: { role },
      })
      .then(() => {
        navigate(role === "recruiter" ? "/post-job" : "/jobs");
      })
      .catch(() => {
        console.error("Error Updating Role:", err);
      });
  };

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigate(
        user?.unsafeMetadata?.role === "recruiter" ? "/post-job" : "/jobs"
      );
    }
  }, [user]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <HashLoader size={"100"} color="#9333ea" />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen">
        <main className="flex-grow flex items-center justify-center px-4 py-12">
          <div className="max-w-4xl w-full">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Welcome to HireX
            </h1>
            <p className="text-xl text-center mb-12 text-gray-300">
              Are you looking for a job or hiring? Choose your path to get
              started.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Job Seeker Card */}
              <Card className="bg-card border-2 transition-all duration-300 cursor-pointer border-purple-500 shadow-lg shadow-purple-500/50">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-purple-400 flex items-center">
                    <User className="mr-2 h-6 w-6" />
                    Job Seeker
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Find your dream job and advance your career
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4 text-purple-400" />
                      Access thousands of job listings
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4 text-purple-400" />
                      Upload Resumes along with application
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4 text-purple-400" />
                      One-Click apply feature
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-300"
                    onClick={() => handleRoleSelection("candidate")}
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </Card>

              {/* Employer Card */}
              <Card className="bg-card border-2 transition-all duration-300 cursor-pointer border-purple-500 shadow-lg shadow-purple-500/50">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-purple-400 flex items-center">
                    <Building2 className="mr-2 h-6 w-6" />
                    Employer
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Find top talent and grow your team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4 text-purple-400" />
                      Post job openings
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4 text-purple-400" />
                      Seamless process with many options
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4 text-purple-400" />
                      Manage applications efficiently
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-300"
                    onClick={() => handleRoleSelection("recruiter")}
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default OnBoarding;
