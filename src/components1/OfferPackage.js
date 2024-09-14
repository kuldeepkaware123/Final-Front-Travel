/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";

import img1 from "../images/trending/trending3.jpg";
import img2 from "../images/trending/trending1.jpg";
import img3 from "../images/trending/trending2.jpg";

function OfferPackage() {
  return (
    <section className="trending pb-0 pt-4">
      <div className="container">
        <div className="section-title mb-6 w-75 mx-auto text-center">
          <h4 className="mb-1 theme1">Top Offers</h4>
          <h2 className="mb-1">
            Special <span className="theme">Offers & Discount </span> Packages
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore.
          </p>
        </div>
        <div className="trend-box">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6 mb-4">
              <div className="trend-item rounded box-shadow bg-white">
                <div className="trend-image position-relative">
                  <img src={img1} alt="image" className="" />
                  <div className="ribbon ribbon-top-left">
                    <span className="fw-bold">20% OFF</span>
                  </div>
                  <div className="color-overlay"></div>
                </div>
                <div className="trend-content p-4 pt-5 position-relative">
                  <div className="trend-meta bg-theme white px-3 py-2 rounded">
                    <div className="entry-author">
                      <i className="icon-calendar"></i>
                      <span className="fw-bold"> 9 Days Tours</span>
                    </div>
                  </div>
                  <h5 className="theme mb-1">
                    <i className="flaticon-location-pin"></i> Croatia
                  </h5>
                  <h3 className="mb-1">
                    <a href="tour-grid.html">Piazza Castello</a>
                  </h3>
                  <div className="rating-main d-flex align-items-center pb-2">
                    <div className="rating">
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                    </div>
                    <span className="ms-2">(12)</span>
                  </div>
                  <p className=" border-b pb-2 mb-2">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum
                  </p>
                  <div className="entry-meta">
                    <div className="entry-author d-flex align-items-center">
                      <p className="mb-0">
                        <span className="theme fw-bold fs-5"> $170.00</span> | Per
                        person
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mb-4">
              <div className="trend-item box-shadow rounded bg-white">
                <div className="trend-image position-relative">
                  <img src={img2} alt="image" />
                  <div className="ribbon ribbon-top-left">
                    <span className="fw-bold">30% OFF</span>
                  </div>
                  <div className="color-overlay"></div>
                </div>
                <div className="trend-content p-4 pt-5 position-relative">
                  <div className="trend-meta bg-theme white px-3 py-2 rounded">
                    <div className="entry-author">
                      <i className="icon-calendar"></i>
                      <span className="fw-bold"> 9 Days Tours</span>
                    </div>
                  </div>
                  <h5 className="theme mb-1">
                    <i className="flaticon-location-pin"></i> Greece
                  </h5>
                  <h3 className="mb-1">
                    <a href="tour-grid.html">Santorini, Oia</a>
                  </h3>
                  <div className="rating-main d-flex align-items-center pb-2">
                    <div className="rating">
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                    </div>
                    <span className="ms-2">(38)</span>
                  </div>
                  <p className=" border-b pb-2 mb-2">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum
                  </p>
                  <div className="entry-meta">
                    <div className="entry-author d-flex align-items-center">
                      <p className="mb-0">
                        <span className="theme fw-bold fs-5"> $180.00</span> | Per
                        person
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="trend-item box-shadow rounded bg-white">
                <div className="trend-image position-relative">
                  <img src={img3} alt="image" />
                  <div className="ribbon ribbon-top-left">
                    <span className="fw-bold">15% OFF</span>
                  </div>
                  <div className="color-overlay"></div>
                </div>
                <div className="trend-content p-4 pt-5 position-relative">
                  <div className="trend-meta bg-theme white px-3 py-2 rounded">
                    <div className="entry-author">
                      <i className="icon-calendar"></i>
                      <span className="fw-bold"> 9 Days Tours</span>
                    </div>
                  </div>
                  <h5 className="theme mb-1">
                    <i className="flaticon-location-pin"></i> Maldives
                  </h5>
                  <h3 className="mb-1">
                    <a href="tour-grid.html">Hurawalhi Island</a>
                  </h3>
                  <div className="rating-main d-flex align-items-center pb-2">
                    <div className="rating">
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                    </div>
                    <span className="ms-2">(18)</span>
                  </div>
                  <p className=" border-b pb-2 mb-2">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum
                  </p>
                  <div className="entry-meta">
                    <div className="entry-author d-flex align-items-center">
                      <p className="mb-0">
                        <span className="theme fw-bold fs-5"> $260.00</span> | Per
                        person
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OfferPackage;
