import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function CarouselComponent({ animeData }) {
  return (
    <Carousel
      showArrows={true}
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
      autoPlay={true}
      interval={3000}
      className="mb-5 relative"
    >
      {animeData.map((anime) => (
        <div
          key={anime.id}
          className="relative h-96"
          style={{
            backgroundImage: `url(${anime.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '500px',
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-60 text-white">
            <h1 className="text-xl font-semibold text-center">{anime.name}</h1>
            <p className="text-gray-300 mb-4">{anime.descript}</p>
          </div>
        </div>
      ))}
    </Carousel>
  );
}

export default CarouselComponent;
