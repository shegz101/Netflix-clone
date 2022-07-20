import React from 'react';
import Banner from './Banner';
import Category from './Category';
import Header from './Header';
import request_data from '../api/request_data';
import Footer from './Footer';

const HomePage = () => {
    return (
        <div className="home">
            <Header/>
            <Banner/>
            <Category heading={'Trending Movies'} url={request_data.Trending}/>
            <Category heading={'TopRated Movies'} url={request_data.TopRated}/>
            <Category heading={'Netflix Originals'} url={request_data.NetflixOriginals}/>
            <Category heading={'Animation'} url={request_data.Animation}/>
            <Category heading={'Action Movies'} url={request_data.Action}/>
            <Category heading={'War Movies'} url={request_data.War}/>
            <Category heading={'Comedy'} url={request_data.Comedy}/>
            <Category heading={'Romance Movies'} url={request_data.Romance}/>
            <Category heading={'History '} url={request_data.History}/>
            <Category heading={'Adventure'} url={request_data.Adventure}/>
            <Category heading={'Horror Movies'} url={request_data.Horror}/>
            <Category heading={'Documentaries'} url={request_data.Documentaries}/>
            <Footer/>
        </div>
    )
}

export default HomePage;