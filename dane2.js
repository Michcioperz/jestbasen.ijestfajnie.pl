function event(date, text, link) {
  return {date: date, text: text, link: link};
}

var events = [
  event("1986-09-30", "rozpoczęto emisję serialu Alter<wbr>natywy 4", "https://pl.wikipedia.org/wiki/Alternatywy_4"),
  event("1989-06-04", "skończył się komunizm w Polsce", "https://pl.wikipedia.org/wiki/Wybory_parlamentarne_w_Polsce_w_1989_roku"),
  event("1991-09-17", "Linus Torvalds opublikował pierwszą wersję swojego systemu operacyjnego", "https://pl.wikipedia.org/wiki/Linux"),
  event("1991-11-24", "zmarł Freddie Mercury", "https://pl.wikipedia.org/wiki/Freddie_Mercury"),
  event("1991-12-13", "premierę miał film „Rozmowy kontro<wbr>lowane”", "https://pl.wikipedia.org/wiki/Rozmowy_kontrolowane"),
  event("1993-03-22", "Intel wprowadził procesory Pentium na rynek", "https://pl.wikipedia.org/wiki/Pentium"),
  event("1995-01-01", "nastąpiła denomi<wbr>nacja złotego polskiego", "https://pl.wikipedia.org/wiki/Z%C5%82oty"),
  event("1996-07-05", "urodziła się sklono<wbr>wana owca Dolly", "https://pl.wikipedia.org/wiki/Owca_Dolly"),
  event("1997-08-31", "zginęła księżna Diana", "https://pl.wikipedia.org/wiki/Diana_(ksi%C4%99%C5%BCna_Walii)"),
  event("1997-10-17", "weszła w życie Konstytucja Rzeczy<wbr>pospo<wbr>litej Polskiej", "https://pl.wikipedia.org/wiki/Konstytucja_Rzeczypospolitej_Polskiej"),
  event("1998-09-04", "założono firmę Google", "https://pl.wikipedia.org/wiki/Google"),
  event("2000-03-26", "Władimir Putin został wybrany na prezydenta Rosji", "https://pl.wikipedia.org/wiki/W%C5%82adimir_Putin"),
  event("2001-09-11", "miał miejsce zamach na World Trade Center i Pentagon", "https://pl.wikipedia.org/wiki/Zamach_z_11_wrze%C5%9Bnia_2001_roku"),
  event("2004-05-01", "Polska została włączona do Unii Europejskiej", "https://pl.wikipedia.org/wiki/Traktat_ate%C5%84ski"),
  event("2005-04-02", "zmarł Jan Paweł II", "https://pl.wikipedia.org/wiki/Jan_Pawe%C5%82_II"),
  event("2009-06-25", "zmarł Michael Jackson", "https://pl.wikipedia.org/wiki/Michael_Jackson"),
  event("2011-05-02", "zabity został Osama bin Laden", "https://pl.wikipedia.org/wiki/Usama_ibn_Ladin"),
  event("2012-07-04", "ogłoszono odkrycie bozonu Higgsa", "http://home.cern/topics/higgs-boson"),
  event("2015-08-24", "liczba aktywnych użytkow<wbr>ników Facebooka przekro<wbr>czyła 1 miliard", "https://www.facebook.com/zuck/posts/10102329188394581"),
  event("2016-04-21", "zmarł Prince", "https://pl.wikipedia.org/wiki/Prince"),
];

var months = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"];

function readable_date(date) {
  var date_object = new Date(date);
  return ""+date_object.getDate()+" "+months[date_object.getMonth()]+" "+date_object.getFullYear();
}

function time_ago(date) {
  var time_delta = Date.now() - new Date(date);
  if (time_delta < 1000) return ""+time_delta.toFixed(2)+" milisekund temu";
  time_delta /= 1000;
  if (time_delta < 300) return ""+time_delta.toFixed(2)+" sekund temu";
  time_delta /= 60;
  if (time_delta < 100) return ""+time_delta.toFixed(2)+" minut temu";
  time_delta /= 60;
  if (time_delta < 30) return ""+time_delta.toFixed(2)+" godzin temu";
  time_delta /= 24;
  if (time_delta < 14) return ""+time_delta.toFixed(2)+" dni temu";
  time_delta /= 7;
  if (time_delta < 12) return ""+time_delta.toFixed(2)+" tygodni temu";
  time_delta *= 7;
  time_delta /= 30;
  if (time_delta < 15) return ""+time_delta.toFixed(2)+" miesięcy temu";
  time_delta *= 30;
  time_delta /= 365.25;
  return ""+time_delta.toFixed(2)+" lat temu";
}

var container;
var current;
var timebar;

function redate(elem) {
  var elem_datetime = elem.hasAttribute("datetime") ? elem.getAttribute("datetime") : elem.textContent;
  elem.setAttribute("title", readable_date(elem_datetime));
  elem.textContent = time_ago(elem_datetime);
}

function remind() {
  if (document.body.contains(current)) {
    current.classList.add("ancient");
    setTimeout(function() {
      current.remove();
      recreate();
    }, 1000);
  } else {
    recreate();
  }
}

function recreate() {
  var ev = events[Math.floor(Math.random()*events.length)];
  current = document.createElement("blockquote");
  var current_header = document.createElement("h1");
  var current_time = document.createElement("time");
  current_time.setAttribute("time", ev.date);
  current_time.setAttribute("title", readable_date(ev.date));
  current_time.textContent = time_ago(ev.date);
  current_header.appendChild(current_time);
  current_header.appendChild(document.createElement("br"));
  var current_link = document.createElement("a");
  current_link.setAttribute("href", ev.link);
  current_link.setAttribute("target", "_blank");
  current_link.innerHTML = ev.text;
  current_header.appendChild(current_link);
  current.appendChild(current_header);
  timebar.style.width = ""+100*((Date.now()-new Date(ev.date))/(Date.now()- new Date(document.getElementById("wazna-data").getAttribute("datetime"))))+"%";
  container.appendChild(current);
}

document.addEventListener("DOMContentLoaded", function() {
  container = document.getElementById("the-one-and-only");
  var timebar_wrapper = document.createElement("div");
  timebar_wrapper.setAttribute("id", "timebar-wrapper");
  timebar = document.createElement("div");
  timebar.setAttribute("id", "timebar");
  timebar_wrapper.appendChild(timebar);
  container.appendChild(timebar_wrapper);
  var tymczas = document.createElement("h2");
  tymczas.textContent = "Tymczasem";
  container.appendChild(tymczas);
  setInterval(function() {
    remind();
  }, 7000);
  remind();
  var redateMegadate = function() {
    redate(document.getElementById("wazna-data"));
  };
  redateMegadate();
  setInterval(redateMegadate, 10000);
});

window.addEventListener("load", function() {
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("serviceWorker.js", {scope: "./"});
});
