import { getCompanies } from "@/api/apiCompanies";
import { addNewJob } from "@/api/apiJobs";
import AddCompanyDrawer from "@/components/ui/AddCompanyDrawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { State } from "country-state-city";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { BarLoader, HashLoader } from "react-spinners";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Building2,
  FileText,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  location: z.string().min(1, { message: "Select a location" }),
  company_id: z.string().min(1, { message: "Select or Add a new Company" }),
  requirements: z.string().min(1, { message: "Requirements are required" }),
});

const PostJob = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { location: "", company_id: "", requirements: "" },
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingCreateJob,
    error: errorCreateJob,
    data: dataCreateJob,
    fn: fnCreateJob,
  } = useFetch(addNewJob);

  const onSubmit = (data) => {
    fnCreateJob({
      ...data,
      recruiter_id: user.id,
      isOpen: true,
    });
  };

  useEffect(() => {
    if (dataCreateJob?.length > 0) navigate("/jobs");
  }, [loadingCreateJob]);

  const {
    loading: loadingCompanies,
    data: companies,
    fn: fnCompanies,
  } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
  }, [isLoaded]);

  if (!isLoaded || loadingCompanies) {
    return (
      <div className="flex items-center justify-center h-screen">
        <HashLoader size={"100"} color="#9333ea" />
      </div>
    );
  }

  if (user?.unsafeMetadata?.role !== "recruiter") {
    return <Navigate to="/jobs" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text text-center bg-gradient-to-r from-purple-400 to-pink-600">
        Post a New Job
      </h1>
      <Card className="bg-card border-gray-700 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-purple-400">
            Job Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-sm font-medium text-gray-300"
              >
                Job Title
              </Label>
              <div className="relative">
                <Briefcase
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  id="title"
                  placeholder="e.g. Senior Software Engineer"
                  {...register("title")}
                  className="pl-10 bg-card border-gray-600 text-white"
                />
              </div>
              {errors.title && (
                <ErrorMessage>{errors.title.message}</ErrorMessage>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-sm font-medium text-gray-300"
              >
                Job Description
              </Label>
              <Textarea
                id="description"
                placeholder="Describe the job role and responsibilities"
                {...register("description")}
                className="bg-card border-gray-600 text-white min-h-[100px]"
              />
              {errors.description && (
                <ErrorMessage>{errors.description.message}</ErrorMessage>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="location"
                  className="text-sm font-medium text-gray-300"
                >
                  Job Location
                </Label>
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400"
                    size={18}
                  />
                  <Controller
                    name="location"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="pl-10 bg-card border-gray-600 text-white">
                          <SelectValue placeholder="Select Location" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-gray-700">
                          <SelectGroup>
                            {State.getStatesOfCountry("IN").map(({ name }) => (
                              <SelectItem
                                key={name}
                                value={name}
                                className="text-gray-300"
                              >
                                {name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                {errors.location && (
                  <ErrorMessage>{errors.location.message}</ErrorMessage>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="company"
                  className="text-sm font-medium text-gray-300"
                >
                  Company
                </Label>
                <div className="relative">
                  <Building2
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400"
                    size={18}
                  />
                  <Controller
                    name="company_id"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="pl-10 bg-card border-gray-600 text-white">
                          <SelectValue placeholder="Select Company" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-gray-700">
                          <SelectGroup>
                            {companies?.map(({ name, id }) => (
                              <SelectItem
                                key={id}
                                value={id.toString()}
                                className="text-gray-300"
                              >
                                {name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                {errors.company_id && (
                  <ErrorMessage>{errors.company_id.message}</ErrorMessage>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <AddCompanyDrawer fetchCompanies={fnCompanies} />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="requirements"
                className="text-sm font-medium text-gray-300"
              >
                Job Requirements
              </Label>
              <div className="relative">
                <FileText
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
                <Controller
                  name="requirements"
                  control={control}
                  render={({ field }) => (
                    <MDEditor value={field.value} onChange={field.onChange} />
                  )}
                />
              </div>
              {errors.requirements && (
                <ErrorMessage>{errors.requirements.message}</ErrorMessage>
              )}
            </div>

            {errorCreateJob?.message && (
              <ErrorMessage>{errorCreateJob.message}</ErrorMessage>
            )}

            {loadingCreateJob && <BarLoader width={"100%"} color="#6366f1" />}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 transform"
            >
              Post Job
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Label = ({ children, ...props }) => (
  <label {...props} className="block text-sm font-medium text-gray-300">
    {children}
  </label>
);

const ErrorMessage = ({ children }) => (
  <p className="text-red-500 text-sm flex items-center mt-1">
    <AlertCircle size={14} className="mr-1" />
    {children}
  </p>
);

export default PostJob;
