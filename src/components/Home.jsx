import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch jobs from backend
  const getJobs = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/jobs");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch jobs");
      }

      setJobs(data.data || []); // assuming backend sends { data: [...jobs] }
    } catch (err) {
      setError(err.message);
      console.error(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <div>
      <h2 className="mb-4 text-center">Available Jobs</h2>

      {loading && <p className="text-center">Loading jobs...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      <div className="row">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job._id} className="col-md-4 mb-3">
              <JobCard job={job} />
            </div>
          ))
        ) : (
          !loading && <p className="text-center">No jobs available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
