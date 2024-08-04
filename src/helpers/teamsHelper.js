export function returnTabName(teamName) {
    let displayName = teamName.substring(0, 3).toUpperCase();
    if (teamName.toLowerCase().includes(' vets')) {
        displayName += ' (VETS)';
    }
    if (teamName.toLowerCase().includes(' (b)')) {
        displayName += ' (B)';
    }
    if (teamName.toLowerCase().includes(' pairs')) {
        displayName += ' (PAIRS)';
    }
    return displayName;
}
