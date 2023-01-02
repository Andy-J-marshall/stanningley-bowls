import logo from '../images/logos/brand-logo.png';

function Header() {
    return (
        <div id="header">
            <img
                alt="header logo"
                src={logo}
                width="180"
                height="180"
                className="d-inline-block align-top"
            />
        </div>
    );
}

export default Header;
