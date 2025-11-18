import React, { useState } from "react";
import JobCard from "./JobCard";

const Home = () => {
  const [jobs] = useState([
    { id: 1, title: "Frontend Developer", company: "TechNepal", location: "Kathmandu", salary: "Rs. 80,000" },
    { id: 2, title: "Backend Developer", company: "CodeArt", location: "Pokhara", salary: "Rs. 70,000" },
    { id: 3, title: "Frontend Developer", company: "TechNepal", location: "Kathmandu", salary: "Rs. 80,000" },
    { id: 4, title: "Backend Developer", company: "CodeArt", location: "Pokhara", salary: "Rs. 70,000" },
    { id: 5, title: "Frontend Developer", company: "TechNepal", location: "Kathmandu", salary: "Rs. 80,000" },
    { id: 6, title: "Backend Developer", company: "CodeArt", location: "Pokhara", salary: "Rs. 70,000" },
  ]);

  return (
    <div>
      <h2 className="mb-4 text-center">Available Jobs</h2>
      <div className="row">
        {jobs.map((job) => (
          <div key={job.id} className="col-md-4 mb-3">
            <JobCard job={job} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
