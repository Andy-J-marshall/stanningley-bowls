import { useState } from 'react';
import { ToggleButton, ButtonGroup } from 'react-bootstrap';
import { GameTypeButtonProps } from '../../types/interfaces';

function GameTypeButton(props: GameTypeButtonProps) {
    const displayAllCallback = props.displayAllCallback;
    const displaySinglesCallback = props.displaySinglesCallback;
    const displayPairsCallback = props.displayPairsCallback;

    const selectedColour = '#e7f1ff';
    const notSelectedColour = '#ffffff';

    const [allChecked, setAllChecked] = useState(true);
    const [singlesChecked, setSinglesChecked] = useState(false);
    const [pairsChecked, setPairsChecked] = useState(false);
    const [allColour, setAllColour] = useState(selectedColour);
    const [singlesColour, setSinglesColour] = useState(notSelectedColour);
    const [pairsColour, setPairsColour] = useState(notSelectedColour);

    function displayAll() {
        setAllChecked(true);
        setAllColour(selectedColour);

        setSinglesChecked(false);
        setSinglesColour(notSelectedColour);

        setPairsChecked(false);
        setPairsColour(notSelectedColour);

        displayAllCallback();
    }

    function displaySingles() {
        setAllChecked(false);
        setAllColour(notSelectedColour);

        setSinglesChecked(true);
        setSinglesColour(selectedColour);

        setPairsChecked(false);
        setPairsColour(notSelectedColour);

        displaySinglesCallback();
    }

    function displayPairs() {
        setAllChecked(false);
        setAllColour(notSelectedColour);

        setSinglesChecked(false);
        setSinglesColour(notSelectedColour);

        setPairsChecked(true);
        setPairsColour(selectedColour);

        displayPairsCallback();
    }

    return (
        <ButtonGroup size="lg" className="mb-2">
            <ToggleButton
                id="all-button"
                value="All"
                className="toggle-button"
                onClick={displayAll}
                type="checkbox"
                checked={allChecked}
                style={{ backgroundColor: allColour, color: 'black' }}
            >
                All
            </ToggleButton>
            <ToggleButton
                id="singles-button"
                value="Singles"
                onClick={displaySingles}
                type="checkbox"
                checked={singlesChecked}
                style={{ backgroundColor: singlesColour, color: 'black' }}
            >
                Singles
            </ToggleButton>
            <ToggleButton
                id="pairs-button"
                value="Pairs"
                onClick={displayPairs}
                type="checkbox"
                checked={pairsChecked}
                style={{ backgroundColor: pairsColour, color: 'black' }}
            >
                Pairs
            </ToggleButton>
        </ButtonGroup>
    );
}

export default GameTypeButton;
