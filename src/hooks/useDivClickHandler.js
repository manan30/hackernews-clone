export default function useDivClickHandler(callback = () => {}) {
  const handler = (e) => {
    console.log(e);
    callback(e);
  };
  return { onClick: handler, onKeyUp: handler };
}
