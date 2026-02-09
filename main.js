"use strict";

{
  /** 郵便番号検索APIのURLです。 */
  const apiUrl = "https://zipcloud.ibsnet.co.jp/api/search?zipcode=";

  const statusEl = document.querySelector("#status");
  const statusMessages = {
    200: "",
    400: "存在しない郵便番号です",
    500: "APIエラーが発生しました",
  };
  function getStatusMessage(data) {
    return statusMessages[data.status] ?? "不明なエラーです";
  }

  const tbody = document.querySelector("#addressesTable tbody");

  document.querySelector("input").focus();

  document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const zipcode = document.querySelector("input").value;
    const accessUrl = `${apiUrl}${zipcode}`;

    statusEl.textContent = "検索中…";

    try {
      const response = await fetch(accessUrl);
      const data = await response.json();

      console.log(accessUrl);
      console.log(data.status);

      statusEl.textContent = getStatusMessage(data);

      if (data.results) {
        data.results.forEach((item) => {
          const trEl = document.createElement("tr");

          const tdZipEl = document.createElement("td");
          tdZipEl.textContent = `${item.zipcode}`;

          const tdAddressEl = document.createElement("td");
          tdAddressEl.textContent = `${item.address1}${item.address2}${item.address3}`;

          const tdFuriganaEl = document.createElement("td");
          tdFuriganaEl.textContent = `${item.kana1}${item.kana2}${item.kana3}`;

          trEl.append(tdZipEl, tdAddressEl, tdFuriganaEl);
          tbody.insertBefore(trEl, tbody.firstElementChild);
        });
        while (tbody.rows.length > 20) {
          tbody.removeChild(tbody.lastElementChild);
        }
        e.target.reset();
      } else {
        statusEl.textContent = "存在しない郵便番号です";
      }
    } catch (err) {
      console.log(err);
      statusEl.textContent = "通信エラーが発生しました";
    }
  });

  document.querySelector("#resetTbody").addEventListener("click", () => {
    document.querySelector("tbody").innerHTML = "";
  });
}
