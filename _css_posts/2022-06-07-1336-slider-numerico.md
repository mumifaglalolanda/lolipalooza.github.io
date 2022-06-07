---
layout: lolnada/post
title:  Slider numérico
date:   2022-06-07 13:36:00 -0400
source: https://codepen.io/jkantner/pen/oNGzBmm
---
<style type="text/css">
* {
	border: 0;
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}
:root {
	--hue: 223;
	--bg: hsl(var(--hue),10%,90%);
	--fg: hsl(var(--hue),10%,10%);
	font-size: calc(20px + (30 - 20) * (100vw - 320px) / (1280 - 320));
}
body, button {
	font: 1em/1.5 Inter, sans-serif;
}
body {
	background-color: var(--bg);
	color: var(--fg);
	height: 100vh;
	display: grid;
	place-items: center;
	transition: background-color 0.3s;
}

.stepper {
	background-color: var(--fg);
	border-radius: 1em;
	box-shadow: 0 0.75em 1em hsla(0,0%,0%,0.2);
	color: var(--bg);
	font-weight: bold;
	overflow: hidden;
	padding: 0.75em 0.375em;
	position: relative;
	width: 6em;
	height: 3em;
	transition:
		background-color 0.3s,
		color 0.3s,
		transform 0.15s ease-in-out;
	-webkit-appearance: none;
	appearance: none;
	-webkit-tap-highlight-color: #0000;
}
.stepper:active {
	transform: scale(0.95);
	transition-delay: 0s, 0s, 0.15s;
}
.stepper__btn-area,
.stepper__btn-area:before,
.stepper__btn-click,
.stepper__value {
	position: absolute;
}
.stepper__btn-area,
.stepper__btn-area:before,
.stepper__btn-click {
	display: block;
	top: 0;
	left: 0;
}
.stepper__btn-area {
	width: 2em;
	height: 3em;
}
.stepper__btn-area + .stepper__btn-area {
	right: 0;
	left: auto;
}
.stepper__btn-area:before {
	border-radius: 50%;
	box-shadow: 0 0 0 0 var(--bg) inset;
	content: "";
	opacity: 0;
	pointer-events: none;
	top: 0.5em;
	width: 2em;
	height: 2em;
	transform: scale(2.5);
	transition: all 0.4s ease-out;
}
.stepper__btn-area:not(:disabled):active:before {
	box-shadow: 0 0 0 1em var(--bg) inset;
	opacity: 0.25;
	transform: scale(1);
	transition:
		opacity 0.2s ease-out,
		transform 0.2s ease-out;
}
.stepper__btn-click {
	width: 100%;
	height: 100%;
}
.stepper__value {
	animation-duration: 0.3s;
	animation-timing-function: ease-in-out;
	display: inline-block;
	font-size: 1.5em;
	line-height: 1;
	top: calc(50% - 0.75rem);
	left: calc(50% - 1rem);
	text-align: center;
	width: 2rem;
	height: 1.5rem;
	-webkit-user-select: none;
	user-select: none;
}
.stepper__value[data-pos="off-left"],
.stepper__value[data-pos="prev"],
.stepper__value[data-pos="next"],
.stepper__value[data-pos="off-right"] {
	opacity: 0.5;
}
.stepper__value[data-pos="off-left"] {
	transform: translateX(-2.67em) scale(0.5);
}
.stepper__value[data-pos="prev"] {
	transform: translateX(-1.33em) scale(0.5);
}
.stepper__value[data-pos="cur"] {
	transform: translateX(0);
}
.stepper__value[data-pos="next"] {
	transform: translateX(1.33em) scale(0.5);
}
.stepper__value[data-pos="off-right"] {
	transform: translateX(2.67em) scale(0.5);
}
.stepper--move-left .stepper__value[data-pos="off-left"] {
	animation-name: moveOffLeft;
}
.stepper--move-left .stepper__value[data-pos="prev"] {
	animation-name: middleToLeft;
}
.stepper--move-left .stepper__value[data-pos="cur"] {
	animation-name: rightToMiddle;
}
.stepper--move-left .stepper__value[data-pos="next"] {
	animation-name: comeInRight;
}
.stepper--move-right .stepper__value[data-pos="prev"] {
	animation-name: comeInLeft
}
.stepper--move-right .stepper__value[data-pos="cur"] {
	animation-name: leftToMiddle
}
.stepper--move-right .stepper__value[data-pos="next"] {
	animation-name: middleToRight;
}
.stepper--move-right .stepper__value[data-pos="off-right"] {
	animation-name: moveOffRight;
}

/* Dark theme */
@media (prefers-color-scheme: dark) {
	:root {
		--bg: hsl(var(--hue),10%,20%);
		--fg: hsl(var(--hue),10%,90%);
	}
}

