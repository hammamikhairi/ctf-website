// const BASE_URL = "https://7b42-197-7-255-61.ngrok-free.app/"
const BASE_URL = "http://20.111.33.21/"
// const BASE_URL = "http://localhost:5051/"


const  DownloadButton = ({ level, file }) => {
  function handleDownload() {
    fetch(`${BASE_URL}getfile?level=${level}`)
      .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.blob();
    })
    .then(blob => {
      const extension = file.split('.').pop();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Level${level}.${extension}`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    })
    .catch(error => console.error('Error downloading file:', error));
}

return (
  <button onClick={handleDownload}>Download File {level}</button>
);
}

export default DownloadButton