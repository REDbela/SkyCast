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
    showPopup("Hata", "Lütfen bir şehir adı girin.");
    return;
  }
  //.trim() sayesinde boşlukları temizledim
  const city = input1.value.trim() || input2.value.trim()
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=af6317160175544be00c03a34fa644f7`
  dataWrite()
}


//Konum bilgisi ile arama
function locationBtn() {
  showLoading("Konumunuz alınıyor...");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError)
  } else {
    hideLoading();
    showPopup("Hata", "Tarayıcınız konum hizmetlerini desteklemiyor.");
  }
}

//başarılı
function onSuccess(position) {
  const { latitude, longitude } = position.coords
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=af6317160175544be00c03a34fa644f7`
  dataWrite()
}
//başarısız
function onError() {
  hideLoading();
  showPopup("Hata", "Konum izni alınamadı.");
}

//Hava durumu bilgileri (test için console.log)
function weatherDetails(info) {
  hideLoading();
  console.log(info)
  //apiden gelen cevap 404 ise şehir bulunamadı cevap 401 ise geçersiz API anahtarı hatası veriyor
  if (info.cod === "404") {
    showPopup("Hata", "Lütfen geçerli bir şehir adı girin.");
    return;
  }
  if (info.cod === "401") {
    showPopup("Hata", "Lütfen API anahtarınızın geçerliliğini kontrol edin.");
    return;
  }
  document.getElementById("main").classList.remove("hidden")
  document.getElementById("head").classList.add("hidden")
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
  //const weatherId = 250;
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

  updateWeatherEffects(weatherId);
}

function updateWeatherEffects(weatherId, isRecursive = false) {
  const arkaPlan = document.getElementById("arka-plan");

  if (!isRecursive) {
    arkaPlan.innerHTML = ""; // Mevcut efektleri temizle
    arkaPlan.className = ""; // Class'ları temizle
  }

  if (weatherId >= 500 && weatherId < 600) {
    // Yağmur efekti
    const rainContainer = document.createElement("div");
    rainContainer.className = "yagmur";

    for (let i = 0; i < 80; i++) {
      const drop = document.createElement("p");
      const delay = Math.random() * 2;
      const duration = 0.5 + Math.random() * 1;
      const left = Math.random() * 100;

      drop.style.left = `${left}%`;
      drop.style.animationDelay = `${delay}s`;
      drop.style.animationDuration = `${duration}s`;
      drop.style.position = "absolute";
      drop.style.top = "-20px"; // Ekranın dışından başlasın

      rainContainer.appendChild(drop);
    }
    arkaPlan.appendChild(rainContainer);
  }
  else if (weatherId >= 600 && weatherId < 700) {
    // Kar efekti
    const snowContainer = document.createElement("div");
    snowContainer.className = "kar";

    for (let i = 0; i < 100; i++) {
      const flake = document.createElement("p");
      const delay = Math.random() * 5;
      const duration = 3 + Math.random() * 5;
      const left = Math.random() * 100;
      const size = 2 + Math.random() * 5;

      flake.style.left = `${left}%`;
      flake.style.width = `${size}px`;
      flake.style.height = `${size}px`;
      flake.style.animationDelay = `${delay}s`;
      flake.style.animationDuration = `${duration}s`;
      flake.style.top = "-10px"; // Ekranın dışından başlasın

      snowContainer.appendChild(flake);
    }
    arkaPlan.appendChild(snowContainer);
  }
  else if (weatherId > 800 || (weatherId >= 700 && weatherId < 800)) {
    // Bulutlu veya Sisli
    for (let i = 0; i < 15; i++) {
      const cloud = document.createElement("div");
      cloud.className = "bulut";
      const size = 100 + Math.random() * 200;
      const top = Math.random() * 80;
      const duration = 20 + Math.random() * 40;
      const delay = Math.random() * -40;

      cloud.style.width = `${size}px`;
      cloud.style.height = `${size / 2}px`;
      cloud.style.top = `${top}%`;
      cloud.style.animationDuration = `${duration}s`;
      cloud.style.animationDelay = `${delay}s`;

      arkaPlan.appendChild(cloud);
    }
  }
  else if (weatherId >= 200 && weatherId < 300) {
    // Fırtına efekti
    arkaPlan.classList.add("storm");
    updateWeatherEffects(505, true); // Recursive çağrı, temizleme yapma
  }
}

//Verileri apiden çekip json formatına çevirme
function dataWrite() {
  showLoading("Hava durumu verileri güncelleniyor...");
  fetch(api).then(response => response.json()).then(result => {
    weatherDetails(result);
    document.getElementById("cityInput").value = ""
    document.getElementById("cityInput1").value = ""
  })
    .catch(error => {
      hideLoading();
      showPopup("Hata", "Veri çekilirken bir sorun oluştu. API anahtarınızı veya internetinizi kontrol edin");
    });
}

// POPUP VE LOADING KONTROLLERİ
function showPopup(title, message) {
  document.getElementById("popup-title").innerText = title;
  document.getElementById("popup-message").innerText = message;
  document.getElementById("custom-popup").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("custom-popup").classList.add("hidden");
}

function showLoading(text) {
  document.getElementById("loader-text").innerText = text;
  document.getElementById("loader").classList.remove("hidden");
}

function hideLoading() {
  document.getElementById("loader").classList.add("hidden");
}


