const ShowHideHistoryButton = ({ showHide, toggle }) => {
  return (
    <button className="show-hide-history " onClick={showHide}>
      {toggle ? 'Hide' : 'Show'} history
    </button>
  );
};

export default ShowHideHistoryButton;
