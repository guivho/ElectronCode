const electron = require('electron');
const { BrowserWindow } = electron;

class TimerWindow extends BrowserWindow {
	constructor(url) {
		// this.timerWindow = new BrowserWindow({
		super({
			height: 500,
			width: 300,
			frame: false,
			resizable: false,
			show: false,
			// NOTE: needed to avoid slowdown while in background
			webPreferences: { backgroundThrottling: false },
		});
		debugger
		this.loadURL(url)
		this.on('blur', () => {
			this.hide()
		})
	}
}

module.exports = TimerWindow