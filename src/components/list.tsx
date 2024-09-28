import { capitalizeText} from '../helpers/utils';

function List(props) {
const stringArray = props.stringArray;

    let returnList;
    // TODO this is wrong?
    if (stringArray) {
        returnList = stringArray.map((r, idx) => (
            // TODO needs to be in a <p> tag??
            <li className="center" key={idx}>
                {capitalizeText([r.trim()])}
            </li>
        ));
    }
    return returnList;

}

export default List;