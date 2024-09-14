/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react'

import img1 from '../images/trending/trendingb-2.jpg'
import img2 from '../images/trending/trending-large.jpg'
import img3 from '../images/trending/trendingb-1.jpg'
import img4 from '../images/trending/trending1.jpg'
import img5 from '../images/trending/trending2.jpg'
import img6 from '../images/trending/trending3.jpg'
import img7 from '../images/trending/trending4.jpg'
import { Link } from 'react-router-dom'
import { MyAPI, MyError } from '../MyAPI'

function TopDeals() {
  const [blogs, setBlogs] = useState([])

  const fetchBlogs = async () => {
    try {
      let res = await MyAPI.GET('/activeBlogs')
      let { success, message, error, data } = res.data || res
      console.log(res.data)
      if (success) {
        setBlogs(data)
      } else {
        MyError.error(message || error || 'API Error.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ')
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...'
    }
    return text
  }

  function formatDate(dateString) {
    const date = new Date(dateString)
    const today = new Date()

    // Calculate the difference in time
    const timeDifference = today - date

    // Convert time difference from milliseconds to days
    const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

    if (dayDifference >= 0 && dayDifference <= 6) {
      return `${dayDifference + 1} days old`
    } else {
      // Format the date as "6 July"
      const options = { day: 'numeric', month: 'long' }
      return date.toLocaleDateString('en-GB', options)
    }
  }

  return (
    <section className="trending pb-0 pt-6 top-deals-bg-img">
      <div className="container">
        <div className="section-title mb-6 w-75 mx-auto text-center">
          {/* <h4 className="mb-1 theme1">Top Deals</h4> */}
          <h2 className="mb-1">
            Latest <span className="theme">Blogs</span>
          </h2>
          {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore.
          </p> */}
        </div>
        <div className="trend-box">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                {blogs &&
                  blogs.length > 0 &&
                  blogs.map(
                    (item, index) =>
                      index <= 2 && (
                        <div className="col-lg-4 col-md-4 mb-4">
                          <div className="trend-item rounded box-shadow">
                            <div className="trend-image position-relative">
                              <img src={item.coverImage} alt="image" className="" />
                              <div className="color-overlay"></div>
                            </div>
                            <div className="trend-content p-4 pt-5 position-relative bg-white">
                              <div className="trend-meta bg-theme white px-3 py-2 rounded">
                                <div className="entry-author">
                                  <i className="icon-calendar"></i>
                                  <span className="fw-bold">
                                    &nbsp; {formatDate(item.createdAt)}
                                  </span>
                                </div>
                              </div>
                              <h5 className="theme mb-1">
                                {/* <i className="flaticon-location-pin"></i> Spain */}
                              </h5>
                              <h3 className="mb-1">
                                <Link to={`/blog/${item._id}`}>{truncateText(item.title, 8)}</Link>
                              </h3>
                              <div className="rating-main d-flex align-items-center pb-2">
                                <div className="rating">
                                  <span className="fa fa-star checked"></span>
                                  <span className="fa fa-star checked"></span>
                                  <span className="fa fa-star checked"></span>
                                  <span className="fa fa-star checked"></span>
                                  <span className="fa fa-star checked"></span>
                                </div>
                                <span className="ms-2">(21)</span>
                              </div>
                              {/* <p className=" border-b pb-2 mb-2">
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum
                      </p> */}
                              {/* <div className="entry-meta">
                                <div className="entry-author d-flex align-items-center">
                                  <p className="mb-0">
                                    <span className="theme fw-bold fs-5"> Author</span> | John Smith
                                  </p>
                                </div>
                              </div> */}
                            </div>
                          </div>
                        </div>
                      ),
                  )}
                {blogs && blogs.length === 0 && <h5>Blogs Not Found.</h5>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TopDeals
