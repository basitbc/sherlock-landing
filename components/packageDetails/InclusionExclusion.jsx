import React from 'react';
import Image from 'next/image';
import CheckCircle from '../../public/assets/images/package-details-section/check-circle.svg';
import CrossIcon from '../../public/assets/images/package-details-section/cross-icon.svg';

const InclusionExclusion = ({ inclusion = [], exclusion = [] }) => {
  return (
    <div className='row container'>
      <div className='col-md-6 pe-md-5 package-inclusion'>
        <div className='inclusion'>
          <p className='brandson-bold fs-40-20 black mb-5'>Inclusions</p>
          {Array.isArray(inclusion) &&
            inclusion.map((item, index) => (
              <div key={index} className='d-flex flex-row gap-3 align-items-center mb-5'>
                <Image src={CheckCircle} alt="check icon" width={30} height={30} />
                <span className='brandson-regular fs-24-12 black'>{item}</span>
              </div>
            ))}
        </div>
      </div>

      <div className='col-md-6 ps-md-5 package-exclusion'>
        <div className='exclusion'>
          <p className='brandson-bold fs-40-20 black mb-5'>Exclusions</p>
          {Array.isArray(exclusion) &&
            exclusion.map((item, index) => (
              <div key={index} className='d-flex flex-row gap-3 align-items-center mb-5'>
                <Image src={CrossIcon} alt="cross icon" width={30} height={30} />
                <span className='brandson-regular fs-24-12 black'>{item}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default InclusionExclusion;
