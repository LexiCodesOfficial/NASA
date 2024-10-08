# orrery
An interactive map of the Solar System created with Three.js and jQuery.

It's definitely better as a desktop web experience than mobile in the current version.

## Requirements
- [Three.js](https://github.com/mrdoob/three.js/)
- [jQuery](https://github.com/jquery/jquery) and [jQuery UI](https://github.com/jquery/jquery-ui)
- [Tween.js](https://github.com/tweenjs/tween.js/)

## Features
- Ephemerides for astronomical bodies in the Solar System, searachable for all above 1km in radius 
- Exaggerated orrery view at the solar system scale, zoomable to true scale for planetary systems
- Live data readout for the body's physical and orbital characteristics, right ascension/declination and altitude/azimuth coordintes relative to current location, rise and set times, and magnitude adjusted for atmospheric dispersion
- Links to articles and images from Wikipedia
- Background stars include all above 7th magnitude
- HTTPvars for latitiude/longitude, start time, and reducing particle count

## Setup
- npm i
- npm run app

## Usage
### Navigation
- SPACE BAR: Pause/resume time
- LEFT/RIGHT ARROW KEYS: Change speed
- DOWN ARROW KEY: Set to current time
- UP ARROW KEY: Toggle chase mode on focused object
- ESC: Release focus on object
- F2: Hide/show UI panels
- F4: Hide/show celestial sphere
- F8: Hide/show extra time info
- CLICK ON LABELS: Shift focus to object and display info
- CLICK ON INFO HEADER OR IMAGE: Learn more on Wikipedia
- LEFT/MID/RIGHT MOUSE + DRAG: Rotate/zoom/translate around focus
- SCROLL WHEEL: Zoom to focus
### HTTP Variables
- ?x=(decimal degrees): Longitude
- ?y=(decimal degrees): Latitude
- ?t=(YYYYMMDDHHMM): Date (Years can be -9999 to 9999, time in military time format, e.g. 0615)
- ?n=(integer) Small asteroid limit
