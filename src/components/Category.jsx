import React, { useEffect, useState } from "react";
import axios_fetch from "../api/axios_fetch";
import "../styles/Category.css";
import Card from "./Card";

const Category = ({ heading, url }) => {
  const [moviecategory, setMovieCategory] = useState([]);

  const fetch_movie_category = async () => {
    const resp = await axios_fetch.get(`${url}`);
    setMovieCategory(resp.data.results);
    // console.log(resp.data.results);
  };

  useEffect(() => {
    fetch_movie_category();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="category-section">
      <p
        className="heading-info"
        style={{ color: "white", paddingLeft: "10px" }}
      >
        {heading}
      </p>
      <div className="image-crop">
        {moviecategory.map((movie) => (
          <Card movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Category;
