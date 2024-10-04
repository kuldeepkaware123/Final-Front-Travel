import React, { useEffect, useState } from 'react';
import Header from '../components1/Header';
import Footer from '../components1/Footer';
import WhatsAppHelp from '../components1/WhatsAppHelp';
import { Link, useParams } from 'react-router-dom';
import { MyAPI, MyError, truncateText } from '../MyAPI';
import '../css/offerTag.css';
import EnquiryButton from '../components1/EnquiryButton';

function TourPackage() {
  const [allPackages, setAllPackages] = useState([]);
  const [hotel, setHotel] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState(null);
  const [filter, setFilter] = useState('packages'); // Filter state to switch between packages and hotels

  const fetchPackages = async () => {
    setLoading(true);
    try {
      let res = await MyAPI.GET(`/public/packages/${id}`);
      let { success, message, error, data } = res.data || res;
      if (success) {
        const filteredDestinations = data.packages.filter(
          (destination) => !destination.isPrivate && destination.status === 'active',
        );
        setAllPackages(filteredDestinations);
        setDestination(data.destination);
      } else {
        MyError.error(message || error || 'Server Error Please try again later');
      }
    } catch (error) {
      MyError.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchHotel = async () => {
    try {
      let res = await MyAPI.GET(`/hotelByDestination/${id}`);
      let { success, message, error, data } = res.data || res;
      if (success) {
        setHotel(data);
      } else {
        MyError.error(message || error || 'Server Error Please try again later');
      }
    } catch (error) {
      MyError.error(error.message);
    }
  };

  useEffect(() => {
    setAllPackages([]);
    fetchPackages();
    fetchHotel();
  }, [id]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <Header />
   
      <section
        className="breadcrumb-main pb-20 pt-14"
        style={{
          backgroundImage: 'url(https://htmldesigntemplates.com/html/travelin/images/bg/bg1.jpg)',
        }}
      >
        <div
          className="section-shape section-shape1 top-inherit bottom-0"
          style={{
            backgroundImage: 'url(https://htmldesigntemplates.com/html/travelin/images/shape8.png)',
          }}
        ></div>
        <div className="breadcrumb-outer">
          <div className="container">
            <div className="breadcrumb-content text-center">
              <h1 className="mb-3">
                {destination ? `${destination.name} Packages` : 'Loading....'}{' '}
              </h1>
              <nav aria-label="breadcrumb" className="d-block">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="#">
                      {' '}
                      <span style={{ color: 'var(--secondary-color)' }}>Home</span>{' '}
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {destination ? `${destination.name}` : 'Loading....'}
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="dot-overlay"></div>
      </section>

      <section className="trending pt-6 pb-0 bg-lgrey">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="list-results d-flex align-items-center justify-content-between">
                <div className="list-results-sort">
                  <p className="m-0">
                    Showing {filter === 'packages' ? allPackages.length : hotel.length} results
                  </p>
                </div>
                <div className="click-menu d-flex align-items-center">
                  {/* Filter Dropdown */}
                  <select className="niceSelect" onChange={handleFilterChange} value={filter}>
                    <option value="packages">Packages</option>
                    <option value="hotels">Hotels</option>
                  </select>
                </div>
              </div>

              {/* Display Packages or Hotels based on the filter */}
              <div className="row">
                {filter === 'packages' ? (
                  allPackages.length > 0 ? (
                    allPackages.map((item, index) => (
                      <div key={index} className="col-lg-4 col-md-4 mb-4">
                        <Link to={`/package/${item._id}`}>
                          <div className="trend-item rounded box-shadow">
                            <div className="trend-image position-relative">
                              <img
                                loading="lazy"
                                src={item.galleryImages[0]}
                                alt="Package image"
                                style={{ maxHeight: '40vh', objectFit: 'cover' }}
                              />
                              <div className="color-overlay"></div>
                            </div>
                            <div className="trend-content p-4 pt-5 position-relative">
                              <h5 className="theme mb-1">
                                {item.destination.map((d) => `${d.name}, `)}
                              </h5>
                              <h3>{truncateText(item.title, 7)}</h3>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div className="text-center">
                      <h3>No Packages Found</h3>
                    </div>
                  )
                ) : (
                  hotel.length > 0 ? (
                    hotel.map((item, index) => (
                      <div key={index} className="col-lg-4 col-md-4 mb-4">
                        <Link to={`/hotel/${item._id}`}>
                          <div className="trend-item rounded box-shadow">
                            <div className="trend-image position-relative">
                              <img
                                loading="lazy"
                                src={item.galleryImages[0]}
                                alt="Hotel image"
                                style={{ maxHeight: '40vh', objectFit: 'cover' }}
                              />
                              <div className="color-overlay"></div>
                            </div>
                            <div className="trend-content p-4 pt-5 position-relative">
                              <h5 className="theme mb-1">{item.title}</h5>
                              <p>{item.description}</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div className="text-center">
                      <h3>No Hotels Found</h3>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppHelp />
    </>
  );
}

export default TourPackage;
