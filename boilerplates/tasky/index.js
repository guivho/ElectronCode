const electron = require('electron');
const path = require('path');

const { app, BrowserWindow, Tray } = electron;

let mainWindow;
let tray;

app.on('ready', () => {
	mainWindow = new BrowserWindow({
		height: 500,
		width: 300,
		frame: false,
		resizable: false,
		show: false,
	});
	mainWindow.loadURL(`file://${__dirname}/src/index.html`)

	// not that electron will automatically pick the @2 icon version	
	const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
	const iconPath = path.join(__dirname, 'src', 'assets', iconName)
	tray = new Tray(iconPath);
	tray.on('click', (event, bounds) => {
		const { x, y } = bounds;
		// Window height and width
		const { height, width } = mainWindow.getBounds();
		if (mainWindow.isVisible()) {
			mainWindow.hide()
		} else {
			const yPos = process.platform === 'darwin' ? y : y - height
			const xPos = Math.floor(x - width / 2)
			mainWindow.setBounds({
				x: xPos,
				y: yPos,
				height,
				width,
			});
			mainWindow.show();
		}
	})
})