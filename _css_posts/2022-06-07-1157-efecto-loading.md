---
layout: lolnada/post
title:  Efecto Loading
date:   2022-06-07 11:57:00 -0400
source: https://codepen.io/t_afif/pen/dyZaYMB
---
<style type="text/css">
.ripple {
  width: 1rem; /* control the size */
  background: #ff0; /* control the color here */
}
.ripple,
.ripple::before,
.ripple::after {
  content: "";
  display: grid;
  grid-area: 1/1;
  aspect-ratio: 1;
  border-radius: 50%;
  box-shadow: 0 0 0 0 #ff03; /* and here, 3 is the transparency */
  animation: r 3s linear infinite var(--s,0s);
}
.ripple::before {--s: 1s}
.ripple::after  {--s: 2s}

@keyframes r {
  to {box-shadow: 0 0 0 6rem #0000}
}



body {
  margin: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 11rem;
  background: #000;
}
</style>

<div class="ripple"></div>
<div class="ripple" style="filter:hue-rotate(120deg)"></div>
<div class="ripple" style="filter:grayscale()"></div>