import { Row } from 'react-bootstrap';
import NewsItem from './newsItem';
import news1Img from '../../images/news/news-image1.png';
import news2Img from '../../images/news/news-image2.png';
import news3Img from '../../images/news/news-image3.png';

function News() {
    return (
        <div id="news">
            <h1>latest news</h1>
            <Row xs={1} sm={1} md={3} lg={3} className="g-4 align-items-start">
                <NewsItem
                    title="VOLUNTEERING"
                    openingLine="Volunteer days are planned to help keep the club clean and tidy over winter."
                    mainText="These will be every other Saturday between 10am and 12pm, starting on the 19th October. Members and non-members are welcome to help out."
                    imgSrc={news1Img}
                />
                <NewsItem
                    title="LADIES TEAM"
                    openingLine="We are entering a team into the Leeds Ladies League for the 2025 season."
                    mainText="If you are interested in playing then please contact a club member. No experience is necessary."
                    imgSrc={news2Img}
                />
                <NewsItem
                    title="AGM"
                    openingLine="The 2024 AGM was held on the 9th November."
                    mainText="The club has decided to enter the AireWharfe league on a Monday evening instead of the Leeds Combined league.
                    The team captains remain the same as last year, with Nicola Bona being chosen to captain the new ladies team on a Thursday, 
                    and Stuart Potter was voted onto the committee."
                    imgSrc={news3Img}
                />
            </Row>
        </div>
    );
}

export default News;
