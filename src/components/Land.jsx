import React from "react";
import Faq from "./Faq";
import Footer from "./Footer";
import Landing from "./Landing";
import Pictorial from "./Pictorial";

const Land = () => {
    return ( 
        <React.Fragment style={{overflowX: "hidden"}}>
         <Landing/>
         <Pictorial/>
         <Faq/>
         <Footer/>
        </React.Fragment>
     );
}
 
export default Land;