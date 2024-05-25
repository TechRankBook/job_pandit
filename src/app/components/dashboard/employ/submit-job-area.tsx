"use client";
import React, { useEffect, useState } from "react";
import DashboardHeader from "../candidate/dashboard-header";
import UploadFile from "../uploadFile";
import Emp_Skills_Experience from "./Emp_skills";
import Language from "./Language";
import EmployExperience from "./employ-experience";
import Salary from "./Salary";
import Job_Type from "./Job_Type";
import { notifyError, notifySuccess } from "@/utils/toast";
import { createClient } from "@/utils/supabase/client";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const SubmitJobArea = ({ setIsOpenSidebar }: IProps) => {
  const handleJobType = (item: { value: string; label: string }) => {};
  const handleSalary = (item: { value: string; label: string }) => {};
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [jobRoal, setJobRoal] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");
  const [jobType, setJobType] = useState({ value: "", label: "" });
  const [salary, setSalary] = useState({ value: "", label: "" });
  const [Expertise, setExpertise] = useState({ value: "", label: "" });
  const [education, setEducation] = useState({ value: "", label: "" });
  const [language, setLanguage] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState({ value: "", label: "" });
  const [fileName, setFileName] = useState<string>("");
  const [socialLinks, setSocialLinks] = useState([{ label: "", value: "" }]);
  const [singleLink, setSingleLink] = useState<any>({ label: "", value: "" });
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPinCode] = useState("");
  const [state, setState] = useState("");
  const [mapSrc, setMapSrc] = useState("");

  useEffect(() => {
    // Generate the map source dynamically based on the address
    const formattedAddress = `${address}, ${city}, ${state}, ${pincode}, ${country}`;
    const encodedAddress = encodeURIComponent(formattedAddress);
    const mapSrc = `https://maps.google.com/maps?q=${encodedAddress}&output=embed`;
    setMapSrc(mapSrc);
  }, [address, country, city, pincode, state]);

  function handleAddLink(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();

    if (singleLink.label !== "" && singleLink.value !== "") {
      setSocialLinks([...socialLinks, singleLink]);
      setSingleLink({ label: "", value: "" });
    }
  }
  function handleDeleteLink(
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ): void {
    event.preventDefault();
    setSocialLinks([
      ...socialLinks.slice(0, index),
      ...socialLinks.slice(index + 1),
    ]);
  }

  const handleCancel = () => {
    setJobTitle("");
    setJobDescription("");
    setSalaryMin("");
    setJobRoal("");
    setSalaryMax("");
    setLocation("");
    setIndustry("");
    setJobType({ value: "", label: "" });
    setSalary({ value: "", label: "" });
    setExpertise({ value: "", label: "" });
    setEducation({ value: "", label: "" });
    setLanguage([]);
    setSkills([]);
    setExperience({ value: "", label: "" });
    setFileName("");
    setSocialLinks([{ label: "", value: "" }]);
    setSingleLink({ label: "", value: "" });
    setAddress("");
    setCountry("");
    setCity("");
    setPinCode("");
    setState("");
  };

  const handleSave = async (event: any) => {
    event.preventDefault();
    if(
      !jobTitle ||
      !jobDescription ||
      !salaryMin ||
      !jobRoal ||
      !salaryMax ||
      !location ||
      !industry ||
      !jobType.value ||
      !salary.value ||
      !Expertise.value ||
      !education.value ||
      !language.length ||
      !skills.length ||
      !experience.value ||
      !fileName ||
      !address ||
      !country ||
      !city ||
      !pincode ||
      !state
    ){  
      notifyError("Please fill all the fields");
      return;
    }
    const data = {
      job_title: jobTitle,
      job_description: jobDescription,
      salary_min: salaryMin,
      job_role: jobRoal,
      salary_max: salaryMax,
      location: location,
      industry: industry,
      job_type: jobType.value,
      salary: salary.value,
      expertise: Expertise.value,
      education: education.value,
      language: language,
      skills: skills,
      experience: experience.value,
      file_name: fileName,
      social_links: socialLinks,
      address: address,
      country: country,
      city: city,
      pincode: pincode,
      state: state,
    };
    console.log(data);

    
    
    

  };

  return (
    <div className="dashboard-body">
      {/* header start */}
      <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
      {/* header end */}

      <h2 className="main-title">Post a New Job</h2>

      <div className="bg-white card-box border-20">
        <h4 className="dash-title-three">Job Details</h4>
        <div className="dash-input-wrapper mb-30">
          <label htmlFor="">Job Title*</label>
          <input type="text" placeholder="Ex: Product Designer" onChange={(e) => setJobTitle(e.target.value)} />
        </div>
        <div className="dash-input-wrapper mb-30">
          <label htmlFor="">Job Description*</label>
          <textarea
            className="size-lg"
            placeholder="Write about the job in details..."
            onChange={(e) => setJobDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="row align-items-end">
          <div className="col-md-6">
            <div className="dash-input-wrapper mb-30">
              <label htmlFor="">Job Roal</label>
              <div className="dash-input-wrapper mb-30">
                <input type="text" placeholder="Ex : Designer" onChange={(e) => setJobRoal(e.target.value)} />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <Job_Type jobType={jobType} setJobType={setJobType} />
          </div>
          <div className="col-md-6">
            <Salary salary={salary} setSalary={setSalary} />
          </div>
          <div className="col-md-3">
            <div className="dash-input-wrapper mb-30">
              <input type="text" placeholder="Min" onChange={(e) => setSalaryMin(e.target.value)}/>
            </div>
          </div>
          <div className="col-md-3">
            <div className="dash-input-wrapper mb-30">
              <input type="text" placeholder="Max" onChange={(e) => setSalaryMax(e.target.value)}/>
            </div>
          </div>
        </div>

        {/* employ experience start */}

        <Emp_Skills_Experience skills={skills} setSkills={setSkills} />

        <div className="dash-input-wrapper mb-15">
          {/* <label htmlFor="">Add Work Experience*</label> */}
        </div>
        <EmployExperience
          experience={experience}
          setExperience={setExperience}
          education={education}
          setEducation={setEducation}
          Expertise={Expertise}
          setExpertise={setExpertise}
        />
        <div className="row">
          <div className="col-lg-2">
            <div className="dash-input-wrapper mb-30 md-mb-10">
              <label htmlFor="">Location*</label>
            </div>
          </div>
          <div className="col-lg-10">
            <div className="dash-input-wrapper mb-30">
              <input type="text" placeholder="Lead Product Designer " onChange={(e) => setLocation(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            <div className="dash-input-wrapper mb-30 md-mb-10">
              <label htmlFor="">Industry*</label>
            </div>
          </div>
          <div className="col-lg-10">
            <div className="dash-input-wrapper mb-30">
              <input type="text" placeholder="Lead Product Designer " onChange={(e) => setIndustry(e.target.value)}/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            <div className="dash-input-wrapper mb-30 md-mb-10">
              <label htmlFor="">Languages*</label>
            </div>
          </div>
          <div className="col-lg-10">
            <div className="dash-input-wrapper mb-30">
              <Language language={language} setLanguage={setLanguage} />
            </div>
          </div>
        </div>
        <div className="accordion dash-accordion-one" id="accordionTwo"></div>

        <UploadFile fileName={fileName} setFileName={setFileName} />

        <h4 className="dash-title-three pt-50 lg-pt-30">Address & Location</h4>
        <div className="row">
          <div className="col-12">
            <div className="dash-input-wrapper mb-25">
              <label htmlFor="">Address*</label>
              <input
                type="text"
                placeholder="Cowrasta, Chandana, Gazipur Sadar"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="dash-input-wrapper mb-25">
              <label htmlFor="">Country*</label>
              <input
                type="text"
                placeholder="India"
                onChange={(e) => setCountry(e.target.value)}
                value={country}
              />
              {/* <CountrySelect/> */}
            </div>
          </div>
          <div className="col-lg-3">
            <div className="dash-input-wrapper mb-25">
              <label htmlFor="">City*</label>
              <input
                type="text"
                placeholder="Bengaluru"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
              {/* <CitySelect/> */}
            </div>
          </div>
          <div className="col-lg-3">
            <div className="dash-input-wrapper mb-25">
              <label htmlFor="">Pin Code*</label>
              <input
                type="number"
                placeholder="57000"
                onChange={(e) => setPinCode(e.target.value)}
                value={pincode}
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="dash-input-wrapper mb-25">
              <label htmlFor="">State*</label>
              <input
                type="text"
                placeholder="Karnataka"
                onChange={(e) => setState(e.target.value)}
                value={state}
              />
              {/* <StateSelect/> */}
            </div>
          </div>
          <div className="col-12">
            <div className="dash-input-wrapper mb-25">
              <label htmlFor="">Map Location*</label>
              <div className="map-frame mt-30">
                <div className="gmap_canvas h-100 w-100">
                  <iframe
                    className="gmap_iframe h-100 w-100"
                    src={mapSrc}
                  ></iframe>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="button-group d-inline-flex align-items-center mt-30">
        <a className="dash-btn-two tran3s me-3" onClick={handleSave}>Save</a>
        <a className="dash-cancel-btn tran3s" onClick={handleCancel}>
          Cancel
        </a>
      </div>
    </div>
  );
};

export default SubmitJobArea;
