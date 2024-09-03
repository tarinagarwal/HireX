import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Trash2Icon, Heart, Building } from "lucide-react";
import { Link } from "react-router-dom";
import { deleteJob, saveJob } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { BarLoader, PacmanLoader } from "react-spinners";

const JobCard = ({
  job,
  isMyJob = false,
  savedInit = false,
  onJobSaved = () => {},
}) => {
  const [saved, setSaved] = useState(savedInit);
  const {
    fn: fnSavedJob,
    data: savedJob,
    loading: loadingSavedJob,
  } = useFetch(saveJob, {
    alreadySaved: saved,
  });
  const { user } = useUser();

  const handleSaveJob = async () => {
    await fnSavedJob({
      user_id: user.id,
      job_id: job.id,
    });
    onJobSaved();
  };

  const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(deleteJob, {
    job_id: job.id,
  });

  const handleDeleteJob = async () => {
    await fnDeleteJob();
    onJobSaved();
  };

  useEffect(() => {
    if (savedJob !== undefined) setSaved(savedJob?.length > 0);
  }, [savedJob]);

  return (
    <Card className="flex flex-col justify-between bg-card border-gray-700 hover:bg-gray-750 transition-all duration-300 shadow-lg">
      {loadingDeleteJob && (
        <PacmanLoader className="mt-4 ml-4" color="#9333ea" />
      )}
      <CardHeader className="pb-2 gap-3">
        <div className="flex justify-between items-start">
          <div className="">
            <CardTitle className="text-purple-300 text-xl mb-1 flex items-center">
              {job.title}
              {isMyJob && (
                <Trash2Icon
                  size={18}
                  className="text-red-400 cursor-pointer ml-2 hover:text-red-300 transition-colors duration-200"
                  onClick={handleDeleteJob}
                />
              )}
            </CardTitle>
            <CardDescription className="text-gray-400 flex items-center">
              {job.company && (
                <img
                  src={job.company.logo_url}
                  alt={job.company.name}
                  className="h-6 mr-2 rounded"
                />
              )}
            </CardDescription>
          </div>
          {!isMyJob && (
            <Button
              variant="outline"
              className="w-15"
              onClick={handleSaveJob}
              disabled={loadingSavedJob}
            >
              {saved ? (
                <Heart
                  size={24}
                  className="cursor-pointer text-red-500 fill-red-500"
                />
              ) : (
                <Heart
                  size={24}
                  className="cursor-pointer text-gray-500 fill-gray-500"
                />
              )}
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge
            variant="secondary"
            className="bg-purple-600 text-white px-2 py-1"
          >
            <MapPin className="w-3 h-3 mr-1" />
            {job.location}
          </Badge>
          <Badge
            variant="secondary"
            className="bg-blue-600 text-white px-2 py-1"
          >
            <Building className="w-3 h-3 mr-1" />
            {job.company.name}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 mb-4 line-clamp-3">
          {job.description.substring(0, job.description.indexOf(".") + 1)}
        </p>
      </CardContent>
      <CardFooter className="flex gap-2 pt-2 border-t border-gray-700">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button className="w-full bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-300">
            More Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
