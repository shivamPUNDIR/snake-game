const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;
let scoreWindow;

// SET ENV
process.env.NODE_ENV = 'development';

app.on('ready', function () {
    // Create new window
    mainWindow = new BrowserWindow({
        height:670,
        width:630,
        resizable:false,
        webPreferences: {
            nodeIntegration:true
        },
        backgroundColor:"#fff"
    });
    // Load html in window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
    // Quit app when closed
    mainWindow.on('closed', function () {
        app.quit();
    });

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);
});


// Create menu template
const mainMenuTemplate = [
    // Each object is a dropdown
    {
        label: 'File',
        submenu: [


            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
];

// If OSX, add empty object to menu
if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({});
}

// Add developer tools option if in dev
if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                role: 'reload'
            },
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    });
}
