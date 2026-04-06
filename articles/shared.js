// Language toggle for article pages
(function(){
  let currentLang = "ar";
  const btn = document.getElementById("langToggle");
  if(!btn) return;
  btn.addEventListener("click", function(){
    currentLang = currentLang === "ar" ? "en" : "ar";
    this.textContent = currentLang === "ar" ? "EN" : "عربي";
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
    document.body.dir = currentLang === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-"+currentLang+"]").forEach(el => {
      el.textContent = el.dataset[currentLang];
    });
    document.querySelectorAll("[data-"+currentLang+"-html]").forEach(el => {
      el.innerHTML = el.dataset[currentLang+"Html"];
    });
    // Update page title
    const titleEl = document.querySelector("title");
    if(titleEl && titleEl.dataset[currentLang]){
      titleEl.textContent = titleEl.dataset[currentLang];
    }
  });
})();
