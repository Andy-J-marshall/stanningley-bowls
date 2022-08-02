import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

function TeamTabs(props) {
    const id = props.id;
    const allComponent = props.allComponent;
    const team1Component = props.team1Component;
    const team2Component = props.team2Component;
    const team3Component = props.team3Component;
    const team4Component = props.team4Component;

    return (
        <div>
            <Tabs defaultActiveKey="Combined" id={id} className="mb-3 tabs">
                <Tab eventKey="Combined" title="All">
                    {allComponent}
                </Tab>
                <Tab eventKey="Monday" title="Mon">
                    {team1Component}
                </Tab>
                <Tab eventKey="Tuesday" title="Tues">
                    {team2Component}
                </Tab>
                <Tab eventKey="Thursday" title="Thur">
                    {team3Component}
                </Tab>
                <Tab eventKey="Saturday" title="Sat">
                    {team4Component}
                </Tab>
            </Tabs>
        </div>
    );
}

export default TeamTabs;
