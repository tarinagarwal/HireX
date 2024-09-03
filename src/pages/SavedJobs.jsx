import { getSavedJobs } from "@/api/apiJobs";
import JobCard from "@/components/ui/JobCard";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { HashLoader } from "react-spinners";

const SavedJobs = () => {
  const { isLoaded } = useUser();

  const {
    loading: loadingSavedJobs,
    data: savedJobs,
    fn: fnSavedJobs,
  } = useFetch(getSavedJobs);

  useEffect(() => {
    if (isLoaded) fnSavedJobs();
  }, [isLoaded]);

  if (!isLoaded || loadingSavedJobs) {
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
            Saved Jobs
          </h1>

          {loadingSavedJobs === false && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {savedJobs?.length ? (
                savedJobs.map((saved) => {
                  return (
                    <JobCard
                      key={saved.id}
                      job={saved?.job}
                      savedInit={true}
                      onJobSaved={fnSavedJobs}
                    />
                  );
                })
              ) : (
                <div>No Saved Jobs Found</div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SavedJobs;
