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

const current_xlsx = 'current.xlsx';
// assume lastUpdatedDate is yesterday
const appStartDate = new Date();
let lastUpdatedDate = appStartDate.setDate(appStartDate.getDate() - 1);

app.get('/api/data', async (req, res) => {
  try {
    const workbook = XLSX.readFile(current_xlsx);
    const confirmedCasesSheet = workbook.Sheets[workbook.SheetNames[0]];
    const probableCasesSheet = workbook.Sheets[workbook.SheetNames[1]];
    const confirmedCases = XLSX.utils.sheet_to_json(confirmedCasesSheet, { range: 3, raw: false });
    const probableCases = XLSX.utils.sheet_to_json(probableCasesSheet, { range: 3, raw: false });
    const response = [
      { confirmedCases: confirmedCases },
      { probableCases: probableCases },
      { updatedDate: lastUpdatedDate },
    ];
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

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

const cron = require('node-cron');
cron.schedule('0 */1 * * *', function () {
  console.log('Running Cron Job');
  const today = new Date();
  const formattedToday = today.getDate() + months[today.getMonth()] + today.getFullYear();
  const downloaded_xlsx = 'downloaded.xlsx';
  download(
    `https://www.health.govt.nz/system/files/documents/pages/covid-casedetails-${formattedToday}.xlsx`,
    downloaded_xlsx,
    compareAndSave,
  );
});

const compareAndSave = () => {
  const downloaded_xlsx = 'downloaded.xlsx';
  const currentFileBuffer = fs.readFileSync(current_xlsx);
  const downloadedFileBuffer = fs.readFileSync(downloaded_xlsx);

  if (currentFileBuffer.equals(downloadedFileBuffer)) {
    console.log(`File already exists`);
  } else {
    console.log('New file detected');
    fs.renameSync(downloaded_xlsx, current_xlsx);

    const today = new Date();
    lastUpdatedDate = today;
    currentXlsxName = current_xlsx;
  }
};

const download = (url, dest, cb) => {
  var file = fs.createWriteStream(dest);
  https.get(url, function (response) {
    response.pipe(file);
    file.on('finish', function () {
      console.log('finish downloading');
      file.close(cb);
    });
  });
};
