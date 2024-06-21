import React from 'react';
import Image from "next/image";
import shape_1 from '@/assets/images/shape/shape_02.svg';
import shape_2 from '@/assets/images/shape/shape_03.svg';
import LikeCandidate from '../candidate/likeCandidate';

const CandidateProfileBreadcrumbTwo = ({ candidate }: { candidate: any }) => {
  return (
    <div className="inner-banner-one position-relative">
      <div className="container">
        <div className="candidate-profile-card list-layout">
          <div className="d-flex align-items-start align-items-xl-center">
            <div className="cadidate-avatar position-relative d-block me-auto ms-auto">
              <a href="#" className="rounded-circle">
                <Image src={candidate?.profile?.avatar ? `https://fipiqdxkchoddvgjmhdz.supabase.co/storage/v1/object/public/avatars/${candidate.profile?.avatar}` : "/assets/images/candidates/01.png"} alt="" className="lazy-img rounded-circle" style={{ height: '70px', width: '70px', objectFit: 'cover' }} width={70} height={70} />
              </a>
            </div>
            <div className="right-side">
              <div className="row gx-1 align-items-center">
                <div className="col-xl-2 order-xl-0">
                  <div className="position-relative">
                    <h4 className="candidate-name text-white mb-0">{candidate?.profile?.name}</h4>
                    <div className="candidate-post">UI Designer</div>
                  </div>
                </div>
                <div className="col-xl-3 order-xl-3">
                  <ul className="cadidate-skills style-none d-flex flex-wrap align-items-center">
                    {candidate?.profile?.skills?.slice(0, 4).map((item: any, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                    {candidate?.profile?.skills?.length > 4 && <li className="more">+{candidate?.profile?.skills?.length - 4}</li>}
                  </ul>
                </div>
                <div className="col-xl-2 col-md-4 order-xl-1">
                  <div className="candidate-info">
                    <span>Education</span>
                    <div>{candidate?.profile?.qualification}</div>
                  </div>
                </div>
                <div className="col-xl-2 col-md-4 order-xl-2">
                  <div className="candidate-info">
                    <span>Experience</span>
                    <div>{candidate?.profile?.experience}</div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-4 order-xl-4">
                  <div className="d-flex justify-content-md-end">
                    <div className='h-20 w-20 d-flex justify-content-center align-items-center fs-20'><LikeCandidate item_id={candidate?.profile.id} secondary/></div>
                    <a href="#" className="cv-download-btn fw-500 tran3s ms-md-3 sm-mt-20">Download CV</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Image
        src={shape_1}
        alt="shape"
        className="lazy-img shapes shape_01"
      />
      <Image
        src={shape_2}
        alt="shape"
        className="lazy-img shapes shape_02"
      />
    </div>
  );
};

export default CandidateProfileBreadcrumbTwo;