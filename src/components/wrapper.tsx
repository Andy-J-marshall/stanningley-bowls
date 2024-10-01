import { WrapperProps } from '../types/interfaces';

function Wrapper(props: WrapperProps) {
    const displayname = props.displayname;
    const children = props.children;

    return <div>{children}</div>;
}

export default Wrapper;
