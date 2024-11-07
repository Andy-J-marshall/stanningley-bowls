import { useEffect } from 'react';
import Supporters from '../components/supporters';
import Header from '../components/header';
import News from '../components/news';
import HomePageCarousel from '../components/homePageCarousel';

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
