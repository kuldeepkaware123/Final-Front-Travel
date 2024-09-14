import React, { useEffect, useState } from 'react'
import { CiLocationOn } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import { Spinner } from 'react-bootstrap' // Import Spinner for loading indicator
import { MyAPI, MyError } from '../MyAPI'
import travelPng from '../images/my-img/img_1.png'

function Banner() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false) // State for loading indicator

  const fetchFilterPackages = async () => {
    try {
      setLoading(true) // Set loading to true before fetching
      let payload = {
        searchQuery,
      }
      let res = await MyAPI.POST('/public/filterPackages', payload)
      let { success, message, error, packages } = res.data || res
      if (success) {
        const filteredDestinations = packages.filter(
          (destination) => !destination.isPrivate && destination.status === 'active',
        )
        setSearchResults(filteredDestinations)
      } else {
        MyError.error(message || error || 'Server Error. Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    } finally {
      setLoading(false) // Set loading to false after fetching
    }
  }

  useEffect(() => {
    if (searchQuery) {
      fetchFilterPackages()
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  return (
    <section
      className="banner pt-10 pb-0 overflow-hidden banner-background-image-n"
      style={{ minHeight: '90vh', position: 'relative' }}
    >
      <div className="container">
        <div className="banner-in">
          <div className="row align-items-center justify-content-center text-center">
            <div className="col-lg-8 mb-4">
              <div className="banner-content text-lg-start text-center">
                <h4 className="text-white mt-8 text-center">Explore The Richness Of Purulia</h4>
                <h1 className="text-center text-white">Start Planning Your Dream Trip Today!</h1>
                {/* <p className="mb-4 text-center text-white">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore
                </p> */}
                <div className="book-form">
                  <div className="row d-flex align-items-center justify-content-between">
                    <div
                      className="col-lg-12 blur border shadow overflow-hidden"
                      style={{ borderRadius: '12px' }}
                    >
                      <div
                        style={{ borderRadius: '12px' }}
                        className="form-group mb-0 text-center gap-2 py-0 d-flex align-items-center justify-content-between"
                      >
                        <CiLocationOn size={28} color="#fff" />
                        <input
                          type="text"
                          className="n-banner-input"
                          placeholder="Where are you going?"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                    {loading && ( // Display loading spinner if fetching data
                      <div className="col-lg-12 text-center mt-2">
                        <Spinner animation="border" variant="primary" />
                      </div>
                    )}
                    {!loading &&
                      searchResults.length === 0 &&
                      searchQuery && ( // Show message if no results
                        <p className="col-lg-12 text-white mt-2">No packages found.</p>
                      )}
                    {searchQuery && searchResults.length > 0 && (
                      <ul
                        className="col-lg-12 blur border shadow overflow-hidden m-0 p-0 mt-2"
                        style={{
                          borderRadius: '7px',
                          maxHeight: '120px',
                          overflowY: 'auto',
                          listStyle: 'none',
                        }}
                      >
                        {searchResults.map((result, index) => (
                          <Link key={index} to={`/package/${result._id}`}>
                            <li className="search-result-item w-100 border border-bottom border-white py-1 px-2 text-white cursor-pointer ps-2">
                              {result.title || 'Title Not Found.'}
                            </li>
                          </Link>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="banner-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
    </section>

  )
}

export default Banner
