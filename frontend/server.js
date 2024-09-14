app.get("/api/jobs", (req, res) => {
    const searchQuery = req.query.search;
    // Simulate job search logic
    const jobs = [
      { title: "Software Engineer", description: "Job description for Software Engineer" },
      { title: "Project Manager", description: "Job description for Project Manager" },
    ];
    const filteredJobs = jobs.filter(job => job.title.includes(searchQuery));
    res.json(filteredJobs);
  });
  