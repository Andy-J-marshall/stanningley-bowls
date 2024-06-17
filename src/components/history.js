const photoUrl = 'https://photos.google.com/share/AF1QipMmkXau_XJaD1459y7Sdsk7pSoUeAr04SiVP_z07i1u0NzLiVQLBioFHwGF9jHV_A?key=N3VLT0l0VWZEVlNrVm5kQUF3MHl1d2lJNEFDRVNR';
const historicStatsUrl = 'https://photos.google.com/share/AF1QipOqs9EK2LBhL3uZjas8l1ccFkrkdsY8KpOlajx60sBsUaM_-S4LCr-qLpEj9aRX3Q?key=N1VwMnRwdWlKQU5pcW9lVXk1b09IX3Y1OGxQWlFR';

function Contact() {
    return (
        <div id="history-page" className="page-component center">
            <h1>HISTORY</h1>
            <h3>CLUB CUP WINNERS</h3>
            <p>1950 - N. Dewhirst</p>
            <p>1951 - E. Foskett</p>
            <p>1952 - G. Greaves</p>
            <p>1953 - A. Key</p>
            <p>1954 - N. Wilkinson</p>
            <p>1955 - J. Learoyd</p>
            <p>1956 - G. Greaves</p>
            <p>1957 - J.H. Bennet</p>
            <p>1958 - J. Darnborough</p>
            <p>1959 - J. Crampton</p>
            <p>1960 - F. Ward</p>
            <p>1961 - N. Wilkinson</p>
            <p>1962 - S. Gregory</p>
            <p>1963 - V. Hill</p>
            <p>1964 - H. Hall</p>
            <p>1965 - H. Hall</p>
            <p>1966 - J.H. Bennet</p>
            <p>1967 - H. Hall</p>
            <p>1968 - H. Hall</p>
            <p>1969 - H. Hall</p>
            <p>1970 - V. Hill</p>
            <p>1971 - W. Lupton</p>
            <p>1972 - W. Ainge</p>
            <p>1973 - A. Dearnley</p>
            <p>1974 - H. Hall</p>
            <p>1975 - B. Richards</p>
            <p>1976 - B. Lynch</p>
            <p>1977 - T. Warrington</p>
            <p>1978 - V. Hill</p>
            <p>1979 - D. Cooper</p>
            <p>1980 - M. Threapleton</p>
            <p>1981 - A. Parker</p>
            <p>1982 - Michael Shaw</p>
            <p>1983 - Michael Shaw</p>
            <p>1984 - C. Farquharson</p>
            <p>1985 - A. Parker</p>
            <p>1986 - D. McPhail</p>
            <p>1999 - Mabel Shaw</p>
            <p>2014 - C. Brogie</p>
            <p>2019 - S. Gardner</p>
            <p>2022 - J. Armitage</p>
            <p>2023 - P. Bowes</p>
            <h3>HISTORIC PHOTOS</h3>
            {/* TODO add a nice preview */}
            <p>
                Link to photos: <a href={photoUrl}>records</a>
            </p>
            <h3>HISTORIC RECORDS</h3>
            {/* TODO add a nice preview */}
            <p>
                Link to historic stats: <a href={historicStatsUrl}>records</a>
            </p>
        </div>
    );
}
export default Contact;
