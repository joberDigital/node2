const axios = require('axios');
const xlsx = require('json-as-xlsx');

async function fetchJsonAndExport() {
  const { data } = await axios.get('https://node2-ashy.vercel.app/cards/card-001.json');

  let content = [
    {
      title: data.title,
      detail1: data.details[0],
      detail2: data.details[1]
    }
  ];

  let xlsxData = [
    {
      sheet: 'Card JSON',
      columns: [
        { label: 'Title', value: 'title' },
        { label: 'Detail 1', value: 'detail1' },
        { label: 'Detail 2', value: 'detail2' }
      ],
      content: content
    }
  ];

  xlsx(xlsxData, { fileName: 'CardFromJson.xlsx' });
}

fetchJsonAndExport();