const express = require('express');
const https = require('https');
const fs = require('fs');
const XLSX = require('xlsx');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

// configuration
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`server has started on port ${port}`);
});

const download = (url, dest, cb) => {
  var file = fs.createWriteStream(dest);
  var request = https.get(url, function (response) {
    response.pipe(file);
    file.on('finish', function () {
      file.close(cb);
    });
  });
};

const data = require('./data/data');
const data_probable = require('./data/data_probable');

app.get('/api/data', async (req, res) => {
  try {
    const d = new Date();
    const date = d.getMonth() + 1 + '_' + d.getDate() + '_' + d.getFullYear();
    const xlsxName = `covid19_${date}.xlsx`;
    if (!fs.existsSync(xlsxName)) {
      download(
        'https://www.health.govt.nz/system/files/documents/pages/covid-casedetails-update-6april.xlsx',
        xlsxName,
      );
    }
    // TODO - remove first three rows and trim headers
    //const workbook = XLSX.readFile('covid19_2.xlsx');
    //let worksheet = workbook.Sheets[workbook.SheetNames[0]];
    //const totalData = XLSX.utils.sheet_to_json(worksheet, { raw: false });

    const totalData = [...data, ...data_probable];
    res.json(totalData);
  } catch (error) {
    console.log(error);
  }
});
