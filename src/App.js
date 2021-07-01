import './styles/App.scss';
import { useEffect } from 'react';
import { useState } from 'react';
import Map from './components/Map';
import LocationInfo from './components/LocationInfo';
import History from './components/History';
import ShowHideHistoryButton from './components/ShowHideHistoryButton';
import SearchBar from './components/SearchBar';
const publicIp = require('public-ip');
const validator = require('validator');

function App() {
  const [clientIP, setClientIP] = useState('');
  const [clientLocationData, setClientLocationData] = useState('');
  const [historyInSession, setHistoryInSession] = useState([]);
  const [historyToggleMobile, setHistoryToggleMobile] = useState(false);
  const [SearchBarValue, setSearchBarValue] = useState('');
  const [lastSearchLocationData, setLastSearchLocationData] = useState('');
  const [searchLocationValue, setSearchLocationValue] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setClientIP(await publicIp.v4());
      } catch (e) {
        alert(`${e.message}\nPlease check your internet connection.`);
      }
    })();
  }, []);

  useEffect(() => {
    if (clientIP) getLocationData(clientIP);
  }, [clientIP]);

  const getLocationData = (ip, addToSearchHistory = true) => {
    const url = `http://api.ipstack.com/${ip}?access_key=0a50cb218310d654414661e6d077cd0f&format=1`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw Error(`Request rejected with status ${res.status}`);
        return res.json();
      })
      .then((res) => {
        if (!res.type) alert('Please enter a valid IP or URL address');
        else if (clientIP === res.ip) setClientLocationData(res);
        else {
          setLastSearchLocationData(res);
          setSearchLocationValue(ip);
          if (addToSearchHistory) setHistoryInSession((prev) => [...prev, ip]);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => setSearchBarValue(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = SearchBarValue.trim().toLowerCase();
    if (validator.isIP(value) || validator.isURL(value)) {
      getLocationData(value);
      setSearchBarValue('');
    } else alert('Please enter a valid IP or URL address');
  };
  const handleClick = (value) => {
    getLocationData(value, false);
    setSearchLocationValue(value);
  };
  const handleShowHide = () => setHistoryToggleMobile(!historyToggleMobile);
  return (
    <div className="container">
      <ShowHideHistoryButton
        toggle={historyToggleMobile}
        showHide={handleShowHide}
      />
      <div className="row">
        <History
          toggle={historyToggleMobile}
          list={historyInSession}
          click={handleClick}
        />
        <div className="data-col">
          <LocationInfo value={clientIP} data={clientLocationData} />
          <Map locationData={clientLocationData} />
          <SearchBar
            value={SearchBarValue}
            change={handleChange}
            submit={handleSubmit}
          />
          <LocationInfo
            isSearchResult={true}
            value={searchLocationValue}
            data={lastSearchLocationData}
          />
          <Map isSearchResult={true} locationData={lastSearchLocationData} />
        </div>
      </div>
    </div>
  );
}

export default App;
