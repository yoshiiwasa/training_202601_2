"use strict";

{
  document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const zipcode = document.querySelector('input').value;
    const accessUrl = `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode}`;
    const statusEl = document.querySelector('#status');

    statusEl.textContent = '検索中…';

    try {
      const response = await fetch(accessUrl);
      const data = await response.json();

      if (data.results === null) {
        statusEl.textContent = '存在しない郵便番号です';
        return;
      }

      console.log(accessUrl);
      console.log(data);

      statusEl.textContent = '';

      data.results.forEach((item) => {
        const trElement = document.createElement('tr');

        const tdZipElement = document.createElement('td');
        tdZipElement.textContent = item.zipcode;
        trElement.appendChild(tdZipElement);

        const tdAddressElement = document.createElement('td');
        tdAddressElement.textContent = `${item.address1}${item.address2}${item.address3}`;
        trElement.appendChild(tdAddressElement);

        const tbody = document.querySelector('#addressesTable tbody');
        tbody.appendChild(trElement);

      });
    } catch (err) {
      console.log(err);
      statusEl.textContent = '通信エラーが発生しました';
    }
  });

}
