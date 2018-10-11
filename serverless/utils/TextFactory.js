"use strict"

const ALERT_TYPES = require("./AlertTypes.js");
const INCIDENT_TYPES = require("./IncidentTypes.js");
const RESUME_TYPES = require("./ResumeTypes.js");
const ICONS = require("./Icons.js");

module.exports.getTextIcon = (incident) => {
	switch (incident.incidentType) {
		case INCIDENT_TYPES.NOT_RESPECTED_RADAR:
			return {
				text: "Radares no respetados",
				icon: ICONS.RADAR
			}
		case INCIDENT_TYPES.AVG_SPEED:
			return {
				text: "Promedio de velocidad acumluada",
				icon: ICONS.VELOCITY
			}
		case INCIDENT_TYPES.BRAKING_ABRUPT:
			return {
				text: "Frenada Brusca",
				icon: ICONS.STOP
			}
		case INCIDENT_TYPES.KILOMETERS_TRAVELED:
			return {
				text: "Kms recorridos acumlados",
				icon: ICONS.CAR
			}
		case INCIDENT_TYPES.HIGH_ACELERATION:
			return {
				text: "Aceleración brusca",
				icon: ICONS.VELOCITY
			}
		case INCIDENT_TYPES.DRIVING_TIME:
			return {
				text: "Tiempo de manejando acumulado",
				icon: ICONS.TIME
			}
		case INCIDENT_TYPES.PHONE_DISTRACTION:
			return {
				text: "Distracciones con el telefono",
				icon: ICONS.PHONE
			}
		case INCIDENT_TYPES.NOT_RESPECTED_MAX_SPEED:
			return {
				text: "Velocidad maxima no respetada",
				icon: ICONS.VELOCITY
			}
		case INCIDENT_TYPES.CRASH:
			return {
				text: "Choques",
				icon: ICONS.CAR
			}
		default:
			return { text: "Tipo de incidente desconocido: " + incident.incidentType, icon: ICONS.MARKER }
	}
}

exports.getResumeText = (incident) => {

	switch (incident.incidentType) {
		case RESUME_TYPES.PHONE_DISTRACTION:
			return Object.assign(
				{},
				incident,
				{
					text: incident.value > 0 ? `Mmm, usaste el telófono ${incident.value} ${incident.value === 1 ? "vez" : "veces"}, si queres mejorar tenes que intentar no usarlo o detenerte.` : "No hubo distracciones con el telefono.",
					icon: ICONS.PHONE
				}
			);
		case RESUME_TYPES.NOT_RESPECTED_MAX_SPEED:
			return Object.assign(
				{},
				incident,
				{
					text: incident.value > 0 ? `En este viaje excediste la velocidad permitida en ${incident.value} ${incident.value === 1 ? "oportunidad" : "oportunidades"}.` : "No hubo excesos de velocidad.",
					icon: ICONS.VELOCITY
				}
			);
		case RESUME_TYPES.DRIVING_TIME:

			let text

			if (incident.exceded && incident.excededTime) {
				const m = Math.floor((incident.excededTime / 1000 / 60) % 60);
				const h = Math.floor((incident.excededTime / (1000 * 60 * 60)));
				text = `Wow en este viaje manejaste más de ${h ? h : "00"}:${m ? m : "00"}hs sin detenerte, deberias mejorarlo la proxima.`;
			} else {
				text = "Bien, te detuviste mientras manejabas cuando te avisamos, asi vas a ser más seguro para vos y  para los demás.";
			}

			return Object.assign(
				{},
				incident,
				{
					text,
					icon: ICONS.TIME
				}
			);
		case RESUME_TYPES.KILOMETERS_TRAVELED:
			return Object.assign(
				{},
				incident,
				{
					text: `Sumaste ${Math.trunc(incident.value / 1000)} kilometros.`,
					icon: ICONS.CAR
				}
			);
		default:
			return Object.assign(
				{},
				incident,
				{
					icon: ICONS.CLOSE,
					text: "Error."
				}
			);
	}
}

exports.getAlertIcon = (alert) => {

	switch (alert.alertType) {
		case ALERT_TYPES.SCHOOL: return { icon: ICONS.URB_ZONE };
		case ALERT_TYPES.ANIMALS: return { icon: ICONS.ANIMALS };
		case ALERT_TYPES.SPEED_BUMP: return { icon: ICONS.STOPPER };
		case ALERT_TYPES.DAN_ROAD_CROSS: return { icon: ICONS.WARNING };
		case ALERT_TYPES.FLARE: return { icon: ICONS.FLARE };
		case ALERT_TYPES.AUTO_FLARE: return { icon: ICONS.FLARE };
		case ALERT_TYPES.CHANGE_MAX: return { icon: ICONS.VELOCITY };
		case ALERT_TYPES.POLICE_CONTROL: return { icon: ICONS.POLICE };
		case ALERT_TYPES.DAN_RAIL_CROSS: return { icon: ICONS.WARNING };
		case ALERT_TYPES.DAN_CURVE: return { icon: ICONS.WARNING };
		case ALERT_TYPES.POLICE_CONTROL: return { icon: ICONS.POLICE };
		case ALERT_TYPES.FROZEN_ROAD: return { icon: ICONS.SNOW };
		case ALERT_TYPES.FOG: return { icon: ICONS.FOG };
		case ALERT_TYPES.SNOW: return { icon: ICONS.SNOW };
		case ALERT_TYPES.STORM: return { icon: ICONS.STORM };
		case ALERT_TYPES.ROAD_INCIDENT: return { icon: ICONS.FLARE };
		case ALERT_TYPES.STOPPER: return { icon: ICONS.STOPPER };
		case ALERT_TYPES.CHANGE_MAX: return { icon: ICONS.VELOCITY };
		case ALERT_TYPES.POLICE_CONTROL: return { icon: ICONS.POLICE };
		case ALERT_TYPES.TOLL: return { icon: ICONS.PRICE };
		case ALERT_TYPES.DAN_BRIDGE: return { icon: ICONS.WARNING };
		case ALERT_TYPES.ACCIDENT_ZONE: return { icon: ICONS.ACCIDENT_ZONE };
		case ALERT_TYPES.RADAR: return { icon: ICONS.RADAR };
		case ALERT_TYPES.FIXED_RADAR: return { icon: ICONS.RADAR };
		case ALERT_TYPES.MOVIL_RADAR: return { icon: ICONS.RADAR };
		case ALERT_TYPES.RESP_LIM: return { icon: ICONS.VELOCITY };
		case ALERT_TYPES.BAD_ROAD: return { icon: ICONS.ACCIDENT_ZONE };
		case ALERT_TYPES.PEOPLE_WORKING: return { icon: ICONS.URB_ZONE };
		case ALERT_TYPES.REG_FROZEN: return { icon: ICONS.SNOW };
		case ALERT_TYPES.REG_SNOW: return { icon: ICONS.SNOW };
		case ALERT_TYPES.BLIND_ROAD: return { icon: ICONS.BLIND_ROAD };
		case ALERT_TYPES.TRANSIT: return { icon: ICONS.CAR };
		case ALERT_TYPES.WIND: return { icon: ICONS.WIND };
		case ALERT_TYPES.FLOOD_ZONE: return { icon: ICONS.ACCIDENT_ZONE };
		case ALERT_TYPES.ACCIDENT_ZONE: return { icon: ICONS.ACCIDENT_ZONE };
		case ALERT_TYPES.CYC_ZONE: return { icon: ICONS.CYC_ZONE };
		case ALERT_TYPES.URB_ZONE: return { icon: ICONS.URB_ZONE };
		default: return { icon: ICONS.CAR };
	}
}
