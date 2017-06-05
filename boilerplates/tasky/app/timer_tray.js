const electron = require('electron');
const { app, Menu, Tray } = electron;

class TimerTray extends Tray {

	constructor(iconPath, mainWindow) {
		super(iconPath);
		this.mainWindow = mainWindow
		this.setToolTip('Timer App')
		this.on('click', this.onClick.bind(this))
		this.on('right-click', this.onRightClick.bind(this))
	}

	onClick(event, bounds) {
		const { x, y } = bounds;
		// Window height and width
		const { height, width } = this.mainWindow.getBounds();
		if (this.mainWindow.isVisible()) {
			this.mainWindow.hide()
		} else {
			const yPos = process.platform === 'darwin' ? y : y - height
			const xPos = Math.floor(x - width / 2)
			this.mainWindow.setBounds({
				x: xPos,
				y: yPos,
				height,
				width,
			});
			this.mainWindow.show();
		}
	}

	onRightClick(event, bounds) {
		const menuConfig = Menu.buildFromTemplate([
			{
				label: 'Quit',
				click: () => app.quit()
			}
		])
		this.popUpContextMenu(menuConfig)
	}

}

module.exports = TimerTray;