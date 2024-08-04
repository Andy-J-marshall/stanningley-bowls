import { Tabs, Tab } from 'react-bootstrap';

function TeamTabs(props) {
    const allComponent = props.allComponent;
    const teamStatsComponents = props.teamComponents;
    const teamRecordsComponents = props.teamRecordsComponents;

    return (
        // TODO tidy up? Need both?
        // TODO there's an error with the title in the console?
        // TODO hide old tabs or show a message?
        <div>
            {teamStatsComponents && (
                <Tabs
                    defaultActiveKey="Combined"
                    id="team-select-tabs"
                    className="mb-3 tabs"
                >
                    <Tab eventKey="Combined" title="ALL">
                        {allComponent}
                    </Tab>
                    {teamStatsComponents.map((teamComponent, index) => (
                        <Tab
                            key={index}
                            eventKey={teamComponent.props.day}
                            title={teamComponent.props.displayName}
                        >
                            {teamComponent}
                        </Tab>
                    ))}
                </Tabs>
            )}
            {teamRecordsComponents && (
                <Tabs
                    defaultActiveKey="Combined"
                    id="team-select-tabs"
                    className="mb-3 tabs"
                >
                    <Tab eventKey="Combined" title="ALL">
                        {allComponent}
                    </Tab>
                    {teamRecordsComponents.map((teamComponent, index) => (
                        <Tab
                            key={index}
                            eventKey={teamComponent.props.day}
                            title={teamComponent.props.displayname}
                        >
                            {teamComponent}
                        </Tab>
                    ))}
                </Tabs>
            )}
        </div>
    );
}

export default TeamTabs;
