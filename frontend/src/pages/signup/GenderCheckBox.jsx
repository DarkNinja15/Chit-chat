import React from 'react'

function GenderCheckBox() {
  return (
    <div className='flex'>
      <div className='form-control'>
        <label className="label gap-2 cursor-pointer">
            <span className='label-text'>Male</span>
            <input type="checkbox" defaultChecked className="checkbox" />
        </label>
      </div>
      <div className='form-control'>
        <label className="label gap-2 cursor-pointer">
            <span className='label-text'>Female</span>
            <input type="checkbox" defaultChecked className="checkbox" />
        </label>
      </div>
    </div>
  )
}

export default GenderCheckBox
