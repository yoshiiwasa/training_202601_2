"use strict";

{
  /** 郵便番号検索APIのURL */
  const apiUrl = "https://zipcloud.ibsnet.co.jp/api/search?zipcode=";

  function createAccessUrl() {

  }

  /** ステータスのメッセージ */
  const statusEl = document.querySelector("#status");
  const statusMessages = {
    200: "",
    400: "必須パラメータが指定されていません",
    500: "APIエラーが発生しました",
  };
  function getStatusMessage(data) {
    return statusMessages[data.status] ?? "不明なエラーです";
  }
  function setStatusMessage(message = "") {
    statusEl.textContent = message;
  }
  
  /** 住所の行を作成・追加 */
  function createAddressRow(item) {
    const trEl = document.createElement("tr");
    const tdZipEl = document.createElement("td");
    tdZipEl.textContent = `${item.zipcode}`;
    const tdAddressEl = document.createElement("td");
    tdAddressEl.textContent = `${item.address1}${item.address2}${item.address3}`;
    const tdFuriganaEl = document.createElement("td");
    tdFuriganaEl.textContent = `${item.kana1}${item.kana2}${item.kana3}`;
    trEl.append(tdZipEl, tdAddressEl, tdFuriganaEl);
    tbody.insertBefore(trEl, tbody.firstElementChild);
  }

  //** 行数の制限 */
  const tbody = document.querySelector("#addressesTable tbody");
  function limitTableRows(tbody, maxRows){
    while (tbody.rows.length > maxRows) {
      tbody.removeChild(tbody.lastElementChild);
    }
  }


  document.querySelector("input").focus();
  document.querySelector("form").addEventListener("submit", async (submitEvent) => {
    submitEvent.preventDefault();
    const inputZipcode = document.querySelector("input").value;
    let zipcode = inputZipcode.replace(/[０-９]/g, s => String.fromCharCode(s.charCodeAt(0) - 0xFEE0));
    const accessUrl = `${apiUrl}${zipcode}`;

    setStatusMessage("検索中…");

    try {
      const response = await fetch(accessUrl);
      const data = await response.json();

      setStatusMessage(getStatusMessage(data));

      if (data.results) {
        data.results.forEach((item) => {
          createAddressRow(item);
        });
        limitTableRows(tbody,20);
        submitEvent.target.reset();
      } else {
        setStatusMessage("存在しない郵便番号です");
      }
    } catch (err) {
      console.log(err);
      setStatusMessage("通信エラーが発生しました");
    }
  });

  document.querySelector("#resetTbody").addEventListener("click", () => {
    document.querySelector("tbody").innerHTML = "";
  });
}
