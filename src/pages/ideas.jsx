import React, { useEffect, useState } from 'react'
import { Header, Card } from '../components'
import { NavLink, useNavigate } from 'react-router-dom'
import { BannerImg } from '../assets'
import { fetchIdeas } from '../services/api'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const ideas = () => {
  const pageNumberLocalStorage = localStorage.getItem('pageNumber') || 1;
  const perPageLocalStorage = localStorage.getItem('perPage') || 10;
  const sortByLocalStorage = localStorage.getItem('sortBy') || 'published_at';
  const [scrollPosition, setScrollPosition] = useState(0);
  const [ideasData, setIdeasData] = useState([]);
  const [perPage, setPerPage] = useState(perPageLocalStorage);
  const [sortBy, setSortBy] = useState(sortByLocalStorage);
  const [pageNumber, setPageNumber] = useState(parseInt(pageNumberLocalStorage));
  
  const totalDataCount = 274;
  const startItem = (pageNumber - 1) * perPage + 1;
  const endItem = Math.min(pageNumber * perPage, totalDataCount);
  const totalPages = Math.ceil(totalDataCount / perPage);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const bannerStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${BannerImg})`,
    backgroundSize: 'cover',
    backgroundPositionY: `calc(50% - ${scrollPosition * 0.5}px)`,
    clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)'
  };

  useEffect(() => {
    localStorage.setItem('pageNumber', pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    localStorage.setItem('perPage', perPage);
  }, [perPage]);

  useEffect(() => {
    localStorage.setItem('sortBy', sortBy);
  }, [sortBy]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchIdeas({
          pageNumber: pageNumber,
          pageSize: perPage, 
          sorting: sortBy 
        });
        setIdeasData(data);
        console.log('Fetched Data:', data); 
      } catch (error) {
        console.error('Error fetching ideas:', error); 
      }
    };

    fetchData();
  }, [pageNumber, perPage, sortBy])

  const handlePageChange = (newPageNumber) => {
    setPageNumber(newPageNumber);
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handleFirstPage = () => {
    setPageNumber(1);
  };

  const handleLastPage = () => {
    setPageNumber(totalPages);
  };
  
  return (
    <div>
      <Header />
      <div className="w-full h-auto mt-32">
        <div className="relative overflow-hidden">
          <div className="bg-cover h-[28rem] flex flex-col items-center justify-center text-white mb-5" style={bannerStyle}>
            <h1>Ideas</h1>
            <h4>Where all our great things begin</h4>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 px-40 py-14">
        <div className="flex flex-row justify-between items-center">
          <h5>{`Showing ${startItem}-${endItem} of 274`}</h5>
          <div className="flex flex-row gap-3 items-center">
            <h5>Show per page:</h5>
            <select 
              onChange={(e) => setPerPage(Number(e.target.value))}
              value={perPage} 
              className="border-2 py-2 pr-16 pl-3 border-gray-300 rounded-full">
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
            </select>
            <h5>Sort by:</h5>
            <select 
              onChange={(e) => setSortBy(e.target.value)}
              value={sortBy}
              className="border-2 py-2 pr-10 pl-3 border-gray-300 rounded-full">
                <option value={"published_at"}>Newest</option>
                <option value={"-published_at"}>Oldest</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap gap-[1.8rem] justify-start">
          {ideasData.map(data => (
            <Card
              key={data.id}
              imageUrl={data.medium_image[0]?.url}
              dateCreated={data.created_at}
              title={data.title}
            />
          ))
          }
        </div>
      </div>
      <div className="flex justify-center mt-5 mb-24 gap-3">
        <div className="flex flex-row gap-0">
          <button onClick={handleFirstPage}>
            <MdOutlineKeyboardDoubleArrowLeft />
          </button>
          <button onClick={() => handlePageChange(pageNumber - 1)}>
            <MdOutlineKeyboardArrowLeft />
          </button>
        </div>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`${pageNumber === page ? "bg-primary px-1 py-1 rounded-lg text-white" : "text-black"}`}>
            {page}
          </button>
        ))}
        <div className="flex flex-row gap-0">
          <button onClick={() => handlePageChange(pageNumber + 1)}>
            <MdOutlineKeyboardArrowRight />
          </button>
          <button onClick={handleLastPage}>
            <MdOutlineKeyboardDoubleArrowRight />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ideas