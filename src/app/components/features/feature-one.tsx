import React from "react";
import Link from "next/link";
import Image from "next/image";
import girl from "@/assets/images/assets/img_03.jpg";
import man_2 from "@/assets/images/assets/img_04.jpg";
import screen_1 from "@/assets/images/assets/screen_01.png";
import screen_2 from "@/assets/images/assets/screen_02.png";
import screen_3 from "@/assets/images/assets/screen_03.png";
import shape from "@/assets/images/shape/shape_06.svg";
import home_image_1 from "@/assets/images/home_images/home_image_1.png"
import home_image_2 from "@/assets/images/home_images/home_image_2.png"

// FeatureImgData
export function FeatureImgData() {
  return (
    <div className="img-data position-relative pe-xl-5 me-xl-5 md-mt-50">
      <div className="row">
        <div className="col-md-6 col-sm-8 col-10">
          <Image src={home_image_2} alt="man img" className="lazy-img img01" />
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 col-5">
          <Image
            src={girl}
            alt="girl img"
            className="lazy-img img02 mt-35"
          />
        </div>
        <div className="col-md-6 col-7">
          <Image
            src={man_2}
            alt="man-img-2"
            className="lazy-img img01 mt-35"
          />
        </div>
      </div>
      <Image
        src={home_image_1}
        alt="screen_1-img"
        className="lazy-img shapes screen01 wow fadeInRight"
      />
      <Image
        src={screen_2}
        alt="screen_2-img"
        className="lazy-img shapes screen02 wow fadeInUp"
      />
      <Image
        src={screen_3}
        alt="screen_3-img"
        className="lazy-img shapes screen03 wow fadeInUp"
      />
      <Image
        src={shape}
        alt="shape"
        className="lazy-img shapes shape_01"
      />
    </div>
  )
}

const FeatureOne = () => {
  return (
    <section className="text-feature-one position-relative pt-180 xl-pt-150 lg-pt-100 md-pt-80 pb-180 xl-pb-150">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 order-lg-last">
            <div className="ps-xxl-4 wow fadeInRight">
              <div className="title-one">
                <h2>Select us for ? <br /> Access a treasure trove of talent at your finger tips!!!</h2>
              </div>
              <p className="mt-40 md-mt-20 mb-40 md-mb-20">
              Find top-tier job opportunities with our advanced job search tools{" "}
              </p>
              <ul className="list-style-one style-none">
                <li>Effortless Talent Search</li>
                <li>Recruit the cream of crops </li>
                <li>Secure and Protected Payments</li>
              </ul>
              <Link href='/job-list-v1' className="btn-one lg mt-50 md-mt-30">
                Learn more
              </Link>
            </div>
          </div>
          <div className="col-lg-7 col-md-11 m-auto order-lg-first">
            <FeatureImgData />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureOne;
