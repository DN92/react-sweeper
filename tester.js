const text = String.fromCharCode(8217);

const removeUnicode = null;

const removeUnicodes = (data) => {
  return JSON.parse(
    JSON.stringify(data)
      .split('&')
      .map((ele, idx) => {
        if (idx === 0 || ele.length < 6) {
          return ele;
        }
        return (
          String.fromCharCode(ele.substring(1, 5)) + ele.slice(6, ele.length)
        );
      })
      .join(''),
  );
};

const array = [1, 2];

console.log(array[-1][-1]);
