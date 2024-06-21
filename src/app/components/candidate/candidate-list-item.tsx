import React from "react";
import Image from "next/image";
import Link from "next/link";
import LikeCandidate from "./likeCandidate";
import SavedCandidate from "./SavedCandidate";

const CandidateListItem = ({ item, style_2 = false }: { item: any; style_2?: boolean }) => {

  return (
    <div
      className={`candidate-profile-card ${item.favorite ? "favourite" : ""} ${style_2 ? 'border-0' : ''} list-layout mb-25`}
    >
      <div className="d-flex">
        <div className="cadidate-avatar online position-relative d-block me-auto ms-auto">
          <Link href={`/candidate/${item.id}`} className="rounded-circle">
            <Image src={item?.avatar ? `https://fipiqdxkchoddvgjmhdz.supabase.co/storage/v1/object/public/avatars/${item?.avatar}` : "/assets/images/candidates/01.png"} alt="company-logo" className="lazy-img rounded-circle" style={{ objectFit: "cover", width: "60px", height: "auto", aspectRatio: "1/1" }} width={60} height={60} />
          </Link>
        </div>
        <div className="right-side">
          <div className="row gx-1 align-items-center">
            <div className="col-xl-3">
              <div className="position-relative">
                <h4 className="candidate-name mb-0">
                  <Link href={`/candidate/${item.id}`} className="tran3s">
                    {item.name}
                  </Link>
                </h4>
                <div className="candidate-post">{item.interstedIn}</div>
                {/* <ul className="cadidate-skills style-none d-flex align-items-center">
                  {item?.resume?.skills.slice(0, 2).map((s:string, i:number) => (
                    <li className="d-block" key={i}>{s}</li>
                  ))}
                  {item?.resume?.skills?.length > 1 && (
                    <li className="more">
                      {item?.resume?.skills.length - item?.skills?.slice(0, 2).length}+
                    </li>
                  )}
                </ul> */}
              </div>
            </div>
            <div className="col-xl-3 col-md-4 col-sm-6">
              <div className="candidate-info">
                <span>Qualification</span>
                <div>
                  {item.qualification}
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-md-3 col-sm-5">
              <div className="candidate-info">
                <span>Experience</span>
                <div>{item.experience}</div>
              </div>
            </div>
            <div className="col-xl-1 col-md-1 col-sm-1">
              <div className="d-flex justify-content-lg-end justify-content-center align-items-center" style={{gap:"10px"}}>
                <SavedCandidate item={item} /> 
                <LikeCandidate item_id={item.id} />

              </div>
            </div>
            <div className="col-xl-3 col-md-4">
              <div className="d-flex justify-content-lg-end justify-content-center align-items-center">
                
                <Link href={`/candidate/${item.id}`}
                  className="profile-btn tran3s ms-md-2  sm-mt-20"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateListItem;
