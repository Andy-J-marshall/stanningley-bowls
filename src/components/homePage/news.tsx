import { Row } from 'react-bootstrap';
import agmImage from '../../images/news/agm-2024.png';
import ladiesTeamImage from '../../images/news/ladies-team.png';
import volunteeringImage from '../../images/news/volunteering.png';
import NewsItem from './newsItem';

function News() {
    return (
        <div id="news">
            <h1>latest news</h1>
            <Row xs={1} sm={1} md={3} lg={3} className="g-4 align-items-start">
                <NewsItem
                    title="VOLUNTEERING"
                    openingLine="Volunteer days are planned to help keep the club clean and tidy over winter."
                    mainText="These will be every other Saturday between 10am and 12pm, starting on the 19th October. Members and non-members are welcome to help out."
                    imgSrc={volunteeringImage}
                />
                <NewsItem
                    title="LADIES TEAM"
                    openingLine="We are looking to enter a team into the Leeds Ladies League for the 2025 season."
                    mainText="If you are interested in playing then please contact a club member. No experience is necessary."
                    imgSrc={ladiesTeamImage}
                />
                <NewsItem
                    title="AGM DATE"
                    openingLine="The 2024 AGM will be at 11am on the 9th November at Stanningley Park Bowling Club."
                    mainText="If you have any proposals then contact a member of the committee before the 6th November."
                    imgSrc={agmImage}
                />
            </Row>
        </div>
    );
}

export default News;
