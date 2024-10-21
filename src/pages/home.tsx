import Supporters from '../components/supporters';
import Header from '../components/header';
import News from '../components/news';
import HomePageCarousel from '../components/homePageCarousel';

function Home() {
    return (
        <div className="center" id="home-page">
            <Header />
            <News />
            <HomePageCarousel />
            <hr />
            <Supporters />
        </div>
    );
}

export default Home;
