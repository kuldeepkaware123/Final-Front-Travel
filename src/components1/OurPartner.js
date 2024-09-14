import React from 'react'

import img1 from '../images/cl-5.png';
import img2 from '../images/cl-2.png';
import img3 from '../images/cl-3.png';
import img4 from '../images/cl-4.png';
import img5 from '../images/cl-5.png';
import img6 from '../images/cl-4.png';
import img7 from '../images/cl-3.png';
import img8 from '../images/cl-2.png';

function OurPartner() {
  return (
    <div className="our-partner p-0">
    <div className="container">
        <div className="partners_inner">
            <ul>
                <li><img src={img1} alt="" /></li>
                <li><img src={img2} alt="" /></li>
                <li><img src={img3} alt="" /></li>
                <li><img src={img4} alt="" /></li>
                <li><img src={img5} alt="" /></li>
                <li><img src={img6} alt="" /></li>
                <li><img src={img7} alt="" /></li>
                <li><img src={img8} alt="" /></li>
            </ul>
        </div>
    </div>
</div>
  )
}

export default OurPartner