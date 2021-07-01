const HistoryElement = ({ title, click }) => {
  return (
    <button onClick={() => click(title)} className="history-btn">
      {title}
    </button>
  );
};
export default HistoryElement;
