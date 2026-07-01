OBJECT_DEFINITIONS = {
    "Tree": {
        "label": "Strom",
        "category": "Vegetation",
        "color": "#2ca25f",
        "icon": "tree",
        "geometry": ["Point"],
        "attributes": [
            {"key": "species", "label": "Druh", "type": "text"},
            {"key": "variety", "label": "Odroda", "type": "text"},
            {"key": "rootstock", "label": "Podpník", "type": "text"},
            {"key": "planted_year", "label": "Rok výsadby", "type": "number"},
            {"key": "irrigation_zone", "label": "Závlahová zóna", "type": "text"},
        ],
        "capabilities": [
            "water_need_estimation",
            "pruning_plan",
            "fertilization_plan",
            "yield_prediction",
            "health_monitoring",
        ],
        "missing_data_suggestions": [
            {
                "requires": ["species", "variety", "planted_year"],
                "message": "Doplň druh, odrodu a rok výsadby. NBOS potom lepšie odhadne rez, závlahu a úrodu.",
            }
        ],
    },
    "Hive": {
        "label": "Úľ",
        "category": "Animals",
        "color": "#ffb000",
        "icon": "hive",
        "geometry": ["Point"],
        "attributes": [
            {"key": "hive_type", "label": "Typ úľa", "type": "text"},
            {"key": "queen_line", "label": "Línia matky", "type": "text"},
            {"key": "colony_strength", "label": "Sila včelstva", "type": "text"},
            {"key": "last_treatment", "label": "Posledné liečenie", "type": "date"},
        ],
        "capabilities": [
            "inspection_planning",
            "feeding_recommendation",
            "varroa_risk_tracking",
            "colony_strength_tracking",
        ],
        "missing_data_suggestions": [
            {
                "requires": ["queen_line", "colony_strength"],
                "message": "Doplň líniu matky a silu včelstva. NBOS potom lepšie navrhne kontrolu, kŕmenie a liečenie.",
            }
        ],
    },
    "Well": {
        "label": "Studňa",
        "category": "Water",
        "color": "#3366ff",
        "icon": "well",
        "geometry": ["Point"],
        "attributes": [
            {"key": "flow_l_min", "label": "Prietok l/min", "type": "number"},
            {"key": "depth_m", "label": "Hĺbka m", "type": "number"},
            {"key": "pump_type", "label": "Typ čerpadla", "type": "text"},
        ],
        "capabilities": [
            "irrigation_capacity_estimation",
            "pump_sizing",
            "flow_monitoring",
        ],
        "missing_data_suggestions": [
            {
                "requires": ["flow_l_min"],
                "message": "Doplň prietok studne. NBOS potom vie lepšie navrhovať závlahové vetvy a počet zón.",
            }
        ],
    },
    "Pipe": {
        "label": "Potrubie",
        "category": "Irrigation",
        "color": "#33bbff",
        "icon": "pipe",
        "geometry": ["LineString"],
        "attributes": [
            {"key": "diameter_mm", "label": "Priemer mm", "type": "number"},
            {"key": "material", "label": "Materiál", "type": "text"},
            {"key": "pressure_bar", "label": "Tlak bar", "type": "number"},
            {"key": "flow_l_min", "label": "Prietok l/min", "type": "number"},
        ],
        "capabilities": [
            "pressure_loss_estimation",
            "irrigation_network_design",
            "flow_capacity_check",
        ],
        "missing_data_suggestions": [
            {
                "requires": ["diameter_mm", "flow_l_min"],
                "message": "Doplň priemer a prietok potrubia. NBOS potom vie kontrolovať tlakové straty a kapacitu vetvy.",
            }
        ],
    },
}
