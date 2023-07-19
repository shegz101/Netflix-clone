import React from "react";
import Header from "./Header";
import "styles/MyList.css";
import SavedList from "./SavedList";

const MyList = () => {
  return (
    <>
      <div className="list_section">
        <Header />
        <div
          style={{
            backgroundColor: "black",
            top: 0,
            left: 0,
            width: "100%",
            position: "fixed",
            opacity: 0.6,
            height: "550px",
          }}
        />
        <div className="listed_trailers">
          <p className="list-page-header">My Trailer Lists</p>
          <p className="list-page-description">
            Welcome to the "My Lists" page, your personalized Trailflix haven.
            Here, you are in full control of your curated trailer collection.
            Add and remove trailers at will, and dive into the excitement by
            watching your most anticipated trailers with just a click. Enjoy a
            seamless experience as you explore the series of trailers you've
            added to your list. Happy watching!
          </p>
        </div>
      </div>
      <SavedList />
    </>
  );
};

export default MyList;
