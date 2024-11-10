import { WrapperProps } from '../types/interfaces';

function TeamTabsWrapper(props: WrapperProps) {
    // This is used to ensure the team tabs appear correctly on the team stats and record pages.
    // The displayname is used by the components to display the correct tab name.
    const displayname = props.displayname;
    const children = props.children;

    return <div>{children}</div>;
}

export default TeamTabsWrapper;
