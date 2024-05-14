import{i as u,S as d}from"./assets/vendor-8c59ed88.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();function f(e){const r="43767722-bbce12454ab409ccbfe76519c",s="https://pixabay.com/api/";e.includes(" ")&&(e=e.replace(/\s+/g,"+"));const n=new URLSearchParams({key:r,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`${s}?${n}`).then(t=>{if(!t.ok)throw new Error(t.statusText);return t.json()})}function y(e){return`
    <div class="gallery-item">
      <a href="${e.largeImageURL}" class="gallery-link">
        <img src="${e.webformatURL}" alt="${e.tags}" class="gallery-image" />
      </a>
      <div class="thumb-block">
        ${c("Likes",e.likes)}
        ${c("Views",e.views)}
        ${c("Comments",e.comments)}
        ${c("Downloads",e.downloads)}
      </div>
    </div>
  `}function c(e,r){return`
    <div class="block">
      <h2 class="title">${e}</h2>
      <p class="amount">${r}</p>
    </div>
  `}function m(e){const r=document.querySelector(".gallery");r.innerHTML="";const s=e.map(n=>y(n)).join("");r.insertAdjacentHTML("beforeend",s)}function i(e){u.error({title:"Error",message:e})}function h(){const e=document.querySelector(".loader");e&&(e.style.display="block")}function l(){const e=document.querySelector(".loader");e&&(e.style.display="none")}const p=new d(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250,overlay:!0,close:!0,className:"custom-lightbox"}),g=document.querySelector(".js-search"),b=document.querySelector(".gallery");g.addEventListener("submit",e=>{e.preventDefault(),b.innerHTML="";const r=e.target.elements.search.value.trim();r&&(h(),f(r).then(s=>{if(l(),!s.hits.length){i("Sorry, there are no images matching your search query. Please try again!n");return}m(s.hits),p.refresh()}).catch(s=>{l(),i("Щось пішло не так. Будь ласка, спробуйте ще раз."),console.error(s)}))});
//# sourceMappingURL=commonHelpers.js.map
