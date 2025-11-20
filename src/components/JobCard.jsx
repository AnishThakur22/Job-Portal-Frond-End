import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, ArrowRight } from "lucide-react";

const JobCard = ({ job }) => {
  console.log("job :",job)
  return (
    <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-border/50 hover:border-primary/50">
      
      {/* Header */}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold text-foreground line-clamp-2">
              {job.jobTitle || "Untitled Job"}
            </CardTitle>
            <CardDescription className="text-primary font-semibold mt-1">
              {job.companyName || "Unknown Company"}
            </CardDescription>
          </div>

          {/* Job Type Badge */}
          {job.type && (
            <Badge variant="secondary" className="ml-2 whitespace-nowrap">
              {job.type}
            </Badge>
          )}
        </div>
      </CardHeader>

      {/* Body */}
      <CardContent className="space-y-4">
        <div className="space-y-3">
          
          {/* Location */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary/70" />
            <span className="text-sm">{job.location || "Not specified"}</span>
          </div>

          {/* Salary */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSign className="h-4 w-4 text-primary/70" />
            <span className="text-sm font-medium text-foreground">
              {job.salary || "Negotiable"}
            </span>
          </div>
        </div>

        {/* Description preview */}
        {job.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {job.description}
          </p>
        )}

        {/* CTA Button */}
        <Link to={`/job/${job._id}`} className="block pt-2">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold flex gap-2 items-center justify-center transition-all duration-200">
            View Details
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default JobCard;
