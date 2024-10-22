import Supporters from '../components/supporters';
import Header from '../components/header';
import News from '../components/news';
import HomePageCarousel from '../components/homePageCarousel';

// TODO issue with width
function Home() {
    return (
        <div className="center" id="home-page">
            <Header />
            <HomePageCarousel />
            <br />
            <News />
            <br />
            <Supporters />
        </div>
    );
}

export default Home;
