import Link from "next/link";
import React from "react";
import Image from "next/image";

const Companies = ({
    company,
    handleDelete,
}: {
    company: any[];
    handleDelete: any;
}) => {
    return (
        <div className=" row time-line-data position-relative pt-15">
            {company?.map((item, index) => (
                <div
                    key={index}
                    className="col-xl-6 col-lg-6 col-md-6 col-sm-6 d-flex position-relative "
                >
                    <div
                        className={`company-grid-layout ${item.isFav ? "favourite" : ""} mb-30 position-relative`}
                    >
                        <Link href={`/company/${item?.id}`}
                            className="company-logo me-auto ms-auto rounded-circle"
                        >
                            <Image src={item?.company_logo ? `https://fipiqdxkchoddvgjmhdz.supabase.co/storage/v1/object/public/employer_avatars/${item?.company_logo}` : "/assets/images/candidates/01.png"} alt="company-logo" className="lazy-img rounded-circle" style={{ objectFit: "cover", width: "auto", height: "auto", maxWidth: "60px", maxHeight: "60px", aspectRatio: "1/1" }} width={60} height={60} />
                        </Link>
                        <h5 className="text-center">
                            <Link href={`/company/${item?.id}`} className="company-name tran3s  mx-10px">
                                {item?.company_name.charAt(0).toUpperCase().concat(item?.company_name?.slice(1))}
                            </Link>
                        </h5>

                        <p className=""><span className="fw-500"><i className="bi bi-geo-alt-fill"></i></span>{item?.company_location?.charAt(0).toUpperCase().concat(item?.company_location?.slice(1))}</p>
                        <p className=""> <span className="fw-200"><i className="bi bi-building-fill"></i>{" "}</span>{item?.company_sector}</p>
                        <i className="bi bi-x-circle cursor-pointer position-absolute top-0 end-0 p-3 translate-middle fs-5 text-danger tran3s  " style={{ marginTop: "20px",marginRight:"-30px" }} onClick={handleDelete(index)} aria-hidden="true"></i>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default Companies;