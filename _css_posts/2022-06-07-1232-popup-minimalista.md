---
layout: lolnada/post
title:  Popup minimalista
date:   2022-06-07 12:32:00 -0400
source: https://codepen.io/netsi1964/pen/PoOXLPN
---
<style type="text/css">
html, body {
	font-family: sans-serif;
	width: 100vw;
	height: 100vh;
	margin: 0;
	padding: 0;
}
body {
	display: grid;
	place-items: center;
}
.menu {
	background: hsla(120,40%,80%,.5);
	line-height: 2em;
	width: 150px;
	text-align: center;
	border-radius: 5px;
	cursor: pointer;
}
.testMenu {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.menuItems {
	position: absolute;
	z-index: 10;
	margin-top: 8em;
	display: none;
	list-style: none;
	padding: 10px;
	outline: solid 1px black;
	box-shadow: 0 0 5px;
	background: hsla(0,0%,100%,.95);
	border-radius: 5px;
}

.menuItems li {
	line-height: 2em;
}

code {
	border-radius: 3px;
	background: #eee;
	padding: 5px 10px;
}

h3 {
	text-align: center;
	line-height: 1.75em;
}
</style>

<div class="testMenu">
	<h3>
		A simple test of a popup menu<br>which will close when you<br><code>click outside</code> the menu<br>or <code>press Escape</code>
	</h3>
<a href="#" class="menu" onclick="openMenu()">Menu</a>
<nav class="menuItems">
	<li><a href="#" onclick="closeMenu()">Close menu [X]</a></li>
	<li>Menu should not close</li>
	<li>When clicking these two items</li>
	<li>You can close the menu by</li>
	<li>pressing Escape</li>
</nav>
</div>

<script type="text/javascript">
const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
let isMenuOpen = false;

function openMenu() {
	console.log('opening');
	nav.style.display = 'block';
	isMenuOpen = true;
	setTimeout(() => {
		document.body.addEventListener('click', clickOutside);
		document.body.addEventListener('keydown', checkForEscape);		
	})
}

function closeMenu() {
	console.log('closing');
	document.body.removeEventListener('click', clickOutside);
	document.body.removeEventListener('keydown', checkForEscape);
	nav.style.display = 'none';
	isMenuOpen = false;
}

function clickOutside(evt) {
	if (isMenuOpen) {
		const {target} = evt;
		const clickedOutside = !nav.contains(target);
		if (clickedOutside) {
			evt.preventDefault();
			console.log('Click outside menu -> closing');
			closeMenu();
		}
	}
}

function checkForEscape(evt) {
	if (isMenuOpen) {
		evt.preventDefault();
		const escapePressed = evt.key.toLowerCase() === 'escape';
		if (escapePressed) {
			evt.preventDefault();
			console.log('Esc pressed -> closing');
			closeMenu();
		}		
	}
}
</script>