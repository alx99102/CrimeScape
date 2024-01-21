import db
import random

def get_data_length(data):
    out = []
    for row in data:
        out.append(row['type'])

    return out


def fraToEng(type):
    match type:
        case "Vol de véhicule à moteur":
            return "Car Theft"
        case "Méfait":
            return "Misdemeanors"
        case "Vol dans / sur véhicule à moteur":
            return "Car Break-Ins"
        case "Introduction" :
            return "Breaking and Entering"
        case "Vols qualifiés":
            return "Armed Robbery"
        
def numToType(num):
    match num:
        case 1:
            return "Vol de véhicule à moteur"
        case 2:
            return "Méfait"
        case 3:
            return "Vol dans / sur véhicule à moteur"
        case 4:
            return "Introduction"
        case 5:
            return "Vols qualifiés"

def crimeByTime():
    type = numToType(random.randint(1,5))
    cbtDayResults = db.find(type, None, None, "jour")
    cbtEveningResults = db.find(type, None, None, "soir")
    cbtNightResults = db.find(type, None, None, "nuit")
    cbtDayResults = get_data_length(cbtDayResults)
    cbtEveningResults = get_data_length(cbtEveningResults)
    cbtNightResults = get_data_length(cbtNightResults)
  
    cbtDayResultsLen = len(cbtDayResults)
    cbtEveningResultsLen = len(cbtEveningResults)
    cbtNightResultsLen = len(cbtNightResults)

    type = fraToEng(type)
    analysis = {}

    if cbtDayResultsLen > cbtEveningResultsLen and cbtEveningResultsLen > cbtNightResultsLen:
        # Day time is most common
        percentage = cbtDayResultsLen / (cbtDayResultsLen + cbtEveningResultsLen + cbtNightResultsLen) * 100
        analysis = {
            "message": "{0} most commonly occurs during the day. In fact it occurs {1:.1f}% of the time during the day.".format(type, percentage)
        }
    elif cbtEveningResultsLen > cbtDayResultsLen and cbtEveningResultsLen > cbtNightResultsLen:
        # Evening time is most common
        percentage = cbtEveningResultsLen / (cbtDayResultsLen + cbtEveningResultsLen + cbtNightResultsLen) * 100
        analysis = {
            "message": "{0} most commonly occurs during the evening. In fact it occurs {1:.1f}% of the time during the evening.".format(type, percentage)
        }
    else:
        # Night time is most common
        percentage = cbtNightResultsLen / (cbtDayResultsLen + cbtEveningResultsLen + cbtNightResultsLen) * 100
        analysis = {
            "message": "{0} most commonly occurs during the night. In fact it occurs {1:.1f}% of the time during the night.".format(type, percentage)
        }

    return analysis
