import { useEffect } from 'react';
import { config } from '../config';

function MembershipDocs() {
    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <div id="member-docs" className="center page-component">
            <h1>membership documents</h1>
            <p>Find the membership documents</p>
            <a
                href="https://drive.google.com/file/d/16t4A7AfzcBtd4s9TEEXvKuHFCoPYuakQ/view?usp=drive_link"
                download
            >
                BCGBA Membership Registration Form
            </a>
            <a
                href="https://drive.google.com/file/d/172jIyfEniiobeIV9VaLJjTTmY3ShafIQ/view?usp=drive_link"
                download
            >
                {config.teamNames.shortName} Registration Form
            </a>
            <a
                href="https://drive.google.com/file/d/17-JRHQfRHVJxphj8cDQhsx6pFdMh7u5o/view?usp=drive_link"
                download
            >
                {config.teamNames.shortName} Constitution
            </a>
            <a
                href="https://drive.google.com/file/d/16kUu4uQ9X9ScvPTap4fRJRT8w28uqIQc/view?usp=drive_link"
                download
            >
                Code of Conduct
            </a>
            <a
                href="https://drive.google.com/file/d/16vxyxvAqPH311HK6_5zQ0dRW5zfweB7N/view?usp=drive_link"
                download
            >
                Safeguarding Policy
            </a>
            <a href="https://www.bcgba.org.uk/laws-of-the-game/">
                Crown Green Bowling Rules
            </a>
        </div>
    );
}

export default MembershipDocs;
