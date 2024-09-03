import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apiJobs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import JobCard from "@/components/ui/JobCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { State } from "country-state-city";
import { Building2, MapPin, Search, X, Zap } from "lucide-react";
import React, { useEffect, useState } from "react";
import { BarLoader, BounceLoader, HashLoader } from "react-spinners";

const JobListing = () => {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const { isLoaded } = useUser();

  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  const { fn: fnCompanies, data: companies } = useFetch(getCompanies);

  const clearFilters = () => {
    setCompany_id("");
    setSearchQuery("");
    setLocation("");
  };

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <HashLoader size={"100"} color="#9333ea" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col min-h-screen text-gray-100">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text text-center bg-gradient-to-r from-purple-400 to-pink-600">
              Latest Jobs List
            </h1>

            {/* Add filters */}
            <form
              onSubmit={handleSearch}
              className="relative w-full mx-auto mb-6"
            >
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search jobs by title..."
                  name="search-query"
                  className="w-full h-14 pl-12 pr-20 text-lg border-2 border-purple-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all duration-300"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
              </div>
              <Button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full px-6 transition-colors duration-300"
              >
                <Zap className="mr-2 h-4 w-4" />
                Zap Jobs!
              </Button>
            </form>

            {/* <div className="py-4">
              <Select
                value={location}
                onValueChange={(value) => setLocation(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter By Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {State.getStatesOfCountry("IN").map(({ name }) => {
                      return (
                        <SelectItem key={name} value={name}>
                          {name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select
                value={company_id}
                onValueChange={(value) => setCompany_id(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter By Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies?.map(({ name, id }) => {
                      return (
                        <SelectItem key={name} value={id}>
                          {name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div> */}
            <div className="mb-8">
              <div className="pb-10 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="space-y-2">
                  <label
                    htmlFor="location-select"
                    className="text-sm font-medium text-gray-300"
                  >
                    Location
                  </label>
                  <Select
                    value={location}
                    onValueChange={(value) => setLocation(value)}
                    onOpenChange={setIsLocationOpen}
                  >
                    <SelectTrigger
                      id="location-select"
                      className={`w-full bg-card border-gray-600 text-white ${
                        isLocationOpen ? "ring-2 ring-purple-500" : ""
                      }`}
                    >
                      <MapPin className="w-4 h-4 mr-2 text-purple-400" />
                      <SelectValue placeholder="Filter By Location" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-gray-600">
                      <SelectGroup>
                        {State.getStatesOfCountry("IN").map(({ name }) => (
                          <SelectItem
                            key={name}
                            value={name}
                            className="text-white hover:bg-gray-600"
                          >
                            {name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="company-select"
                    className="text-sm font-medium text-gray-300"
                  >
                    Company
                  </label>
                  <Select
                    value={company_id}
                    onValueChange={(value) => setCompany_id(value)}
                    onOpenChange={setIsCompanyOpen}
                  >
                    <SelectTrigger
                      id="company-select"
                      className={`w-full bg-card border-gray-600 text-white ${
                        isCompanyOpen ? "ring-2 ring-purple-500" : ""
                      }`}
                    >
                      <Building2 className="w-4 h-4 mr-2 text-purple-400" />
                      <SelectValue placeholder="Filter By Company" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-gray-600">
                      <SelectGroup>
                        {companies?.map(({ name, id }) => (
                          <SelectItem
                            key={id}
                            value={id}
                            className="text-white hover:bg-gray-600"
                          >
                            {name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={clearFilters}
                  className="bg-red-500 hover:bg-red-600 text-white transition-colors duration-300"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
              {(location || company_id) && (
                <div className="mt-4 p-3 bg-card rounded border border-gray-600">
                  <p className="text-sm text-gray-300 font-medium">
                    Active Filters:
                    {location && (
                      <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-600 text-white">
                        {location}
                      </span>
                    )}
                    {company_id && (
                      <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
                        {companies?.find((c) => c.id === company_id)?.name}
                      </span>
                    )}
                  </p>
                </div>
              )}
            </div>

            {loadingJobs && (
              <BarLoader className="mt-4" width={"100%"} color="#9333ea" />
            )}

            {loadingJobs === false && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {jobs?.length ? (
                  jobs.map((job) => {
                    return (
                      <JobCard
                        key={job.id}
                        job={job}
                        savedInit={job?.saved?.length > 0}
                      />
                    );
                  })
                ) : (
                  <div>No Jobs Found</div>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default JobListing;
