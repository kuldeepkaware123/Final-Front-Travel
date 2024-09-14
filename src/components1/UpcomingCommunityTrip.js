/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { IoLocationSharp, IoTime } from "react-icons/io5";

function UpcomingCommunityTrip() {
    return (
        <div className="container">
            <h3 style={{ fontFamily: 'sans-serif' }}>Upcoming Community Trips</h3>
            <div className='d-flex align-items-center justify-content-center'>
                <div className='n-scroller-design' style={{ width: '80%', overflowX: 'scroll' }}>
                    <div className='d-flex align-items-center justify-content-start gap-2 mb-3' style={{ whiteSpace: 'nowrap' }}>
                        <span className='border border-dark px-4 cursor-pointer' style={{ borderRadius: '25px', paddingTop: '5px', paddingBottom: '5px' }}>Jan 2024</span>
                        <span className='border border-dark px-4 cursor-pointer' style={{ borderRadius: '25px', paddingTop: '5px', paddingBottom: '5px' }}>Feb 2024</span>
                        <span className='border border-dark px-4 cursor-pointer' style={{ borderRadius: '25px', paddingTop: '5px', paddingBottom: '5px' }}>Mar 2024</span>
                        <span className='border border-dark px-4 cursor-pointer' style={{ borderRadius: '25px', paddingTop: '5px', paddingBottom: '5px' }}>Apr 2024</span>
                        <span className='border border-dark px-4 cursor-pointer' style={{ borderRadius: '25px', paddingTop: '5px', paddingBottom: '5px' }}>May 2024</span>
                        <span className='border border-dark px-4 cursor-pointer' style={{ borderRadius: '25px', paddingTop: '5px', paddingBottom: '5px' }}>Jun 2024</span>
                        <span className='border border-dark px-4 cursor-pointer' style={{ borderRadius: '25px', paddingTop: '5px', paddingBottom: '5px' }}>Jul 2024</span>
                        <span className='border border-dark px-4 cursor-pointer' style={{ borderRadius: '25px', paddingTop: '5px', paddingBottom: '5px' }}>Aug 2024</span>
                        <span className='border border-dark px-4 cursor-pointer' style={{ borderRadius: '25px', paddingTop: '5px', paddingBottom: '5px' }}>Sep 2024</span>
                        <span className='border border-dark px-4 cursor-pointer' style={{ borderRadius: '25px', paddingTop: '5px', paddingBottom: '5px' }}>Oct 2024</span>
                        <span className='border border-dark px-4 cursor-pointer' style={{ borderRadius: '25px', paddingTop: '5px', paddingBottom: '5px' }}>Nov 2024</span>
                        <span className='border border-dark px-4 cursor-pointer' style={{ borderRadius: '25px', paddingTop: '5px', paddingBottom: '5px' }}>Dec 2024</span>
                    </div>
                </div>
            </div>
            <Swiper
            className='mt-3 px-3'
                pagination={true}
                modules={[Navigation, Pagination, Autoplay, Scrollbar, A11y]}
                spaceBetween={15}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                //   navigation={{ nextEl, prevEl }}
                slidesPerView={window.innerWidth > 768 ? 4 : 1 }
                slideFullyVisibleClass={true}
            >
                {/* <div className='row py-3 px-3 gap-2'> */}
                <SwiperSlide>
                    <div className='col-12 col-md-12 rounded-3 border-3 border-white position-relative m-0 p-0' style={{ height: '70vh' }}>
                        <img style={{ width: '100%', height: '100%', borderRadius: '15px', objectFit: 'cover' }} src='https://images.wanderon.in/upcoming-trips/may/manali-leh-srinagar' />
                        <div className='position-absolute top-0 start-0 d-flex align-items-center py-2 px-2 justify-content-between flex-column' style={{ width: '100%', height: '100%',borderRadius: '5px',background: 'linear-gradient(to top, rgba(0, 0, 0, 1) 2%, rgba(0, 0, 0, 0) 100%)'}}>
                            <div className='d-flex align-items-center justify-content-end w-100'>
                                <p className='bg-warning text-black border border-white' style={{borderRadius:'25px',padding:'3px 10px',fontSize:14}}>
                                    <b>₹ 20,000</b> Onwards
                                </p>
                            </div>
                            <div>
                                <p className='text-white'>8 Days Manali Leh Road Trip with Nubra, Turtuk, Pangong</p>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <span style={{fontSize:16,color:'#ffff'}}><IoTime color='#029E9D' /> 7N/8D </span>
                                    <span style={{fontSize:16,color:'#ffff'}}><IoLocationSharp color='#029E9D' /> Delhi-Leh </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='col-12 col-md-12 rounded-3 border-3 border-white position-relative m-0 p-0' style={{ height: '70vh' }}>
                        <img style={{ width: '100%', height: '100%', borderRadius: '15px', objectFit: 'cover' }} src='https://images.wanderon.in/upcoming-trips/may/manali-leh-srinagar' />
                        <div className='position-absolute top-0 start-0 d-flex align-items-center py-2 px-2 justify-content-between flex-column' style={{ width: '100%', height: '100%',borderRadius: '5px',background: 'linear-gradient(to top, rgba(0, 0, 0, 1) 2%, rgba(0, 0, 0, 0) 100%)'}}>
                            <div className='d-flex align-items-center justify-content-end w-100'>
                                <p className='bg-warning text-black border border-white' style={{borderRadius:'25px',padding:'3px 10px',fontSize:14}}>
                                    <b>₹ 20,000</b> Onwards
                                </p>
                            </div>
                            <div>
                                <p className='text-white'>8 Days Manali Leh Road Trip with Nubra, Turtuk, Pangong</p>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <span style={{fontSize:16,color:'#ffff'}}><IoTime color='#029E9D' /> 7N/8D </span>
                                    <span style={{fontSize:16,color:'#ffff'}}><IoLocationSharp color='#029E9D' /> Delhi-Leh </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='col-12 col-md-12 rounded-3 border-3 border-white position-relative  m-0 p-0' style={{ height: '70vh' }}>
                        <img style={{ width: '100%', height: '100%', borderRadius: '15px', objectFit: 'cover' }} src='https://images.wanderon.in/upcoming-trips/may/manali-leh-srinagar' />
                        <div className='position-absolute top-0 start-0 d-flex align-items-center py-2 px-2 justify-content-between flex-column' style={{ width: '100%', height: '100%',borderRadius: '5px',background: 'linear-gradient(to top, rgba(0, 0, 0, 1) 2%, rgba(0, 0, 0, 0) 100%)'}}>
                            <div className='d-flex align-items-center justify-content-end w-100'>
                                <p className='bg-warning text-black border border-white' style={{borderRadius:'25px',padding:'3px 10px',fontSize:14}}>
                                    <b>₹ 20,000</b> Onwards
                                </p>
                            </div>
                            <div>
                                <p className='text-white'>8 Days Manali Leh Road Trip with Nubra, Turtuk, Pangong</p>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <span style={{fontSize:16,color:'#ffff'}}><IoTime color='#029E9D' /> 7N/8D </span>
                                    <span style={{fontSize:16,color:'#ffff'}}><IoLocationSharp color='#029E9D' /> Delhi-Leh </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='col-12 col-md-12 rounded-3 border-3 border-white position-relative m-0 p-0' style={{ height: '70vh' }}>
                        <img style={{ width: '100%', height: '100%', borderRadius: '15px', objectFit: 'cover' }} src='https://images.wanderon.in/upcoming-trips/may/manali-leh-srinagar' />
                        <div className='position-absolute top-0 start-0 d-flex align-items-center py-2 px-2 justify-content-between flex-column' style={{ width: '100%', height: '100%',borderRadius: '5px',background: 'linear-gradient(to top, rgba(0, 0, 0, 1) 2%, rgba(0, 0, 0, 0) 100%)'}}>
                            <div className='d-flex align-items-center justify-content-end w-100'>
                                <p className='bg-warning text-black border border-white' style={{borderRadius:'25px',padding:'3px 10px',fontSize:14}}>
                                    <b>₹ 20,000</b> Onwards
                                </p>
                            </div>
                            <div>
                                <p className='text-white'>8 Days Manali Leh Road Trip with Nubra, Turtuk, Pangong</p>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <span style={{fontSize:16,color:'#ffff'}}><IoTime color='#029E9D' /> 7N/8D </span>
                                    <span style={{fontSize:16,color:'#ffff'}}><IoLocationSharp color='#029E9D' /> Delhi-Leh </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='col-12 col-md-12 rounded-3 border-3 border-white position-relative m-0 p-0' style={{ height: '70vh' }}>
                        <img style={{ width: '100%', height: '100%', borderRadius: '15px', objectFit: 'cover' }} src='https://images.wanderon.in/upcoming-trips/may/manali-leh-srinagar' />
                        <div className='position-absolute top-0 start-0 d-flex align-items-center py-2 px-2 justify-content-between flex-column' style={{ width: '100%', height: '100%',borderRadius: '5px',background: 'linear-gradient(to top, rgba(0, 0, 0, 1) 2%, rgba(0, 0, 0, 0) 100%)'}}>
                            <div className='d-flex align-items-center justify-content-end w-100'>
                                <p className='bg-warning text-black border border-white' style={{borderRadius:'25px',padding:'3px 10px',fontSize:14}}>
                                    <b>₹ 20,000</b> Onwards
                                </p>
                            </div>
                            <div>
                                <p className='text-white'>8 Days Manali Leh Road Trip with Nubra, Turtuk, Pangong</p>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <span style={{fontSize:16,color:'#ffff'}}><IoTime color='#029E9D' /> 7N/8D </span>
                                    <span style={{fontSize:16,color:'#ffff'}}><IoLocationSharp color='#029E9D' /> Delhi-Leh </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='col-12 col-md-12 rounded-3 border-3 border-white position-relative m-0 p-0' style={{ height: '70vh' }}>
                        <img style={{ width: '100%', height: '100%', borderRadius: '15px', objectFit: 'cover' }} src='https://images.wanderon.in/upcoming-trips/may/manali-leh-srinagar' />
                        <div className='position-absolute top-0 start-0 d-flex align-items-center py-2 px-2 justify-content-between flex-column' style={{ width: '100%', height: '100%',borderRadius: '5px',background: 'linear-gradient(to top, rgba(0, 0, 0, 1) 2%, rgba(0, 0, 0, 0) 100%)'}}>
                            <div className='d-flex align-items-center justify-content-end w-100'>
                                <p className='bg-warning text-black border border-white' style={{borderRadius:'25px',padding:'3px 10px',fontSize:14}}>
                                    <b>₹ 20,000</b> Onwards
                                </p>
                            </div>
                            <div>
                                <p className='text-white'>8 Days Manali Leh Road Trip with Nubra, Turtuk, Pangong</p>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <span style={{fontSize:16,color:'#ffff'}}><IoTime color='#029E9D' /> 7N/8D </span>
                                    <span style={{fontSize:16,color:'#ffff'}}><IoLocationSharp color='#029E9D' /> Delhi-Leh </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                
                {/* </div> */}
            </Swiper>

        </div>
    )
}

export default UpcomingCommunityTrip