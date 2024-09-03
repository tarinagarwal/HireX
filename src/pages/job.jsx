import { getSingleJob, updateHiringStatus } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import MDEditor from "@uiw/react-md-editor";
import {
  Briefcase,
  DoorClosed,
  DoorOpen,
  MapPinIcon,
  Calendar,
  DollarSign,
  Building,
  MapPin,
} from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader, HashLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ApplyJobDrawer from "@/components/ui/ApplyJobDrawer";
import ApplicationCard from "@/components/ui/ApplicationCard";

const JobPage = () => {
  const { isLoaded, user } = useUser();
  const { id } = useParams();

  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateHiringStatus,
    {
      job_id: id,
    }
  );

  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJob());
  };

  useEffect(() => {
    if (isLoaded) fnJob();
  }, [isLoaded]);

  if (!isLoaded || loadingJob) {
    return (
      <div className="flex items-center justify-center h-screen">
        <HashLoader size={"100"} color="#9333ea" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card className="bg-card border-gray-600 shadow-lg mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col-reverse md:flex-row justify-between items-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              {job?.title}
            </h1>
            <img
              src={job?.company?.logo_url}
              alt={job?.company?.name}
              className="h-20 object-contain"
            />
          </div>
          <div className="grid pb-4 grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-300">
            <div className="flex items-center">
              <MapPinIcon className="w-5 h-5 mr-2 text-purple-400" />
              {job?.location}
            </div>
            <div className="flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-purple-400" />
              {job?.applications?.length} Applicants
            </div>
            <div className="flex items-center">
              {job?.isOpen ? (
                <>
                  <DoorOpen className="w-5 h-5 mr-2 text-green-400" /> Open
                </>
              ) : (
                <>
                  <DoorClosed className="w-5 h-5 mr-2 text-red-400" />
                  Closed
                </>
              )}
            </div>
            <div className="flex items-center">
              <Building className="w-5 h-5 mr-2 text-purple-400" />
              {job?.company?.name}
            </div>
          </div>
          {loadingHiringStatus && <BarLoader width={"100%"} color="#9333ea" />}
          {job?.recruiter_id === user?.id && (
            <Select onValueChange={handleStatusChange}>
              <SelectTrigger
                className={`w-full ${
                  job?.isOpen ? "bg-green-950" : "bg-red-950"
                }`}
              >
                <SelectValue
                  placeholder={
                    "Hiring Status " + (job?.isOpen ? "( Open )" : "( Closed )")
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          )}
        </CardContent>
      </Card>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-purple-400 mb-4">
            About the Job
          </h2>
          <Card className="bg-card border-gray-600">
            <CardContent className="p-6">
              <p className="text-gray-300">{job?.description}</p>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-purple-400 mb-4">
            What we are looking for
          </h2>
          <Card className="bg-card border-gray-600">
            <CardContent className="p-6">
              <MDEditor.Markdown
                source={job?.requirements}
                className="bg-transparent text-gray-300"
              />
            </CardContent>
          </Card>
        </section>
        {job?.recruiter_id !== user?.id && (
          <div className="flex justify-center mt-8">
            <ApplyJobDrawer
              job={job}
              user={user}
              fetchJob={fnJob}
              applied={job?.applications?.find(
                (ap) => ap.candidate_id === user.id
              )}
            />
          </div>
        )}

        {job?.applications?.length > 0 && job?.recruiter_id === user?.id && (
          <>
            <h2 className="text-2xl font-bold text-purple-400 mb-4">
              Applications
            </h2>
            <div>
              {job?.applications.map((application) => {
                return (
                  <ApplicationCard
                    key={application.id}
                    application={application}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default JobPage;

{
  /* <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
  Apply Now
</Button> */
}
