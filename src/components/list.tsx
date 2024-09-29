import { capitalizeText } from '../helpers/utils';
import { ListProps } from '../types/interfaces';

function List(props: ListProps) {
    const stringArray = props.stringArray;

    let returnList;
    if (stringArray) {
        returnList = stringArray.map((r, idx) => (
            <li className="center" key={idx}>
                {capitalizeText([r.trim()])}
            </li>
        ));
    }
    return returnList;
}

export default List;
