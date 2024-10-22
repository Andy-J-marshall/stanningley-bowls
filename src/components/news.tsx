import { Row } from 'react-bootstrap';
import agmImage from '../images/news/agm-2024.png';
import ladiesTeamImage from '../images/news/ladies-team.png';
import volunteeringImage from '../images/news/volunteering.png';
import NewsItem from './newsItem';

function News() {
    return (
        <div id="news">
            <h1>LATEST NEWS</h1>
            <Row xs={1} sm={1} md={3} lg={3} className="g-4 align-items-start">
                <NewsItem
                    title="AGM DATE"
                    firstParagraph="The 2024 AGM will be at 11am on the 9th November at Stanningley Park Bowling Club. If you have any proposals then contact a member of the committee before the 6th November."
                    imgSrc={agmImage}
                />
                <NewsItem
                    title="VOLUNTEERING"
                    firstParagraph="Volunteer days are planned to help keep the club clean and tidy over winter. Regular volunteer days are planed every other Saturday between 10am and 12pm. Members and non-members are welcome to help out."
                    imgSrc={volunteeringImage}
                />
                <NewsItem
                    title="LADIES TEAM"
                    firstParagraph="We are looking to enter a team into the Leeds Ladies League for the 2025 season. If you are interested in playing then please contact a club member. No experience is necessary."
                    imgSrc={ladiesTeamImage}
                />
            </Row>
        </div>
    );
}

export default News;
