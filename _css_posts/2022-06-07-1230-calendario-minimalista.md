---
layout: lolnada/post
title:  Calendario minimalista
date:   2022-06-07 12:29:00 -0400
source: https://codepen.io/leimapapa/pen/MWOZEKj
---
<style type="text/css">
body{
	margin:0 auto;
	background:steelblue;
}
#d {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	height:200px;
	width:200px;
	border-radius:13px;
	background:rgba(0,0,0,0.2);
	border:2px solid rgba(255,255,255,0.5);
	padding-top:10px;
	padding-bottom:10px;
}
.left, .right {
	background:none;
	color:#fff;
	padding:0;
	margin:0 auto;
	border:1px solid rgba(255,255,255,0.5);
	height:7.5%;
	width:7.5%;
	font-size:10px;
	line-height:10px;
	cursor:pointer;
	position:absolute;
}
.right{
	top:5%;
	left:10%;
	border-radius:0px 3px 3px 0px;
}
.left{
	top:5%;
	left:3%;
	border-radius:3px 0px 0px 3px;
}
.right:hover, .left:hover{
	opacity:0.7;
}
.day:hover{
	stroke:#fff;
}
.saturday, .sunday{
	fill:rgba(255,255,255,0.1);
}
svg{
/* 	border:2px solid red; */
}
.today{
	fill:rgba(0,255,0,0.3);
}
</style>

<div id="d">
	<button class="left">
		<svg height="100%" width="100%" viewbox="0 0 10 10">
			<path d="m 7 1 L 1 5 L 7 9 Z" fill="rgba(255,255,255,0.8)" />
		</svg></button>
	<button class="right">
		<svg height="100%" width="100%" viewbox="0 0 10 10">
			<path d="m 3 1 L 9 5 L 3 9 Z" fill="rgba(255,255,255,0.8)" />
		</svg>
	</button>
</div>

