const Map = ({ isSearchResult = false, locationData }) => {
  const mapUrl = locationData
    ? `https://maps.google.com/maps?q=${locationData.latitude},${locationData.longitude}&z=12&amp&output=embed`
    : '';
  const loadingMessage =
    isSearchResult && !locationData ? '' : <p>Loading map...</p>;
  return (
    <div className="map-container">
      {locationData ? (
        <iframe
          title="Map"
          width="500"
          height="500"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src={mapUrl + '&output=embed'}
        ></iframe>
      ) : (
        loadingMessage
      )}
    </div>
  );
};

export default Map;
