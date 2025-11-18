import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, ArrowRight } from 'lucide-react';

const JobCard = ({ job }) => (
  <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 border-border/50 hover:border-primary/50">
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <CardTitle className="text-lg font-bold text-foreground line-clamp-2">
            {job.title}
          </CardTitle>
          <CardDescription className="text-primary font-semibold mt-1">
            {job.company}
          </CardDescription>
        </div>
        {job.type && (
          <Badge variant="secondary" className="ml-2 whitespace-nowrap">
            {job.type}
          </Badge>
        )}
      </div>
    </CardHeader>

    <CardContent className="space-y-4">
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary/70" />
          <span className="text-sm">{job.location}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <DollarSign className="h-4 w-4 text-primary/70" />
          <span className="text-sm font-medium text-foreground">{job.salary}</span>
        </div>
      </div>

      {job.description && (
        <p className="text-sm text-muted-foreground line-clamp-2">
          {job.description}
        </p>
      )}

      <Link to={`/job/${job.id}`} className="block pt-2">
        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-colors duration-200 group-hover:gap-2"
          asChild
        >
          <span className="flex items-center justify-center gap-2">
            View Details
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Button>
      </Link>
    </CardContent>
  </Card>
);

export default JobCard;