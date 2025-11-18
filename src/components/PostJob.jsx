import React, { useState } from "react";

const PostJob = () => {
  const [job, setJob] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMsg("");

  try {
    const response = await fetch("http://localhost:5000/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    });

    // If backend returns error status
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    const data = await response.json();

    setMsg("Job posted successfully!");

    // Reset fields
    setJob({
      jobTitle: "",
      companyName: "",
      location: "",
      description: "",
    });

  } catch (error) {
    setMsg("Failed to post job. " + error.message);
    console.error(error);
  }

  setLoading(false);
};


  return (
    <div className="col-md-8 offset-md-2 mt-4">
      <h3>Post a New Job</h3>
      
      {msg && <div className="alert alert-info">{msg}</div>}

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label>Job Title</label>
          <input
            type="text"
            className="form-control"
            value={job.jobTitle}
            onChange={(e) => setJob({ ...job, jobTitle: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label>Company Name</label>
          <input
            type="text"
            className="form-control"
            value={job.companyName}
            onChange={(e) => setJob({ ...job, companyName: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label>Location</label>
          <input
            type="text"
            className="form-control"
            value={job.location}
            onChange={(e) => setJob({ ...job, location: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
            value={job.description}
            onChange={(e) => setJob({ ...job, description: e.target.value })}
            required
          />
        </div>

        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
};

export default PostJob;
