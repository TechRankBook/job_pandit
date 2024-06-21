"use client"
import React, { useEffect, useState } from "react";
import CandidateGridItem from "./candidate-grid-item";
import CandidateListItem from "./candidate-list-item";
import CandidateV1FilterArea from "./filter/candidate-v1-filter-area";
import ShortSelect from "../common/short-select";
import useCandidateFilterStore from "@/lib/store/candidate";
import slugify from "slugify";

const CandidateV1Area = ({style_2=false,candidates_data}:{style_2?:boolean,candidates_data:any}) => {
  const [jobType, setJobType] = useState<string>(style_2 ? "list" : "grid");

  let all_candidate_data = candidates_data;
  console.log(candidates_data,"candidates_data");


  const {location,education,experience,english_fluency,skills,gender} = useCandidateFilterStore();
  const [currentItems, setCurrentItems] = useState<any[] | null>(null);
  const [filterItems, setFilterItems] = useState<any[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [shortValue, setShortValue] = useState('');

  useEffect(() => {
    // Filter the job_data array based on the selected filters
    let filteredData = all_candidate_data
      .filter((item: { skills: string | string[]; }) => skills.length !== 0 ? skills.some((c) => item.skills.includes(c)) : true)
      .filter((item: {gender: string; }) => (gender? item.gender === gender : true))
      .filter((item: { education: string; }) => (education ? item.education === education : true))
      .filter((item: { experience: string; }) => (experience ? item.experience === experience : true))
      .filter((item: { english_fluency: string; }) => (english_fluency ? item.english_fluency === english_fluency : true))
      .filter((l: {city: string; }) => location ? slugify(l.city.split(',').join('-').toLowerCase(),'-') === location : true)
      

    const endOffset = itemOffset + 8;
    setFilterItems(filteredData)
    setCurrentItems(filteredData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredData.length / 8));
  }, [
    itemOffset,
    8,
    experience,
    location,
    education,
    english_fluency,
    gender,
    shortValue
  ]);


const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * 8) % all_candidate_data.length;
    setItemOffset(newOffset);
  };

const handleShort = (item: { value: string; label: string }) => {
  setShortValue(item.value)
}
  return (
    <>
      <section className="candidates-profile pt-110 lg-pt-80 pb-160 xl-pb-150 lg-pb-80">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4">
              <button
                type="button"
                className="filter-btn w-100 pt-2 pb-2 h-auto fw-500 tran3s d-lg-none mb-40"
                data-bs-toggle="offcanvas"
                data-bs-target="#filteroffcanvas"
              >
                <i className="bi bi-funnel"></i>
                Filter
              </button>
              {/* filter area start */}
              {/* <CandidateV1FilterArea candidates_data={candidates_data}  /> */}
              {/* filter area end */}
            </div>

            <div className="col-xl-9 col-lg-8">
              <div className="ms-xxl-5 ms-xl-3">
                <div className="upper-filter d-flex justify-content-between align-items-center mb-20">
                  <div className="total-job-found">
                    All <span className="text-dark fw-500">1,270</span>{" "}
                    candidates found
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="short-filter d-flex align-items-center">
                      <div className="text-dark fw-500 me-2">Short:</div>
                      <ShortSelect />
                    </div>
                    <button
                      onClick={() => setJobType("list")}
                      className={`style-changer-btn text-center rounded-circle tran3s ms-2 list-btn ${jobType === "grid" ? "active" : ""}`}
                      title="Active List"
                    >
                      <i className="bi bi-list"></i>
                    </button>
                    <button
                      onClick={() => setJobType("grid")}
                      className={`style-changer-btn text-center rounded-circle tran3s ms-2 grid-btn ${jobType === "list" ? "active" : ""}`}
                      title="Active Grid"
                    >
                      <i className="bi bi-grid"></i>
                    </button>
                  </div>
                </div>

                <div
                  className={`accordion-box grid-style ${jobType === "grid" ? "show" : ""}`}
                >
                  <div className="row">
                    {currentItems&&currentItems.map((item) => (
                      <div key={item.id} className="col-xxl-4 col-sm-6 d-flex">
                        <CandidateGridItem item={item} />
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className={`accordion-box list-style ${jobType === "list" ? "show" : ""}`}
                >
                  {filterItems.map((item) => (
                    <CandidateListItem key={item.id} item={item} />
                  ))}
                </div>

                <div className="pt-20 d-sm-flex align-items-center justify-content-between">
                  <p className="m0 order-sm-last text-center text-sm-start xs-pb-20">
                    Showing <span className="text-dark fw-500">1 to 20</span> of{" "}
                    <span className="text-dark fw-500">1,270</span>
                  </p>
                  <div className="d-flex justify-content-center">
                    <ul className="pagination-two d-flex align-items-center style-none">
                      <li className="active">
                        <a href="#">1</a>
                      </li>
                      <li>
                        <a href="#">2</a>
                      </li>
                      <li>
                        <a href="#">3</a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="bi bi-chevron-right"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CandidateV1Area;
