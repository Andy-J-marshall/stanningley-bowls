import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

function TeamTabs(props) {
    const id = props.id;
    const allComponent = props.allComponent;
    const mondayComponent = props.mondayComponent;
    const tuesdayComponent = props.tuesdayComponent;
    const thursdayComponent = props.thursdayComponent;
    const saturdayComponent = props.saturdayComponent;

    return (
        <div>
            <Tabs defaultActiveKey="Combined" id={id} className="mb-3 tabs">
                <Tab eventKey="Combined" title="All">
                    {allComponent}
                </Tab>
                <Tab eventKey="Monday" title="Mon">
                    {mondayComponent}
                </Tab>
                <Tab eventKey="Tuesday" title="Tues">
                    {tuesdayComponent}
                </Tab>
                <Tab eventKey="Thursday" title="Thur">
                    {thursdayComponent}
                </Tab>
                <Tab eventKey="Saturday" title="Sat">
                    {saturdayComponent}
                </Tab>
            </Tabs>
        </div>
    );
}

export default TeamTabs;
