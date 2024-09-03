import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useFetch from "@/hooks/use-fetch";
import { applyToJob } from "@/api/apiApplications";
import { BarLoader } from "react-spinners";
import { Briefcase, Code, GraduationCap } from "lucide-react";

const schema = z.object({
  experience: z
    .number()
    .min(0, { message: "Experience must be at least 0" })
    .int(),
  skills: z.string().min(1, { message: "Skills are required" }),
  education: z.enum(["Intermediate", "Graduate", "Post Graduate"], {
    message: "Education is required",
  }),
  resume: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "application/pdf" ||
          file[0].type === "application/msword"),
      { message: "Only PDF or Word documents are allowed" }
    ),
});

const ApplyJobDrawer = ({ user, job, applied = false, fetchJob }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingApply,
    error: errorApply,
    fn: fnApply,
  } = useFetch(applyToJob);

  const onSubmit = (data) => {
    fnApply({
      ...data,
      job_id: job.id,
      candidate_id: user.id,
      name: user.fullName,
      status: "applied",
      resume: data.resume[0],
    }).then(() => {
      fetchJob();
      reset();
    });
  };

  return (
    <Drawer open={applied ? false : undefined}>
      <DrawerTrigger asChild>
        <Button
          size="lg"
          variant={job?.isOpen && !applied ? "default" : "destructive"}
          disabled={!job?.isOpen || applied}
          className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
        >
          {job?.isOpen ? (applied ? "Applied" : "Apply Now") : "Hiring Closed"}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="border-b border-gray-700 pb-4">
          <DrawerTitle className="text-2xl font-bold text-purple-400">
            Apply for <span className="text-gray-300">{job?.title}</span> at{" "}
            <span className="text-blue-500">{job?.company?.name}</span>
          </DrawerTitle>
        </DrawerHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-4 pb-0"
        >
          <div className="space-y-2">
            <Label
              htmlFor="experience"
              className="text-gray-300 flex items-center"
            >
              <Briefcase className="w-5 h-5 mr-2 text-purple-400" />
              Years of Experience
            </Label>
            <Input
              id="experience"
              type="number"
              placeholder="e.g., 2"
              className="bg-gray-800 border-gray-700 text-white"
              {...register("experience", {
                valueAsNumber: true,
              })}
            />
            {errors.experience && (
              <p className="text-red-500 text-sm">
                {errors.experience.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="skills" className="text-gray-300 flex items-center">
              <Code className="w-5 h-5 mr-2 text-purple-400" />
              Skills
            </Label>
            <Input
              id="skills"
              type="text"
              placeholder="e.g., React, Node.js, SQL"
              className="bg-gray-800 border-gray-700 text-white"
              {...register("skills")}
            />
            {errors.skills && (
              <p className="text-red-500 text-sm">{errors.skills.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2 text-purple-400" />
              Education Level
            </Label>
            <Controller
              name="education"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  className="flex flex-col sm:flex-row gap-4"
                  {...field}
                >
                  {["Intermediate", "Graduate", "Post Graduate"].map(
                    (level) => (
                      <div key={level} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={level}
                          id={level.toLowerCase().replace(" ", "-")}
                          className="border-purple-400 text-purple-400"
                        />
                        <Label
                          htmlFor={level.toLowerCase().replace(" ", "-")}
                          className="text-gray-300"
                        >
                          {level}
                        </Label>
                      </div>
                    )
                  )}
                </RadioGroup>
              )}
            />
            {errors.education && (
              <p className="text-red-500 text-sm">{errors.education.message}</p>
            )}
          </div>

          <Input
            type="file"
            accept=".pdf, .doc, .docx"
            className="flex- file:text-gray-500"
            {...register("resume")}
          />
          {errors.resume && (
            <p className="text-red-500">{errors.resume.message}</p>
          )}
          {errorApply?.message && (
            <p className="text-red-500">{errorApply?.message}</p>
          )}
          {loadingApply && <BarLoader width={"100%"} color="#9333ea" />}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 transform"
            disabled={loadingApply}
          >
            {loadingApply ? "Applying..." : "Submit Application"}
          </Button>
        </form>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button
              variant="outline"
              className="w-full text-gray-400 hover:text-white border-gray-700 hover:bg-gray-800"
            >
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ApplyJobDrawer;
