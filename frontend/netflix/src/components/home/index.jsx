import { Box, Card, Typography } from "@mui/material";
import CustomCard from "../card";
import Header from "../header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { movieList } from "../movielist";
import { useEffect, useState } from "react";
import WatchList from "../watchListCard";
function Home() {
  const [data, setData] = useState();
   const fetchMovie = async () => {
    const data = await fetch("http://localhost:5000/watchlist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await data?.json();
    setData(res?.movieList);
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    // autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          height: "100vh",
          overflow: "hidden",
          color: "#fff",
          backgroundImage: `url('https://occ-0-6245-2164.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABVUDQkfDB0cnH73DLvsiQWloGhrsW-fMMrFOAtAqiM5pMvY8b49dO9bSSb8D77l85vpKwpccR4_I9Uyk24KDTrVgvSeueF38LaX9.webp?r=d5a')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Header />
        <Box
          sx={{
            position: "absolute",
            bottom: "40px",
            left: "40px",
            width: "100%",
            backgroundImage: `url('https://occ-0-6245-2164.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABVUDQkfDB0cnH73DLvsiQWloGhrsW-fMMrFOAtAqiM5pMvY8b49dO9bSSb8D77l85vpKwpccR4_I9Uyk24KDTrVgvSeueF38LaX9.webp?r=d5a')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Box>
      </Box>
      <Box sx={{ padding: "20px", background: "black" }}>
        <Typography sx={{ color: "white", textAlign: "left" }}>
          New Released Movie
        </Typography>
        <Box>
          <Slider {...settings}>
            {movieList?.map((val, index) => (
              <CustomCard
                key={index}
                image={val.image}
                title={val.title}
                label={val.label}
                videoUrl={val.videoUrl}
                id={val.id}
                data={data}
                fetchMovie={fetchMovie}
              />
            ))}
          </Slider>
        </Box>
      </Box>

      <Box sx={{ padding: "20px", background: "black" }}>
        <Typography sx={{ color: "white", textAlign: "left" }}>
          Watched Movie
        </Typography>
        <Box>
          <Slider {...settings}>
            {data?.map((val, index) => (
              <WatchList
                key={index}
                image={val.movieImage}
                videoUrl="https://www.youtube.com/embed/YoHD9XEInc0"
              />
            ))}
          </Slider>
        </Box>
      </Box>
    </>
  );
}
export default Home;