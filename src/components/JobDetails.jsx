import React from "react";
import { useParams } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();
  return (
    <div className="card">
      <div className="card-body">
        <h3>Job ID: {id}</h3>
        <h4>Frontend Developer at TechNepal</h4>
        <p>
          Build and maintain web applications using React.js and Bootstrap. 
          Collaborate with backend developers and designers.
        </p>
        <button className="btn btn-success">Apply Now</button>
      </div>
    </div>
  );
};

export default JobDetails;
