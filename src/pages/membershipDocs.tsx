import { useEffect } from 'react';

function MembershipDocs() {
    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <div id="member-docs" className="center page-component">
            <h1>membership documents</h1>
            <p>Find the membership documents</p>
        </div>
    );
}

export default MembershipDocs;
