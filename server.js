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

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`server has started on port ${port}`);
});

const download = (url, dest, cb) => {
  var file = fs.createWriteStream(dest);
  https.get(url, function (response) {
    response.pipe(file);
    file.on('finish', function () {
      file.close(cb);
    });
  });
};

const data = require('./data/data');
const data_probable = require('./data/data_probable');
const months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];
app.get('/api/data', async (req, res) => {
  try {
    const today = new Date();
    const todayInXlsxFileFormat = today.getDate() + months[today.getMonth()] + today.getFullYear();

    // assumption - last updated date is yesterday
    let lastUpdatedDate = today.setDate(today.getDate() - 1);
    const xlsxName = `covid-casedetails-${todayInXlsxFileFormat}.xlsx`;
    if (!fs.existsSync(xlsxName)) {
      lastUpdatedDate = today;
      download(`https://www.health.govt.nz/system/files/documents/pages/${xlsxName}`, xlsxName);
    }

    const dataArray = processXlsx(xlsxName);
    const response = [{ dataArray: dataArray }, { updatedDate: lastUpdatedDate }];
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

const processXlsx = xlsxName => {
  const workbook = XLSX.readFile(xlsxName);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  return XLSX.utils.sheet_to_json(worksheet, { range: 3, raw: false });
};
