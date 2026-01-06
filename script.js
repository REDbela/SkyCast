document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("cityInput").focus()
  document.getElementById("cityInput1").focus()
});

function searchcityBtn() {
  const input1 = document.getElementById("cityInput")
  const input2 = document.getElementById("cityInput1")

  if (input1.value.trim() === "" && input2.value.trim() === "") {
    alert("Lütfen bir şehir adı girin.")
    return;
  }

  const city = input1.value.trim() || input2.value.trim()
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=af6317160175544be00c03a34fa644f7`
  fetch(api).then(response => response.json()).then(result => weatherDetails(result))



  alert(city + " Hava durumu getiriliyor...")
  //Giriş ekranını gizle ve ana ekranı göster
  document.getElementById("head").style.display = "none"
  document.getElementById("main").style.display = "block"
  //Şehir adını güncelle
  document.getElementById("şehir-adı").innerText = city;
  document.getElementById("cityInput").value = ""
  document.getElementById("cityInput1").value = ""

}

function weatherDetails(info) {
  console.log(info)
}

function searchcityGeo() {
  alert("Konuma göre hava durumu getiriliyor...")
}
