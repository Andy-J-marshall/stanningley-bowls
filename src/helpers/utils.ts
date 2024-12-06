export function capitalizeText(stringArray: string[]) {
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

export function formatTeamName(teamName: string) {
    const formatTeamName = capitalizeText([teamName]);
    return formatTeamName
        .replace(' (a)', ' (A)')
        .replace(' (b)', ' (B)')
        .replace(' (c)', ' (C)')
        .replace(' (d)', ' (D)');
}
