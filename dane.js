"use strict";

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

function remind() {
  $("blockquote").addClass("ancient");
  setTimeout(function() {
    $(".ancient").remove();
    recreate();
  }, 2000);
}

function recreate() {
  var ev = events[Math.floor(Math.random()*events.length)];
  $(".container").append($("<blockquote></blockquote>").hide().append($("<h1></h1>").append($("<time></time>").attr("datetime", ev.date).text(ev.date).timeago()).append($("<br />")).append($("<a></a>").attr("href", ev.link).html(ev.text))).fadeIn("slow"));
}

$(document).ready(() => {
  $(".container").append($("<h2></h2>").text("Tymczasem"));
  recreate();
  setInterval(() => {
    remind();
  }, 5000);
});

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-56968622-6', 'auto');
ga('send', 'pageview');