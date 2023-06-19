var submit = document.getElementsByClassName("btn_btn");

var ip = null;
fetch("https://ipapi.co/json")
  .then((res) => res.json())
  .then((data) => ip = data.ip)

var link = document.URL;

function WebToLead()
{
  if (!isInputValid())
  {
      //return;
  }
  var payloadData = {
      name: inputs[0].value,
      phone: inputs[2].value,
      email: inputs[1].value,
      url_str: link,
      ip: ip
  };
  
  var url = 'https://durman53.github.io/site_testing/quiz/send.php';
  const response = fetch(url, {
            method: 'POST',
            body: JSON.stringify(payloadData),
            headers: {
                'Content-Type': 'application/json',
            }
        })
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.onreadystatechange = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
         setTimeout(() => {
            document.getElementsByClassName('btn_link')[0].click();
         },
         2000);
      }
  };
  xhr.onerror = function () {
      console.log(xhr.responseText);
  };
  xhr.send(JSON.stringify(payloadData));
}

document.querySelector('.btn_btn').addEventListener('click', (e) => {
    WebToLead()
});