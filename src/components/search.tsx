import { Form, Button } from 'react-bootstrap';
import {
    ClearButton,
    Typeahead,
    Menu,
    MenuItem,
} from 'react-bootstrap-typeahead';
import { SearchProps } from '../types/interfaces';

function Search(props: SearchProps) {
    const searchList = props.searchList;
    const value = props.value;
    const searchedName = props.searchedName;
    const handleSubmit = props.handleSubmitCallback;
    const handleChange = props.handleChangeCallback;
    const closeButtonCallback = props.closeButtonCallback;

    return (
        <Form id="search-form" className="center" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Typeahead
                    id="search"
                    placeholder="Player..."
                    onChange={handleChange}
                    options={['SHOW ALL'].concat(searchList)}
                    selected={value}
                    size="lg"
                    renderMenu={(players: string[], menuProps: any) => (
                        <Menu {...menuProps}>
                            {players.map((result, index) => (
                                <MenuItem
                                    key={index}
                                    onClick={(e: any) => e.target.focus()}
                                    option={result}
                                    position={index}
                                >
                                    {result}
                                </MenuItem>
                            ))}
                        </Menu>
                    )}
                >
                    {({ onClear, selected }) => (
                        <div className="rbt-aux">
                            {!!selected.length && selected[0] && (
                                <ClearButton onClick={onClear} />
                            )}
                        </div>
                    )}
                </Typeahead>
            </Form.Group>
            <Button id="search-button" variant="light" type="submit">
                Search
            </Button>
            {searchedName && (
                <Button
                    id="back-button"
                    style={{
                        margin: '1rem',
                        backgroundColor: '#e7f1ff',
                        color: 'black',
                    }}
                    variant="secondary"
                    onClick={closeButtonCallback}
                >
                    Back to summary
                </Button>
            )}
        </Form>
    );
}

export default Search;
