import '../styles/Pictorial.css';
import Tv from '../images/tv.png';
import Eleven from '../images/mov.png';

const Pictorial = () => {
    return ( 
        <div className='pictorial__section'>
            <div className="describe__movie">
                <div className='text-div'>
                    <h1 style={{paddingBottom: '25px'}}>Enjoy on your TV.</h1>
                    <p>Watch on smart TVs, Playstations, Xbox, Chromecast, Apple TV, Blu-ray players and more.</p>
                </div>
                <div className='image-div'>
                    <img  src={Tv} alt='sample_video'/>
                </div>
            </div>

            <div className="describe__movie">
                <div className='image-div'>
                    <img style={{marginLeft:'100px', marginRight: 'auto'}} src={Eleven} alt='sample_video'/>
                </div>
                <div className='text-div'>
                    <h1 style={{paddingBottom: '25px'}}>Download your programmes and movies to watch on the go.</h1>
                    <p>save your data and watch all your favourites offline.</p>
                </div>
            </div>

            <div className="describe__movie">
                <div className='text-div'>
                    <h1 style={{paddingBottom: '25px'}}>Watch Everywhere.</h1>
                    <p>Stream unlimited films and TV programmes on your phone, tablet, laptop and TV without paying more.</p>
                </div>
                <div className='image-div'>
                    <img style={{marginLeft:'auto', marginRight: 'auto'}} src={Eleven} alt='sample_video'/>
                </div>
            </div>
        </div>
     );
}
 
export default Pictorial;