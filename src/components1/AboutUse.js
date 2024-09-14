import React from 'react'

function AboutUse() {
  return (
    <section className="about-us pb-6 pt-6 home-about-us-bg-img">
      <div className="container">
        <div className="section-title mb-6 w-50 mx-auto text-center">
          <h4 className="mb-1 theme1">3 Step of The Perfect Tour</h4>
          <h2 className="mb-1">
            Why <span className="theme">Purulia Travels</span>
          </h2>
          {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore.
          </p> */}
        </div>

        {/* <!-- why us starts --> */}
        <div className="why-us">
          <div className="why-us-box">
            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-2">
                <div className="why-us-item text-center p-4 py-5 border rounded bg-white h-100">
                  <div className="why-us-content">
                    <div className="why-us-icon">
                      <i className="fas fa-map-marked-alt theme"></i>
                    </div>
                    <p className="mt-2">Personalized itineraries, tailored just for you.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-2">
                <div className="why-us-item text-center p-4 py-5 border rounded bg-white h-100">
                  <div className="why-us-content">
                    <div className="why-us-icon">
                      <i className="fas fa-headset theme"></i>
                    </div>
                    <p className="mt-2">Unmatched customer support every step of the way.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-2">
                <div className="why-us-item text-center p-4 py-5 border rounded bg-white h-100">
                  <div className="why-us-content">
                    <div className="why-us-icon">
                      <i className="fas fa-shield-alt theme"></i>
                    </div>
                    <p className="mb-0 mt-2">Safety and security at the forefront.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-2">
                <div className="why-us-item text-center p-4 py-5 border rounded bg-white h-100">
                  <div className="why-us-content">
                    <div className="why-us-icon">
                      <i className="fas fa-tags theme"></i>
                    </div>
                    <p className="mb-0 mt-2">Exclusive offers and deals.</p>
                  </div>
                </div>
              </div>
              {/* <div className="col-lg-2 m-0 p-0 bg-danger col-md-3 col-sm-6 col-12 mb-2">
                <div className="why-us-item text-center p-4 py-5 border rounded bg-white h-100">
                  <div className="why-us-content">
                    <div className="why-us-icon">
                      <i className="fas fa-globe theme"></i>
                    </div>
                    <p className="mb-0 mt-2">Local expertise and expert knowledge.</p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        {/* <!-- why us ends --> */}
      </div>
      <div className="white-overlay"></div>
    </section>
  )
}

export default AboutUse
