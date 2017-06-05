const electron = require('electron');
const { app, Menu, Tray } = electron;

class TimerTray extends Tray {

	constructor(iconPath, timerWindow) {
		super(iconPath);
		this.timerWindow = timerWindow
		this.setToolTip('Timer App')
		this.on('click', this.onClick.bind(this))
		this.on('right-click', this.onRightClick.bind(this))
	}

	onClick(event, bounds) {
		const { x, y } = bounds;
		// Window height and width
		const { height, width } = this.timerWindow.getBounds();
		if (this.timerWindow.isVisible()) {
			this.timerWindow.hide()
		} else {
			const yPos = process.platform === 'darwin' ? y : y - height
			const xPos = Math.floor(x - width / 2)
			this.timerWindow.setBounds({
				x: xPos,
				y: yPos,
				height,
				width,
			});
			this.timerWindow.show();
		}
	}

	onRightClick() {
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