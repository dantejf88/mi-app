"use strict"
const MESSAGES = require("./Messages")
const ICONS = require("./Icons")

/** Headlines factory. **/

class HeadlinesFactory {

  constructor() { }

  getHeadlinesFromFinderStats(finderResult) {
    let
      headlines = [],
      badRoadHeadlines = []

    if (finderResult.stats) {
      if (finderResult.stats.radars && finderResult.stats.radars.length) {
        let ending = MESSAGES.RADARS_ENDING
        if (finderResult.stats.radars.length === 1) {
          ending = MESSAGES.SINGLE_RADARS_ENDING
        }
        headlines.push({
          text: MESSAGES.IN_FRONT_OF + finderResult.stats.radars.length + ending,
          icon: ICONS.RADAR
        })
        headlines.push({
          text: MESSAGES.KEEP_MY_ADVICE + finderResult.stats.radars.reduce((a, b) => a + b, 0) + MESSAGES.PENALTY_ENDING,
          icon: ICONS.RADAR
        })
      }

      if (finderResult.stats.police) {
        let ending = MESSAGES.POLICE_ENDING
        if (finderResult.stats.radars.length === 1) {
          ending = MESSAGES.SINGLE_POLICE_ENDING
        }
        headlines.push({
          text: MESSAGES.IN_FRONT_OF + finderResult.stats.police + ending,
          icon: ICONS.POLICE
        })
      }

      if (finderResult.stats.animals) {
        let ending = MESSAGES.ANIMALS_ENDING
        if (finderResult.stats.radars.length === 1) {
          ending = MESSAGES.SINGLE_ANIMALS_ENDING
        }
        headlines.push({
          text: MESSAGES.IN_FRONT_OF + finderResult.stats.animals + ending,
          icon: ICONS.ANIMALS
        })
      }

      if (finderResult.stats.toll) {
        let ending = MESSAGES.TOLL_ENDING
        if (finderResult.stats.radars.length === 1) {
          ending = MESSAGES.SINGLE_TOLL_ENDING
        }
        headlines.push({
          text: MESSAGES.IN_FRONT_OF + finderResult.stats.toll + ending,
          icon: ICONS.PRICE
        })
      }

      if (finderResult.stats.frozen) {
        badRoadHeadlines.push(MESSAGES.IS_FROZEN_ROAD)
      }
      if (finderResult.stats.blind) {
        badRoadHeadlines.push(MESSAGES.IS_BLIND_ROAD)
      }
      if (finderResult.stats.flood) {
        badRoadHeadlines.push(MESSAGES.IS_FLOOD_ROAD)
      }
      if (finderResult.stats.bad) {
        badRoadHeadlines.push(MESSAGES.IS_BAD_ROAD)
      }

      if (badRoadHeadlines.length === 1) {
        headlines.push({
          text: MESSAGES.ROAD_COULD_BE + badRoadHeadlines.pop(),
          icon: ICONS.ACCIDENT_ZONE
        })
      } else if (badRoadHeadlines.length > 1) {
        let badRoadHeadlineString = MESSAGES.ROAD_COULD_BE
        badRoadHeadlines.forEach((headline, index) => {
          let stringConcatenator = index < badRoadHeadlines.length - 2 ? MESSAGES.COLON : MESSAGES.AND
          badRoadHeadlineString += index === badRoadHeadlines.length - 1 ? headline : headline + stringConcatenator
        })
        headlines.push({
          text: badRoadHeadlineString,
          icon: ICONS.ACCIDENT_ZONE
        })
      }

      if (finderResult.stats.accidentZone) {
        let ending = MESSAGES.ACCIDENT_ZONE_ENDING
        if (finderResult.stats.radars.length === 1) {
          ending = MESSAGES.SINGLE_ACCIDENT_ZONE_ENDING
        }
        headlines.push({
          text: MESSAGES.ROAD_HAS + finderResult.stats.accidentZone + ending,
          icon: ICONS.ACCIDENT_ZONE
        })
      }

      if (finderResult.stats.driverIncidents) {
        let ending = MESSAGES.INCIDENT_ENDING
        if (finderResult.stats.radars.length === 1) {
          ending = MESSAGES.SINGLE_INCIDENT_ENDING
        }
        headlines.push({
          text: MESSAGES.WE_DETECT + finderResult.stats.driverIncidents + ending,
          icon: ICONS.CAR
        })
      }
    }

    headlines.push({
      text: MESSAGES.DONT_FORGET,
      icon: ICONS.CHECK
    })

    return headlines
  }
}

module.exports = new HeadlinesFactory()
