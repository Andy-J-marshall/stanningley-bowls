import logo from '../images/logos/brand-logo.png';

function Header() {
    return (
        <div id="header">
            <img
                alt="header logo"
                src={logo}
                width="170"
                height="170"
                className="d-inline-block align-top"
            />
        </div>
    );
}

export default Header;
