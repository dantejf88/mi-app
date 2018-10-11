"use strict"

/** This class is an alert array filter. **/

// Converts from degrees to radians.
Math.toRadians = (degrees) => {
    return degrees * Math.PI / 180;
};

class Finder {

  constructor() {
    this.EARTH_RADIUS = 6371009
    this.DEFAULT_RADAR_PRICE = 500
    this.toleranceEarth = 50
    this.tolerance = this.toleranceEarth / this.EARTH_RADIUS
  }

    // Returns sin(arcHav(x) + arcHav(y)).

    sinSumFromHav(x, y) {
    let
        a = Math.sqrt(x * (1 - x)),
        b = Math.sqrt(y * (1 - y));

    return 2 * (a + b - 2 * (a * y + b * x));
    }

    // Returns hav(asin(x)).

    havFromSin(x) {
    let x2 = x * x;
    return x2 / (1 + Math.sqrt(1 - x2)) * 0.5;
    }

    // Given h==hav(x), returns sin(abs(x)).

    sinFromHav(h) {
    return 2 * Math.sqrt(h * (1 - h));
    }

    /**
     * Returns haversine(angle-in-radians).
     * hav(x) == (1 - cos(x)) / 2 == sin(x / 2)^2.
     */

    hav(x) {
    let sinHalf = Math.sin(x * 0.5);
    return sinHalf * sinHalf;
    }

    /**
     * Returns hav() of distance from (lat1, lng1) to (lat2, lng2) on the unit sphere.
     */

    havDistance(lat1, lat2, dLng) {
    return this.hav(lat1 - lat2) + this.hav(dLng) * Math.cos(lat1) * Math.cos(lat2);
    }

    /**
     * Returns sin(initial bearing from (lat1,lng1) to (lat3,lng3) minus initial bearing
     * from (lat1, lng1) to (lat2,lng2)).
     */

    sinDeltaBearing(lat1, lng1, lat2, lng2, lat3, lng3) {
    let
        sinLat1 = Math.sin(lat1),
        cosLat2 = Math.cos(lat2),
        cosLat3 = Math.cos(lat3),
        lat31 = lat3 - lat1,
        lng31 = lng3 - lng1,
        lat21 = lat2 - lat1,
        lng21 = lng2 - lng1,
        a = Math.sin(lng31) * cosLat3,
        c = Math.sin(lng21) * cosLat2,
        b = Math.sin(lat31) + 2 * sinLat1 * cosLat3 * this.hav(lng31),
        d = Math.sin(lat21) + 2 * sinLat1 * cosLat2 * this.hav(lng21),
        denom = (a * a + b * b) * (c * c + d * d)

    return denom <= 0 ? 1 : (a * d - b * c) / Math.sqrt(denom);
    }

