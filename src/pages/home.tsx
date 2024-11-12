import { useEffect } from 'react';
import Supporters from '../components/homePage/supporters';
import Header from '../components/homePage/header';
import News from '../components/homePage/news';
import HomePageCarousel from '../components/homePage/homePageCarousel';

function Home() {
    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <div className="center" id="home-page">
            <Header />
            <div
                style={{ width: '98%', overflowX: 'hidden' }}
                className="center"
            >
                <HomePageCarousel />
                <br />
                <News />
                <br />
                <Supporters />
                <br />
            </div>
        </div>
    );
}

export default Home;
