'use strict';

{
  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const zipcode = document.querySelector('input').value;
    const accessUrl = `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode}`;
    console.log(accessUrl);
    // document.querySelector('div').textContent = ;
  });

  

}