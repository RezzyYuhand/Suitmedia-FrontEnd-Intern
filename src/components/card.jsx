import React from 'react'
import { BannerImg } from '../assets'

const card = ({ imageUrl, dateCreated, title}) => {
  return (
    <div className="w-80 h-[23rem] bg-white rounded-xl drop-shadow-xl">
        <div className="rounded-t-xl overflow-hidden">
            <img src={imageUrl} alt="Article" className="w-full h-48 object-cover" />
        </div>
        <div className="px-6 py-5">
            <h6 className="text-gray-500 mt-2">{dateCreated}</h6>
            <h4 className="font-semibold mt-1 overflow-hidden line-clamp-3">{title}</h4>
        </div>
    </div>
  )
}

export default card