import HistoryElement from './HistoryElement';

const History = ({ toggle, list, click }) => {
  // const listElements = list.map((el, i) => <li key={i}>{el}</li>);
  const listElements = list.map((el, i) => (
    <HistoryElement click={click} key={i} title={el} />
  ));
  const classes = toggle
    ? 'search-history-container show'
    : 'search-history-container';
  return (
    <div className={classes}>
      <h2>History</h2>
      {list.length > 0 ? <>{listElements}</> : <p>No search results</p>}
    </div>
  );
};
export default History;
