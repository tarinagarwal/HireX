import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Boxes,
  BriefcaseBusiness,
  Clock4,
  Download,
  School,
  SparkleIcon,
  Calendar,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { updateApplicationsStatus } from "@/api/apiApplications";
import { BarLoader } from "react-spinners";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ApplicationCard = ({ application, isCandidate = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = application?.resume;
    link.target = "_blank";
    link.click();
  };

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateApplicationsStatus,
    {
      job_id: application.job_id,
    }
  );

  const handleStatusChange = (status) => {
    fnHiringStatus(status);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "applied":
        return "bg-blue-500";
      case "interviewing":
        return "bg-yellow-500";
      case "hired":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <Card className="bg-card  border-gray-700 overflow-hidden shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
        {loadingHiringStatus && (
          <div className="absolute top-0 left-0 right-0 z-10">
            <BarLoader width={"100%"} color="#9333ea" />
          </div>
        )}
        <CardHeader className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 pb-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-1">
                {isCandidate
                  ? `${application?.job?.title} at ${application?.job?.company?.name}`
                  : application?.name}
              </CardTitle>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleDownload}
                    className="bg-purple-600 text-white rounded-full p-3 hover:bg-purple-700 transition-colors duration-200 shadow-md"
                  >
                    <Download size={20} />
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download Resume</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent className="pt-4 pb-2">
          <motion.div
            initial={false}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
              <div className="flex items-center text-gray-300">
                <Clock4 size={18} className="mr-3 text-purple-400" />
                <span>{application?.experience} Years Experience</span>
              </div>
              <div className="flex items-center text-gray-300">
                <School size={18} className="mr-3 text-purple-400" />
                <span>{application?.education}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <SparkleIcon size={18} className="mr-3 text-purple-400" />
                <span>{application?.skills}</span>
              </div>
            </div>
          </motion.div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-gray-700">
          <div className="flex items-center text-gray-400">
            <Calendar size={18} className="mr-2" />
            <span>{new Date(application?.created_at).toLocaleString()}</span>
          </div>
          {isCandidate ? (
            <Badge
              className={`${getStatusColor(
                application?.status
              )} text-white capitalize px-3 py-1 text-sm font-medium rounded-full`}
            >
              {application?.status}
            </Badge>
          ) : (
            <Select
              onValueChange={handleStatusChange}
              defaultValue={application.status}
            >
              <SelectTrigger className="w-full sm:w-52 bg-gray-700 border-gray-600 text-gray-200 rounded-full">
                <SelectValue placeholder="Application Status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="applied" className="text-blue-400">
                  Applied
                </SelectItem>
                <SelectItem value="interviewing" className="text-yellow-400">
                  Interviewing
                </SelectItem>
                <SelectItem value="hired" className="text-green-400">
                  Hired
                </SelectItem>
                <SelectItem value="rejected" className="text-red-400">
                  Rejected
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ApplicationCard;
