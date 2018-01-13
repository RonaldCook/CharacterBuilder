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
      ],
      traits: [
        "Draconic Ancestry",
        "Breath Weapon",
        "Damage Resistance",
      ],
      languages: [
        "Common",
        "Draconic"
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
          ],
          traits: [
            "Darkvision",
            "Dwarven Resilience",
            "Dwarven Combat Training",
            "Tool Proficiency",
            "Dwarven Toughness"
          ],
          proficiencies: [
            "Battleaxe",
            "Handaxe",
            "Throwing Hammer",
            "Warhammer"
          ],
          languages: [
            "Common",
            "Dwarvish"
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
          ],
          traits: [
            "Darkvision",
            "Dwarven Resilience",
            "Dwarven Combat Training",
            "Tool Proficiency",
            "Dwarven Armor Training"
          ],
          proficiencies: [
            "Battleaxe",
            "Handaxe",
            "Throwing Hammer",
            "Warhammer",
            "Light Armor",
            "Medium Armor"
          ],
          languages: [
            "Common",
            "Dwarvish"
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
          ],
          traits: [
            "Darkvision",
            "Keen Senses",
            "Fey Ancestry",
            "Trance",
            "Superior Darkvison",
            "Sunlight Sensitivity",
            "Drow Magic",
            "Drow Weapon Training"
          ],
          proficiencies: [
            "Perception",
            "Rapiers",
            "Shortswords",
            "Hand Crossbows"
          ],
          languages: [
            "Common",
            "Elvish"
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
          ],
          traits: [
            "Darkvision",
            "Keen Senses",
            "Fey Ancestry",
            "Trance",
            "Elf Weapon Training",
            "Cantrip",
            "Extra Language"
          ],
          proficiencies: [
            "Perception",
            "Longsword",
            "Shortsword",
            "Shortbow",
            "Longbow"
          ],
          languages: [
            "Common",
            "Elvish"
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
          ],
          traits: [
            "Darkvision",
            "Keen Senses",
            "Fey Ancestry",
            "Trance",
            "Elf Weapon Training",
            "Fleet of Foot",
            "Mask of the Wild"
          ],
          proficiencies: [
            "Perception",
            "Longsword",
            "Shortsword",
            "Shortbow",
            "Longbow"
          ],
          languages: [
            "Common",
            "Elvish"
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
          ],
          traits: [
          ],
          proficiencies: [
          ],
          languages: [
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
          ],
          traits: [
          ],
          proficiencies: [
          ],
          languages: [
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
          ],
          traits: [
          ],
          proficiencies: [
          ],
          languages: [
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
          ],
          traits: [
          ],
          proficiencies: [
          ],
          languages: [
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
      },
      traits: [
      ],
      proficiencies: [
      ],
      languages: [
      ]
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
      ],
      traits: [
      ],
      proficiencies: [
      ],
      languages: [
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
          ],
          traits: [
          ],
          proficiencies: [
          ],
          languages: [
          ]
        },
        {
          race: "Variant Human",
          raceKey: "Variant Human",
          customStats: {
            number: 2
          },
          traits: [
          ],
          proficiencies: [
          ],
          languages: [
          ]
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
      ],
      traits: [
      ],
      proficiencies: [
      ],
      languages: [
      ]
    }
  ]
}

export default Constants;
