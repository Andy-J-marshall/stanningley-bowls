import { Tabs, Tab } from 'react-bootstrap';

function TeamTabs(props) {
    const allCombinedComponent = props.allCombinedComponent;
    const teamStatsComponents = props.teamComponents;
    const teamRecordsComponents = props.teamRecordsComponents;

    return (
        // TODO tidy up? Need both?
        <div>
            {teamStatsComponents && (
                <Tabs
                    defaultActiveKey="Combined"
                    id="team-select-tabs"
                    className="mb-3 tabs"
                >
                    <Tab eventKey="Combined" title="ALL">
                        {allCombinedComponent}
                    </Tab>
                    {teamStatsComponents.map((teamComponent, index) => (
                        teamComponent.props.displayname && (
                            <Tab
                                key={index}
                                eventKey={teamComponent.props.day}
                                title={teamComponent.props.displayname}
                            >
                                {teamComponent}
                            </Tab>
                        )
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
                        {allCombinedComponent}
                    </Tab>
                    {teamRecordsComponents.map((teamComponent, index) => (
                        teamComponent.props.displayname && (
                            <Tab
                                key={index}
                                eventKey={teamComponent.props.day}
                                title={teamComponent.props.displayname}
                            >
                                {teamComponent}
                            </Tab>
                        )
                    ))}
                </Tabs>
            )}
        </div>
    );
}

export default TeamTabs;
