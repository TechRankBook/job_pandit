"use client";
import React, { useEffect, useState } from "react";
import DashboardHeader from "../candidate/dashboard-header";
import Employer_JD_File_Upload from "../upload_JD_File";
import { notifyError, notifySuccess } from "@/utils/toast";
import { createClient } from "@/utils/supabase/client";
import NiceSelect from "@/ui/nice-select";
import { useUserStore } from "@/lib/store/user";
import { redirect } from "next/navigation";
import Category from "../employ/category";
import Job_Type from "../employ/job_Type";
import Salary from "../employ/salary";
import AddSkills from "../employ/Add_Skills";
import EmployExperience from "../employ/employ-experience";
import Education from "../employ/Education";
import EmployUploadPhoto from "../employUploadPhoto";


// props type
type IProps = {
    setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
    params: any;
};

const SubmitJobArea = ({ setIsOpenSidebar, params }: IProps) => {
    const [salaryType, setSalaryType] = useState<any>('');
    const [jobType, setJobType] = useState<any>('');
    const [experience, setExperience] = useState<any>('');
    const [category, setCategory] = useState<any>("");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState("");
    const [min, setMin] = useState<string>('');
    const [max, setMax] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [education, setEducation] = useState<any>('');
    const [skills, setSkills] = useState<string[]>([]);
    const [fileName, setFileName] = useState<string>("");
    const [isData, setIsData] = useState<boolean>(false);
    const [vacancy, setVacancy] = useState<string>("");
    const [workmode, setWorkMode] = useState<string>('');
    const [candidate, setCandidate] = useState<string>('');
    const [company_name, setCompanyName] = useState<string>('');
    const [company_logo, setCompanyLogo] = useState<string>('');
    const [externalLink, setExternalLink] = useState<string>('');
    const [jobPostId, setJobPostId] = useState<number>(Number(params?.jobpostId));
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [isExternal, setIsExternal] = useState<boolean>(false);

    const supabase = createClient();
    const { user } = useUserStore();


    const handleCancle = () => {
        setTitle("");
        setCategory("");
        setDescription("");
        setMin('');
        setMax('');
        setLocation("");
        setSkills([]);
        setFileName("");
        setExperience({});
        setJobType({});
        setSalaryType({});
        setEducation({});
        setWorkMode('');
        setCandidate('');
        setVacancy('');

        setIsData(true);
    };

    async function handlePost() {
        if (!title) {
            notifyError("Please Enter Title");
            return;
        } else if (!category) {
            notifyError("Please Enter Category");
            return;
        } else if (description.length < 500) {
            notifyError("Description Must be 500 charecters");
            return;
        } else if (!min) {
            notifyError("Please Enter Min-salary");
            return;
        } else if (!max) {
            notifyError("Please Enter Max-salary");
            return;
        } else if (!location) {
            notifyError("Please Enter Location");
            return;
        } else if (!education) {
            notifyError("Please Enter Education");
            return;
        } else if (!skills) {
            notifyError("Please Enter Skills");
            return;
        } else if (!experience) {
            notifyError("Please Enter Experience");
            return;
        } else if (!jobType) {
            notifyError("Please Enter Job Type");
            return;
        } else if (!salaryType) {
            notifyError("Please Enter SalaryType");
            return;
        } else if (!candidate) {
            return notifyError("Please Enter Candidate");
        } else if (!workmode) {
            return notifyError("Please Enter Work Mode");
        } else if (!vacancy) {
            return notifyError("Please Enter Vacancy");
        }
        else {
            setIsUploading(true);
            if (isData && jobPostId) {
                const { data, error } = await supabase
                    .from("job_posts")
                    .update({
                        title, category, description, min_salary: Number(min), max_salary: Number(max), location, education: education, skills, file_name: fileName,
                        experience,
                        job_type: jobType,
                        salary_type: salaryType,
                        workmode,
                        candidate,
                        vacancy: Number(vacancy),
                        company_name,
                        company_logo,
                        external_link: externalLink

                    })
                    .eq("id", jobPostId)

                if (error) {
                    console.error("Error updating data:", error.message);
                    notifyError("Error updating data");
                    setIsData(false);
                } else {
                    notifySuccess("job post Updated Successfully");
                    setIsData(false);
                    window.location.replace("/dashboard/consultant-dashboard/jobs");
                }
            } else {
                const { data, error } = await supabase.from("job_posts").insert([
                    {
                        user_id: user?.id, title, category, description, min_salary: Number(min), max_salary: Number(max), location, education: education, skills, file_name: fileName,
                        experience,
                        job_type: jobType,
                        salary_type: salaryType,
                        workmode,
                        candidate,
                        vacancy: Number(vacancy),
                        company_name,
                        company_logo,
                        external_link: externalLink
                    }
                ])
                    .select("*")
                    .single();
                console.log(data, error);
                if (!error) {
                    notifySuccess("Job Posted Successfully");
                    setIsData(false);
                    window.location.replace("/dashboard/consultant-dashboard/jobs");
                
                    
                } else {
                    if(error.code === "23503"){
                        notifyError("Please Fill Your Profile First");
                    }
                    notifyError("something went worng. Please Retry");
                }
            }
        }
        setIsUploading(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from("job_posts")
                .select("*")
                .eq("id", jobPostId).eq("user_id", user?.id)
                .single();
            console.log(data, error, "fetching submit ")
            if (data) {
                setTitle(data.title);
                setCategory(data.category);
                setDescription(data.description);
                setMin(data.min_salary);
                setMax(data.max_salary);
                setLocation(data.location);
                setSkills(data.skills);
                setFileName(data.file_name);
                setExperience(data.experience);
                setJobType(data.job_type);
                setSalaryType(data.salary_type);
                setEducation(data.education);
                setWorkMode(data.workmode);
                setCandidate(data.candidate);
                setVacancy(data.vacancy);
                setIsData(true);
                setJobPostId(data.id);
                setExternalLink(data.external_link);
                setIsExternal(data.external_link ? true : false);
                setCompanyName(data.company_name);
                setCompanyLogo(data.company_logo);
            } else {
                console.log(error);
            }
        };
        if (user && jobPostId!==0) {
            fetchData();
        }
    }, [user]);


    return (
        <div className="dashboard-body">
            <div className="position-relative">
                {/* header start */}
                <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
                {/* header end */}

                {!isData ? <h2 className="main-title">Post a New Job</h2> : <h2 className="main-title">Edit Job</h2>}

                <div style={{margin:'20px'}} >


                    <input
                        type="checkbox"
                        placeholder="Ex: Product Designer"
                        onChange={(e) => setIsExternal(!isExternal)}
                        checked={isExternal}
                    />  <label htmlFor=""> Is this External Job Post?</label>

                </div>
                {isExternal && <div className="dash-input-wrapper mb-30">
                    <label htmlFor="">External Link<span className="text-danger">*</span></label>
                    <input
                        type="text"
                        placeholder="Ex: https://www.google.com/careers"
                        onChange={(e) => setExternalLink(e.target.value)}
                        value={externalLink}
                    />
                </div>}
                <div className="bg-white card-box border-20">
                    <h4 className="dash-title-three">{!isExternal ? "Own Job Post" : "External Job Post"}</h4>
                    <div className="dash-input-wrapper mb-30">
                        <label htmlFor="">Job Title <span className="text-danger">*</span></label>
                        <input
                            type="text"
                            placeholder="Ex: Product Designer"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                    </div>
                    <div className="dash-input-wrapper mb-30 row">
                        <div className="col-md-6"><label htmlFor="">Company Name <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                placeholder="Ex: Product Designer"
                                onChange={(e) => setCompanyName(e.target.value)}
                                value={company_name}
                            /></div>
                        <div className="col-md-6 pt-3"><EmployUploadPhoto avatar={company_logo} setAvatar={setCompanyLogo} /></div>

                    </div>
                    <div className="dash-input-wrapper mb-30">
                        <label htmlFor="">Job Description <span className="text-danger">*</span></label>
                        <textarea
                            className="size-lg"
                            placeholder="Write about the job in details..."
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        ></textarea>
                        <div className={description.length < 500 ? `text-danger` : `text-success`}>{description.length}{" "}Charecters</div>
                    </div>
                    <div className="row align-items-end">
                        <div className="col-md-6">
                            <Category category={category} setCategory={setCategory} />
                        </div>
                        <div className="col-md-6">
                            <Job_Type jobType={jobType} setJobType={setJobType} />
                        </div>
                        <div className="col-md-6">
                            <Salary salary={salaryType} setSalary={setSalaryType} />
                        </div>
                        <div className="col-md-3">
                            <div className="dash-input-wrapper mb-30">
                                <label htmlFor="">Max-Salary*</label>
                                <input
                                    type="number"
                                    placeholder="Ex : 2,50,000"
                                    onChange={(e) => setMin(e.target.value)}
                                    value={min}
                                />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="dash-input-wrapper mb-30">
                                <label htmlFor="">Max-Salary*</label>
                                <input
                                    type="number"
                                    placeholder="Ex : 3,50,000"
                                    onChange={(e) => setMax(e.target.value)}
                                    value={max}
                                />
                            </div>
                        </div>
                    </div>

                    <AddSkills skills={skills} setSkills={setSkills} />

                    {/* employ experience start */}


                    <div className="row align-items-end">
                        <EmployExperience
                            experience={experience}
                            setExperience={setExperience} />

                        <Education education={education} setEducation={setEducation} />

                        <div className="col-md-6">
                            <div className="dash-input-wrapper mb-30">
                                <label htmlFor="">Workmode <span className="text-danger">*</span></label>
                                <NiceSelect
                                    options={[
                                        { value: "Hybride", label: "Hybride" },
                                        { value: "Remote", label: "Remote" },
                                        { value: "Office", label: "Office" },
                                    ]}
                                    defaultCurrent={0}
                                    onChange={(item) => setWorkMode(item.value)}
                                    name="WorkMode"
                                    cls="category"
                                    value={workmode}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="dash-input-wrapper mb-30">
                                <label htmlFor="">Candidate*</label>
                                <NiceSelect
                                    options={[
                                        { value: "Both the Candidates", label: "Both the Candidates" },
                                        { value: "Only Male Candidates", label: "Male Candidates" },
                                        { value: "Only Female Candidates", label: "Female Candidates" },
                                    ]}
                                    defaultCurrent={0}
                                    onChange={(item) => setCandidate(item.value)}
                                    name="Candidate"
                                    cls="category"
                                    value={candidate}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="dash-input-wrapper mb-30">
                                <label htmlFor="">Vacancy<span className="text-danger">*</span></label>
                                <input
                                    type="number"
                                    placeholder="Ex : 100 Vacances"
                                    onChange={(e) => setVacancy(e.target.value)}
                                    value={vacancy}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="dash-input-wrapper mb-30">
                                <label htmlFor="">Location <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    placeholder="Ex: Hassan"
                                    onChange={(e) => setLocation(e.target.value)}
                                    value={location}
                                />
                            </div>
                        </div>
                    </div>


                    {/* employ experience end */}
                    {/* <div className="row">
            <div className="col-lg-20">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Languages*</label>
                <AddLanguage language={language} setLanguage={setLanguage} />
              </div>

            </div>
          </div> */}
                    <Employer_JD_File_Upload
                        filename={fileName}
                        setFileName={setFileName}
                    />


                </div>

                <div className="button-group d-inline-flex align-items-center mt-30">

                        <button className="dash-btn-two tran3s me-3" onClick={handlePost}>
                            Post
                        </button>
                   
                    <a
                        href="#"
                        className="dash-cancel-btn tran3s"
                        onClick={() => handleCancle()}
                    >
                        Cancel
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SubmitJobArea;
