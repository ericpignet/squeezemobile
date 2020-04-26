# Mobile web interface for Squeezebox

## Installation

Prerequisites: install Git and Node.js

Then type the following commands in a console.

```
git clone http://github.com/ericpignet/squeeze-mobile.git
cd squeeze-mobile
npm install
npm install -g ionic
```

### Install locally (to try it)

```
ionic serve
```

### Install on a web server

```
ionic build
```

This will generate the website in subdirectory `www`.
Feel free to host it with any basic web server, for example Apache or Nginx.

Remark: if you plan to deploy the www files into a subdirectory of your main domain/IP, you will need to update the file `src/index.html` and adjust the `<base>` tag accordingly (for example `<base href="squeeze-mobile/" />`)

## Usage

Just click on the setting icon in the top-right corner and enter the full URL or your Logitech Media Server instance, including port.

Then select the active player in the 'Players' tab by clicking on the grey line.

Then browse your song collection in the 'Browse' tab and play or add to playlist.

Buttons to play/pause etc. are in the 'Playlist' tab.
You can reorder your playlist by using the reorder controlers on the right of each song.

In case of problem, don't hesitate to log an issue in Github.