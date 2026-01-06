document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("cityInput").focus()
  document.getElementById("cityInput1").focus()
  let api;
});
// Şehir adı ile arama
function searchcityBtn() {
  const input1 = document.getElementById("cityInput")
  const input2 = document.getElementById("cityInput1")
                                                      //adet input olma nedeni benim başta div yapısını kötü oluşturmamdan dolayı aldığım hata sonucu bulduğum bir çözüm. Açıklamak gerekirse 2 butona aynı id veremediğim için 2 ayrı değişkeni kontrol ettirip hangisi dolu ise onu almasını sağladım.
  if (input1.value.trim() === "" && input2.value.trim() === "") {
    alert("Lütfen bir şehir adı girin.")
    return;
  }
  //.trim() sayesinde boşlukları temizledim
  const city = input1.value.trim() || input2.value.trim()
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=af6317160175544be00c03a34fa644f7`
  dataWrite()
}


//Konum bilgisi ile arama
function locationBtn() {
  alert("Konuma göre hava durumu getiriliyor...")
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError)
  }else {
    alert("Tarayıcınız konum hizmetlerini desteklemiyor.")
  }
}

//başarılı
function onSuccess(position) {
  const {latitude, longitude} = position.coords
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=af6317160175544be00c03a34fa644f7`
  dataWrite()
}
//başarısız
function onError(){
  alert(`Hata: Konum izni alınamadı.`)
}

//Hava durumu bilgileri (test için console.log)
function weatherDetails(info) {
  console.log(info)
  //apiden gelen cevap 404 ise şehir bulunamadı cevap 401 ise geçersiz API anahtarı hatası veriyor
  if (info.cod === "404") {
    alert("Lütfen geçerli bir şehir adı girin.")
    return;
  }
  if (info.cod === "401") {
    alert("Lütfen API anahtarınızın geçerliliğini kontrol edin.")
    return;
  }
  document.getElementById("şehir-adı").innerText = info.name + ","
  document.getElementById("ülke").innerText = info.sys.country
  const date = new Date()
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  document.getElementById("tarih").innerText = date.toLocaleDateString('tr-TR', options)
  document.getElementById("derece").innerText = Math.round(info.main.temp) + "°C"
  document.querySelector(".durum-icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${info.weather[0].icon}.png" alt="Durum İkonu">`
  document.getElementById("durum-açıklama").innerText = info.weather[0].description
  document.getElementById("nem-label").innerText = "Nem: " + info.main.humidity + "%"
  document.getElementById("rüzgar-hızı-label").innerText = "Rüzgar Hızı: " + info.wind.speed + " km/s"
  const weatherId = info.weather[0].id;
  const body = document.body;
  if (weatherId >= 200 && weatherId < 300) {
        body.style.background = "linear-gradient(135deg, #2c3e50, #4ca1af)"; // gök gürültüsü
    }
    else if (weatherId >= 300 && weatherId < 400) {
        body.style.background = "linear-gradient(135deg, #74ebd5, #acb6e5)"; // çiseleme
    }
    else if (weatherId >= 500 && weatherId < 600) {
        body.style.background = "linear-gradient(135deg, #3a7bd5, #3a6073)"; // yağmur
    }
    else if (weatherId >= 600 && weatherId < 700) {
        body.style.background = "linear-gradient(135deg, #e6dada, #274046)"; // kar
    }
    else if (weatherId >= 700 && weatherId < 800) {
        body.style.background = "linear-gradient(135deg, #757f9a, #d7dde8)"; // sis / pus
    }
    else if (weatherId === 800) {
        body.style.background = "linear-gradient(135deg, #56ccf2, #2f80ed)"; // açık hava
    }
    else if (weatherId > 800) {
        body.style.background = "linear-gradient(135deg, #bdc3c7, #2c3e50)"; // bulutlu
  }
}

//Verileri apiden çekip json formatına çevirme
function dataWrite() {
  fetch(api).then(response => response.json()).then(result => weatherDetails(result))
  document.getElementById("cityInput").value = ""
  document.getElementById("cityInput1").value = ""
  document.getElementById("main").style.display = "block"
  document.getElementById("head").style.display = "none"
}

