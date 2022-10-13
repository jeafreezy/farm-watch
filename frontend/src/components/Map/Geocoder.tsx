import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const Geocoder = () => {
    return (
        <div className="absolute top-4 left-4 flex items-center justify-between rounded-lg border-none bg-brand-black p-3 font-semibold text-brand-white opacity-90 hover:opacity-100  ">
            <input
                placeholder="Search location"
                className=" bg-brand-black p-1  outline-none"
                type="search"
            ></input>
            <span className="cursor-pointer">
                <AiOutlineSearch size={20} />
            </span>
        </div>
    );
};

export default Geocoder;