<script type="text/javascript">
//this one SVG calendar function is all you need.
//************************
const svgCal = (
	el = document.querySelector("#svgCalendar"), 
	today = new Date()) => {
	if (!el) {
		console.error('Tell us where to put the calendar!');
		return;
	}
	const DAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
	const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
	
	const month = today.getMonth();
	const dayOfMonth = today.getDate();
	const year = today.getFullYear();
	const firstDayOfMonth = new Date(year, month, 1).getDay();
	const daysInMonth = new Date(year, month + 1, 0).getDate();

	//capitalized month name
	const displayMonth = MONTHS[month].charAt(0).toUpperCase() + MONTHS[month].slice(1);
	
	//create array of weekdays in order
	let datesArray = [];
	for (let i = 0; i < daysInMonth; i++) {
		datesArray.push((i + firstDayOfMonth) % 7);
	}

	let displayDates = datesArray;

	//create svg
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	// svg.id = 'svg';
	svg.setAttributeNS(
		"http://www.w3.org/2000/xmlns/",
		"xmlns:xlink",
		"http://www.w3.org/1999/xlink"
	);
	svg.setAttribute("viewBox", "0 0 140 140");

	//split weekdays into sub-arrays at 6
	let daysByWeek = [];
	for (var i = 0; i < datesArray.length; i++) {
		if (datesArray[i] == 6) {
			daysByWeek.push(datesArray.slice(0, i + 1));
			datesArray = datesArray.slice(i + 1);
			i = -1;
		}
	}
	daysByWeek.push(datesArray);
	
	let dayOfMonthDisplay = 1;
	
	//loop through the weeks
	for (let week = 0; week < daysByWeek.length; week++) {
		const days = daysByWeek[week];
		//loop through the days in each week
		for (let day = 0; day < days.length; day++) {
			let dayFill = "rgba(255,255,255,0.2)";
			let dayStroke = "rgba(255,255,255,0.2)";
			//day box
			const dayBox = document.createElementNS("http://www.w3.org/2000/svg", "rect");
			dayBox.classList.add("day");
			
			//set a referencable dateTime
			const dateTime = new Date(year, month, dayOfMonthDisplay);
			dayBox.setAttribute('data-datetime', dateTime);
			dayBox.classList.add(DAYS[dateTime.getDay()]);
			
			let dayStroke2;
			//is rect passed in today?
				if (new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime() == dateTime.getTime()) {
					dayStroke2 = "rgba(255,255,255,1)";
					dayBox.classList.add('today');
				} else {
					dayStroke2 = dayStroke;
				}

			const dayBoxAttrs = {
				x: days[day] * 20,
				y: (week + 1) * 20,
				height: 20,
				width: 20,
				fill: dayFill,
				stroke: dayStroke2,
				"stroke-width": 1
			};
			for (let key in dayBoxAttrs) {
				dayBox.setAttribute(key, dayBoxAttrs[key]);
			}

			//capitalized weekday
			const displayWeekday = DAYS[days[day]].charAt(0).toUpperCase() + DAYS[days[day]].slice(1);
			
			//title of each rect
			const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
			title.textContent = `${displayWeekday}, ${displayMonth} ${dayOfMonthDisplay}, ${year}`;
			dayBox.appendChild(title);
			
			//text of each rect
			const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
			text.textContent = dayOfMonthDisplay;
			const textAttrs = {
				x: (days[day] * 20) + 10,
				y: ((week + 1) * 20) + 10,
				"dominant-baseline": "middle",
				fill: "#fff",
				"font-family": "monospace",
				"font-size": 5,
				"text-anchor": "middle",
				"pointer-events": "none",
				"user-select": "none"
			};
			for (let key in textAttrs) {
				text.setAttribute(key, textAttrs[key]);
			}
			
			//append it all
			svg.appendChild(dayBox);
			svg.appendChild(text);
			
			//increment display date
			dayOfMonthDisplay++;
		}
	}
	
	//month
	const monthDisplay = document.createElementNS("http://www.w3.org/2000/svg",	"text");
	monthDisplay.textContent = `${displayMonth}`;
	monthDisplay.classList.add("month");
	monthDisplay.classList.add(MONTHS[month]);
	let monthTextAttrs = {
		x: "50%",
		y: 10,
		"dominant-baseline": "middle",
		fill: "#fff",
		"font-family": "monospace",
		"font-size": 10,
		"text-anchor": "middle",
		"pointer-events": "none",
		"user-select": "none"
	};
	for (let key in monthTextAttrs) {
		monthDisplay.setAttribute(key, monthTextAttrs[key]);
	}
	svg.appendChild(monthDisplay);

	//year
	const yearDisplay = document.createElementNS("http://www.w3.org/2000/svg","text");
	yearDisplay.textContent = year;
	yearDisplay.classList.add("year");
	let yearTextAttrs = {
		x: 128,
		y: 10,
		"dominant-baseline": "middle",
		fill: "#fff",
		"font-family": "Roboto Condensed",
		"font-size": 6,
		"text-anchor": "middle",
		"pointer-events": "none",
		"user-select": "none"
	};
	for (let key in yearTextAttrs) {
		yearDisplay.setAttribute(key, yearTextAttrs[key]);
	}
	
	svg.appendChild(yearDisplay);
	el.appendChild(svg);
};
//************************
//That's it. That's all there is to it.
// Use it by pointing it at an element:
// svgCal(document.querySelector("#myElement"));


//use it!
let month = 0;
let today = new Date(new Date().getFullYear(), new Date().getMonth() + month, new Date().getDate());

const currentMonth = () => {
	let target = document.querySelector('#d');
	target.removeChild(target.lastChild);
	svgCal(document.querySelector("#d"));
}
currentMonth();

document.querySelector('.left').addEventListener('click', () => {
	let target = document.querySelector('#d');
	target.removeChild(target.lastChild);
	month--;
	today = new Date(new Date().getFullYear(), new Date().getMonth() + month, 1);
	svgCal(target, today);
});

document.querySelector('.right').addEventListener('click', () => {
	let target = document.querySelector('#d');
	target.removeChild(target.lastChild);
	month++;
	today = new Date(new Date().getFullYear(), new Date().getMonth() + month, 1);
	svgCal(target, today);
});
</script>