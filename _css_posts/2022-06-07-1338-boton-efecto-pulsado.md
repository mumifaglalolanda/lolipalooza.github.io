---
layout: lolnada/post
title:  Botón efecto pulsado
date:   2022-06-07 13:38:00 -0400
source: https://codepen.io/t_afif/pen/zYPyXdv
---
<style type="text/css">
button {
  border: 2px solid;
  padding: 15px 40px;
  font-size: 25px;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  background:  
    radial-gradient(circle, #0000 1%, var(--c) 1%) 50%/0%
    var(--c);
  transition: background 0.6s;
}
button:hover,
button:focus-visible{
  background-size: 15000%;
}
button:active {
  background-color: var(--r,#FA6900); /* color of the ripple effect*/
  background-size: 100%;
  transition: 0s;
}
button:focus-visible {
  outline-offset: 2px;
  outline: 3px solid #000;
}

.light {
  --c: #fff;
  color: #0B486B;
}
.dark {
  --c: #0B486B;
  color: #fff;
  border-color: var(--c);
}


body {
  margin:0;
  height:100vh;
  display:grid;
  grid-auto-flow:column;
  place-content:center;
  grid-gap:50px;
}
</style>

<button class="light">Button</button>
<button class="dark" style="--r: #f3738a;">Button</button>
