const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const now = new Date();
let hour = 00;
let minute = 00;
let second = 00;
let count = 00;
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db.sqlite');
db.run("CREATE TABLE czas (HowLong INT,dateActivity date,typeActivity INT)");
if(startBtn){
startBtn.addEventListener('click', function () {
	timer = true;
	stopWatch();
});
}
if(stopBtn){
stopBtn.addEventListener('click', function () {
	timer = false;
});
}
if(resetBtn){
resetBtn.addEventListener('click', function () {
	timer = false;
	let hrr = document.getElementById('hr').innerHTML 
	let minn = document.getElementById('min').innerHTML
	let ile = hrr*60+minn;
	const now = new Date();
	hour = 0;
	minute = 0;
	second = 0;
	count = 0;
	document.getElementById('hr').innerHTML = "00";
	document.getElementById('min').innerHTML = "00";
	document.getElementById('sec').innerHTML = "00";
	document.getElementById('count').innerHTML = "00";
	let typ = document.getElementById('akt').innerHTML;
	db.run(`INSERT INTO czas (HowLong, dateActivity,typeActivity) VALUES (${ile},${now.getDate},${typ}`)

});
}
function stopWatch() {
	if (timer) {
		count++;

		if (count == 100) {
			second++;
			count = 0;
		}

		if (second == 60) {
			minute++;
			second = 0;
		}

		if (minute == 60) {
			hour++;
			minute = 0;
			second = 0;
		}

		let hrString = hour;
		let minString = minute;
		let secString = second;
		let countString = count;
		if (minute < 10) {
			minString = "0" + minString;
		}

		if (second < 10) {
			secString = "0" + secString;
		}

		if (count < 10) {
			countString = "0" + countString;
		}
		if(minute==40){
			timer = false;
	let hrr = document.getElementById('hr').innerHTML 
	let minn = document.getElementById('min').innerHTML
	let ile = minn;
	const now = new Date();
	hour = 0;
	minute = 0;
	second = 0;
	count = 0;
	document.getElementById('hr').innerHTML = "00";
	document.getElementById('min').innerHTML = "00";
	document.getElementById('sec').innerHTML = "00";
	document.getElementById('count').innerHTML = "00";
	let typ = document.getElementById('akt').innerHTML;
	db.run(`INSERT INTO czas (HowLong, dateActivity,typeActivity) VALUES (${ile},${now.getDate},${typ}`)
	break;
		}
		else{
		document.getElementById('hr').innerHTML = hrString;
		document.getElementById('min').innerHTML = minString;
		document.getElementById('sec').innerHTML = secString;
		document.getElementById('count').innerHTML = countString;
		setTimeout(stopWatch, 10);
		}

		
	}
}

let timeFormWork = db.all(`SELECT Count(HowLong) FROM czas WHERE dateActivity=${now.getDate},typeActivity=${1}`)
let hrtimeForWork = timeFormWork/60;
if(hrtimeForWork<8)
{
document.getElementById("descriptionWork").innerHTML = `Przepracowałeś ${hrtimeForWork} godzin`;
 }
 else{
 	document.getElementById("descriptionWork").innerHTML = `Przepracowałeś powyżej 8 czas na odpoczynek`;
 }
 let timeForLesson = db.all(`SELECT Count(HowLong) FROM czas WHERE dateActivity=${now.getDate},typeActivity=${2}`)
 if(timeForLesson>0){
 	document.getElementById("descriptionLesson").innerHTML = `Uczyłeś się ${timeForLesson}`;
 }
 else{
 	document.getElementById("descriptionLesson").innerHTML = `Nie uczyłeś się dzisiaj`;
 }
 let timeForBook = db.all(`SELECT Count(HowLong) FROM czas WHERE dateActivity=${now.getDate},typeActivity=${3}`)
 if(timeForBook>0){
 	document.getElementById("descriptionBook").innerHTML = `Czytałeś książkę ${timeForLesson} minut`;
 }
 else{
 	document.getElementById("descriptionBook").innerHTML = `Nie czytałeś dzisiaj żadnej książki`;
 }
