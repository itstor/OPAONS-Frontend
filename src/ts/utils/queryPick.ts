// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function queryPick(obj: any) {
  if (Object.values(obj).every((x) => x === null || x === '' || typeof x === undefined)) return;

  return (
    '?' +
    Object.keys(obj)
      .filter(function (key) {
        return obj[key] || obj[key] === 0;
      })
      .map(function (key) {
        return key + '=' + obj[key];
      })
      .join('&')
  );
}
