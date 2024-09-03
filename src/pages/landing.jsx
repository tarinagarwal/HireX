import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Briefcase,
  Building2,
  GraduationCap,
  Search,
  Users,
  CheckCircle2,
  Rocket,
  Target,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import useFetch from "@/hooks/use-fetch";
import { getCompanies } from "@/api/apiCompanies";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import { getJobs } from "@/api/apiJobs";

const LandingPage = () => {
  const { fn: fnCompanies, data: companies } = useFetch(getCompanies);
  const { isLoaded, user } = useUser();
  const response = useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  const { fn: fnJobs, data: jobs, loading: loadingJobs } = useFetch(getJobs);
  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded]);
  //   const jobCategories = [
  //     { name: "Technology", icon: "💻" },
  //     { name: "Healthcare", icon: "🏥" },
  //     { name: "Education", icon: "🎓" },
  //     { name: "Finance", icon: "💰" },
  //     { name: "Marketing", icon: "📊" },
  //     { name: "Engineering", icon: "🔧" },
  //     { name: "Design", icon: "🎨" },
  //     { name: "Hospitality", icon: "🍽️" },
  //     { name: "Sales", icon: "🛒" },
  //     { name: "Legal", icon: "⚖️" },
  //     { name: "Logistics", icon: "🚚" },
  //     { name: "Arts & Culture", icon: "🎭" },
  //     { name: "Customer Service", icon: "📞" },
  //     { name: "Construction", icon: "🏗️" },
  //   ];

  const faqItems = [
    {
      question: "What is HireX?",
      answer:
        "HireX is a job portal that connects companies with job seekers. Employers can post job openings, and candidates can search and apply for jobs with ease. The platform is user-friendly and secure, offering tailored features for both employers and job seekers.",
    },
    {
      question: "How do I post a job?",
      answer:
        "Employers can post a job by logging in and going to the 'Post Job' section. Simply fill in the job details and submit the form to create a new listing.",
    },
    {
      question: "How can I search for jobs?",
      answer:
        "Job seekers can search for positions by using keywords, locations, categories, and filters through the search bar on the homepage or the dedicated search page.",
    },
    {
      question: "How do I apply for a job?",
      answer:
        "To apply, click on a job listing and follow the instructions. You may need to upload your resume and fill out additional details as required by the employer.",
    },
    {
      question: "Can I save jobs to apply later?",
      answer:
        "Yes, you can save jobs by clicking the 'Save Job' button on a listing. Saved jobs are accessible from your profile under the 'Saved Jobs' section.",
    },
    {
      question: "How do I track my job applications?",
      answer:
        "Job seekers can monitor their applications in the 'Applications' section within their profile, where updates on each application’s status will be available.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen text-gray-100">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Find Your Dream Job Today
          </h1>
          <p className="text-xl mb-8 text-gray-300">
            Connect with top employers and opportunities in your field
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/jobs">
              <Button
                size="lg"
                className="bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-300"
              >
                <Search className="mr-2 h-4 w-4" /> Find a Job
              </Button>
            </Link>
            <Link to="/post-job">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-purple-600 text-purple-400 hover:bg-pink-600 hover:border-pink-700 hover:text-white transition-colors duration-300"
              >
                <Briefcase className="mr-2 h-4 w-4" /> Post a Job
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Information Cards Section */}

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Job Seeker Card */}
            <Card className="border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-purple-400">
                  For Job Seekers
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Discover how our platform empowers your job search
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                  <p className="text-gray-300">
                    Access thousands of job listings across various industries
                  </p>
                </div>
                <div className="flex items-start">
                  <Target className="mr-2 h-5 w-5 text-green-500" />
                  <p className="text-gray-300">
                    Personalized job recommendations based on your skills and
                    preferences
                  </p>
                </div>
                <div className="flex items-start">
                  <Rocket className="mr-2 h-5 w-5 text-green-500" />
                  <p className="text-gray-300">
                    One-click apply feature for a seamless application process
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Employer Card */}
            <Card className="border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-purple-400">
                  For Employers
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Streamline your hiring process with our powerful tools
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <TrendingUp className="mr-2 h-5 w-5 text-blue-500" />
                  <p className="text-gray-300">
                    Reach a vast pool of qualified candidates
                  </p>
                </div>
                <div className="flex items-start">
                  <Users className="mr-2 h-5 w-5 text-blue-500" />
                  <p className="text-gray-300">
                    Advanced options to manage applications efficiently
                  </p>
                </div>
                <div className="flex items-start">
                  <Building2 className="mr-2 h-5 w-5 text-blue-500" />
                  <p className="text-gray-300">
                    Seamless process with many options
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Statistics Banner */}

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-card shadow border border-gray-700 p-6 rounded-xl">
              <Briefcase className="h-12 w-12 mx-auto mb-4 text-purple-400" />
              <h3 className="text-4xl font-bold mb-2 text-purple-300">
                {jobs?.length ?? (
                  <>
                    <div className="flex items-center justify-center">
                      <BarLoader width={"100%"} color="#9333ea" />
                    </div>
                  </>
                )}
              </h3>
              <p className="text-xl text-gray-400">Jobs Posted</p>
            </div>
            <div className="bg-card shadow border border-gray-700 p-6 rounded-xl">
              <Users className="h-12 w-12 mx-auto mb-4 text-purple-400" />
              <h3 className="text-4xl font-bold mb-2 text-purple-300">
                {user?.length ?? (
                  <>
                    <div className="flex items-center justify-center">
                      <BarLoader width={"100%"} color="#9333ea" />
                    </div>
                  </>
                )}
              </h3>
              <p className="text-xl text-gray-400">Active Users</p>
            </div>
            <div className="bg-card shadow border border-gray-700 p-6 rounded-xl">
              <Building2 className="h-12 w-12 mx-auto mb-4 text-purple-400" />
              <h3 className="text-4xl font-bold mb-2 text-purple-300">
                {companies?.length ?? (
                  <>
                    <div className="flex items-center justify-center">
                      <BarLoader width={"100%"} color="#9333ea" />
                    </div>
                  </>
                )}
              </h3>
              <p className="text-xl text-gray-400">Companies</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}

      {/* FAQ Accordion */}
      <section className="py-16">
        <div className="container text-center mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Frequently Asked Questions
          </h2>
          <Accordion
            type="single"
            collapsible
            className="w-full max-w-3xl mx-auto"
          >
            {faqItems.map((item, index) => (
              <AccordionItem
                value={`item-${index}`}
                key={index}
                className="border-gray-700"
              >
                <AccordionTrigger className="text-xl text-purple-300 hover:text-purple-400">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-xl text-gray-400">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="py-16">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Ready to Start Your Career Journey?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of job seekers who have found their dream jobs
            through our platform
          </p>
          <Button
            size="lg"
            className="bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-300"
          >
            <GraduationCap className="mr-2 h-4 w-4" /> Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
