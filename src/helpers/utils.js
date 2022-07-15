export function capitalizeText(stringArray) {
    let stringArrayAsString = '';
    stringArray.forEach((originalString, index) => {
        const splitString = originalString.split(' ');
        splitString.forEach((word, index, array) => {
            array[index] =
                array[index].charAt(0).toUpperCase() + array[index].slice(1);
        });
        const capitalizedString = splitString.join(' ');
        stringArrayAsString =
            index === 0
                ? capitalizedString
                : stringArrayAsString + ', ' + capitalizedString;
        stringArrayAsString = stringArrayAsString.replace(' And ', ' & ');
    });
    return stringArrayAsString;
}

export function arrayToList(stringArray) {
    let returnList;
    if (stringArray) {
        returnList = stringArray.map((r, idx) => (
            <li className='center' key={idx}>{capitalizeText([r.trim()])}</li>
        ));
    }
    return returnList;
}
