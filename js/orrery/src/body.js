import * as ORR from "./init.js";
/**
 * Superclass for celestial bodies. Not intended for direct use.
 * @constructor
 * @param {string} name
 * @param {number} type - Body type (0: planet, 1: dwarf planets, 2: large asteroids or moons, 3: small moons (3 and up not labeled at launch), 4: small asteroids or comets (default type)
 * @param {float} epoch - in MJD
 * @param {float} semiMajorAxis - in AU
 * @param {float} eccentricity
 * @param {float} inclination - in degrees
 * @param {float} w - Argument of periapsis in degrees
 * @param {float} longAscNode - Longitude of ascending node in degrees
 * @param {float} thetaDot - Rotation rate in degrees per century
 * @param {float} ringRadius - Radius of ring system as a multiple of radius
 * @param {url} texture - Texture map for surface
 * @param {url} ringTexture - Texture map for rings
 * @param {float} asbsoluteMag - Absolute magnitude
 * @param {float} zoomRatio - Initial scale of orrery view
 * @param {float} radius - in km
 * @param {float} mass - in 10^17 kg
 * @param {string} info - Display info
 * @param {url} wiki - Wikipedia entry
 * @param {url} wikipic - Wikipedia image
 */
export class Body {
    constructor (params) {
        this.name = this.hasData(params.name) ? params.name : "Unnamed";
        this.label = this.name;
        this.type = this.hasData(params.type) ? parseFloat(params.type) : 4;
        this.epoch = this.hasData(params.epoch) ? parseFloat(params.epoch) : 51544.5;
        this.semiMajorAxis = this.hasData(params.a) ? parseFloat(params.a) : 1;
        this.eccentricity = this.hasData(params.e) ? parseFloat(params.e) : 0;
        this.inclination = this.hasData(params.inc) ? parseFloat(params.inc) * ORR.toRad : 0; // convert angles to radians
        this.w = this.hasData(params.w) ? parseFloat(params.w) * ORR.toRad : 0;
        this.longAscNode = this.hasData(params.omega) ? parseFloat(params.omega) * ORR.toRad : 0;
        this.period = Math.pow(this.semiMajorAxis, 1.5) / 100; // store period in century time
        this.thetaDot = this.hasData(params.thetaDot) ? parseFloat(params.thetaDot) * ORR.toRad : 0;
        this.ringRadius = this.hasData(params.ringRadius) ? parseFloat(params.ringRadius) : 0;
        this.texture = this.hasData(params.texture) ? params.texture : "default";
        this.ringTexture = this.hasData(params.ringTexture) ? params.ringTexture : "";
        this.absoluteMag = this.hasData(params.H) ? parseFloat(params.H) : 10;
        this.zoomRatio = this.hasData(params.zoomRatio) ? parseFloat(params.zoomRatio) : 1000;
        this.radius = this.hasData(params.radius) ? parseFloat(params.radius) : ORR.estRadius(this.absoluteMag);
        this.mass = this.hasData(params.mass) ? (parseFloat(params.mass) * 10e+17) : (8.7523e+9 * Math.pow(this.radius, 3)); // mass estimation for 2.5g/cm^-3
        this.exagRadius = this.radius / ORR.AU * ORR.exagScale;
        this.meanOrbit = this.semiMajorAxis * (1 + this.eccentricity * this.eccentricity / 2);
        this.periapsis = (1 - this.eccentricity) * this.semiMajorAxis;
        this.apoapsis = (1 + this.eccentricity) * this.semiMajorAxis;

        // associated links
        this.info = this.hasData(params.info) ? params.info : "default";
        this.wiki = this.hasData(params.wiki) ? "https://en.wikipedia.org/wiki/" + params.wiki : "default";
        this.wikipic = this.hasData(params.wikipic) ? "https://upload.wikimedia.org/wikipedia/commons/" + params.wikipic : "default"
        this.mercury = this.hasData(params.mercury) ? "Mercury is the smallest planet in our solar system and the closest to the Sun. Its surface is heavily cratered due to frequent asteroid impacts. Despite its proximity to the Sun, Mercury is not the hottest planet, with temperatures ranging from scorching hot on the sun-facing side to freezing cold on the dark side. Mercury has no atmosphere, which contributes to its extreme temperature variations.":"Mercury is the smallest planet in our solar system and the closest to the Sun. Its surface is heavily cratered due to frequent asteroid impacts. Despite its proximity to the Sun, Mercury is not the hottest planet, with temperatures ranging from scorching hot on the sun-facing side to freezing cold on the dark side. Mercury has no atmosphere, which contributes to its extreme temperature variations."
        this.venus = this.hasData(params.venus) ? "Venus, Earth's evil 'twin,' is a scorching hot planet with a thick, toxic atmosphere. Its surface temperature is high enough to melt lead, and its atmosphere traps heat in a runaway greenhouse effect. Venus rotates slowly in the opposite direction from most planets, and its surface is covered in volcanoes and mountains.":"Venus, Earth's evil 'twin,' is a scorching hot planet with a thick, toxic atmosphere. Its surface temperature is high enough to melt lead, and its atmosphere traps heat in a runaway greenhouse effect. Venus rotates slowly in the opposite direction from most planets, and its surface is covered in volcanoes and mountains."
        this.earth = this.hasData(params.earth) ? "Earth, the third planet from the Sun, is a rocky, terrestrial planet with a solid surface. It is the only known planet to harbor life, thanks to its abundance of liquid water and oxygen-rich atmosphere. Earth has a single natural satellite, the Moon, and is the largest of the four inner planets. Its unique features, such as plate tectonics and a strong magnetic field, contribute to its ability to sustain life.":"Earth, the third planet from the Sun, is a rocky, terrestrial planet with a solid surface. It is the only known planet to harbor life, thanks to its abundance of liquid water and oxygen-rich atmosphere. Earth has a single natural satellite, the Moon, and is the largest of the four inner planets. Its unique features, such as plate tectonics and a strong magnetic field, contribute to its ability to sustain life."
        this.mars = this.hasData(params.mars) ? "The UAE's Mars rover, known as the Hope Probe, is a groundbreaking mission designed to study the Martian atmosphere. Launched in 2020, it successfully entered Mars' orbit the following year, making the UAE the first Arab nation to reach the Red Planet. Equipped with advanced instruments, the Hope Probe is collecting valuable data on the Martian climate, weather patterns, and the loss of hydrogen and oxygen gases. Its findings are helping scientists understand the evolution of Mars and its potential for supporting life in the past." : "The UAE's Mars rover, known as the Hope Probe, is a groundbreaking mission designed to study the Martian atmosphere. Launched in 2020, it successfully entered Mars' orbit the following year, making the UAE the first Arab nation to reach the Red Planet. Equipped with advanced instruments, the Hope Probe is collecting valuable data on the Martian climate, weather patterns, and the loss of hydrogen and oxygen gases. Its findings are helping scientists understand the evolution of Mars and its potential for supporting life in the past."
        this.jupiter = this.hasData(params.jupiter) ? "Jupiter, the largest planet in our solar system, is a gas giant primarily composed of hydrogen and helium. It's known for its iconic Great Red Spot, a massive storm that has raged for centuries. Jupiter has many moons, including the Galilean moons: Io, Europa, Ganymede, and Callisto. Europa is particularly intriguing due to its potential for harboring life beneath its icy surface.":"Jupiter, the largest planet in our solar system, is a gas giant primarily composed of hydrogen and helium. It's known for its iconic Great Red Spot, a massive storm that has raged for centuries. Jupiter has many moons, including the Galilean moons: Io, Europa, Ganymede, and Callisto. Europa is particularly intriguing due to its potential for harboring life beneath its icy surface."
        this.saturn = this.hasData(params.saturn) ? "Saturn is the second-largest planet in our solar system, known for its iconic rings. It's a gas giant primarily composed of hydrogen and helium. Saturn's rings are made of billions of icy particles, ranging from tiny dust grains to large boulders. The planet has over 80 moons, including Titan, the largest moon in the solar system.":"Saturn is the second-largest planet in our solar system, known for its iconic rings. It's a gas giant primarily composed of hydrogen and helium. Saturn's rings are made of billions of icy particles, ranging from tiny dust grains to large boulders. The planet has over 80 moons, including Titan, the largest moon in the solar system."
        this.pluto = this.hasData(params.pluto) ? "Pluto is a dwarf planet located in the Kuiper Belt, a region beyond Neptune. It's a frozen world composed mostly of ice and rock. Pluto has a thin atmosphere and is home to five moons, the largest of which is Charon. The New Horizons spacecraft was the first to visit Pluto, providing us with stunning images and valuable data about this distant celestial body.":"Pluto is a dwarf planet located in the Kuiper Belt, a region beyond Neptune. It's a frozen world composed mostly of ice and rock. Pluto has a thin atmosphere and is home to five moons, the largest of which is Charon. The New Horizons spacecraft was the first to visit Pluto, providing us with stunning images and valuable data about this distant celestial body."
        this.uranus = this.hasData(params.uranus) ? "Uranus, the seventh planet from the Sun, is an ice giant with a pale blue-green color. It's known for its extreme axial tilt, causing it to rotate on its side. Uranus has faint rings and numerous moons. Its atmosphere is composed primarily of hydrogen, helium, and methane.":"Uranus, the seventh planet from the Sun, is an ice giant with a pale blue-green color. It's known for its extreme axial tilt, causing it to rotate on its side. Uranus has faint rings and numerous moons. Its atmosphere is composed primarily of hydrogen, helium, and methane."
        this.neptune = this.hasData(params.neptune) ? "Neptune, the eighth and most distant planet from the Sun, is an icy giant known for its intense blue color and swirling storms. It was discovered mathematically in 1846. Neptune has 16 moons and a system of faint rings. Its atmosphere is composed primarily of hydrogen, helium, and methane.":"Neptune, the eighth and most distant planet from the Sun, is an icy giant known for its intense blue color and swirling storms. It was discovered mathematically in 1846. Neptune has 16 moons and a system of faint rings. Its atmosphere is composed primarily of hydrogen, helium, and methane."

        this.axisRA = (typeof params.axisRA != "undefined") ? parseFloat(params.axisRA) * ORR.toRad : 0;
        this.axisDec = (typeof params.axisDec != "undefined") ? parseFloat(params.axisDec) * ORR.toRad : Math.PI /2;
        this.path = {};
        this.toSun = 0;
        this.toEarth = 0;

        // retain initial epoch values
        this.aStart = this.semiMajorAxis;
        this.eStart = this.eccentricity;    
        this.incStart = this.inclination;
        this.omegaStart = this.longAscNode;
    }

    /**
     * Test if parameter has data.
     * @param {parameter} ref - Parameter
     * @returns {boolean} Field has data
     */
    hasData(ref) {
        return (typeof ref != "undefined" && ref.length > 0);
    }

    /**
     * Return phase integral of the incident angle.
     * @param {float} alpha - Incidence angle
     * @returns {float} Illumination parameter
     */
    phaseIntegral(alpha) { // metric for reflected light
        return (2 / 3) * ((1 - alpha / Math.PI) * Math.cos(alpha) + 1 / Math.PI * Math.sin(alpha));
    }
}