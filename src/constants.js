const Constants = {
    maxValue: 15,
    startingValue: 8,
    startingPoints: 27,
    races: [
        {
            race: "Dragonborn",
            raceKey: "Dragonborn",
            statMods: [
                {
                    stat: "STR",
                    mod: 2
                },
                {
                    stat: "CHA",
                    mod: 1
                }
            ]
        },
        {
            raceGroup: "Dwarf",
            subraces: [
                {
                    race: "Hill Dwarf",
                    raceKey: "Hill Dwarf",
                    statMods: [
                        {
                            stat: "CON",
                            mod: 2
                        },
                        {
                            stat: "WIS",
                            mod: 1
                        }
                    ]
                },
                {
                    race: "Mountain Dwarf",
                    raceKey: "Mountain Dwarf",
                    statMods: [
                        {
                            stat: "CON",
                            mod: 2
                        },
                        {
                            stat: "STR",
                            mod: 1
                        }
                    ]
                }
            ]
        },
        {
            raceGroup: "Elf",
            subraces: [
                {
                    race: "Dark Elf",
                    raceKey: "Dark Elf",
                    statMods: [
                        {
                            stat: "DEX",
                            mod: 2
                        },
                        {
                            stat: "CHA",
                            mod: 1
                        }
                    ]
                },
                {
                    race: "High Elf",
                    raceKey: "High Elf",
                    statMods: [
                        {
                            stat: "DEX",
                            mod: 2
                        },
                        {
                            stat: "INT",
                            mod: 1
                        }
                    ]
                },
                {
                    race: "Wood Elf",
                    raceKey: "Wood Elf",
                    statMods: [
                        {
                            stat: "DEX",
                            mod: 2
                        },
                        {
                            stat: "WIS",
                            mod: 1
                        }
                    ]
                }
            ]
        },
        {
            raceGroup: "Gnome",
            subraces: [
                {
                    race: "Forest Gnome",
                    raceKey: "Forest Gnome",
                    statMods: [
                        {
                            stat: "INT",
                            mod: 2
                        },
                        {
                            stat: "DEX",
                            mod: 1
                        }
                    ]
                },
                {
                    race: "Rock Gnome",
                    raceKey: "Rock Gnome",
                    statMods: [
                        {
                            stat: "INT",
                            mod: 2
                        },
                        {
                            stat: "CON",
                            mod: 1
                        }
                    ]
                }
            ]
        },
        {
            raceGroup: "Halfling",
            subraces: [
                {
                    race: "Lightfoot Halfling",
                    raceKey: "Lightfoot Halfling",
                    statMods: [
                        {
                            stat: "DEX",
                            mod: 2
                        },
                        {
                            stat: "CHA",
                            mod: 1
                        }
                    ]
                },
                {
                    race: "Stout Halfling",
                    raceKey: "Stout Halfling",
                    statMods: [
                        {
                            stat: "DEX",
                            mod: 2
                        },
                        {
                            stat: "CON",
                            mod: 1
                        }
                    ]
                }
            ]
        },
        {
            race: "Half-Elf",
            raceKey: "Half-Elf",
            statMods: [
                {
                    stat: "CHA",
                    mod: 2
                }
            ],
            customStats: {
                number: 2,
                exclusions: "CHA"
            }
        },
        {
            race: "Half-Orc",
            raceKey: "Half-Orc",
            statMods: [
                {
                    stat: "STR",
                    mod: 2
                },
                {
                    stat: "CON",
                    mod: 1
                }
            ]
        },
        {
            raceGroup: "Human",
            subraces: [
                {
                    race: "Default Human",
                    raceKey: "Default Human",
                    statMods: [
                        {
                            stat: "STR",
                            mod: 1
                        },
                        {
                            stat: "DEX",
                            mod: 1
                        },
                        {
                            stat: "CON",
                            mod: 1
                        },
                        {
                            stat: "INT",
                            mod: 1
                        },
                        {
                            stat: "WIS",
                            mod: 1
                        },
                        {
                            stat: "CHA",
                            mod: 1
                        }
                    ]
                },
                {
                    race: "Variant Human",
                    raceKey: "Variant Human",
                    customStats: {
                        number: 2
                    }
                }
            ]
        },
        {
            race: "Tiefling",
            raceKey: "Tiefling",
            statMods: [
                {
                    stat: "INT",
                    mod: 1
                },
                {
                    stat: "CHA",
                    mod: 2
                }
            ]
        }
    ]
}

export default Constants;
