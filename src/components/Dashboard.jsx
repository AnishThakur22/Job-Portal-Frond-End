import React from "react";

const Dashboard = () => (
  <div>
    <h2>Admin Dashboard</h2>
    <p>Welcome! You can manage jobs and users here.</p>

    <div className="row">
      <div className="col-md-4">
        <div className="card p-3">
          <h5>Total Users</h5>
          <p>54</p>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card p-3">
          <h5>Total Jobs</h5>
          <p>23</p>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card p-3">
          <h5>Applications</h5>
          <p>120</p>
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;
