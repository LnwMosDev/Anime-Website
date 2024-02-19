import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import AnimeDetailPopup from './AnimeDetailPopup';
import { FaSearch } from 'react-icons/fa';
import CarouselComponent from './CarouselComponent';

function AnimeList() {
  const [animeData, setAnimeData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    async function fetchAnimeData() {
      try {
        const response = await axios.get('http://localhost:8080/anime/');
        // const response = await axios.get('http://student.crru.ac.th/641413019/anime/');
        const sortedAnimeData = response.data.sort((a, b) => a.id - b.id);
        setAnimeData(sortedAnimeData);

        const uniqueCategories = [...new Set(sortedAnimeData.map(anime => anime.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching anime data:', error);
      }
    }

    fetchAnimeData();
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 100) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '....';
    }
    return text;
  }

  const filteredAnime = animeData.filter(
    (anime) =>
      (!selectedType || anime.type === selectedType) &&
      (!selectedCategory || anime.category === selectedCategory) &&
      (anime.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        anime.descript.toLowerCase().includes(searchQuery.toLowerCase())||
        anime.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const [filteredAnimeCount, setFilteredAnimeCount] = useState(0);
  // Update the filteredAnimeCount whenever the filteredAnime changes
  useEffect(() => {
    setFilteredAnimeCount(filteredAnime.length);
  }, [filteredAnime]);

  const [shownAnimeCount, setShownAnimeCount] = useState(15);

  return (
    
    <div className="bg-gray-100 max-w-screen p-5 mt-10">

      <CarouselComponent animeData={animeData} />

      {/* <h1 className="text-3xl font-semibold mb-4 flex flex-col items-center bg-red-800">Anime List</h1> */}

      <div className="flex flex-col justify-center bg-red-800 text-white mb-4">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mt-4 mb-4">Anime List</h1>
        </div>
      </div>

      <div className="flex gap-4 mb-5 ">
        <p className='text-blue-600 text-3xl ml-10 font-bold'>2022 Anime |</p>
        <button
          className={`text-gray-600 text-2xl hover:text-blue-500 cursor-pointer ml-0 ${selectedType === null ? 'font-semibold' : ''
            }`}
          onClick={() => setSelectedType(null)}
        >
          All
        </button>
        <button
          className={`text-gray-600 text-2xl hover:text-blue-500 cursor-pointer ${selectedType === 'TV-Series' ? 'font-semibold' : ''
            }`}
          onClick={() => setSelectedType('TV-Series')}
        >
          TV-Series
        </button>
        <button
          className={`text-gray-600 text-2xl hover:text-blue-500 cursor-pointer ${selectedType === 'Movie' ? 'font-semibold' : ''
            }`}
          onClick={() => setSelectedType('Movie')}
        >
          Movie
        </button>
        <button
          className={`text-gray-600 text-2xl hover:text-blue-500 cursor-pointer ${selectedType === 'OVAs' ? 'font-semibold' : ''
            }`}
          onClick={() => setSelectedType('OVAs')}
        >
          OVAs
        </button>

        <div className='relative text-gray-800 ml-auto mr-10 '>
          <input
            type='search'
            name='search'
            placeholder='ค้นหาอนิเมะ...'
            className="bg-white-300 h-10 px-5 pr-10 rounded-full text-xl border border-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type='submit' className='absolute right-0 top-0 mt-3 mr-4'>
            <FaSearch className='text-gray-500' />
          </button>
        </div>
      </div>

      <hr />

      <div className="flex mb-5 ml-10 mt-2 space-x-4">
        <p className="text-lg mb-2 ">เลือกหมวดหมู่</p>
        <div className="relative ">
          <select
            className="px-5 pr-10 text-lg"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

      </div>
      <div className='text-2xl mb-5'>{selectedCategory && (
        <p className="text-gray-600 ml-10">จำนวนเรื่องทั้งหมด: {filteredAnimeCount} เรื่อง</p>
      )}
      </div>

      {/* <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mr-10 ml-10">
        {filteredAnime.map((anime) => (
          <li key={anime.id} className="bg-white p-4 rounded-lg shadow-lg flex flex-col">
            <div className="flex flex-col items-center">
            <img src={anime.img} alt={anime.name} className="w-full h-60 object-cover" />
              <button
                className="text-xl font-semibold mb-2 mt-2 text-blue-500 hover:underline hover:text-blue-600 cursor-pointer"
                onClick={() => setSelectedAnime(anime)} 
              >
                {anime.name}
              </button>
            </div>
            <p className="text-gray-600 mb-4">
              {anime.descript.length > 200
                ? `${anime.descript.slice(0, 200)}...`
                : anime.descript}
            </p>

            <div className="mt-4 text-sm text-gray-500">
              ประเภท: {anime.type}, หมวดหมู่: {anime.category}
            </div>

          </li>
        ))}
      </ul> */}

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5 mx-10">
        {filteredAnime.slice(0, shownAnimeCount).map((anime) => (
          <li key={anime.id} className="bg-white  shadow-lg flex flex-col transition duration-300 transform hover:scale-105">
            <div className="relative group">

              <img src={anime.img2} alt={anime.name} className="w-full h-80 object-cover " />

              <div className="opacity-0 group-hover:opacity-100 absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 text-white transition-opacity">

                <h2 className="text-lg font-semibold text-center m-2"><button
                  className="text-xl font-semibold text-white-500 hover:underline hover:text-white-600 cursor-pointer "
                  onClick={() => setSelectedAnime(anime)}
                >
                  {anime.name}
                </button></h2>
                {anime.type}, {anime.category}
                <p className="text-gray-300 m-2 ">{truncateText(anime.descript, 150)}
                <button
                  className="text-l font-semibold  hover:underline hover:text-white-800 cursor-pointer "
                  onClick={() => setSelectedAnime(anime)}
                >
                  เพิ่มเติม
                </button></p>
              </div>

            </div>
            {/* <button
        className="text-lg mt-2 mx-3 font-semibold text-blue-500 hover:underline hover:text-white-600 cursor-pointer "
        onClick={() => setSelectedAnime(anime)}
      >
        {anime.name}
      </button>
      
      <div className="text-sm text-gray-500 p-3">
      
        ประเภท: {anime.type}, หมวดหมู่: {anime.category}
      </div>
       */}
          </li>
        ))}
      </ul>

      {filteredAnime.length > shownAnimeCount && (
        <div className="flex justify-center mt-5">
          <button
            className="w-full text-lg bg-gray-300 text-gray-800 px-6 py-3  hover:bg-gray-400 transition-colors shadow-md focus:outline-none hover:underline hover:text-white-600 cursor-pointer"
            onClick={() => setShownAnimeCount(prevCount => prevCount + 10)}
          >
            แสดงอนิเมะเพิ่มเติม
          </button>
        </div>
      )}

      {/* Display the popup if an anime is selected */}
      {selectedAnime && (
        <AnimeDetailPopup
          anime={selectedAnime}
          onClose={() => setSelectedAnime(null)} // Close the popup when the close button is clicked
        />
      )}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 w-12 h-12 bg-blue-500 rounded-full text-white flex items-center justify-center transition-opacity opacity-70 hover:opacity-100"
        >
          &#8593;
        </button>
      )}
    </div>

  );
}

export default AnimeList;
