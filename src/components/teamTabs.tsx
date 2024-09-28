import { Tabs, Tab } from 'react-bootstrap';

function TeamTabs(props) {
    const allCombinedComponent = props.allCombinedComponent;
    const teamComponents = props.teamComponents;

    return (
        <div>
            {teamComponents && (
                <Tabs
                    defaultActiveKey="Combined"
                    id="team-select-tabs"
                    className="mb-3 tabs"
                >
                    <Tab eventKey="Combined" title="ALL">
                        {allCombinedComponent}
                    </Tab>
                    {teamComponents.map(
                        (teamComponent, index) =>
                            teamComponent.props.displayname && (
                                <Tab
                                    key={index}
                                    eventKey={teamComponent.props.displayname
                                        .replace('(', '')
                                        .replace(')', '')
                                        .replace(' ', '')
                                        .toLowerCase()}
                                    title={teamComponent.props.displayname}
                                >
                                    {teamComponent}
                                </Tab>
                            )
                    )}
                </Tabs>
            )}
        </div>
    );
}

export default TeamTabs;
