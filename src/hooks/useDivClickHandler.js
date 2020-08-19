export default function useDivClickHandler(callback = () => {}) {
  const handler = (e) => {
    callback(e);
  };
  return { onClick: handler, onKeyUp: handler };
}
