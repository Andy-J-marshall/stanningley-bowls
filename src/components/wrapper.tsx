import { WrapperProps } from '../types/interfaces';

function Wrapper(props: WrapperProps) {
    const displayname = props.displayname; // this is used by TeamTabs component
    const children = props.children;

    return <div>{children}</div>;
}

export default Wrapper;
