"use strict";

{
  document.querySelector('input').focus();

  document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const zipcode = document.querySelector("input").value.replace(/[^0-9]/g, "");
    const accessUrl = `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode}`;
    const statusEl = document.querySelector("#status");

    statusEl.textContent = "検索中…";

    try {
      const response = await fetch(accessUrl);
      const data = await response.json();

      if (data.results === null) {
        statusEl.textContent = "存在しない郵便番号です";
        return;
      }

      console.log(accessUrl);
      console.log(data.results);

      statusEl.textContent = "";

      data.results.forEach((item) => {
        const trEl = document.createElement("tr");

        const tdZipEl = document.createElement("td");
        tdZipEl.textContent = item.zipcode;

        const tdAddressEl = document.createElement("td");
        tdAddressEl.textContent = `${item.address1}${item.address2}${item.address3}`;

        const tdFuriganaEl = document.createElement("td");
        tdFuriganaEl.textContent = `${item.kana1}${item.kana2}${item.kana3}`;

        trEl.append(tdZipEl, tdAddressEl, tdFuriganaEl);

        const tbody = document.querySelector("#addressesTable tbody");
        tbody.insertBefore(trEl, tbody.firstElementChild);

        let i;
        while (tbody.rows.length > 20) {
          tbody.removeChild(tbody.lastElementChild);
        }

        e.target.reset();
      });
    } catch (err) {
      console.log(err);
      statusEl.textContent = "通信エラーが発生しました";
    }
  });

  document.querySelector("#resetTbody").addEventListener("click", () => {
    document.querySelector("tbody").innerHTML = "";
  });
}
