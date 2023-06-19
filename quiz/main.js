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
      return;
  }
  var payloadData = {
      contacts: {
          name: inputs[0].value,
          number: inputs[2].value,
          email: inputs[1].value
      },
      quiz : {
          name: link
      },
      ip: ip,
      url: link
  };
  
  var url = 'https://qwertycrm.xyz/api/v1/ExternalLead/6487439ec0e5f7ad6';

  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.onreadystatechange = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
         document.getElementsByClassName('btn_link')[0].click()
      }
  };
  xhr.onerror = function () {
      console.log(xhr.responseText);
  };
  xhr.send(JSON.stringify(payloadData));
}