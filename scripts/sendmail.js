let mailButton =$(".sendMailButton")
console.log(mailButton)
let data =  ""
function sendMailsFucntion(){
    fetch("sendMail.php",{ method: "POST", body: data })
    .then(res => res.text())
    .then(txt => console.log(txt))
    .catch(err => console.error(err));
}
console.log(mailButton)


mailButton.click(function(){
    sendMailsFucntion()
});