const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let win

function createWindow() {
    var subpy = require('child_process').spawn('python', ['back/index.py'])
    var rq = require('request-promise')
    var mainURL = 'http://localhost:5000'

    var openWindow = function() {
        win = new BrowserWindow({width: 800, height: 600})

        win.loadURL(mainURL)

        win.webContents.openDevTools()

        win.on('closed', () => {
            win = null
        })
    }

    var StartUp = function() {
        rq(mainURL)
            .then(function(htmlString) {
                openWindow()
            })
            .catch(function(err) {
                StartUp()
            })
    }

    StartUp()
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})
