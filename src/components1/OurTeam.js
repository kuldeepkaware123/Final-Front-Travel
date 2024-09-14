import React from "react";

import img1 from "../images/team/img1.jpg";
import img2 from "../images/team/img2.jpg";
import img3 from "../images/team/img3.jpg";
import img4 from "../images/team/img4.jpg";
import img5 from "../images/team/img5.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";

function OurTeam() {
  return (
    <section className="our-team pb-6">
      <div className="container">
        <div className="section-title mb-6 w-75 mx-auto text-center">
          <h4 className="mb-1 theme1">Tour Guides</h4>
          <h2 className="mb-1">
            Meet Our <span className="theme">Excellent Guides</span>
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore.
          </p>
        </div>
        <div className="team-main">
          {/* <div className="row shop-slider"> */}
          <Swiper
            modules={[Navigation, Pagination, Autoplay, Scrollbar, A11y]}
            slidesPerView={window.innerWidth > 768 ? 4 : 1}
            spaceBetween={9}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            allowSlideNext
          >
            <SwiperSlide>
              <div className="col-lg-12 col-md-6 col-sm-12 mb-4">
                <div className="team-list rounded">
                  <div className="team-image">
                    <img src={img1} alt="team" />
                  </div>
                  <div className="team-content text-center p-3 bg-theme">
                    <h4 className="mb-0 white">Salmon Thuir</h4>
                    <p className="mb-0 white">Senior Agent</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="col-lg-12 col-md-6 col-sm-12 mb-4">
                <div className="team-list rounded">
                  <div className="team-image">
                    <img src={img2} alt="team" />
                  </div>
                  <div className="team-content text-center p-3 bg-theme">
                    <h4 className="mb-0 white">Horke Pels</h4>
                    <p className="mb-0 white">Head Officer</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="col-lg-12 col-md-6 col-sm-12 mb-4">
                <div className="team-list rounded">
                  <div className="team-image">
                    <img src={img4} alt="team" />
                  </div>
                  <div className="team-content text-center p-3 bg-theme">
                    <h4 className="mb-0 white">Solden kalos</h4>
                    <p className="mb-0 white">Supervisor</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="col-lg-12 col-md-6 col-sm-12 mb-4">
                <div className="team-list rounded">
                  <div className="team-image">
                    <img src={img3} alt="team" />
                  </div>
                  <div className="team-content text-center p-3 bg-theme">
                    <h4 className="mb-0 white">Nelson Bam</h4>
                    <p className="mb-0 white">Quality Assurance</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="col-lg-12 col-md-6 col-sm-12 mb-4">
                <div className="team-list rounded">
                  <div className="team-image">
                    <img src={img5} alt="team" />
                  </div>
                  <div className="team-content text-center bg-theme p-3">
                    <h4 className="mb-0 white">Cacics Coold</h4>
                    <p className="mb-0 white">Asst. Manager</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          {/* </div> */}
          
        </div>
        
      </div>
    </section>
  );
}

export default OurTeam;
