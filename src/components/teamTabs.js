import { Tabs, Tab } from 'react-bootstrap';

function TeamTabs(props) {
    const id = props.id;
    const allComponent = props.allComponent;
    const team1Component = props.team1Component;
    const team2Component = props.team2Component;
    const team3Component = props.team3Component;
    const team4Component = props.team4Component;
    const team5Component = props.team5Component;
    const team6Component = props.team6Component;

    return (
        <div>
            <Tabs defaultActiveKey="Combined" id={id} className="mb-3 tabs">
                <Tab eventKey="Combined" title="All">
                    {allComponent}
                </Tab>
                <Tab eventKey="Monday" title="Mon">
                    {team1Component}
                </Tab>
                <Tab eventKey="Tuesday Vets" title="Tue (Vets)">
                    {team2Component}
                </Tab>
                <Tab eventKey="Tuesday" title="Tue">
                    {team3Component}
                </Tab>
                <Tab eventKey="Wednesday" title="Wed">
                    {team4Component}
                </Tab>
                <Tab eventKey="Thursday Vets" title="Thu (Vets)">
                    {team5Component}
                </Tab>
                <Tab eventKey="Saturday" title="Sat">
                    {team6Component}
                </Tab>
                {/* TODO check it displays properly */}
            </Tabs>
        </div>
    );
}

export default TeamTabs;