    isOnSegmentGC(lat1, lng1, lat2, lng2, lat3, lng3, havTolerance) {

    let havDist13 = this.havDistance(lat1, lat3, lng1 - lng3);

    if (havDist13 <= havTolerance) {
        return true;
    }
    let havDist23 = this.havDistance(lat2, lat3, lng2 - lng3);

    if (havDist23 <= havTolerance) {
        return true;
    }
    let sinBearing = this.sinDeltaBearing(lat1, lng1, lat2, lng2, lat3, lng3);
    let sinDist13 = this.sinFromHav(havDist13);
    let havCrossTrack = this.havFromSin(sinDist13 * sinBearing);
    if (havCrossTrack > havTolerance) {
        return false;
    }
    let havDist12 = this.havDistance(lat1, lat2, lng1 - lng2);
    let term = havDist12 + havCrossTrack * (1 - 2 * havDist12);
    if (havDist13 > term || havDist23 > term) {
        return false;
    }
    if (havDist12 < 0.74) {
        return true;
    }
    let cosCrossTrack = 1 - 2 * havCrossTrack;
    let havAlongTrack13 = (havDist13 - havCrossTrack) / cosCrossTrack;
    let havAlongTrack23 = (havDist23 - havCrossTrack) / cosCrossTrack;
    let sinSumAlongTrack = this.sinSumFromHav(havAlongTrack13, havAlongTrack23);

    // Compare with half-circle == Math.PI using sign of sin().

    return sinSumAlongTrack > 0;
    }

isPolice(alert) {
    if (alert.alertType === "POLICE_CONTROL") {
        return true
    }
        return false
}

isRadar(alert) {
    if (alert.alertType === "RADAR" || alert.alertType === "RADAR_MOVIL" || alert.alertType === "FIXED_RADAR") {
        return true
    }
        return false
}

isToll(alert) {
    if (alert.alertType === "TOLL") {
        return true
    }
        return false
}

isAnimal(alert) {
    if (alert.alertType === "ANIMALS") {
        return true
    }
        return false
}

isFrozenRoad(alert) {
    if (alert.alertType === "FROZEN_ROAD") {
        return true
    }
        return false
}

isBlindRoad(alert) {
    if (alert.alertType === "BLIND_ROAD") {
        return true
    }
        return false
}

isBadRoad(alert) {
    if (alert.alertType === "BAD_ROAD") {
        return true
    }
        return false
}

isFloodZone(alert) {
    if (alert.alertType === "FLOOD_ZONE") {
        return true
    }
        return false
}

isAccidentZone(alert) {
    if (alert.alertType === "ACCIDENT_ZONE") {
        return true
    }
        return false
}

isDriverIncident(alert) {
    if (alert.alertType === "FLARE" || alert.alertType === "AUTO_FLARE" || alert.alertType === "ROAD_INCIDENT") {
        return true
    }
        return false
}

getAlertsNearPolyline(alerts, polyArray) {
    let initialPoint = polyArray[0]
    let havTolerance = this.hav(this.tolerance)
    let
        police = 0,
        radars = [],
        animals = 0,
        frozen = 0,
        blind = 0,
        bad = 0,
        flood = 0,
        accidentZone = 0,
        driverIncidents = 0

      alerts = alerts.map(alert => {
        let
          alertLat = Math.toRadians(alert.lat),
          alertLon = Math.toRadians(alert.lon),
          prevLat = Math.toRadians(initialPoint[0]),
          prevLon = Math.toRadians(initialPoint[1]),
          idx = 0,
          result = -1

        for (let point of polyArray) {
            let
              nextLat = Math.toRadians(point[0]),
              nextLon = Math.toRadians(point[1])

            if (this.isOnSegmentGC(prevLat, prevLon, nextLat, nextLon, alertLat, alertLon, havTolerance)) {

            /* Stats */
              result = Math.max(0, idx - 1);
              police += this.isPolice(alert) ? 1 : 0
              animals += this.isAnimal(alert) ? 1 : 0
              frozen += this.isFrozenRoad(alert) ? 1 : 0
              blind += this.isBlindRoad(alert) ? 1 : 0
              bad += this.isBadRoad(alert) ? 1 : 0
              flood += this.isFloodZone(alert) ? 1 : 0
              accidentZone += this.isAccidentZone(alert) ? 1 : 0
              driverIncidents += this.isDriverIncident(alert) ? 1 : 0

              if (this.isRadar(alert)) {

                  if (alert.alertOptions && alert.alertOptions.price) {
                    radars.push(alert.alertOptions.price)
                  } else {
                    radars.push(this.DEFAULT_RADAR_PRICE)
                  }
                }

              break
            }

            prevLat = nextLat;
            prevLon = nextLon;
            idx += 1;

        }

        result = result !== -1 ? alert._id : null

        return result
      }).filter(result => result !== null ? true : false)

      return {
        alerts,
        stats: {
            police,
            radars,
            animals,
            frozen,
            blind,
            bad,
            flood,
            accidentZone,
            driverIncidents
        }
      }
  }
}

module.exports = new Finder()
