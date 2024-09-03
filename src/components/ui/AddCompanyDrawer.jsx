import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "./input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useFetch from "@/hooks/use-fetch";
import { addNewCompany } from "@/api/apiCompanies";
import { BarLoader } from "react-spinners";
import { useEffect } from "react";
import { Button } from "./button";
import { Label } from "@/components/ui/label";
import { Briefcase, Image } from "lucide-react";

const schema = z.object({
  name: z.string().min(1, { message: "Company name is required" }),
  logo: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "image/png" || file[0].type === "image/jpeg"),
      {
        message: "Only Images are allowed",
      }
    ),
});

const AddCompanyDrawer = ({ fetchCompanies }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingAddCompany,
    error: errorAddCompany,
    data: dataAddCompany,
    fn: fnAddCompany,
  } = useFetch(addNewCompany);

  const onSubmit = async (data) => {
    fnAddCompany({
      ...data,
      logo: data.logo[0],
    });
  };

  useEffect(() => {
    if (dataAddCompany?.length > 0) {
      fetchCompanies();
    }
  }, [loadingAddCompany]);

  return (
    <Drawer>
      <DrawerTrigger>
        <Button
          type="button"
          className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
        >
          Add a New Company
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="border-b border-gray-700 pb-4">
          <DrawerTitle className="text-2xl font-bold text-purple-400">
            Add a New Company
          </DrawerTitle>
        </DrawerHeader>
        <form className="flex flex-col gap-4 p-4 pb-0">
          {/* Company Name */}
          <div className="space-y-2">
            <Label
              htmlFor="experience"
              className="text-gray-300 flex items-center"
            >
              <Briefcase className="w-5 h-5 mr-2 text-purple-400" />
              Years of Experience
            </Label>
            <Input
              placeholder="Company name"
              {...register("name")}
              className="border-gray-700 text-white"
            />

            {/* Company Logo */}
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="experience"
              className="text-gray-300 flex items-center"
            >
              <Image className="w-5 h-5 mr-2 text-purple-400" />
              Logo of the Company
            </Label>
            <Input
              type="file"
              accept="image/*"
              className=" flex- file:text-gray-500"
              {...register("logo")}
            />
          </div>
          {/* Add Button */}
          <Button
            type="button"
            onClick={handleSubmit(onSubmit)}
            variant="destructive"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 transform"
          >
            Add
          </Button>
        </form>
        <DrawerFooter>
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          {errors.logo && <p className="text-red-500">{errors.logo.message}</p>}
          {errorAddCompany?.message && (
            <p className="text-red-500">{errorAddCompany?.message}</p>
          )}
          {loadingAddCompany && <BarLoader width={"100%"} color="#9333ea" />}
          <DrawerClose asChild>
            <Button
              type="button"
              variant="Outline"
              className="w-full text-gray-400 hover:text-white bg-gray-900 border-gray-700 hover:bg-gray-800"
            >
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddCompanyDrawer;
