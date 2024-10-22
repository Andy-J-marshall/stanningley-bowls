import Supporters from '../components/supporters';
import Header from '../components/header';
import News from '../components/news';
import HomePageCarousel from '../components/homePageCarousel';

function Home() {
    return (
        <div className="center" id="home-page">
            <Header />
            <div style={{ width: '94%' }} className="center">
                <HomePageCarousel />
                <br />
                <News />
                <br />
                <Supporters />
            </div>
        </div>
    );
}

export default Home;
