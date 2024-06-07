import React from "react";
import ListItem from "./list-item";
import Link from "next/link";
import { fetchJobs } from "@/hooks/server-request/job_post";

export function JobListItems({style_2=false ,jobs}:{style_2?:boolean,jobs:any}) {
  return (
    <>
      {jobs.slice(0, 5).map((item:any) => (
        <ListItem key={item.id} item={item} style_2={style_2} />
      ))}
    </>
  )
}

const JobListOne = async ({jobs}:{jobs:any[]}) => {
  
  return (
    <>
      <section className="job-listing-one mt-180 xl-mt-150 lg-mt-100">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-6">
              <div className="title-one">
                <h2 className="text-dark wow fadeInUp" data-wow-delay="0.3s">New job listing</h2>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="d-flex justify-content-lg-end">
                <Link
                  href="/job"
                  className="btn-six d-none d-lg-inline-block"
                >
                  Explore all jobs
                </Link>
              </div>
            </div>
          </div>

          <div className="job-listing-wrapper border-wrapper mt-80 lg-mt-40 wow fadeInUp">
            <JobListItems jobs={jobs} />
          </div>

          <div className="text-center mt-40 d-lg-none">
            <Link href="/job" className="btn-six">
              Explore all jobs
            </Link>
          </div>

          <div className="text-center mt-80 lg-mt-30 wow fadeInUp">
            <div className="btn-eight fw-500">
              Do you want to post a job for your company?{" "}
              <span>We can help.</span> <Link href="/register">Click here</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobListOne;
