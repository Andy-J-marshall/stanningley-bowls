import { useEffect } from 'react';
import { config } from '../config';
import { ListGroup } from 'react-bootstrap';

function MembershipDocs() {
    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <div id="member-docs" className="center page-component">
            <h1>membership documents</h1>
            <ListGroup>
                <ListGroup.Item>
                    <a
                        target="_blank"
                        href="https://drive.google.com/file/d/16t4A7AfzcBtd4s9TEEXvKuHFCoPYuakQ/view?usp=drive_link"
                        download
                    >
                        BCGBA Membership Registration Form
                    </a>
                </ListGroup.Item>
                <ListGroup.Item>
                    <a
                        target="_blank"
                        href="https://drive.google.com/file/d/17-JRHQfRHVJxphj8cDQhsx6pFdMh7u5o/view?usp=drive_link"
                        download
                    >
                        {config.teamNames.shortName} Constitution
                    </a>
                </ListGroup.Item>
                <ListGroup.Item>
                    <a
                        target="_blank"
                        href="https://drive.google.com/file/d/16kUu4uQ9X9ScvPTap4fRJRT8w28uqIQc/view?usp=drive_link"
                        download
                    >
                        Code of Conduct
                    </a>
                </ListGroup.Item>
                <ListGroup.Item>
                    <a
                        target="_blank"
                        href="https://drive.google.com/file/d/16vxyxvAqPH311HK6_5zQ0dRW5zfweB7N/view?usp=drive_link"
                        download
                    >
                        Safeguarding Policy
                    </a>
                </ListGroup.Item>
                <ListGroup.Item>
                    <a
                        target="_blank"
                        href="https://www.bcgba.org.uk/laws-of-the-game/"
                    >
                        Crown Green Bowling Rules
                    </a>
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}

export default MembershipDocs;
