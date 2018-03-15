export default function (number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}