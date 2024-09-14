import React, { useEffect, useState } from "react";

// import aboutusImg1 from "../images/travel1.png";
import aboutusImg1 from "../images/my-img/img_2.png";
import aboutusImg2 from "../images/travel1.png";
import aboutusImg3 from "../images/travel1.png";

function KnowUs() {
  const [counter, setCounter] = useState(1);
  const [counter1, setCounter1] = useState(1);
  const [counter2, setCounter2] = useState(1);
  const [counter3, setCounter3] = useState(1);

  useEffect(() => {
    let currentCount = 1;
    const intervalId = setInterval(() => {
      if (currentCount < 20) {
        currentCount++;
        setCounter(currentCount);
      } else {
        clearInterval(intervalId);
      }
    }, 150); // Adjust interval for smoother animation

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + 3000; // 3 seconds
    const increment = 529 / 3000; // Increment per millisecond

    const intervalId = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed < 3000) {
        setCounter1(Math.ceil(increment * elapsed + 1));
      } else {
        // setCounter(530); // Ensure counter reaches 530 exactly after 3 seconds
        clearInterval(intervalId);
      }
    }, 1); // Update every millisecond

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + 3000; // 3 seconds
    const increment = 850 / 3000; // Increment per millisecond

    const intervalId = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed < 3000) {
        setCounter2(Math.ceil(increment * elapsed + 1));
      } else {
        // setCounter(530); // Ensure counter reaches 530 exactly after 3 seconds
        clearInterval(intervalId);
      }
    }, 1); // Update every millisecond

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + 3000; // 3 seconds
    const increment = 320 / 3000; // Increment per millisecond

    const intervalId = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed < 3000) {
        setCounter3(Math.ceil(increment * elapsed + 1));
      } else {
        // setCounter(530); // Ensure counter reaches 530 exactly after 3 seconds
        clearInterval(intervalId);
      }
    }, 1); // Update every millisecond

    return () => clearInterval(intervalId);
  }, []);
  return (
    <section className="about-us pt-0 home-about-us-bg-img-1">
      <div className="container">
        <div className="about-image-box">
          <div className="row d-flex align-items-center justify-content-between">
            <div className="col-lg-6 mb-4 pe-4">
              <div className="about-image overflow-hidden">
                <img src={aboutusImg1} alt="" />
              </div>
            </div>
            <div className="col-lg-6 mb-4 ps-4">
              <div className="about-content text-center text-lg-start mb-4">
                <h4 className="theme d-inline-block mb-0">Get To Know Us</h4>
                <h2 className="border-b mb-2 pb-1">
                  Explore All Tour of the world with us.
                </h2>
                <p className="border-b mb-2 pb-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                  <br />
                  <br />
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
                </p>
                <div className="about-listing">
                  <ul className="d-flex justify-content-between">
                    <li>
                      <i className="icon-location-pin theme"></i> Tour Guide
                    </li>
                    <li>
                      <i className="icon-briefcase theme"></i> Friendly Price
                    </li>
                    <li>
                      <i className="icon-folder theme"></i> Reliable Tour
                      Package
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-12 mt-4">
              {/* <!-- Counter --> */}
              <div className="counter-main w-75 float-end">
                <div className="counter p-4 pb-0 box-shadow bg-white rounded">
                  <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                      <div className="counter-item border-end pe-4">
                        <div className="counter-content">
                          <h2 className="value mb-0 theme">{counter}</h2>
                          <span className="m-0">Years Experiences</span>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                      <div className="counter-item border-end pe-4">
                        <div className="counter-content">
                          <h2 className="value mb-0 theme">{counter1}</h2>
                          <span className="m-0">Tour Packages</span>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                      <div className="counter-item border-end pe-4">
                        <div className="counter-content">
                          <h2 className="value mb-0 theme">{counter2}</h2>
                          <span className="m-0">Happy Customers</span>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                      <div className="counter-item">
                        <div className="counter-content">
                          <h2 className="value mb-0 theme">{counter3}</h2>
                          <span className="m-0">Award Winning</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- End Counter --> */}
            </div>
          </div>
        </div>
      </div>
      <div className="white-overlay"></div>
    </section>
  );
}

export default KnowUs;