/* Animations */
@keyframes comeInRight {
	from {
		transform: translateX(2.67em) scale(0.5);
	}
	to {
		transform: translateX(1.33em) scale(0.5);
	}
}
@keyframes rightToMiddle {
	from {
		opacity: 0.5;
		transform: translateX(1.33em) scale(0.5);
	}
	to {
		opacity: 1;
		transform: translateX(0) scale(1);
	}
}
@keyframes middleToLeft {
	from {
		opacity: 1;
		transform: translateX(0) scale(1);
	}
	to {
		opacity: 0.5;
		transform: translateX(-1.33em) scale(0.5);
	}
}
@keyframes moveOffLeft {
	from {
		transform: translateX(-1.33em) scale(0.5);
	}
	to {
		transform: translateX(-2.67em) scale(0.5);
	}
}
@keyframes comeInLeft {
	from {
		transform: translateX(-2.67em) scale(0.5);
	}
	to {
		transform: translateX(-1.33em) scale(0.5);
	}
}
@keyframes leftToMiddle {
	from {
		opacity: 0.5;
		transform: translateX(-1.33em) scale(0.5);
	}
	to {
		opacity: 1;
		transform: translateX(0) scale(1);
	}
}
@keyframes middleToRight {
	from {
		opacity: 1;
		transform: translateX(0) scale(1);
	}
	to {
		opacity: 0.5;
		transform: translateX(1.33em) scale(0.5);
	}
}
@keyframes moveOffRight {
	from {
		transform: translateX(1.33em) scale(0.5);
	}
	to {
		transform: translateX(2.67em) scale(0.5);
	}
}
</style>

<button class="stepper" type="button" value="0">
	<span class="stepper__value" data-pos="off-left" aria-hidden="true">-2</span>
	<span class="stepper__value" data-pos="prev" aria-hidden="true">-1</span>
	<span class="stepper__value" data-pos="cur">0</span>
	<span class="stepper__value" data-pos="next" aria-hidden="true">1</span>
	<span class="stepper__value" data-pos="off-right" aria-hidden="true">2</span>
	<span class="stepper__btn-area">
		<span class="stepper__btn-click" data-dir="down"></span>
	</span>
	<span class="stepper__btn-area">
		<span class="stepper__btn-click" data-dir="up"></span>
	</span>
</button>

<script type="text/javascript">
window.addEventListener("DOMContentLoaded",() => {
	const stepper = new SlidingStepper(".stepper",{
		step: 1,
		min: -9,
		value: 0,
		max: 99
	});
});

class SlidingStepper {
	constructor(qs,args) {
		const { step, min, value, max } = args;

		this.el = document.querySelector(qs);
		this.step = step !== undefined ? step : 1;
		this.min = min !== undefined ? min : -9;
		this.value = value !== undefined ? value : 0;
		this.max = max !== undefined ? max : 99;
		this.valuePos = 0;
		this.values = [];
		this.posData = [
			"off-left",
			"prev",
			"cur",
			"next",
			"off-right"
		];

		this.init();
		this.changeValue();

		if (this.el) {
			this.el.addEventListener("click",this.changeValue.bind(this));
			this.el.addEventListener("keydown",this.changeValue.bind(this));
		}
	}
	init() {
		// ensure step is a number above 0, or suffer an infinite loop later
		if (this.step < 1 || isNaN(this.step))
			this.step = 1;

		// handle a value being outside bounds
		if (this.value < this.min)
			this.value = this.min;
		else if (this.value > this.max)
			this.value = this.max;

		// ensure min is less than max, or make it same as max
		if (this.min > this.max)
			this.min = this.max;

		// load values before initial…
		for (let l = this.value; l >= this.min; l -= this.step)
			this.values.unshift(l);
		this.values.unshift(this.min);

		// …then those after it
		for (let r = this.value; r <= this.max; r += this.step)
			this.values.push(r);
		this.values.push(this.max);

		// kill the dupes
		this.values = [...new Set(this.values)];

		// initial value
		this.valuePos = this.values.indexOf(this.value);
	}
	changeValue(e) {
		// get the direction
		let dir = null;

		if (e) {
			const { key, target } = e;

			if (key) {
				if (key === "ArrowUp" || key === "ArrowRight")
					dir = "up";
				else if (key === "ArrowDown" || key === "ArrowLeft")
					dir = "down";

			} else {
				dir = target.getAttribute("data-dir");
			}
		}

		// reset the animation
		const cl = this.el ? this.el.classList : null;

		if (cl) {
			cl.remove("stepper--move-left","stepper--move-right");
			void this.el.offsetWidth;
		}

		// increment or decrement, apply the animation
		if (dir === "up" && this.valuePos < this.values.length - 1) {
			++this.valuePos;
			cl.add("stepper--move-left");

		} else if (dir === "down" && this.valuePos > 0) {
			--this.valuePos;
			cl.add("stepper--move-right");
		}

		this.value = this.values[this.valuePos];
		this.el.value = this.value;

		// update the display
		if (this.el) {
			this.posData.forEach((p,i) => {
				const pos = this.el.querySelector(`[data-pos="${p}"]`);

				if (pos) {
					const relIndex = this.valuePos + (i - 2);
					const value = this.values[relIndex];

					pos.innerText = value !== undefined ? value : "";
				}
			});
		}
	}
}
</script>