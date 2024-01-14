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
    const team7Component = props.team7Component;

    return (
        <div>
            <Tabs defaultActiveKey="Combined" id={id} className="mb-3 tabs">
                <Tab eventKey="Combined" title="All">
                    {allComponent}
                </Tab>
                <Tab eventKey="monday" title="Mon">
                    {team1Component}
                </Tab>
                <Tab eventKey="tuesday-vets" title="Tues (Vets)">
                    {team2Component}
                </Tab>
                <Tab eventKey="tuesday" title="Tues">
                    {team3Component}
                </Tab>
                <Tab eventKey="wednesday" title="Wed">
                    {team4Component}
                </Tab>
                <Tab eventKey="wednesday-pairs" title="Wed (Pairs)">
                    {team7Component}
                </Tab>
                <Tab eventKey="thursday-vets" title="Thur (Vets)">
                    {team5Component}
                </Tab>
                <Tab eventKey="taturday" title="Sat">
                    {team6Component}
                </Tab>
            </Tabs>
        </div>
    );
}

export default TeamTabs;
