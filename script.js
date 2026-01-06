document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("cityInput").focus()
  document.getElementById("cityInput1").focus()
  let api;
});
// Şehir adı ile arama
function searchcityBtn() {
  const input1 = document.getElementById("cityInput")
  const input2 = document.getElementById("cityInput1")
                                                      //' adet input olma nedeni benim başta div yapısını kötü oluşturmamdan dolayı aldığım hata sonucu bulduğum bir çözüm açıklamak gerekirse 2 butona aynı id veremediğim için 2 ayrı değişkeni kontrol ettirip ahngisi dlu ise onu almasını sağladım
  if (input1.value.trim() === "" && input2.value.trim() === "") {
    alert("Lütfen bir şehir adı girin.")
    return;
  }

  const city = input1.value.trim() || input2.value.trim()
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=af6317160175544be00c03a34fa644f7`
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
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=af6317160175544be00c03a34fa644f7`
  dataWrite()
}
//başarısız
function onError(){
  alert(`Hata: Konum izni alınamadı.`)
}

//Hava durumu bilgileri (test için / geçici)
function weatherDetails(info) {
  console.log(info)
}

//Verileri apiden çekip json formatına çevirme
function dataWrite() {
  fetch(api).then(response => response.json()).then(result => weatherDetails(result))
}

