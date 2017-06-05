const electron = require('electron');
const TimerTray = require('./app/timer_tray')
const TimerWindow = require('./app/timer_window')
const path = require('path');

const { app } = electron;

let timerWindow;
let tray

app.on('ready', () => {
	if (app.dock) {
		app.dock.hide()
	}
	timerWindow = new TimerWindow(`file://${__dirname}/src/index.html`);
	const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
	// not that electron will automatically pick the @2 icon version	
	const iconPath = path.join(__dirname, 'src', 'assets', iconName)
	tray = new TimerTray(iconPath, timerWindow, tray);
	//Note: tray parm only there to avoid 'Not used' warning
})