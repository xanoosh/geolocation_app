const LocationInfo = ({ isSearchResult = false, data, value }) => {
  const searchResultMesssage = <p>Search result data will be displyed here.</p>;
  const locationInfoContainer =
    data !== '' ? (
      <ul>
        <li>
          Country: <strong>{data.country_name}</strong>
        </li>
        <li>
          Language: <strong>{data.location.languages[0].name}</strong>
        </li>
      </ul>
    ) : (
      <p>loading data...</p>
    );
  const ipOrSearchResult = isSearchResult ? (
    <p>
      Searched for: <strong>{value}</strong>
    </p>
  ) : (
    <p>
      Your IP: <strong>{value}</strong>
    </p>
  );
  const infoOrMessage =
    isSearchResult && data === '' ? (
      searchResultMesssage
    ) : (
      <div className="location-info">{locationInfoContainer}</div>
    );
  return (
    <div className="data-container">
      {data && ipOrSearchResult}
      {infoOrMessage}
    </div>
  );
};

export default LocationInfo;
