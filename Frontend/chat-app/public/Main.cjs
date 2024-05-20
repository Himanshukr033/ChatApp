const { app, BrowserWindow } = require('electron');
const path = require('node:path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame:true,
        webPreferences: {
          nodeIntegration:true,
          contextIsolation:true,
          worldSafeExecution:true,
          enableRemoteModule:true
        }
    });

    mainWindow.loadURL(
      true
        ? 'http://localhost:5173'
        : `file://${path.resolve(path.join(__dirname,'..','dist','index.html'))}`
    );

}

app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })
  
  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })