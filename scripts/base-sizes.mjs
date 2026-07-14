// Base sizes for every datasheet, from the Warhammer 40,000 Base Size Guide
// (sources/…event_companion…pdf, "BASE SIZE GUIDE", June 2026), matched to the datasheet
// profiles and hand-checked. Keyed by faction slug →
// datasheet id → { sheet } (single-profile: one size beside the unit name) OR
// { profiles: { <profile name>: size } } (multi-profile: a size beside each model).
// Values are the raw guide strings ("32mm", "28.5mm", "120x92mm Oval Base", "Hull",
// "Unique", "Large Flying Base", "Small Flying Base"; " / " joins mixed-base profiles).
// Consumed by scripts/import-wahapedia-datasheets.mjs (attachBaseSizes) so base sizes
// survive datasheet regeneration, and applied to the existing files by
// scripts/apply-base-sizes.mjs. Formatted for display by DatasheetCard/FactionDatasheetView.

export const BASE_SIZES = {
  "adepta-sororitas": {
    "aestred-thurga-and-agathae-dolan": {
      "profiles": {
        "AESTRED THURGA": "32mm",
        "AGATHAE DOLAN": "25mm"
      }
    },
    "arco-flagellants": {
      "sheet": "25mm"
    },
    "battle-sisters-squad": {
      "sheet": "32mm"
    },
    "canoness": {
      "sheet": "32mm"
    },
    "canoness-with-jump-pack": {
      "sheet": "32mm"
    },
    "castigator": {
      "sheet": "Hull"
    },
    "celestian-insidiants": {
      "sheet": "32mm"
    },
    "celestian-sacresants": {
      "sheet": "32mm"
    },
    "daemonifuge": {
      "profiles": {
        "EPHRAEL STERN": "32mm",
        "KYGANIL OF THE BLOODY TEARS": "32mm"
      }
    },
    "dialogus": {
      "sheet": "40mm"
    },
    "dogmata": {
      "sheet": "32mm"
    },
    "dominion-squad": {
      "sheet": "32mm"
    },
    "exorcist": {
      "sheet": "Hull"
    },
    "hospitaller": {
      "sheet": "50mm"
    },
    "imagifier": {
      "sheet": "32mm"
    },
    "immolator": {
      "sheet": "Hull"
    },
    "intranzia-fraye": {
      "sheet": "60mm"
    },
    "junith-eruita": {
      "sheet": "50mm"
    },
    "ministorum-priest": {
      "sheet": "32mm"
    },
    "mortifiers": {
      "sheet": "50mm"
    },
    "morvenn-vahl": {
      "sheet": "60mm"
    },
    "palatine": {
      "sheet": "32mm"
    },
    "paragon-warsuits": {
      "sheet": "50mm"
    },
    "penitent-engines": {
      "sheet": "50mm"
    },
    "repentia-squad": {
      "profiles": {
        "REPENTIA SUPERIOR": "32mm",
        "SISTERS REPENTIA": "28.5mm"
      }
    },
    "retributor-squad": {
      "sheet": "32mm"
    },
    "saint-celestine": {
      "profiles": {
        "CELESTINE": "40mm",
        "GEMINAE SUPERIA": "32mm"
      }
    },
    "sanctifiers": {
      "sheet": "25mm"
    },
    "seraphim-squad": {
      "sheet": "32mm"
    },
    "sisters-novitiate-squad": {
      "profiles": {
        "NOVITIATE SUPERIOR": "32mm",
        "SISTER NOVITIATE": "28.5mm"
      }
    },
    "sororitas-rhino": {
      "sheet": "Hull"
    },
    "triumph-of-saint-katherine": {
      "sheet": "120x92mm Oval Base"
    },
    "zephyrim-squad": {
      "sheet": "32mm"
    }
  },
  "adeptus-custodes": {
    "agamatus-custodians": {
      "sheet": "75x42mm Oval Base"
    },
    "aleya": {
      "sheet": "32mm"
    },
    "allarus-custodians": {
      "sheet": "40mm"
    },
    "anathema-psykana-rhino": {
      "sheet": "Hull"
    },
    "aquilon-custodians": {
      "sheet": "50mm"
    },
    "ares-gunship": {
      "sheet": "160mm"
    },
    "blade-champion": {
      "sheet": "40mm"
    },
    "caladius-grav-tank": {
      "sheet": "170x109mm Oval Base"
    },
    "contemptor-achillus-dreadnought": {
      "sheet": "60mm"
    },
    "contemptor-galatus-dreadnought": {
      "sheet": "60mm"
    },
    "coronus-grav-carrier": {
      "sheet": "170x109mm Oval Base"
    },
    "custodian-guard": {
      "sheet": "40mm"
    },
    "custodian-guard-with-adrasite-and-pyrithite-spears": {
      "sheet": "40mm"
    },
    "custodian-wardens": {
      "sheet": "40mm"
    },
    "knight-centura": {
      "sheet": "32mm"
    },
    "orion-assault-dropship": {
      "sheet": "160mm"
    },
    "pallas-grav-attack": {
      "sheet": "105x70mm Oval Base"
    },
    "prosecutors": {
      "sheet": "32mm"
    },
    "sagittarum-custodians": {
      "sheet": "40mm"
    },
    "shield-captain": {
      "sheet": "40mm"
    },
    "shield-captain-in-allarus-terminator-armour": {
      "sheet": "40mm"
    },
    "shield-captain-on-dawneagle-jetbike": {
      "sheet": "75x42mm Oval Base"
    },
    "telemon-heavy-dreadnought": {
      "sheet": "100mm"
    },
    "trajann-valoris": {
      "sheet": "40mm"
    },
    "valerian": {
      "sheet": "40mm"
    },
    "venatari-custodians": {
      "sheet": "40mm"
    },
    "venerable-contemptor-dreadnought": {
      "sheet": "60mm"
    },
    "venerable-land-raider": {
      "sheet": "Hull"
    },
    "vertus-praetors": {
      "sheet": "75x42mm Oval Base"
    },
    "vigilators": {
      "sheet": "32mm"
    },
    "witchseekers": {
      "sheet": "32mm"
    }
  },
  "adeptus-mechanicus": {
    "archaeopter-fusilave": {
      "sheet": "170x109mm Oval Base"
    },
    "archaeopter-stratoraptor": {
      "sheet": "170x109mm Oval Base"
    },
    "archaeopter-transvector": {
      "sheet": "170x109mm Oval Base"
    },
    "belisarius-cawl": {
      "sheet": "105x70mm Oval Base"
    },
    "corpuscarii-electro-priests": {
      "sheet": "32mm"
    },
    "cybernetica-datasmith": {
      "sheet": "32mm"
    },
    "fulgurite-electro-priests": {
      "sheet": "32mm"
    },
    "hastarii-exterminators": {
      "sheet": "32mm"
    },
    "hastarii-fusiliers": {
      "sheet": "32mm"
    },
    "ironstrider-ballistarii": {
      "sheet": "105x70mm Oval Base"
    },
    "kastelan-robots": {
      "sheet": "60mm"
    },
    "kataphron-breachers": {
      "sheet": "60mm"
    },
    "kataphron-destroyers": {
      "sheet": "60mm"
    },
    "onager-dunecrawler": {
      "sheet": "130mm"
    },
    "pteraxii-skystalkers": {
      "sheet": "40mm"
    },
    "pteraxii-sterylizors": {
      "sheet": "40mm"
    },
    "serberys-raiders": {
      "sheet": "60x35.5mm Oval Base"
    },
    "serberys-sulphurhounds": {
      "sheet": "60x35.5mm Oval Base"
    },
    "servitor-battleclade": {
      "profiles": {
        "Servitor Underseer": "32mm",
        "Combat Servitors and Gun Servitors": "32mm / 25mm"
      }
    },
    "sicarian-infiltrators": {
      "sheet": "40mm"
    },
    "sicarian-ruststalkers": {
      "sheet": "40mm"
    },
    "skitarii-marshal": {
      "sheet": "32mm"
    },
    "skitarii-rangers": {
      "sheet": "25mm"
    },
    "skitarii-vanguard": {
      "sheet": "25mm"
    },
    "skorpius-disintegrator": {
      "sheet": "Hull"
    },
    "skorpius-dunerider": {
      "sheet": "Hull"
    },
    "sydonian-dragoons-with-radium-jezzails": {
      "sheet": "105x70mm Oval Base"
    },
    "sydonian-dragoons-with-taser-lances": {
      "sheet": "105x70mm Oval Base"
    },
    "sydonian-skatros": {
      "sheet": "40mm"
    },
    "tech-priest-dominus": {
      "sheet": "50mm"
    },
    "tech-priest-enginseer": {
      "sheet": "32mm"
    },
    "tech-priest-manipulus": {
      "sheet": "50mm"
    },
    "technoarcheologist": {
      "sheet": "32mm"
    },
    "thulia-ghuld": {
      "sheet": "80mm"
    }
  },
  "aeldari": {
    "asurmen": {
      "sheet": "40mm"
    },
    "autarch": {
      "sheet": "32mm"
    },
    "autarch-wayleaper": {
      "sheet": "32mm"
    },
    "avatar-of-khaine": {
      "sheet": "80mm"
    },
    "baharroth": {
      "sheet": "40mm"
    },
    "corsair-skyreavers": {
      "sheet": "28.5mm"
    },
    "corsair-voidreavers": {
      "sheet": "28.5mm"
    },
    "corsair-voidscarred": {
      "sheet": "28.5mm"
    },
    "crimson-hunter": {
      "sheet": "120x92mm Oval Base"
    },
    "d-cannon-platform": {
      "sheet": "40mm"
    },
    "dark-reapers": {
      "profiles": {
        "DARK REAPER": "28.5mm",
        "DARK REAPER EXARCH": "28.5mm"
      }
    },
    "death-jester": {
      "sheet": "25mm"
    },
    "dire-avengers": {
      "profiles": {
        "DIRE AVENGER": "28.5mm",
        "DIRE AVENGER EXARCH": "28.5mm"
      }
    },
    "eldrad-ulthran": {
      "sheet": "32mm"
    },
    "falcon": {
      "sheet": "Large Flying Base"
    },
    "farseer": {
      "sheet": "25mm"
    },
    "farseer-skyrunner": {
      "sheet": "Small Flying Base"
    },
    "fire-dragons": {
      "profiles": {
        "FIRE DRAGON": "28.5mm",
        "FIRE DRAGON EXARCH": "28.5mm"
      }
    },
    "fire-prism": {
      "sheet": "Large Flying Base"
    },
    "fuegan": {
      "sheet": "40mm"
    },
    "guardian-defenders": {
      "profiles": {
        "GUARDIAN DEFENDER": "28.5mm",
        "HEAVY WEAPON PLATFORM": "40mm"
      }
    },
    "hemlock-wraithfighter": {
      "sheet": "120x92mm Oval Base"
    },
    "howling-banshees": {
      "profiles": {
        "HOWLING BANSHEE": "28.5mm",
        "HOWLING BANSHEE EXARCH": "28.5mm"
      }
    },
    "jain-zar": {
      "sheet": "40mm"
    },
    "kharseth": {
      "sheet": "32mm"
    },
    "lhykhis": {
      "sheet": "40mm"
    },
    "maugan-ra": {
      "sheet": "40mm"
    },
    "night-spinner": {
      "sheet": "Large Flying Base"
    },
    "phantom-titan": {
      "sheet": "Hull"
    },
    "prince-yriel": {
      "sheet": "40mm"
    },
    "rangers": {
      "sheet": "28.5mm"
    },
    "revenant-titan": {
      "sheet": "Hull"
    },
    "shadow-weaver-platform": {
      "sheet": "40mm"
    },
    "shadowseer": {
      "sheet": "25mm"
    },
    "shining-spears": {
      "profiles": {
        "SHINING SPEAR": "Large Flying Base",
        "SHINING SPEAR EXARCH": "Large Flying Base"
      }
    },
    "shroud-runners": {
      "sheet": "Large Flying Base"
    },
    "skyweavers": {
      "sheet": "Large Flying Base"
    },
    "solitaire": {
      "sheet": "25mm"
    },
    "spiritseer": {
      "sheet": "25mm"
    },
    "starfangs": {
      "sheet": "105x70mm Oval Base"
    },
    "starweaver": {
      "sheet": "Large Flying Base"
    },
    "storm-guardians": {
      "profiles": {
        "STORM GUARDIAN": "28.5mm",
        "SERPENT’S SCALE PLATFORM": "40mm"
      }
    },
    "striking-scorpions": {
      "profiles": {
        "STRIKING SCORPION": "28.5mm",
        "STRIKING SCORPION EXARCH": "28.5mm"
      }
    },
    "swooping-hawks": {
      "profiles": {
        "SWOOPING HAWK": "32mm",
        "SWOOPING HAWK EXARCH": "32mm"
      }
    },
    "the-visarch": {
      "sheet": "32mm"
    },
    "the-yncarne": {
      "sheet": "80mm"
    },
    "troupe": {
      "sheet": "25mm"
    },
    "troupe-master": {
      "sheet": "25mm"
    },
    "vibro-cannon-platform": {
      "sheet": "40mm"
    },
    "voidweaver": {
      "sheet": "Large Flying Base"
    },
    "vypers": {
      "sheet": "105x70mm Oval Base"
    },
    "war-walkers": {
      "sheet": "60mm"
    },
    "warlock": {
      "sheet": "32mm"
    },
    "warlock-conclave": {
      "sheet": "32mm"
    },
    "warlock-skyrunners": {
      "sheet": "Small Flying Base"
    },
    "warp-spiders": {
      "profiles": {
        "WARP SPIDER": "28.5mm",
        "WARP SPIDER EXARCH": "28.5mm"
      }
    },
    "wave-serpent": {
      "sheet": "Large Flying Base"
    },
    "windriders": {
      "sheet": "Small Flying Base"
    },
    "wraithblades": {
      "sheet": "40mm"
    },
    "wraithguard": {
      "sheet": "40mm"
    },
    "wraithknight": {
      "sheet": "120x92mm Oval Base"
    },
    "wraithknight-with-ghostglaive": {
      "sheet": "120x92mm Oval Base"
    },
    "wraithlord": {
      "sheet": "60mm"
    },
    "ynnari-archon": {
      "sheet": "32mm"
    },
    "ynnari-incubi": {
      "profiles": {
        "INCUBI": "28.5mm",
        "KLAIVEX": "28.5mm"
      }
    },
    "ynnari-kabalite-warriors": {
      "sheet": "25mm"
    },
    "ynnari-raider": {
      "sheet": "Large Flying Base"
    },
    "ynnari-reavers": {
      "sheet": "Small Flying Base"
    },
    "ynnari-succubus": {
      "sheet": "25mm"
    },
    "ynnari-venom": {
      "sheet": "Large Flying Base"
    },
    "ynnari-wyches": {
      "sheet": "25mm"
    },
    "yvraine": {
      "sheet": "75x42mm Oval Base"
    }
  },
  "astra-militarum": {
    "aegis-defence-line": {
      "sheet": "Hull"
    },
    "armoured-sentinels": {
      "sheet": "80mm"
    },
    "artillery-team": {
      "sheet": "130mm"
    },
    "attilan-rough-riders": {
      "sheet": "60x35.5mm Oval Base"
    },
    "avenger-strike-fighter": {
      "sheet": "120x92mm Oval Base"
    },
    "baneblade": {
      "sheet": "Hull"
    },
    "banehammer": {
      "sheet": "Hull"
    },
    "banesword": {
      "sheet": "Hull"
    },
    "basilisk": {
      "sheet": "Hull"
    },
    "bullgryn-squad": {
      "sheet": "40mm"
    },
    "cadian-castellan": {
      "sheet": "28.5mm"
    },
    "cadian-command-squad": {
      "profiles": {
        "CADIAN COMMANDER": "28.5mm",
        "CADIAN VETERAN GUARDSMAN": "28.5mm"
      }
    },
    "cadian-heavy-weapons-squad": {
      "sheet": "50mm"
    },
    "cadian-recon-squad": {
      "sheet": "28.5mm"
    },
    "cadian-shock-troops": {
      "sheet": "25mm"
    },
    "catachan-command-squad": {
      "profiles": {
        "CATACHAN COMMANDER": "25mm",
        "VETERAN GUARDSMAN": "25mm"
      }
    },
    "catachan-heavy-weapons-squad": {
      "sheet": "60mm"
    },
    "catachan-jungle-fighters": {
      "sheet": "25mm"
    },
    "centaur-rsv": {
      "sheet": "Hull"
    },
    "chimera": {
      "sheet": "Hull"
    },
    "commissar": {
      "sheet": "28.5mm"
    },
    "commissar-graves": {
      "sheet": "Hull"
    },
    "commissar-graves-on-foot": {
      "sheet": "32mm"
    },
    "commissar-yarrick": {
      "sheet": "32mm"
    },
    "cyclops-demolition-vehicle": {
      "sheet": "Hull"
    },
    "death-korps-of-krieg": {
      "sheet": "25mm"
    },
    "death-riders": {
      "sheet": "60x35.5mm Oval Base"
    },
    "deathstrike": {
      "sheet": "Hull"
    },
    "doomhammer": {
      "sheet": "Hull"
    },
    "field-ordnance-battery": {
      "sheet": "100mm"
    },
    "gaunts-ghosts": {
      "profiles": {
        "IBRAM GAUNT": "28.5mm",
        "TANITH GHOST": "28.5mm"
      }
    },
    "hellhammer": {
      "sheet": "Hull"
    },
    "hellhound": {
      "sheet": "Hull"
    },
    "hippogriff-afv": {
      "sheet": "Hull"
    },
    "hydra": {
      "sheet": "Hull"
    },
    "kasrkin": {
      "sheet": "28.5mm"
    },
    "krieg-combat-engineers": {
      "sheet": "25mm"
    },
    "krieg-command-squad": {
      "profiles": {
        "LORD COMMISSAR": "32mm",
        "VETERAN GUARDSMAN": "25mm"
      }
    },
    "krieg-heavy-weapons-squad": {
      "profiles": {
        "HEAVY WEAPONS GUNNER": "50mm",
        "FIRE COORDINATOR": "25mm"
      }
    },
    "leman-russ-battle-tank": {
      "sheet": "Hull"
    },
    "leman-russ-commander": {
      "sheet": "Hull"
    },
    "leman-russ-demolisher": {
      "sheet": "Hull"
    },
    "leman-russ-eradicator": {
      "sheet": "Hull"
    },
    "leman-russ-executioner": {
      "sheet": "Hull"
    },
    "leman-russ-exterminator": {
      "sheet": "Hull"
    },
    "leman-russ-punisher": {
      "sheet": "Hull"
    },
    "leman-russ-vanquisher": {
      "sheet": "Hull"
    },
    "lord-marshal-dreir": {
      "sheet": "75x42mm Oval Base"
    },
    "lord-solar-leontus": {
      "sheet": "80mm"
    },
    "manticore": {
      "sheet": "Hull"
    },
    "militarum-tempestus-command-squad": {
      "profiles": {
        "TEMPESTUS SCION": "25mm",
        "TEMPESTOR PRIME": "25mm"
      }
    },
    "ministorum-priest": {
      "sheet": "32mm"
    },
    "nork-deddog": {
      "sheet": "40mm"
    },
    "ogryn-bodyguard": {
      "sheet": "40mm"
    },
    "ogryn-squad": {
      "sheet": "40mm"
    },
    "primaris-psyker": {
      "sheet": "32mm"
    },
    "ratlings": {
      "sheet": "25mm"
    },
    "rogal-dorn-battle-tank": {
      "sheet": "Hull"
    },
    "rogal-dorn-commander": {
      "sheet": "Hull"
    },
    "scout-sentinels": {
      "sheet": "80mm"
    },
    "shadowsword": {
      "sheet": "Hull"
    },
    "sly-marbo": {
      "sheet": "32mm"
    },
    "stormlord": {
      "sheet": "Hull"
    },
    "stormsword": {
      "sheet": "Hull"
    },
    "taurox": {
      "sheet": "Hull"
    },
    "taurox-prime": {
      "sheet": "Hull"
    },
    "tech-priest-enginseer": {
      "sheet": "32mm"
    },
    "tempestus-aquilons": {
      "sheet": "28.5mm"
    },
    "tempestus-scions": {
      "sheet": "25mm"
    },
    "ursula-creed": {
      "sheet": "32mm"
    },
    "valkyrie": {
      "sheet": "120x92mm Oval Base"
    },
    "wyvern": {
      "sheet": "Hull"
    }
  },
  "black-templars": {
    "aggressor-squad": {
      "sheet": "40mm"
    },
    "ancient": {
      "sheet": "40mm"
    },
    "ancient-in-terminator-armour": {
      "sheet": "40mm"
    },
    "apothecary": {
      "sheet": "40mm"
    },
    "apothecary-biologis": {
      "sheet": "40mm"
    },
    "assault-intercessor-squad": {
      "sheet": "32mm"
    },
    "assault-intercessors-with-jump-packs": {
      "sheet": "32mm"
    },
    "astraeus": {
      "sheet": "Hull"
    },
    "ballistus-dreadnought": {
      "sheet": "90mm"
    },
    "bladeguard-ancient": {
      "sheet": "40mm"
    },
    "bladeguard-veteran-squad": {
      "sheet": "40mm"
    },
    "brutalis-dreadnought": {
      "sheet": "90mm"
    },
    "captain": {
      "sheet": "40mm"
    },
    "captain-in-gravis-armour": {
      "sheet": "40mm"
    },
    "captain-in-phobos-armour": {
      "sheet": "40mm"
    },
    "captain-in-terminator-armour": {
      "sheet": "50mm"
    },
    "captain-with-jump-pack": {
      "sheet": "40mm"
    },
    "castellan": {
      "sheet": "40mm"
    },
    "centurion-assault-squad": {
      "sheet": "50mm"
    },
    "centurion-devastator-squad": {
      "sheet": "50mm"
    },
    "chaplain": {
      "sheet": "40mm"
    },
    "chaplain-grimaldus": {
      "profiles": {
        "GRIMALDUS": "40mm",
        "CENOBYTE SERVITOR": "28.5mm"
      }
    },
    "chaplain-in-terminator-armour": {
      "sheet": "40mm"
    },
    "chaplain-on-bike": {
      "sheet": "90x52.5mm Oval Base"
    },
    "chaplain-with-jump-pack": {
      "sheet": "32mm"
    },
    "company-heroes": {
      "sheet": "40mm"
    },
    "crusade-ancient": {
      "sheet": "40mm"
    },
    "crusader-squad": {
      "profiles": {
        "NEOPHYTES": "28.5mm",
        "OTHER MODELS": "32mm / 40mm"
      }
    },
    "desolation-squad": {
      "sheet": "32mm"
    },
    "devastator-squad": {
      "sheet": "32mm"
    },
    "dreadnought": {
      "sheet": "60mm"
    },
    "drop-pod": {
      "sheet": "Hull"
    },
    "eliminator-squad": {
      "sheet": "40mm"
    },
    "emperors-champion": {
      "sheet": "40mm"
    },
    "eradicator-squad": {
      "sheet": "40mm"
    },
    "eradicator-squad-with-heavy-bolters": {
      "sheet": "40mm"
    },
    "execrator": {
      "sheet": "40mm"
    },
    "firestrike-servo-turrets": {
      "sheet": "80mm"
    },
    "gladiator-lancer": {
      "sheet": "100mm"
    },
    "gladiator-reaper": {
      "sheet": "100mm"
    },
    "gladiator-valiant": {
      "sheet": "100mm"
    },
    "hammerfall-bunker": {
      "sheet": "Hull"
    },
    "heavy-intercessor-squad": {
      "sheet": "40mm"
    },
    "hellblaster-squad": {
      "sheet": "32mm"
    },
    "high-marshal-helbrecht": {
      "sheet": "60mm"
    },
    "impulsor": {
      "sheet": "100mm"
    },
    "inceptor-squad": {
      "sheet": "40mm"
    },
    "incursor-squad": {
      "sheet": "32mm"
    },
    "infernus-squad": {
      "sheet": "32mm"
    },
    "infiltrator-squad": {
      "sheet": "32mm"
    },
    "intercessor-squad": {
      "sheet": "32mm"
    },
    "invader-atv": {
      "sheet": "Hull"
    },
    "invictor-tactical-warsuit": {
      "sheet": "90mm"
    },
    "judiciar": {
      "sheet": "40mm"
    },
    "land-raider": {
      "sheet": "Hull"
    },
    "land-raider-crusader": {
      "sheet": "Hull"
    },
    "land-raider-redeemer": {
      "sheet": "Hull"
    },
    "land-speeder": {
      "sheet": "105x70mm Oval Base"
    },
    "lieutenant": {
      "sheet": "40mm"
    },
    "lieutenant-in-phobos-armour": {
      "sheet": "40mm"
    },
    "lieutenant-in-reiver-armour": {
      "sheet": "40mm"
    },
    "lieutenant-with-combi-weapon": {
      "sheet": "40mm"
    },
    "marshal": {
      "sheet": "40mm"
    },
    "outrider-squad": {
      "profiles": {
        "OUTRIDER": "90x52.5mm Oval Base",
        "INVADER ATV": "90x52.5mm Oval Base"
      }
    },
    "predator-annihilator": {
      "sheet": "Hull"
    },
    "predator-destructor": {
      "sheet": "Hull"
    },
    "razorback": {
      "sheet": "Hull"
    },
    "redemptor-dreadnought": {
      "sheet": "90mm"
    },
    "reiver-squad": {
      "sheet": "32mm"
    },
    "repulsor": {
      "sheet": "100mm"
    },
    "repulsor-executioner": {
      "sheet": "100mm"
    },
    "rhino": {
      "sheet": "Hull"
    },
    "scout-squad": {
      "sheet": "28.5mm"
    },
    "sternguard-veteran-squad": {
      "sheet": "32mm"
    },
    "storm-speeder-hailstrike": {
      "sheet": "90mm"
    },
    "storm-speeder-hammerstrike": {
      "sheet": "90mm"
    },
    "storm-speeder-thunderstrike": {
      "sheet": "90mm"
    },
    "stormhawk-interceptor": {
      "sheet": "120x92mm Oval Base"
    },
    "stormraven-gunship": {
      "sheet": "120x92mm Oval Base"
    },
    "stormtalon-gunship": {
      "sheet": "120x92mm Oval Base"
    },
    "suppressor-squad": {
      "sheet": "40mm"
    },
    "sword-brethren-squad": {
      "sheet": "40mm"
    },
    "tactical-squad": {
      "sheet": "32mm"
    },
    "techmarine": {
      "sheet": "40mm"
    },
    "terminator-assault-squad": {
      "sheet": "40mm"
    },
    "terminator-squad": {
      "sheet": "40mm"
    },
    "thunderhawk-gunship": {
      "sheet": "Unique"
    },
    "vanguard-veteran-squad-with-jump-packs": {
      "sheet": "32mm"
    },
    "vindicator": {
      "sheet": "Hull"
    },
    "whirlwind": {
      "sheet": "Hull"
    }
  },
  "blood-angels": {
    "aggressor-squad": {
      "sheet": "40mm"
    },
    "ancient": {
      "sheet": "40mm"
    },
    "ancient-in-terminator-armour": {
      "sheet": "40mm"
    },
    "apothecary": {
      "sheet": "40mm"
    },
    "apothecary-biologis": {
      "sheet": "40mm"
    },
    "assault-intercessor-squad": {
      "sheet": "32mm"
    },
    "assault-intercessors-with-jump-packs": {
      "sheet": "32mm"
    },
    "astorath": {
      "sheet": "40mm"
    },
    "astraeus": {
      "sheet": "Hull"
    },
    "baal-predator": {
      "sheet": "Hull"
    },
    "ballistus-dreadnought": {
      "sheet": "90mm"
    },
    "bladeguard-ancient": {
      "sheet": "40mm"
    },
    "bladeguard-veteran-squad": {
      "sheet": "40mm"
    },
    "blood-angels-captain": {
      "sheet": "40mm"
    },
    "brutalis-dreadnought": {
      "sheet": "90mm"
    },
    "captain": {
      "sheet": "40mm"
    },
    "captain-in-gravis-armour": {
      "sheet": "40mm"
    },
    "captain-in-phobos-armour": {
      "sheet": "40mm"
    },
    "captain-in-terminator-armour": {
      "sheet": "50mm"
    },
    "captain-with-jump-pack": {
      "sheet": "40mm"
    },
    "centurion-assault-squad": {
      "sheet": "50mm"
    },
    "centurion-devastator-squad": {
      "sheet": "50mm"
    },
    "chaplain": {
      "sheet": "40mm"
    },
    "chaplain-in-terminator-armour": {
      "sheet": "40mm"
    },
    "chaplain-on-bike": {
      "sheet": "90x52.5mm Oval Base"
    },
    "chaplain-with-jump-pack": {
      "sheet": "32mm"
    },
    "chief-librarian-mephiston": {
      "sheet": "40mm"
    },
    "commander-dante": {
      "sheet": "50mm"
    },
    "company-heroes": {
      "sheet": "40mm"
    },
    "death-company-captain": {
      "sheet": "40mm"
    },
    "death-company-captain-with-jump-pack": {
      "sheet": "40mm"
    },
    "death-company-dreadnought": {
      "sheet": "90mm"
    },
    "death-company-marines": {
      "sheet": "32mm"
    },
    "death-company-marines-with-bolt-rifles": {
      "sheet": "32mm"
    },
    "death-company-marines-with-jump-packs": {
      "sheet": "32mm"
    },
    "desolation-squad": {
      "sheet": "32mm"
    },
    "devastator-squad": {
      "sheet": "32mm"
    },
    "dreadnought": {
      "sheet": "60mm"
    },
    "drop-pod": {
      "sheet": "Hull"
    },
    "eliminator-squad": {
      "sheet": "40mm"
    },
    "eradicator-squad": {
      "sheet": "40mm"
    },
    "eradicator-squad-with-heavy-bolters": {
      "sheet": "40mm"
    },
    "firestrike-servo-turrets": {
      "sheet": "80mm"
    },
    "gladiator-lancer": {
      "sheet": "100mm"
    },
    "gladiator-reaper": {
      "sheet": "100mm"
    },
    "gladiator-valiant": {
      "sheet": "100mm"
    },
    "hammerfall-bunker": {
      "sheet": "Hull"
    },
    "heavy-intercessor-squad": {
      "sheet": "40mm"
    },
    "hellblaster-squad": {
      "sheet": "32mm"
    },
    "impulsor": {
      "sheet": "100mm"
    },
    "inceptor-squad": {
      "sheet": "40mm"
    },
    "incursor-squad": {
      "sheet": "32mm"
    },
    "infernus-squad": {
      "sheet": "32mm"
    },
    "infiltrator-squad": {
      "sheet": "32mm"
    },
    "intercessor-squad": {
      "sheet": "32mm"
    },
    "invader-atv": {
      "sheet": "Hull"
    },
    "invictor-tactical-warsuit": {
      "sheet": "90mm"
    },
    "judiciar": {
      "sheet": "40mm"
    },
    "land-raider": {
      "sheet": "Hull"
    },
    "land-raider-crusader": {
      "sheet": "Hull"
    },
    "land-raider-redeemer": {
      "sheet": "Hull"
    },
    "land-speeder": {
      "sheet": "105x70mm Oval Base"
    },
    "lemartes": {
      "sheet": "40mm"
    },
    "librarian": {
      "sheet": "40mm"
    },
    "librarian-in-phobos-armour": {
      "sheet": "40mm"
    },
    "librarian-in-terminator-armour": {
      "sheet": "40mm"
    },
    "lieutenant": {
      "sheet": "40mm"
    },
    "lieutenant-in-phobos-armour": {
      "sheet": "40mm"
    },
    "lieutenant-in-reiver-armour": {
      "sheet": "40mm"
    },
    "lieutenant-with-combi-weapon": {
      "sheet": "40mm"
    },
    "outrider-squad": {
      "profiles": {
        "OUTRIDER": "90x52.5mm Oval Base",
        "INVADER ATV": "90x52.5mm Oval Base"
      }
    },
    "predator-annihilator": {
      "sheet": "Hull"
    },
    "predator-destructor": {
      "sheet": "Hull"
    },
    "razorback": {
      "sheet": "Hull"
    },
    "redemptor-dreadnought": {
      "sheet": "90mm"
    },
    "reiver-squad": {
      "sheet": "32mm"
    },
    "repulsor": {
      "sheet": "100mm"
    },
    "repulsor-executioner": {
      "sheet": "100mm"
    },
    "rhino": {
      "sheet": "Hull"
    },
    "sanguinary-guard": {
      "sheet": "40mm"
    },
    "sanguinary-priest": {
      "sheet": "40mm"
    },
    "scout-squad": {
      "sheet": "28.5mm"
    },
    "sternguard-veteran-squad": {
      "sheet": "32mm"
    },
    "storm-speeder-hailstrike": {
      "sheet": "90mm"
    },
    "storm-speeder-hammerstrike": {
      "sheet": "90mm"
    },
    "storm-speeder-thunderstrike": {
      "sheet": "90mm"
    },
    "stormhawk-interceptor": {
      "sheet": "120x92mm Oval Base"
    },
    "stormraven-gunship": {
      "sheet": "120x92mm Oval Base"
    },
    "stormtalon-gunship": {
      "sheet": "120x92mm Oval Base"
    },
    "suppressor-squad": {
      "sheet": "40mm"
    },
    "tactical-squad": {
      "sheet": "32mm"
    },
    "techmarine": {
      "sheet": "40mm"
    },
    "terminator-assault-squad": {
      "sheet": "40mm"
    },
    "terminator-squad": {
      "sheet": "40mm"
    },
    "the-sanguinor": {
      "sheet": "40mm"
    },
    "thunderhawk-gunship": {
      "sheet": "Unique"
    },
    "vanguard-veteran-squad-with-jump-packs": {
      "sheet": "32mm"
    },
    "vindicator": {
      "sheet": "Hull"
    },
    "whirlwind": {
      "sheet": "Hull"
    }
  },
  "chaos-daemons": {
    "belakor": {
      "sheet": "100mm"
    },
    "beasts-of-nurgle": {
      "sheet": "60mm"
    },
    "bloodcrushers": {
      "sheet": "90x52.5mm Oval Base"
    },
    "bloodletters": {
      "sheet": "32mm"
    },
    "bloodmaster": {
      "sheet": "40mm"
    },
    "bloodthirster": {
      "sheet": "120x92mm Oval Base"
    },
    "blue-horrors": {
      "sheet": "25mm"
    },
    "burning-chariot": {
      "sheet": "120x92mm Oval Base"
    },
    "changecaster": {
      "sheet": "32mm"
    },
    "contorted-epitome": {
      "sheet": "75x42mm Oval Base"
    },
    "daemon-prince-of-chaos": {
      "sheet": "60mm"
    },
    "daemon-prince-of-chaos-with-wings": {
      "sheet": "60mm"
    },
    "daemonettes": {
      "sheet": "25mm"
    },
    "epidemius": {
      "sheet": "60mm"
    },
    "exalted-flamer": {
      "sheet": "75x42mm Oval Base"
    },
    "fateskimmer": {
      "sheet": "120x92mm Oval Base"
    },
    "feculent-gnarlmaw": {
      "sheet": "Hull"
    },
    "fiends": {
      "sheet": "75x42mm Oval Base"
    },
    "flamers": {
      "sheet": "32mm"
    },
    "flesh-hounds": {
      "sheet": "60x35.5mm Oval Base"
    },
    "fluxmaster": {
      "sheet": "Large Flying Base"
    },
    "great-unclean-one": {
      "sheet": "130mm"
    },
    "hellflayers": {
      "sheet": "120x92mm Oval Base"
    },
    "horticulous-slimux": {
      "sheet": "105x70mm Oval Base"
    },
    "infernal-enrapturess": {
      "sheet": "60x35.5mm Oval Base"
    },
    "kairos-fateweaver": {
      "sheet": "100mm"
    },
    "karanak": {
      "sheet": "75x42mm Oval Base"
    },
    "keeper-of-secrets": {
      "sheet": "100mm"
    },
    "lord-of-change": {
      "sheet": "100mm"
    },
    "nurglings": {
      "sheet": "40mm"
    },
    "pink-horrors": {
      "profiles": {
        "PINK HORROR": "32mm",
        "BLUE HORROR/BRIMSTONE HORROR": "32mm"
      }
    },
    "plague-drones": {
      "sheet": "Large Flying Base"
    },
    "plaguebearers": {
      "sheet": "32mm"
    },
    "poxbringer": {
      "sheet": "32mm"
    },
    "rendmaster-on-blood-throne": {
      "sheet": "120x92mm Oval Base"
    },
    "rotigus": {
      "sheet": "130mm"
    },
    "screamers": {
      "sheet": "Small Flying Base"
    },
    "seekers": {
      "sheet": "60x35.5mm Oval Base"
    },
    "shalaxi-helbane": {
      "sheet": "100mm"
    },
    "skarbrand": {
      "sheet": "100mm"
    },
    "skull-altar": {
      "sheet": "Hull"
    },
    "skull-cannon": {
      "sheet": "120x92mm Oval Base"
    },
    "skullmaster": {
      "sheet": "90x52.5mm Oval Base"
    },
    "skulltaker": {
      "sheet": "40mm"
    },
    "sloppity-bilepiper": {
      "sheet": "32mm"
    },
    "soul-grinder": {
      "sheet": "160mm"
    },
    "spoilpox-scrivener": {
      "sheet": "40mm"
    },
    "syllesske": {
      "sheet": "50mm"
    },
    "the-blue-scribes": {
      "sheet": "Large Flying Base"
    },
    "the-changeling": {
      "sheet": "40mm"
    },
    "the-masque-of-slaanesh": {
      "sheet": "32mm"
    },
    "tormentbringer": {
      "sheet": "120x92mm Oval Base"
    },
    "tranceweaver": {
      "sheet": "32mm"
    }
  },
  "chaos-knights": {
    "chaos-acastus-knight-asterius": {
      "sheet": "Hull"
    },
    "chaos-acastus-knight-porphyrion": {
      "sheet": "Hull"
    },
    "chaos-cerastus-knight-acheron": {
      "sheet": "170x109mm Oval Base"
    },
    "chaos-cerastus-knight-atrapos": {
      "sheet": "170x109mm Oval Base"
    },
    "chaos-cerastus-knight-castigator": {
      "sheet": "170x109mm Oval Base"
    },
    "chaos-cerastus-knight-lancer": {
      "sheet": "170x109mm Oval Base"
    },
    "chaos-questoris-knight-magaera": {
      "sheet": "170x109mm Oval Base"
    },
    "chaos-questoris-knight-styrix": {
      "sheet": "170x109mm Oval Base"
    },
    "knight-abominant": {
      "sheet": "170x109mm Oval Base"
    },
    "knight-desecrator": {
      "sheet": "170x109mm Oval Base"
    },
    "knight-despoiler": {
      "sheet": "170x109mm Oval Base"
    },
    "knight-rampager": {
      "sheet": "170x109mm Oval Base"
    },
    "knight-ruinator": {
      "sheet": "170x109mm Oval Base"
    },
    "knight-tyrant": {
      "sheet": "170x109mm Oval Base"
    },
    "war-dog-brigand": {
      "sheet": "100mm"
    },
    "war-dog-executioner": {
      "sheet": "100mm"
    },
    "war-dog-huntsman": {
      "sheet": "100mm"
    },
    "war-dog-karnivore": {
      "sheet": "100mm"
    },
    "war-dog-moirax": {
      "sheet": "100mm"
    },
    "war-dog-stalker": {
      "sheet": "100mm"
    }
  },
  "chaos-space-marines": {
    "abaddon-the-despoiler": {
      "sheet": "60mm"
    },
    "accursed-cultists": {
      "profiles": {
        "MUTANT": "25mm",
        "TORMENT": "40mm"
      }
    },
    "chaos-bikers": {
      "sheet": "75x42mm Oval Base"
    },
    "chaos-land-raider": {
      "sheet": "Hull"
    },
    "chaos-lord": {
      "sheet": "40mm"
    },
    "chaos-lord-in-terminator-armour": {
      "sheet": "40mm"
    },
    "chaos-lord-with-jump-pack": {
      "sheet": "40mm"
    },
    "chaos-predator-annihilator": {
      "sheet": "Hull"
    },
    "chaos-predator-destructor": {
      "sheet": "Hull"
    },
    "chaos-rhino": {
      "sheet": "Hull"
    },
    "chaos-spawn": {
      "sheet": "50mm"
    },
    "chaos-terminator-squad": {
      "sheet": "40mm"
    },
    "chaos-vindicator": {
      "sheet": "Hull"
    },
    "chosen": {
      "sheet": "32mm"
    },
    "cultist-firebrand": {
      "sheet": "32mm"
    },
    "cultist-mob": {
      "sheet": "25mm"
    },
    "cypher": {
      "sheet": "32mm"
    },
    "dark-apostle": {
      "profiles": {
        "DARK APOSTLE": "40mm",
        "DARK DISCIPLE": "25mm"
      }
    },
    "dark-commune": {
      "profiles": {
        "CULT DEMAGOGUE": "32mm",
        "OTHER MODELS": "28.5mm / 32mm"
      }
    },
    "defiler": {
      "sheet": "160mm"
    },
    "fabius-bile": {
      "profiles": {
        "FABIUS BILE": "40mm",
        "SURGEON ACOLYTE": "32mm"
      }
    },
    "fellgor-beastmen": {
      "sheet": "32mm"
    },
    "forgefiend": {
      "sheet": "120x92mm Oval Base"
    },
    "haarken-worldclaimer": {
      "sheet": "40mm"
    },
    "havocs": {
      "sheet": "40mm"
    },
    "helbrute": {
      "sheet": "60mm"
    },
    "heldrake": {
      "sheet": "120x92mm Oval Base"
    },
    "heretic-astartes-daemon-prince": {
      "sheet": "60mm"
    },
    "heretic-astartes-daemon-prince-with-wings": {
      "sheet": "60mm"
    },
    "huron-blackheart": {
      "sheet": "50mm"
    },
    "khorne-lord-of-skulls": {
      "sheet": "Hull"
    },
    "kravek-morne": {
      "sheet": "50mm"
    },
    "legionaries": {
      "sheet": "32mm"
    },
    "lord-discordant-on-helstalker": {
      "sheet": "120x92mm Oval Base"
    },
    "master-of-executions": {
      "sheet": "40mm"
    },
    "master-of-possession": {
      "sheet": "40mm"
    },
    "masters-of-the-maelstrom": {
      "profiles": {
        "GARLON SOULEATER, GARREON THE CORPSEMASTER, KATAR GARRIX": "40mm",
        "CAPTAIN SARGOTTA, THE ENFORCER": "40mm / 32mm"
      }
    },
    "maulerfiend": {
      "sheet": "120x92mm Oval Base"
    },
    "mutilators": {
      "sheet": "50mm"
    },
    "nemesis-claw": {
      "sheet": "32mm"
    },
    "noctilith-crown": {
      "sheet": "Hull"
    },
    "obliterators": {
      "sheet": "50mm"
    },
    "possessed": {
      "sheet": "40mm"
    },
    "raptors": {
      "sheet": "32mm"
    },
    "red-corsairs-raiders": {
      "sheet": "40mm"
    },
    "red-corsairs-reave-captain": {
      "sheet": "32mm"
    },
    "sorcerer": {
      "sheet": "40mm"
    },
    "sorcerer-in-terminator-armour": {
      "sheet": "40mm"
    },
    "traitor-enforcer": {
      "profiles": {
        "TRAITOR ENFORCER": "32mm",
        "TRAITOR OGRYN": "40mm"
      }
    },
    "traitor-guardsmen-squad": {
      "sheet": "25mm"
    },
    "vashtorr-the-arkifane": {
      "sheet": "80mm"
    },
    "venomcrawler": {
      "sheet": "100mm"
    },
    "warp-talons": {
      "sheet": "32mm"
    },
    "warpsmith": {
      "sheet": "60x35.5mm Oval Base"
    }
  },
  "dark-angels": {
    "aggressor-squad": {
      "sheet": "40mm"
    },
    "ancient": {
      "sheet": "40mm"
    },
    "ancient-in-terminator-armour": {
      "sheet": "40mm"
    },
    "apothecary": {
      "sheet": "40mm"
    },
    "apothecary-biologis": {
      "sheet": "40mm"
    },
    "asmodai": {
      "sheet": "50mm"
    },
    "assault-intercessor-squad": {
      "sheet": "32mm"
    },
    "assault-intercessors-with-jump-packs": {
      "sheet": "32mm"
    },
    "astraeus": {
      "sheet": "Hull"
    },
    "azrael": {
      "sheet": "50mm"
    },
    "ballistus-dreadnought": {
      "sheet": "90mm"
    },
    "belial": {
      "sheet": "50mm"
    },
    "bladeguard-ancient": {
      "sheet": "40mm"
    },
    "bladeguard-veteran-squad": {
      "sheet": "40mm"
    },
    "brutalis-dreadnought": {
      "sheet": "90mm"
    },
    "captain": {
      "sheet": "40mm"
    },
    "captain-in-gravis-armour": {
      "sheet": "40mm"
    },
    "captain-in-phobos-armour": {
      "sheet": "40mm"
    },
    "captain-in-terminator-armour": {
      "sheet": "50mm"
    },
    "captain-with-jump-pack": {
      "sheet": "40mm"
    },
    "centurion-assault-squad": {
      "sheet": "50mm"
    },
    "centurion-devastator-squad": {
      "sheet": "50mm"
    },
    "chaplain": {
      "sheet": "40mm"
    },
    "chaplain-in-terminator-armour": {
      "sheet": "40mm"
    },
    "chaplain-on-bike": {
      "sheet": "90x52.5mm Oval Base"
    },
    "chaplain-with-jump-pack": {
      "sheet": "32mm"
    },
    "company-heroes": {
      "sheet": "40mm"
    },
    "deathwing-knights": {
      "sheet": "40mm"
    },
    "deathwing-terminator-squad": {
      "sheet": "40mm"
    },
    "desolation-squad": {
      "sheet": "32mm"
    },
    "devastator-squad": {
      "sheet": "32mm"
    },
    "dreadnought": {
      "sheet": "60mm"
    },
    "drop-pod": {
      "sheet": "Hull"
    },
    "eliminator-squad": {
      "sheet": "40mm"
    },
    "eradicator-squad": {
      "sheet": "40mm"
    },
    "eradicator-squad-with-heavy-bolters": {
      "sheet": "40mm"
    },
    "ezekiel": {
      "sheet": "25mm"
    },
    "firestrike-servo-turrets": {
      "sheet": "80mm"
    },
    "gladiator-lancer": {
      "sheet": "100mm"
    },
    "gladiator-reaper": {
      "sheet": "100mm"
    },
    "gladiator-valiant": {
      "sheet": "100mm"
    },
    "hammerfall-bunker": {
      "sheet": "Hull"
    },
    "heavy-intercessor-squad": {
      "sheet": "40mm"
    },
    "hellblaster-squad": {
      "sheet": "32mm"
    },
    "impulsor": {
      "sheet": "100mm"
    },
    "inceptor-squad": {
      "sheet": "40mm"
    },
    "incursor-squad": {
      "sheet": "32mm"
    },
    "infernus-squad": {
      "sheet": "32mm"
    },
    "infiltrator-squad": {
      "sheet": "32mm"
    },
    "inner-circle-companions": {
      "sheet": "40mm"
    },
    "intercessor-squad": {
      "sheet": "32mm"
    },
    "invader-atv": {
      "sheet": "Hull"
    },
    "invictor-tactical-warsuit": {
      "sheet": "90mm"
    },
    "judiciar": {
      "sheet": "40mm"
    },
    "land-raider": {
      "sheet": "Hull"
    },
    "land-raider-crusader": {
      "sheet": "Hull"
    },
    "land-raider-redeemer": {
      "sheet": "Hull"
    },
    "land-speeder": {
      "sheet": "105x70mm Oval Base"
    },
    "land-speeder-vengeance": {
      "sheet": "Large Flying Base"
    },
    "lazarus": {
      "sheet": "40mm"
    },
    "librarian": {
      "sheet": "40mm"
    },
    "librarian-in-phobos-armour": {
      "sheet": "40mm"
    },
    "librarian-in-terminator-armour": {
      "sheet": "40mm"
    },
    "lieutenant": {
      "sheet": "40mm"
    },
    "lieutenant-in-phobos-armour": {
      "sheet": "40mm"
    },
    "lieutenant-in-reiver-armour": {
      "sheet": "40mm"
    },
    "lieutenant-with-combi-weapon": {
      "sheet": "40mm"
    },
    "lion-eljonson": {
      "sheet": "60mm"
    },
    "nephilim-jetfighter": {
      "sheet": "120x92mm Oval Base"
    },
    "outrider-squad": {
      "profiles": {
        "OUTRIDER": "90x52.5mm Oval Base",
        "INVADER ATV": "90x52.5mm Oval Base"
      }
    },
    "predator-annihilator": {
      "sheet": "Hull"
    },
    "predator-destructor": {
      "sheet": "Hull"
    },
    "ravenwing-black-knights": {
      "sheet": "75x42mm Oval Base"
    },
    "ravenwing-command-squad": {
      "sheet": "75x42mm Oval Base"
    },
    "ravenwing-dark-talon": {
      "sheet": "120x92mm Oval Base"
    },
    "ravenwing-darkshroud": {
      "sheet": "Large Flying Base"
    },
    "razorback": {
      "sheet": "Hull"
    },
    "redemptor-dreadnought": {
      "sheet": "90mm"
    },
    "reiver-squad": {
      "sheet": "32mm"
    },
    "repulsor": {
      "sheet": "100mm"
    },
    "repulsor-executioner": {
      "sheet": "100mm"
    },
    "rhino": {
      "sheet": "Hull"
    },
    "sammael": {
      "sheet": "Large Flying Base"
    },
    "scout-squad": {
      "sheet": "28.5mm"
    },
    "sternguard-veteran-squad": {
      "sheet": "32mm"
    },
    "storm-speeder-hailstrike": {
      "sheet": "90mm"
    },
    "storm-speeder-hammerstrike": {
      "sheet": "90mm"
    },
    "storm-speeder-thunderstrike": {
      "sheet": "90mm"
    },
    "stormhawk-interceptor": {
      "sheet": "120x92mm Oval Base"
    },
    "stormraven-gunship": {
      "sheet": "120x92mm Oval Base"
    },
    "stormtalon-gunship": {
      "sheet": "120x92mm Oval Base"
    },
    "suppressor-squad": {
      "sheet": "40mm"
    },
    "tactical-squad": {
      "sheet": "32mm"
    },
    "techmarine": {
      "sheet": "40mm"
    },
    "terminator-assault-squad": {
      "sheet": "40mm"
    },
    "terminator-squad": {
      "sheet": "40mm"
    },
    "thunderhawk-gunship": {
      "sheet": "Unique"
    },
    "vanguard-veteran-squad-with-jump-packs": {
      "sheet": "32mm"
    },
    "vindicator": {
      "sheet": "Hull"
    },
    "whirlwind": {
      "sheet": "Hull"
    }
  },
  "death-guard": {
    "beasts-of-nurgle": {
      "sheet": "60mm"
    },
    "biologus-putrifier": {
      "sheet": "40mm"
    },
    "blightlord-terminators": {
      "sheet": "40mm"
    },
    "chaos-land-raider": {
      "sheet": "Hull"
    },
    "chaos-predator-annihilator": {
      "sheet": "Hull"
    },
    "chaos-predator-destructor": {
      "sheet": "Hull"
    },
    "chaos-rhino": {
      "sheet": "Hull"
    },
    "chaos-spawn": {
      "sheet": "50mm"
    },
    "daemon-prince-of-nurgle": {
      "sheet": "60mm"
    },
    "daemon-prince-of-nurgle-with-wings": {
      "sheet": "60mm"
    },
    "deathshroud-terminators": {
      "sheet": "40mm"
    },
    "defiler": {
      "sheet": "160mm"
    },
    "foetid-bloat-drone": {
      "sheet": "60mm"
    },
    "foetid-bloat-drone-with-heavy-blight-launcher": {
      "sheet": "60mm"
    },
    "foul-blightspawn": {
      "sheet": "40mm"
    },
    "great-unclean-one": {
      "sheet": "130mm"
    },
    "helbrute": {
      "sheet": "60mm"
    },
    "icon-bearer": {
      "sheet": "32mm"
    },
    "lord-of-contagion": {
      "sheet": "40mm"
    },
    "lord-of-poxes": {
      "sheet": "40mm"
    },
    "lord-of-virulence": {
      "sheet": "50mm"
    },
    "malignant-plaguecaster": {
      "sheet": "32mm"
    },
    "miasmic-malignifier": {
      "sheet": "Hull"
    },
    "mortarion": {
      "sheet": "100mm"
    },
    "myphitic-blight-hauler": {
      "sheet": "80mm"
    },
    "noxious-blightbringer": {
      "sheet": "40mm"
    },
    "nurglings": {
      "sheet": "40mm"
    },
    "plague-drones": {
      "sheet": "Large Flying Base"
    },
    "plague-marines": {
      "sheet": "32mm"
    },
    "plague-surgeon": {
      "sheet": "40mm"
    },
    "plaguebearers": {
      "sheet": "32mm"
    },
    "plagueburst-crawler": {
      "sheet": "Hull"
    },
    "poxwalkers": {
      "sheet": "25mm"
    },
    "rotigus": {
      "sheet": "130mm"
    },
    "tallyman": {
      "sheet": "40mm"
    },
    "typhus": {
      "sheet": "50mm"
    }
  },
  "deathwatch": {
    "aggressor-squad": {
      "sheet": "40mm"
    },
    "ancient": {
      "sheet": "40mm"
    },
    "ancient-in-terminator-armour": {
      "sheet": "40mm"
    },
    "apothecary": {
      "sheet": "40mm"
    },
    "apothecary-biologis": {
      "sheet": "40mm"
    },
    "assault-intercessor-squad": {
      "sheet": "32mm"
    },
    "assault-intercessors-with-jump-packs": {
      "sheet": "32mm"
    },
    "astraeus": {
      "sheet": "Hull"
    },
    "ballistus-dreadnought": {
      "sheet": "90mm"
    },
    "bladeguard-ancient": {
      "sheet": "40mm"
    },
    "bladeguard-veteran-squad": {
      "sheet": "40mm"
    },
    "brutalis-dreadnought": {
      "sheet": "90mm"
    },
    "captain": {
      "sheet": "40mm"
    },
    "captain-in-gravis-armour": {
      "sheet": "40mm"
    },
    "captain-in-phobos-armour": {
      "sheet": "40mm"
    },
    "captain-in-terminator-armour": {
      "sheet": "50mm"
    },
    "captain-with-jump-pack": {
      "sheet": "40mm"
    },
    "centurion-assault-squad": {
      "sheet": "50mm"
    },
    "centurion-devastator-squad": {
      "sheet": "50mm"
    },
    "chaplain": {
      "sheet": "40mm"
    },
    "chaplain-in-terminator-armour": {
      "sheet": "40mm"
    },
    "chaplain-on-bike": {
      "sheet": "90x52.5mm Oval Base"
    },
    "chaplain-with-jump-pack": {
      "sheet": "32mm"
    },
    "company-heroes": {
      "sheet": "40mm"
    },
    "corvus-blackstar": {
      "sheet": "120x92mm Oval Base"
    },
    "deathwatch-terminator-squad": {
      "sheet": "40mm"
    },
    "deathwatch-veterans": {
      "sheet": "32mm"
    },
    "decimus-kill-team": {
      "profiles": {
        "KILL TEAM SERGEANT, DEATHWATCH VETERAN": "32mm",
        "GRAVIS VETERAN": "40mm"
      }
    },
    "desolation-squad": {
      "sheet": "32mm"
    },
    "dreadnought": {
      "sheet": "60mm"
    },
    "drop-pod": {
      "sheet": "Hull"
    },
    "eliminator-squad": {
      "sheet": "40mm"
    },
    "eradicator-squad": {
      "sheet": "40mm"
    },
    "eradicator-squad-with-heavy-bolters": {
      "sheet": "40mm"
    },
    "firestrike-servo-turrets": {
      "sheet": "80mm"
    },
    "fortis-kill-team": {
      "sheet": "32mm"
    },
    "gladiator-lancer": {
      "sheet": "100mm"
    },
    "gladiator-reaper": {
      "sheet": "100mm"
    },
    "gladiator-valiant": {
      "sheet": "100mm"
    },
    "hammerfall-bunker": {
      "sheet": "Hull"
    },
    "heavy-intercessor-squad": {
      "sheet": "40mm"
    },
    "hellblaster-squad": {
      "sheet": "32mm"
    },
    "impulsor": {
      "sheet": "100mm"
    },
    "inceptor-squad": {
      "sheet": "40mm"
    },
    "incursor-squad": {
      "sheet": "32mm"
    },
    "indomitor-kill-team": {
      "sheet": "40mm"
    },
    "infernus-squad": {
      "sheet": "32mm"
    },
    "infiltrator-squad": {
      "sheet": "32mm"
    },
    "intercessor-squad": {
      "sheet": "32mm"
    },
    "invader-atv": {
      "sheet": "Hull"
    },
    "invictor-tactical-warsuit": {
      "sheet": "90mm"
    },
    "judiciar": {
      "sheet": "40mm"
    },
    "land-raider": {
      "sheet": "Hull"
    },
    "land-raider-crusader": {
      "sheet": "Hull"
    },
    "land-raider-redeemer": {
      "sheet": "Hull"
    },
    "land-speeder": {
      "sheet": "105x70mm Oval Base"
    },
    "librarian": {
      "sheet": "40mm"
    },
    "librarian-in-phobos-armour": {
      "sheet": "40mm"
    },
    "librarian-in-terminator-armour": {
      "sheet": "40mm"
    },
    "lieutenant": {
      "sheet": "40mm"
    },
    "lieutenant-in-phobos-armour": {
      "sheet": "40mm"
    },
    "lieutenant-in-reiver-armour": {
      "sheet": "40mm"
    },
    "lieutenant-with-combi-weapon": {
      "sheet": "40mm"
    },
    "outrider-squad": {
      "profiles": {
        "OUTRIDER": "90x52.5mm Oval Base",
        "INVADER ATV": "90x52.5mm Oval Base"
      }
    },
    "predator-annihilator": {
      "sheet": "Hull"
    },
    "predator-destructor": {
      "sheet": "Hull"
    },
    "razorback": {
      "sheet": "Hull"
    },
    "redemptor-dreadnought": {
      "sheet": "90mm"
    },
    "reiver-squad": {
      "sheet": "32mm"
    },
    "repulsor": {
      "sheet": "100mm"
    },
    "repulsor-executioner": {
      "sheet": "100mm"
    },
    "rhino": {
      "sheet": "Hull"
    },
    "spectrus-kill-team": {
      "sheet": "32mm"
    },
    "sternguard-veteran-squad": {
      "sheet": "32mm"
    },
    "storm-speeder-hailstrike": {
      "sheet": "90mm"
    },
    "storm-speeder-hammerstrike": {
      "sheet": "90mm"
    },
    "storm-speeder-thunderstrike": {
      "sheet": "90mm"
    },
    "stormhawk-interceptor": {
      "sheet": "120x92mm Oval Base"
    },
    "stormraven-gunship": {
      "sheet": "120x92mm Oval Base"
    },
    "stormtalon-gunship": {
      "sheet": "120x92mm Oval Base"
    },
    "suppressor-squad": {
      "sheet": "40mm"
    },
    "talonstrike-kill-team": {
      "profiles": {
        "KILL TEAM SERGEANT WITH JUMP PACK AND KILL TEAM INTERCESSORS WITH JUMP PACKS": "32mm",
        "KILL TEAM HEAVY INTERCESSORS WITH JUMP PACKS": "40mm"
      }
    },
    "techmarine": {
      "sheet": "40mm"
    },
    "thunderhawk-gunship": {
      "sheet": "Unique"
    },
    "vanguard-veteran-squad-with-jump-packs": {
      "sheet": "32mm"
    },
    "vindicator": {
      "sheet": "Hull"
    },
    "watch-captain-artemis": {
      "sheet": "32mm"
    },
    "watch-master": {
      "sheet": "32mm"
    },
    "whirlwind": {
      "sheet": "Hull"
    }
  },
  "drukhari": {
    "archon": {
      "sheet": "32mm"
    },
    "cronos": {
      "sheet": "Large Flying Base"
    },
    "drazhar": {
      "sheet": "40mm"
    },
    "haemonculus": {
      "sheet": "25mm"
    },
    "hand-of-the-archon": {
      "sheet": "25mm"
    },
    "hellions": {
      "sheet": "Small Flying Base"
    },
    "incubi": {
      "profiles": {
        "INCUBI": "28.5mm",
        "KLAIVEX": "28.5mm"
      }
    },
    "kabalite-warriors": {
      "sheet": "25mm"
    },
    "lady-malys": {
      "sheet": "32mm"
    },
    "lelith-hesperax": {
      "sheet": "32mm"
    },
    "mandrakes": {
      "sheet": "28.5mm"
    },
    "raider": {
      "sheet": "Large Flying Base"
    },
    "ravager": {
      "sheet": "Large Flying Base"
    },
    "razorwing-jetfighter": {
      "sheet": "120x92mm Oval Base"
    },
    "reavers": {
      "sheet": "Small Flying Base"
    },
    "scourges-with-heavy-weapons": {
      "sheet": "32mm"
    },
    "scourges-with-shardcarbines": {
      "sheet": "32mm"
    },
    "succubus": {
      "sheet": "25mm"
    },
    "talos": {
      "sheet": "Large Flying Base"
    },
    "venom": {
      "sheet": "Large Flying Base"
    },
    "voidraven-bomber": {
      "sheet": "120x92mm Oval Base"
    },
    "wracks": {
      "sheet": "25mm"
    },
    "wyches": {
      "sheet": "25mm"
    }
  },
  "emperors-children": {
    "chaos-land-raider": {
      "sheet": "Hull"
    },
    "chaos-rhino": {
      "sheet": "Hull"
    },
    "chaos-spawn": {
      "sheet": "50mm"
    },
    "chaos-terminators": {
      "sheet": "40mm"
    },
    "daemon-prince-of-slaanesh": {
      "sheet": "60mm"
    },
    "daemon-prince-of-slaanesh-with-wings": {
      "sheet": "60mm"
    },
    "daemonettes": {
      "sheet": "25mm"
    },
    "defiler": {
      "sheet": "160mm"
    },
    "fiends": {
      "sheet": "75x42mm Oval Base"
    },
    "flawless-blades": {
      "sheet": "40mm"
    },
    "fulgrim": {
      "sheet": "130mm"
    },
    "heldrake": {
      "sheet": "120x92mm Oval Base"
    },
    "infractors": {
      "sheet": "32mm"
    },
    "keeper-of-secrets": {
      "sheet": "100mm"
    },
    "lord-exultant": {
      "sheet": "40mm"
    },
    "lord-kakophonist": {
      "sheet": "40mm"
    },
    "lucius-the-eternal": {
      "sheet": "50mm"
    },
    "maulerfiend": {
      "sheet": "120x92mm Oval Base"
    },
    "noise-marines": {
      "sheet": "40mm"
    },
    "seekers": {
      "sheet": "60x35.5mm Oval Base"
    },
    "shalaxi-helbane": {
      "sheet": "100mm"
    },
    "sorcerer": {
      "sheet": "40mm"
    },
    "tormentors": {
      "sheet": "32mm"
    }
  },
  "genestealer-cults": {
    "aberrants": {
      "sheet": "32mm"
    },
    "abominant": {
      "sheet": "40mm"
    },
    "achilles-ridgerunners": {
      "sheet": "120x92mm Oval Base"
    },
    "acolyte-hybrids-with-autopistols": {
      "sheet": "32mm"
    },
    "acolyte-hybrids-with-hand-flamers": {
      "sheet": "32mm"
    },
    "acolyte-iconward": {
      "sheet": "32mm"
    },
    "atalan-jackals": {
      "profiles": {
        "ATALAN JACKAL": "60x35.5mm Oval Base",
        "ATALAN WOLFQUAD": "60mm"
      }
    },
    "benefictus": {
      "sheet": "32mm"
    },
    "biophagus": {
      "sheet": "25mm"
    },
    "clamavus": {
      "sheet": "32mm"
    },
    "goliath-rockgrinder": {
      "sheet": "Hull"
    },
    "goliath-truck": {
      "sheet": "Hull"
    },
    "hybrid-metamorphs": {
      "sheet": "32mm"
    },
    "jackal-alphus": {
      "sheet": "60x35.5mm Oval Base"
    },
    "kelermorph": {
      "sheet": "32mm"
    },
    "locus": {
      "sheet": "32mm"
    },
    "magus": {
      "sheet": "32mm"
    },
    "neophyte-hybrids": {
      "sheet": "25mm"
    },
    "nexos": {
      "sheet": "40mm"
    },
    "patriarch": {
      "sheet": "50mm"
    },
    "primus": {
      "sheet": "32mm"
    },
    "purestrain-genestealers": {
      "sheet": "32mm"
    },
    "reductus-saboteur": {
      "sheet": "32mm"
    },
    "sanctus": {
      "sheet": "32mm"
    }
  },
  "grey-knights": {
    "brother-captain": {
      "sheet": "40mm"
    },
    "brotherhood-champion": {
      "sheet": "32mm"
    },
    "brotherhood-chaplain": {
      "sheet": "40mm"
    },
    "brotherhood-librarian": {
      "sheet": "40mm"
    },
    "brotherhood-techmarine": {
      "sheet": "32mm"
    },
    "brotherhood-terminator-squad": {
      "sheet": "40mm"
    },
    "castellan-crowe": {
      "sheet": "40mm"
    },
    "grand-master": {
      "sheet": "40mm"
    },
    "grand-master-in-nemesis-dreadknight": {
      "sheet": "120x92mm Oval Base"
    },
    "grand-master-voldus": {
      "sheet": "40mm"
    },
    "grey-knights-thunderhawk-gunship": {
      "sheet": "Unique"
    },
    "interceptor-squad": {
      "sheet": "32mm"
    },
    "land-raider": {
      "sheet": "Hull"
    },
    "land-raider-crusader": {
      "sheet": "Hull"
    },
    "land-raider-redeemer": {
      "sheet": "Hull"
    },
    "nemesis-dreadknight": {
      "sheet": "120x92mm Oval Base"
    },
    "paladin-squad": {
      "sheet": "40mm"
    },
    "purgation-squad": {
      "sheet": "32mm"
    },
    "purifier-squad": {
      "sheet": "32mm"
    },
    "razorback": {
      "sheet": "Hull"
    },
    "rhino": {
      "sheet": "Hull"
    },
    "stormhawk-interceptor": {
      "sheet": "120x92mm Oval Base"
    },
    "stormraven-gunship": {
      "sheet": "120x92mm Oval Base"
    },
    "stormtalon-gunship": {
      "sheet": "120x92mm Oval Base"
    },
    "strike-squad": {
      "sheet": "32mm"
    },
    "venerable-dreadnought": {
      "sheet": "60mm"
    }
  },
  "imperial-agents": {
    "aquila-kill-team": {
      "profiles": {
        "KILL TEAM SERGEANT, DEATHWATCH VETERAN": "32mm",
        "GRAVIS VETERAN": "40mm"
      }
    },
    "callidus-assassin": {
      "sheet": "32mm"
    },
    "corvus-blackstar": {
      "sheet": "120x92mm Oval Base"
    },
    "culexus-assassin": {
      "sheet": "32mm"
    },
    "deathwatch-kill-team": {
      "sheet": "32mm"
    },
    "eversor-assassin": {
      "sheet": "32mm"
    },
    "exaction-squad": {
      "sheet": "28.5mm"
    },
    "grey-knights-terminator-squad": {
      "sheet": "40mm"
    },
    "imperial-navy-breachers": {
      "sheet": "25mm"
    },
    "imperial-rhino": {
      "sheet": "Hull"
    },
    "inquisitor": {
      "sheet": "32mm"
    },
    "inquisitor-coteaz": {
      "sheet": "40mm"
    },
    "inquisitor-draxus": {
      "sheet": "32mm"
    },
    "inquisitor-greyfax": {
      "sheet": "32mm"
    },
    "inquisitor-kroyle": {
      "sheet": "60mm"
    },
    "inquisitorial-agents": {
      "sheet": "25mm"
    },
    "inquisitorial-chimera": {
      "sheet": "Hull"
    },
    "ministorum-priest": {
      "sheet": "32mm"
    },
    "navigator": {
      "sheet": "32mm"
    },
    "rogue-trader-entourage": {
      "profiles": {
        "ROGUE TRADER": "25mm",
        "OTHER MODELS": "25mm"
      }
    },
    "sanctifiers": {
      "sheet": "25mm"
    },
    "sisters-of-battle-immolator": {
      "sheet": "Hull"
    },
    "sisters-of-battle-squad": {
      "sheet": "32mm"
    },
    "subductor-squad": {
      "sheet": "28.5mm"
    },
    "vigilant-squad": {
      "sheet": "28.5mm"
    },
    "vindicare-assassin": {
      "sheet": "32mm"
    },
    "voidsmen-at-arms": {
      "sheet": "25mm"
    },
    "watch-captain-artemis": {
      "sheet": "32mm"
    },
    "watch-master": {
      "sheet": "32mm"
    }
  },
  "imperial-knights": {
    "acastus-knight-asterius": {
      "sheet": "Hull"
    },
    "acastus-knight-porphyrion": {
      "sheet": "Hull"
    },
    "armiger-helverin": {
      "sheet": "100mm"
    },
    "armiger-moirax": {
      "sheet": "100mm"
    },
    "armiger-warglaive": {
      "sheet": "100mm"
    },
    "canis-rex": {
      "sheet": "170x109mm Oval Base"
    },
    "cerastus-knight-acheron": {
      "sheet": "170x109mm Oval Base"
    },
    "cerastus-knight-atrapos": {
      "sheet": "170x109mm Oval Base"
    },
    "cerastus-knight-castigator": {
      "sheet": "170x109mm Oval Base"
    },
    "cerastus-knight-lancer": {
      "sheet": "170x109mm Oval Base"
    },
    "knight-castellan": {
      "sheet": "170x109mm Oval Base"
    },
    "knight-crusader": {
      "sheet": "170x109mm Oval Base"
    },
    "knight-defender": {
      "sheet": "170x109mm Oval Base"
    },
    "knight-destrier": {
      "sheet": "150x95mm Oval Base"
    },
    "knight-errant": {
      "sheet": "170x109mm Oval Base"
    },
    "knight-gallant": {
      "sheet": "170x109mm Oval Base"
    },
    "knight-paladin": {
      "sheet": "170x109mm Oval Base"
    },
    "knight-preceptor": {
      "sheet": "170x109mm Oval Base"
    },
    "knight-valiant": {
      "sheet": "170x109mm Oval Base"
    },
    "knight-warden": {
      "sheet": "170x109mm Oval Base"
    },
    "questoris-knight-magaera": {
      "sheet": "170x109mm Oval Base"
    },
    "questoris-knight-styrix": {
      "sheet": "170x109mm Oval Base"
    }
  },
  "leagues-of-votann": {
    "arkanyst-evaluator": {
      "sheet": "32mm"
    },
    "berehk-stornbr-w": {
      "sheet": "40mm"
    },
    "br-khyr-iron-master": {
      "profiles": {
        "BRÔKHYR IRON-MASTER": "32mm",
        "IRONKIN ASSISTANT": "28.5mm",
        "E-COG": "25mm"
      }
    },
    "br-khyr-thunderkyn": {
      "sheet": "40mm"
    },
    "buri-aegnirssen": {
      "sheet": "40mm"
    },
    "cthonian-beserks": {
      "sheet": "28.5mm"
    },
    "cthonian-earthshakers": {
      "sheet": "80mm"
    },
    "einhyr-champion": {
      "sheet": "40mm"
    },
    "einhyr-hearthguard": {
      "sheet": "32mm"
    },
    "grimnyr": {
      "profiles": {
        "GRIMNYR": "40mm",
        "CORV": "25mm"
      }
    },
    "hearthkyn-warriors": {
      "sheet": "28.5mm"
    },
    "hekaton-land-fortress": {
      "sheet": "Hull"
    },
    "hernkyn-pioneers": {
      "sheet": "90x52.5mm Oval Base"
    },
    "hernkyn-yaegirs": {
      "sheet": "28.5mm"
    },
    "ironkin-steeljacks-with-heavy-volkanite-disintegrators": {
      "sheet": "40mm"
    },
    "ironkin-steeljacks-with-melee-weapons": {
      "sheet": "40mm"
    },
    "k-hl": {
      "sheet": "40mm"
    },
    "kapricus-carrier": {
      "sheet": "105x70mm Oval Base"
    },
    "kapricus-defenders": {
      "sheet": "105x70mm Oval Base"
    },
    "memnyr-strategist": {
      "sheet": "32mm"
    },
    "sagitaur": {
      "sheet": "Hull"
    },
    "thar-the-destined": {
      "sheet": "40mm"
    }
  },
  "necrons": {
    "annihilation-barge": {
      "sheet": "Large Flying Base"
    },
    "ctan-shard-of-the-deceiver": {
      "sheet": "40mm"
    },
    "ctan-shard-of-the-nightbringer": {
      "sheet": "90mm"
    },
    "ctan-shard-of-the-void-dragon": {
      "sheet": "80mm"
    },
    "canoptek-doomstalker": {
      "sheet": "90mm"
    },
    "canoptek-macrocytes": {
      "sheet": "28.5mm"
    },
    "canoptek-reanimator": {
      "sheet": "60mm"
    },
    "canoptek-scarab-swarms": {
      "sheet": "40mm"
    },
    "canoptek-spyders": {
      "sheet": "60mm"
    },
    "canoptek-tomb-crawlers": {
      "sheet": "50mm"
    },
    "canoptek-wraiths": {
      "sheet": "50mm"
    },
    "catacomb-command-barge": {
      "sheet": "Large Flying Base"
    },
    "chronomancer": {
      "sheet": "40mm"
    },
    "convergence-of-dominion": {
      "sheet": "Hull"
    },
    "cryptothralls": {
      "sheet": "32mm"
    },
    "deathmarks": {
      "sheet": "32mm"
    },
    "doom-scythe": {
      "sheet": "120x92mm Oval Base"
    },
    "doomsday-ark": {
      "sheet": "Large Flying Base"
    },
    "flayed-ones": {
      "sheet": "28.5mm"
    },
    "geomancer": {
      "sheet": "50mm"
    },
    "ghost-ark": {
      "sheet": "Large Flying Base"
    },
    "hexmark-destroyer": {
      "sheet": "50mm"
    },
    "illuminor-szeras": {
      "sheet": "80mm"
    },
    "immortals": {
      "sheet": "32mm"
    },
    "imotekh-the-stormlord": {
      "sheet": "40mm"
    },
    "lokhust-destroyers": {
      "sheet": "Large Flying Base"
    },
    "lokhust-heavy-destroyers": {
      "sheet": "60mm"
    },
    "lokhust-lord": {
      "sheet": "Large Flying Base"
    },
    "lychguard": {
      "sheet": "32mm"
    },
    "monolith": {
      "sheet": "160mm"
    },
    "necron-warriors": {
      "sheet": "32mm"
    },
    "nekrosor-ammentar": {
      "sheet": "80mm"
    },
    "night-scythe": {
      "sheet": "120x92mm Oval Base"
    },
    "obelisk": {
      "sheet": "120x92mm Oval Base"
    },
    "ophydian-destroyers": {
      "sheet": "50mm"
    },
    "orikan-the-diviner": {
      "sheet": "40mm"
    },
    "overlord": {
      "sheet": "40mm"
    },
    "overlord-with-translocation-shroud": {
      "sheet": "40mm"
    },
    "plasmancer": {
      "sheet": "32mm"
    },
    "psychomancer": {
      "sheet": "40mm"
    },
    "royal-warden": {
      "sheet": "32mm"
    },
    "seraptek-heavy-construct": {
      "sheet": "Hull"
    },
    "skorpekh-destroyers": {
      "sheet": "50mm"
    },
    "skorpekh-lord": {
      "sheet": "60mm"
    },
    "technomancer": {
      "sheet": "50mm"
    },
    "tesseract-vault": {
      "sheet": "120x92mm Oval Base"
    },
    "the-silent-king": {
      "profiles": {
        "SZAREKH": "100mm",
        "TRIARCHAL MENHIR": "50mm"
      }
    },
    "tomb-blades": {
      "sheet": "Small Flying Base"
    },
    "transcendent-ctan": {
      "sheet": "60mm"
    },
    "trazyn-the-infinite": {
      "sheet": "25mm"
    },
    "triarch-praetorians": {
      "sheet": "32mm"
    },
    "triarch-stalker": {
      "sheet": "Hull"
    }
  },
  "orks": {
    "bannernob": {
      "sheet": "40mm"
    },
    "battlewagon": {
      "sheet": "Hull"
    },
    "beast-snagga-boyz": {
      "profiles": {
        "BEAST SNAGGA BOY": "32mm",
        "BEAST SNAGGA NOB": "32mm"
      }
    },
    "beastboss": {
      "sheet": "50mm"
    },
    "beastboss-on-squigosaur": {
      "sheet": "80mm"
    },
    "big-mek": {
      "sheet": "50mm"
    },
    "big-mek-dakkarig": {
      "sheet": "90mm"
    },
    "big-mek-in-mega-armour": {
      "sheet": "40mm"
    },
    "big-mek-with-shokk-attack-gun": {
      "sheet": "40mm"
    },
    "biged-bossbunka": {
      "sheet": "Hull"
    },
    "bigboss": {
      "sheet": "40mm"
    },
    "blitza-bommer": {
      "sheet": "120x92mm Oval Base"
    },
    "boomdakka-snazzwagon": {
      "sheet": "150x95mm Oval Base"
    },
    "boss-snikrot": {
      "sheet": "40mm"
    },
    "boyz": {
      "profiles": {
        "BOY": "32mm",
        "BOSS NOB": "32mm"
      }
    },
    "breaka-boyz": {
      "sheet": "32mm"
    },
    "burna-boyz": {
      "sheet": "32mm"
    },
    "burna-bommer": {
      "sheet": "120x92mm Oval Base"
    },
    "dakkajet": {
      "sheet": "120x92mm Oval Base"
    },
    "deff-dread": {
      "sheet": "60mm"
    },
    "deffkilla-wartrike": {
      "sheet": "150x95mm Oval Base"
    },
    "deffkoptas": {
      "sheet": "75x42mm Oval Base"
    },
    "flash-gitz": {
      "sheet": "40mm"
    },
    "gargantuan-squiggoth": {
      "sheet": "Hull"
    },
    "ghazghkull-thraka": {
      "profiles": {
        "GHAZGHKULL THRAKA": "80mm",
        "MAKARI": "25mm"
      }
    },
    "gorkanaut": {
      "sheet": "170x109mm Oval Base"
    },
    "gretchin": {
      "profiles": {
        "GRETCHIN": "25mm",
        "RUNTHERD": "32mm"
      }
    },
    "hunta-rig": {
      "sheet": "170x109mm Oval Base"
    },
    "kill-rig": {
      "sheet": "170x109mm Oval Base"
    },
    "killa-kans": {
      "sheet": "60mm"
    },
    "kommandos": {
      "profiles": {
        "KOMMANDOS": "32mm",
        "BOSS NOB": "32mm"
      }
    },
    "kustom-boosta-blasta": {
      "sheet": "150x95mm Oval Base"
    },
    "lootas": {
      "sheet": "32mm"
    },
    "meganobz": {
      "sheet": "40mm"
    },
    "megatrakk-scrapjet": {
      "sheet": "150x95mm Oval Base"
    },
    "mek": {
      "sheet": "32mm"
    },
    "mek-gunz": {
      "sheet": "Hull"
    },
    "morkanaut": {
      "sheet": "170x109mm Oval Base"
    },
    "mozrog-skragbad": {
      "sheet": "80mm"
    },
    "nobz": {
      "sheet": "32mm"
    },
    "painboss": {
      "sheet": "40mm"
    },
    "painboy": {
      "sheet": "32mm"
    },
    "rukkatrukk-squigbuggy": {
      "sheet": "150x95mm Oval Base"
    },
    "shokkjump-dragsta": {
      "sheet": "150x95mm Oval Base"
    },
    "squighog-boyz": {
      "profiles": {
        "Squighog Boyz": "75x42mm Oval Base",
        "Nob On Smasha Squig": "90x52.5mm Oval Base"
      }
    },
    "stompa": {
      "sheet": "Hull"
    },
    "stormboyz": {
      "profiles": {
        "STORMBOY": "32mm",
        "BOSS NOB": "32mm"
      }
    },
    "tankbustas": {
      "sheet": "32mm"
    },
    "trukk": {
      "sheet": "Hull"
    },
    "warbikers": {
      "profiles": {
        "WARBIKER": "75x42mm Oval Base",
        "BOSS NOB ON WARBIKE": "75x42mm Oval Base"
      }
    },
    "warboss": {
      "sheet": "40mm"
    },
    "warboss-in-mega-armour": {
      "sheet": "50mm"
    },
    "wartrakk": {
      "sheet": "105x70mm Oval Base"
    },
    "wazbom-blastajet": {
      "sheet": "150x95mm Oval Base"
    },
    "wazdakka-gutsmek": {
      "sheet": "120mm"
    },
    "weirdboy": {
      "sheet": "40mm"
    },
    "wurrboy": {
      "sheet": "32mm"
    },
    "zodgrod-wortsnagga": {
      "sheet": "50mm"
    }
  },
  "space-marines": {
    "adrax-agatone": {
      "sheet": "40mm"
    },
    "aethon-shaan": {
      "sheet": "50mm"
    },
    "aggressor-squad": {
      "sheet": "40mm"
    },
    "ancient": {
      "sheet": "40mm"
    },
    "ancient-in-terminator-armour": {
      "sheet": "40mm"
    },
    "apothecary": {
      "sheet": "40mm"
    },
    "apothecary-biologis": {
      "sheet": "40mm"
    },
    "assault-intercessor-squad": {
      "sheet": "32mm"
    },
    "assault-intercessors-with-jump-packs": {
      "sheet": "32mm"
    },
    "astraeus": {
      "sheet": "Hull"
    },
    "ballistus-dreadnought": {
      "sheet": "90mm"
    },
    "bladeguard-ancient": {
      "sheet": "40mm"
    },
    "bladeguard-veteran-squad": {
      "sheet": "40mm"
    },
    "brutalis-dreadnought": {
      "sheet": "90mm"
    },
    "caanok-var": {
      "sheet": "50mm"
    },
    "captain": {
      "sheet": "40mm"
    },
    "captain-in-gravis-armour": {
      "sheet": "40mm"
    },
    "captain-in-phobos-armour": {
      "sheet": "40mm"
    },
    "captain-in-terminator-armour": {
      "sheet": "50mm"
    },
    "captain-titus": {
      "sheet": "40mm"
    },
    "captain-with-jump-pack": {
      "sheet": "40mm"
    },
    "cato-sicarius": {
      "sheet": "40mm"
    },
    "centurion-assault-squad": {
      "sheet": "50mm"
    },
    "centurion-devastator-squad": {
      "sheet": "50mm"
    },
    "chaplain": {
      "sheet": "40mm"
    },
    "chaplain-in-terminator-armour": {
      "sheet": "40mm"
    },
    "chaplain-on-bike": {
      "sheet": "90x52.5mm Oval Base"
    },
    "chaplain-with-jump-pack": {
      "sheet": "32mm"
    },
    "chief-librarian-tigurius": {
      "sheet": "40mm"
    },
    "company-heroes": {
      "sheet": "40mm"
    },
    "darnath-lysander": {
      "sheet": "50mm"
    },
    "desolation-squad": {
      "sheet": "32mm"
    },
    "devastator-squad": {
      "sheet": "32mm"
    },
    "dreadnought": {
      "sheet": "60mm"
    },
    "drop-pod": {
      "sheet": "Hull"
    },
    "eliminator-squad": {
      "sheet": "40mm"
    },
    "eradicator-squad": {
      "sheet": "40mm"
    },
    "eradicator-squad-with-heavy-bolters": {
      "sheet": "40mm"
    },
    "firestrike-servo-turrets": {
      "sheet": "80mm"
    },
    "gladiator-lancer": {
      "sheet": "100mm"
    },
    "gladiator-reaper": {
      "sheet": "100mm"
    },
    "gladiator-valiant": {
      "sheet": "100mm"
    },
    "hammerfall-bunker": {
      "sheet": "Hull"
    },
    "heavy-intercessor-squad": {
      "sheet": "40mm"
    },
    "hellblaster-squad": {
      "sheet": "32mm"
    },
    "impulsor": {
      "sheet": "100mm"
    },
    "inceptor-squad": {
      "sheet": "40mm"
    },
    "incursor-squad": {
      "sheet": "32mm"
    },
    "infernus-squad": {
      "sheet": "32mm"
    },
    "infiltrator-squad": {
      "sheet": "32mm"
    },
    "intercessor-squad": {
      "sheet": "32mm"
    },
    "invader-atv": {
      "sheet": "Hull"
    },
    "invictor-tactical-warsuit": {
      "sheet": "90mm"
    },
    "iron-father-feirros": {
      "sheet": "40mm"
    },
    "judiciar": {
      "sheet": "40mm"
    },
    "kayvaan-shrike": {
      "sheet": "40mm"
    },
    "korsarro-khan": {
      "sheet": "40mm"
    },
    "land-raider": {
      "sheet": "Hull"
    },
    "land-raider-crusader": {
      "sheet": "Hull"
    },
    "land-raider-redeemer": {
      "sheet": "Hull"
    },
    "land-speeder": {
      "sheet": "105x70mm Oval Base"
    },
    "librarian": {
      "sheet": "40mm"
    },
    "librarian-in-phobos-armour": {
      "sheet": "40mm"
    },
    "librarian-in-terminator-armour": {
      "sheet": "40mm"
    },
    "lieutenant": {
      "sheet": "40mm"
    },
    "lieutenant-in-phobos-armour": {
      "sheet": "40mm"
    },
    "lieutenant-in-reiver-armour": {
      "sheet": "40mm"
    },
    "lieutenant-with-combi-weapon": {
      "sheet": "40mm"
    },
    "marneus-calgar-in-armour-of-antilochus": {
      "sheet": "50mm"
    },
    "outrider-squad": {
      "profiles": {
        "OUTRIDER": "90x52.5mm Oval Base",
        "INVADER ATV": "90x52.5mm Oval Base"
      }
    },
    "pedro-kantor": {
      "sheet": "32mm"
    },
    "predator-annihilator": {
      "sheet": "Hull"
    },
    "predator-destructor": {
      "sheet": "Hull"
    },
    "razorback": {
      "sheet": "Hull"
    },
    "redemptor-dreadnought": {
      "sheet": "90mm"
    },
    "reiver-squad": {
      "sheet": "32mm"
    },
    "repulsor": {
      "sheet": "100mm"
    },
    "repulsor-executioner": {
      "sheet": "100mm"
    },
    "rhino": {
      "sheet": "Hull"
    },
    "roboute-guilliman": {
      "sheet": "60mm"
    },
    "scout-squad": {
      "sheet": "28.5mm"
    },
    "sternguard-veteran-squad": {
      "sheet": "32mm"
    },
    "storm-speeder-hailstrike": {
      "sheet": "90mm"
    },
    "storm-speeder-hammerstrike": {
      "sheet": "90mm"
    },
    "storm-speeder-thunderstrike": {
      "sheet": "90mm"
    },
    "stormhawk-interceptor": {
      "sheet": "120x92mm Oval Base"
    },
    "stormraven-gunship": {
      "sheet": "120x92mm Oval Base"
    },
    "stormtalon-gunship": {
      "sheet": "120x92mm Oval Base"
    },
    "suboden-khan": {
      "sheet": "90x52.5mm Oval Base"
    },
    "suppressor-squad": {
      "sheet": "40mm"
    },
    "tactical-squad": {
      "sheet": "32mm"
    },
    "techmarine": {
      "sheet": "40mm"
    },
    "terminator-assault-squad": {
      "sheet": "40mm"
    },
    "terminator-squad": {
      "sheet": "40mm"
    },
    "thunderhawk-gunship": {
      "sheet": "Unique"
    },
    "tor-garadon": {
      "sheet": "40mm"
    },
    "uriel-ventris": {
      "sheet": "40mm"
    },
    "vanguard-veteran-squad-with-jump-packs": {
      "sheet": "32mm"
    },
    "victrix-honour-guard": {
      "sheet": "40mm"
    },
    "vindicator": {
      "sheet": "Hull"
    },
    "vulkan-hestan": {
      "sheet": "40mm"
    },
    "wardens-of-ultramar": {
      "profiles": {
        "Ancient Gadriel, Veteran Sergeant Metaurus": "40mm",
        "Gaius Silva, Aemelia Minervas, Dainal Kornelius, Lucia Vestha": "28.5mm"
      }
    },
    "whirlwind": {
      "sheet": "Hull"
    }
  },
  "space-wolves": {
    "aggressor-squad": {
      "sheet": "40mm"
    },
    "ancient": {
      "sheet": "40mm"
    },
    "ancient-in-terminator-armour": {
      "sheet": "40mm"
    },
    "arjac-rockfist": {
      "sheet": "50mm"
    },
    "assault-intercessor-squad": {
      "sheet": "32mm"
    },
    "assault-intercessors-with-jump-packs": {
      "sheet": "32mm"
    },
    "astraeus": {
      "sheet": "Hull"
    },
    "ballistus-dreadnought": {
      "sheet": "90mm"
    },
    "bjorn-the-fell-handed": {
      "sheet": "60mm"
    },
    "bladeguard-ancient": {
      "sheet": "40mm"
    },
    "bladeguard-veteran-squad": {
      "sheet": "40mm"
    },
    "blood-claws": {
      "sheet": "32mm"
    },
    "brutalis-dreadnought": {
      "sheet": "90mm"
    },
    "captain": {
      "sheet": "40mm"
    },
    "captain-in-gravis-armour": {
      "sheet": "40mm"
    },
    "captain-in-phobos-armour": {
      "sheet": "40mm"
    },
    "captain-in-terminator-armour": {
      "sheet": "50mm"
    },
    "captain-with-jump-pack": {
      "sheet": "40mm"
    },
    "centurion-assault-squad": {
      "sheet": "50mm"
    },
    "centurion-devastator-squad": {
      "sheet": "50mm"
    },
    "chaplain": {
      "sheet": "40mm"
    },
    "chaplain-in-terminator-armour": {
      "sheet": "40mm"
    },
    "chaplain-on-bike": {
      "sheet": "90x52.5mm Oval Base"
    },
    "chaplain-with-jump-pack": {
      "sheet": "32mm"
    },
    "company-heroes": {
      "sheet": "40mm"
    },
    "desolation-squad": {
      "sheet": "32mm"
    },
    "dreadnought": {
      "sheet": "60mm"
    },
    "drop-pod": {
      "sheet": "Hull"
    },
    "eliminator-squad": {
      "sheet": "40mm"
    },
    "eradicator-squad": {
      "sheet": "40mm"
    },
    "eradicator-squad-with-heavy-bolters": {
      "sheet": "40mm"
    },
    "fenrisian-wolves": {
      "sheet": "40mm"
    },
    "firestrike-servo-turrets": {
      "sheet": "80mm"
    },
    "gladiator-lancer": {
      "sheet": "100mm"
    },
    "gladiator-reaper": {
      "sheet": "100mm"
    },
    "gladiator-valiant": {
      "sheet": "100mm"
    },
    "grey-hunters": {
      "sheet": "32mm"
    },
    "hammerfall-bunker": {
      "sheet": "Hull"
    },
    "heavy-intercessor-squad": {
      "sheet": "40mm"
    },
    "hellblaster-squad": {
      "sheet": "32mm"
    },
    "impulsor": {
      "sheet": "100mm"
    },
    "inceptor-squad": {
      "sheet": "40mm"
    },
    "incursor-squad": {
      "sheet": "32mm"
    },
    "infernus-squad": {
      "sheet": "32mm"
    },
    "infiltrator-squad": {
      "sheet": "32mm"
    },
    "intercessor-squad": {
      "sheet": "32mm"
    },
    "invader-atv": {
      "sheet": "Hull"
    },
    "invictor-tactical-warsuit": {
      "sheet": "90mm"
    },
    "iron-priest": {
      "sheet": "32mm"
    },
    "judiciar": {
      "sheet": "40mm"
    },
    "land-raider": {
      "sheet": "Hull"
    },
    "land-raider-crusader": {
      "sheet": "Hull"
    },
    "land-raider-redeemer": {
      "sheet": "Hull"
    },
    "land-speeder": {
      "sheet": "105x70mm Oval Base"
    },
    "librarian": {
      "sheet": "40mm"
    },
    "librarian-in-phobos-armour": {
      "sheet": "40mm"
    },
    "librarian-in-terminator-armour": {
      "sheet": "40mm"
    },
    "lieutenant": {
      "sheet": "40mm"
    },
    "lieutenant-in-phobos-armour": {
      "sheet": "40mm"
    },
    "lieutenant-in-reiver-armour": {
      "sheet": "40mm"
    },
    "lieutenant-with-combi-weapon": {
      "sheet": "40mm"
    },
    "logan-grimnar": {
      "sheet": "80mm"
    },
    "murderfang": {
      "sheet": "60mm"
    },
    "njal-stormcaller": {
      "sheet": "40mm"
    },
    "outrider-squad": {
      "profiles": {
        "OUTRIDER": "90x52.5mm Oval Base",
        "INVADER ATV": "90x52.5mm Oval Base"
      }
    },
    "predator-annihilator": {
      "sheet": "Hull"
    },
    "predator-destructor": {
      "sheet": "Hull"
    },
    "ragnar-blackmane": {
      "sheet": "40mm"
    },
    "razorback": {
      "sheet": "Hull"
    },
    "redemptor-dreadnought": {
      "sheet": "90mm"
    },
    "reiver-squad": {
      "sheet": "32mm"
    },
    "repulsor": {
      "sheet": "100mm"
    },
    "repulsor-executioner": {
      "sheet": "100mm"
    },
    "rhino": {
      "sheet": "Hull"
    },
    "scout-squad": {
      "sheet": "28.5mm"
    },
    "sternguard-veteran-squad": {
      "sheet": "32mm"
    },
    "storm-speeder-hailstrike": {
      "sheet": "90mm"
    },
    "storm-speeder-hammerstrike": {
      "sheet": "90mm"
    },
    "storm-speeder-thunderstrike": {
      "sheet": "90mm"
    },
    "stormhawk-interceptor": {
      "sheet": "120x92mm Oval Base"
    },
    "stormraven-gunship": {
      "sheet": "120x92mm Oval Base"
    },
    "stormtalon-gunship": {
      "sheet": "120x92mm Oval Base"
    },
    "suppressor-squad": {
      "sheet": "40mm"
    },
    "techmarine": {
      "sheet": "40mm"
    },
    "terminator-assault-squad": {
      "sheet": "40mm"
    },
    "terminator-squad": {
      "sheet": "40mm"
    },
    "thunderhawk-gunship": {
      "sheet": "Unique"
    },
    "thunderwolf-cavalry": {
      "sheet": "60mm"
    },
    "ulrik-the-slayer": {
      "sheet": "32mm"
    },
    "vanguard-veteran-squad-with-jump-packs": {
      "sheet": "32mm"
    },
    "venerable-dreadnought": {
      "sheet": "60mm"
    },
    "vindicator": {
      "sheet": "Hull"
    },
    "whirlwind": {
      "sheet": "Hull"
    },
    "wolf-guard-battle-leader": {
      "sheet": "40mm"
    },
    "wolf-guard-headtakers": {
      "profiles": {
        "Wolf Guard Headtakers": "40mm",
        "Hunting Wolves": "60x35.5mm Oval Base"
      }
    },
    "wolf-guard-terminators": {
      "sheet": "40mm"
    },
    "wolf-priest": {
      "sheet": "40mm"
    },
    "wolf-scouts": {
      "profiles": {
        "WOLF SCOUTS": "32mm",
        "HUNTING WOLVES": "60x35.5mm Oval Base"
      }
    },
    "wulfen": {
      "sheet": "40mm"
    },
    "wulfen-dreadnought": {
      "sheet": "60mm"
    },
    "wulfen-with-storm-shields": {
      "sheet": "40mm"
    }
  },
  "tau-empire": {
    "ax-1-0-tiger-shark": {
      "sheet": "160mm"
    },
    "breacher-team": {
      "sheet": "25mm"
    },
    "broadside-battlesuits": {
      "sheet": "60mm"
    },
    "cadre-fireblade": {
      "sheet": "25mm"
    },
    "commander-farsight": {
      "sheet": "60mm"
    },
    "commander-in-coldstar-battlesuit": {
      "sheet": "60mm"
    },
    "commander-in-enforcer-battlesuit": {
      "sheet": "60mm"
    },
    "commander-shadowsun": {
      "sheet": "50mm"
    },
    "crisis-fireknife-battlesuits": {
      "sheet": "50mm"
    },
    "crisis-starscythe-battlesuits": {
      "sheet": "50mm"
    },
    "crisis-sunforge-battlesuits": {
      "sheet": "50mm"
    },
    "darkstrider": {
      "sheet": "32mm"
    },
    "devilfish": {
      "sheet": "Large Flying Base"
    },
    "ethereal": {
      "sheet": "40mm"
    },
    "firesight-team": {
      "sheet": "40mm"
    },
    "ghostkeel-battlesuit": {
      "sheet": "105x70mm Oval Base"
    },
    "hammerhead-gunship": {
      "sheet": "Large Flying Base"
    },
    "kroot-carnivores": {
      "sheet": "28.5mm"
    },
    "kroot-farstalkers": {
      "profiles": {
        "FARSTALKERS & KILL-BROKER": "28.5mm / 32mm",
        "KROOT HOUNDS": "28.5mm"
      }
    },
    "kroot-flesh-shaper": {
      "sheet": "32mm"
    },
    "kroot-hounds": {
      "sheet": "28.5mm"
    },
    "kroot-lone-spear": {
      "sheet": "90x52.5mm Oval Base"
    },
    "kroot-trail-shaper": {
      "sheet": "32mm"
    },
    "kroot-war-shaper": {
      "sheet": "32mm"
    },
    "krootox-rampagers": {
      "sheet": "50mm"
    },
    "krootox-riders": {
      "sheet": "50mm"
    },
    "manta": {
      "sheet": "Unique"
    },
    "pathfinder-team": {
      "sheet": "25mm"
    },
    "piranhas": {
      "sheet": "Large Flying Base"
    },
    "razorshark-strike-fighter": {
      "sheet": "120x92mm Oval Base"
    },
    "riptide-battlesuit": {
      "sheet": "120x92mm Oval Base"
    },
    "sky-ray-gunship": {
      "sheet": "Large Flying Base"
    },
    "stealth-battlesuits": {
      "sheet": "32mm"
    },
    "stormsurge": {
      "sheet": "170x109mm Oval Base"
    },
    "strike-team": {
      "sheet": "25mm"
    },
    "sun-shark-bomber": {
      "sheet": "120x92mm Oval Base"
    },
    "taunar-supremacy-armour": {
      "sheet": "160mm"
    },
    "the-twin-lance": {
      "sheet": "60mm / 32mm"
    },
    "tidewall-droneport": {
      "sheet": "Hull"
    },
    "tidewall-gunrig": {
      "sheet": "Hull"
    },
    "tidewall-shieldline": {
      "sheet": "Hull"
    },
    "tiger-shark": {
      "sheet": "160mm"
    },
    "vespid-stingwings": {
      "sheet": "28.5mm"
    }
  },
  "thousand-sons": {
    "ahriman": {
      "sheet": "40mm"
    },
    "blue-horrors": {
      "sheet": "25mm"
    },
    "chaos-land-raider": {
      "sheet": "Hull"
    },
    "chaos-predator-annihilator": {
      "sheet": "Hull"
    },
    "chaos-predator-destructor": {
      "sheet": "Hull"
    },
    "chaos-rhino": {
      "sheet": "Hull"
    },
    "chaos-spawn": {
      "sheet": "50mm"
    },
    "chaos-vindicator": {
      "sheet": "Hull"
    },
    "daemon-prince-of-tzeentch": {
      "sheet": "60mm"
    },
    "daemon-prince-of-tzeentch-with-wings": {
      "sheet": "60mm"
    },
    "defiler": {
      "sheet": "160mm"
    },
    "exalted-sorcerer": {
      "sheet": "32mm"
    },
    "exalted-sorcerer-on-disc-of-tzeentch": {
      "sheet": "40mm"
    },
    "flamers": {
      "sheet": "32mm"
    },
    "forgefiend": {
      "sheet": "120x92mm Oval Base"
    },
    "helbrute": {
      "sheet": "60mm"
    },
    "heldrake": {
      "sheet": "120x92mm Oval Base"
    },
    "infernal-master": {
      "sheet": "40mm"
    },
    "kairos-fateweaver": {
      "sheet": "100mm"
    },
    "lord-of-change": {
      "sheet": "100mm"
    },
    "magnus-the-red": {
      "sheet": "100mm"
    },
    "maulerfiend": {
      "sheet": "120x92mm Oval Base"
    },
    "mutalith-vortex-beast": {
      "sheet": "120x92mm Oval Base"
    },
    "pink-horrors": {
      "profiles": {
        "PINK HORROR": "32mm",
        "BLUE HORROR/BRIMSTONE HORROR": "32mm"
      }
    },
    "rubric-marines": {
      "profiles": {
        "Rubric Marine": "32mm",
        "Aspiring Sorcerer": "32mm"
      }
    },
    "scarab-occult-terminators": {
      "profiles": {
        "Scarab Occult Terminator": "40mm",
        "Scarab Occult Sorcerer": "40mm"
      }
    },
    "screamers": {
      "sheet": "Small Flying Base"
    },
    "sekhetar-robots": {
      "sheet": "40mm"
    },
    "sorcerer": {
      "sheet": "32mm"
    },
    "sorcerer-in-terminator-armour": {
      "sheet": "40mm"
    },
    "tzaangor-enlightened": {
      "sheet": "40mm"
    },
    "tzaangor-enlightened-with-fatecaster-greatbows": {
      "sheet": "40mm"
    },
    "tzaangor-shaman": {
      "sheet": "40mm"
    },
    "tzaangors": {
      "sheet": "32mm"
    }
  },
  "tyranids": {
    "barbgaunts": {
      "sheet": "40mm"
    },
    "biovores": {
      "sheet": "80mm"
    },
    "broodlord": {
      "sheet": "75x42mm Oval Base"
    },
    "carnifexes": {
      "sheet": "105x70mm Oval Base"
    },
    "deathleaper": {
      "sheet": "60mm"
    },
    "exocrine": {
      "sheet": "120x92mm Oval Base"
    },
    "gargoyles": {
      "sheet": "Small Flying Base"
    },
    "genestealers": {
      "sheet": "32mm"
    },
    "harpy": {
      "sheet": "120x92mm Oval Base"
    },
    "harridan": {
      "sheet": "Unique"
    },
    "haruspex": {
      "sheet": "120x92mm Oval Base"
    },
    "hierophant": {
      "sheet": "Hull"
    },
    "hive-crone": {
      "sheet": "120x92mm Oval Base"
    },
    "hive-guard": {
      "sheet": "50mm"
    },
    "hive-tyrant": {
      "sheet": "60mm"
    },
    "hormagaunts": {
      "sheet": "28.5mm"
    },
    "hyperadapted-raveners": {
      "profiles": {
        "Ravener Prime": "40mm",
        "Raveners": "40mm"
      }
    },
    "lictor": {
      "sheet": "50mm"
    },
    "maleceptor": {
      "sheet": "120x92mm Oval Base"
    },
    "mawloc": {
      "sheet": "120x92mm Oval Base"
    },
    "mucolid-spores": {
      "sheet": "40mm"
    },
    "neurogaunts": {
      "sheet": "25mm"
    },
    "neurolictor": {
      "sheet": "50mm"
    },
    "neurotyrant": {
      "sheet": "50mm"
    },
    "norn-assimilator": {
      "sheet": "100mm"
    },
    "norn-emissary": {
      "sheet": "100mm"
    },
    "old-one-eye": {
      "sheet": "105x70mm Oval Base"
    },
    "parasite-of-mortrex": {
      "sheet": "40mm"
    },
    "psychophage": {
      "sheet": "120x92mm Oval Base"
    },
    "pyrovores": {
      "sheet": "80mm"
    },
    "raveners": {
      "sheet": "40mm"
    },
    "ripper-swarms": {
      "sheet": "40mm"
    },
    "screamer-killer": {
      "sheet": "90mm"
    },
    "spore-mines": {
      "sheet": "25mm"
    },
    "sporocyst": {
      "sheet": "Hull"
    },
    "termagants": {
      "sheet": "28.5mm"
    },
    "tervigon": {
      "sheet": "120x92mm Oval Base"
    },
    "the-red-terror": {
      "sheet": "100mm"
    },
    "the-swarmlord": {
      "sheet": "60mm"
    },
    "toxicrene": {
      "sheet": "120x92mm Oval Base"
    },
    "trygon": {
      "sheet": "120x92mm Oval Base"
    },
    "tyranid-prime-with-lash-whip": {
      "sheet": "50mm"
    },
    "tyranid-warriors-with-melee-bio-weapons": {
      "sheet": "50mm"
    },
    "tyranid-warriors-with-ranged-bio-weapons": {
      "sheet": "50mm"
    },
    "tyrannocyte": {
      "sheet": "100mm"
    },
    "tyrannofex": {
      "sheet": "120x92mm Oval Base"
    },
    "tyrant-guard": {
      "sheet": "50mm"
    },
    "venomthropes": {
      "sheet": "40mm"
    },
    "von-ryans-leapers": {
      "sheet": "40mm"
    },
    "winged-hive-tyrant": {
      "sheet": "60mm"
    },
    "winged-tyranid-prime": {
      "sheet": "50mm"
    },
    "zoanthropes": {
      "sheet": "40mm"
    }
  },
  "world-eaters": {
    "angron": {
      "sheet": "100mm"
    },
    "bloodcrushers": {
      "sheet": "90x52.5mm Oval Base"
    },
    "bloodletters": {
      "sheet": "32mm"
    },
    "bloodthirster": {
      "sheet": "120x92mm Oval Base"
    },
    "chaos-land-raider": {
      "sheet": "Hull"
    },
    "chaos-predator-annihilator": {
      "sheet": "Hull"
    },
    "chaos-predator-destructor": {
      "sheet": "Hull"
    },
    "chaos-rhino": {
      "sheet": "Hull"
    },
    "chaos-spawn": {
      "sheet": "50mm"
    },
    "chaos-terminators": {
      "sheet": "40mm"
    },
    "daemon-prince-of-khorne": {
      "sheet": "60mm"
    },
    "daemon-prince-of-khorne-with-wings": {
      "sheet": "60mm"
    },
    "defiler": {
      "sheet": "160mm"
    },
    "eightbound": {
      "sheet": "40mm"
    },
    "exalted-eightbound": {
      "sheet": "40mm"
    },
    "flesh-hounds": {
      "sheet": "60x35.5mm Oval Base"
    },
    "forgefiend": {
      "sheet": "120x92mm Oval Base"
    },
    "goremongers": {
      "sheet": "32mm"
    },
    "helbrute": {
      "sheet": "60mm"
    },
    "heldrake": {
      "sheet": "120x92mm Oval Base"
    },
    "jakhals": {
      "sheet": "28.5mm"
    },
    "kh-rn-the-betrayer": {
      "sheet": "40mm"
    },
    "khorne-berzerkers": {
      "sheet": "32mm"
    },
    "khorne-lord-of-skulls": {
      "sheet": "Hull"
    },
    "lord-invocatus": {
      "sheet": "90x52.5mm Oval Base"
    },
    "lord-on-juggernaut": {
      "sheet": "90x52.5mm Oval Base"
    },
    "master-of-executions": {
      "sheet": "40mm"
    },
    "maulerfiend": {
      "sheet": "120x92mm Oval Base"
    },
    "skarbrand": {
      "sheet": "100mm"
    },
    "slaughterbound": {
      "sheet": "50mm"
    }
  }
}

// Attach base sizes to a freshly-built datasheet (mutates it): sets `baseSize` on the
// sheet (single-profile) or on each matching profile (multi-profile). No-op if unknown.
export function attachBaseSizes(sheet, slug) {
  const spec = BASE_SIZES[slug]?.[sheet.id]
  if (!spec) return sheet
  if (spec.sheet) sheet.baseSize = spec.sheet
  if (spec.profiles) {
    for (const p of sheet.profiles || []) {
      const s = spec.profiles[p.name]
      if (s) p.baseSize = s
    }
  }
  return sheet
}
