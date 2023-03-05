import '../styles/Pictorial.css';
import Tv from '../images/tv.png';
import Eleven from '../images/phone.png';
// import Kids from "../images/kids.png";

const Pictorial = () => {
    return ( 
        <div className='pictorial__section'>
            <div className="describe__movie">
                <div className='text-div'>
                    <h1 className="main_text" style={{paddingBottom: '25px'}}>Enjoy on your TV.</h1>
                    <p className="pictorial_text">Watch on smart TVs, Playstations, Xbox, Chromecast, Apple TV, Blu-ray players and more.</p>
                </div>
                <div className='image-div'>
                    <img className='the_image'  src={Tv} alt='sample_video'/>
                </div>
            </div>

            <div className="describe__movie second_movie">
                <div className='image-div'>
                    <img className='the_image'  src={Eleven} alt='sample_video'/>
                </div>
                <div className='text-div'>
                    <h1 className="main_text" style={{paddingBottom: '25px'}}>Download your programmes and movies to watch on the go.</h1>
                    <p className="pictorial_text">save your data and watch all your favourites offline.</p>
                </div>
            </div>

            <div className="describe__movie">
                <div className='text-div'>
                    <h1 className="main_text" style={{paddingBottom: '25px'}}>Watch Everywhere.</h1>
                    <p className="pictorial_text">Stream unlimited films and TV programmes on your phone, tablet, laptop and TV without paying more.</p>
                </div>
                <div className='image-div'>
                    <img className='the_image'  src={Eleven} alt='sample_video'/>
                </div>
            </div>

            {/* <div className="describe__movie">
                <div className='image-div'>
                    <img style={{marginLeft:'100px', marginRight: 'auto'}} src={Kids} alt='sample_video'/>
                </div>
                <div className='text-div'>
                    <h1 style={{paddingBottom: '25px'}}>Create profiles for kids.</h1>
                    <p>Send kids on adventures with their favorite characters in a space made just for them—free with your membership.</p>
                </div>
            </div> */}
        </div>
     );
}
 
export default Pictorial;