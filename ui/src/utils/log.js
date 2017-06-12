export default function log(message, obj) {
  console.log(message, JSON.stringify(obj, null, 2));
}