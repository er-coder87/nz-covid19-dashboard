import axios from 'axios';

export const getData = () => {
  /* set up XMLHttpRequest */
  //   var url =
  //     'https://www.health.govt.nz/system/files/documents/pages/covid-19-case-details-update-4-april-2020.xlsx';
  //   var oReq = new XMLHttpRequest();
  //   oReq.open('GET', url, true);
  //   oReq.responseType = 'arraybuffer';

  axios({
    url:
      'https://www.health.govt.nz/system/files/documents/pages/covid-19-case-details-update-4-april-2020.xlsx', //your url
    method: 'GET',
    responseType: 'blob', // important
  })
    .then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.pdf'); //or any other extension
      document.body.appendChild(link);
      link.click();
    })
    .catch(error => console.log('error'));
};
//   oReq.onload = function (e) {
//     var arraybuffer = oReq.response;

//     /* convert data to binary string */
//     var data = new Uint8Array(arraybuffer);
//     var arr = [];
//     for (var i = 0; i !== data.length; ++i) arr[i] = String.fromCharCode(data[i]);
//     var bstr = arr.join('');

//     /* Call XLSX */
//     var workbook = XLSX.read(bstr, {
//       type: 'binary',
//     });

//     /* DO SOMETHING WITH workbook HERE */
//     var first_sheet_name = workbook.SheetNames[0];
//     /* Get worksheet */
//     var worksheet = workbook.Sheets[first_sheet_name];
//     console.log(
//       XLSX.utils.sheet_to_json(worksheet, {
//         raw: true,
//       }),
//     );
//   };

//   oReq.send();
