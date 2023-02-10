export default class NetworkService {
  static downloadFileFromUrl({ url }) {
    const a = document.createElement("a");
    a.href = url;
    a.download = "";
    a.click();
    a.remove();
  }
}
