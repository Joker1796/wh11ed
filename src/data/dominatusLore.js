// Dominatus — the deck's lore: the italic paragraph above each card's rules, each Briefing card's
// introduction and the nine Outcome cards (the reverse of each Briefing: what the Alliance's
// Narrative Points this phase mean for its war).
//
// Source: the owner's photos of the deck (hub: sources/dominatus/), read 2026-10-31 with Vision OCR
// and corrected against each photo by eye. GW's wording kept as printed — including Raiders'
// phase 3 Outcome for 3 Narrative Points, which stops mid-sentence on the card ("…implications of").
//
// Kept apart from dominatus.js so the rules file stays the rules; `getDominatus(locale)` hangs
// `lore` on each card and `intro` / `outcomes` on each Briefing. RU is dominatusLoreRu.js, the same
// shape. Every string is lore: the page draws it as such, and "hide lore" hides all of it.
//
// Shape: { agendas: { slug: text }, upgrades: { slug: text }, locations: { slug: text },
//          briefings: { '<alliance>-<phase>': { intro, outcomes: { 2, 1, 0, 3? } } } }
// Outcome keys are Narrative Points; phase 3 has a fourth, for 3.

export const dominatusLore = {
  agendas: {
    // ── Liberators ──
    'planetfall': 'Several strategic drop sites have been identified in this area. Your forces must plunge into the thick of the fight and seize them as a priority in order to establish a foothold in the war zone.',
    'vital-strongpoint': 'Far from the bedlam of the front lines lies an emplacement of utmost strategic importance. If your force can capture it and its surrounding outposts, you will rob the enemy of their ability to launch a coordinated counterattack.',
    'secure-perimeter': 'Your warriors must secure the planetary beachhead by driving off local enemy forces and capturing the territory they hold. Only in this way can you establish a strong perimeter that will allow follow-up waves to land safely.',
    'rescue-survivors': 'Scattered friendly forces are believed to have gone to ground in this region. If the enemy finds them before you do, they will surely be slain. Move quickly, storm every potential hiding place, and delay the foe\'s advance to ensure the lost combatants are recovered alive.',
    'encirclement': 'As the fighting rages on, an opportunity presents itself to encircle a major enemy force. If you can successfully trap the foe in this way, they will surely be destroyed.',
    'hidden-prize': 'Intelligence suggests that somewhere in this area is the hidden entrance to a crucial supply dump, concealed enemy command bunker or similar high-value site. Find it and claim it to help pave the way towards final victory.',
    'cast-down-their-idols': 'In their desperation, the foe have withdrawn behind their fortifications and unleashed their largest engines of war – towering behemoths that loom over the battlefield and threaten death and destruction. Cast these titans down, and burn the foe out from the fortress walls they cower behind, and they will truly be crushed.',
    'reclaim-this-world': 'The time has come to cast out the foe and reclaim this world in the name of your lords and masters. Raise your banners high over every wall and battlement to let the enemy know their final defeat is nigh.',
    'slay-the-tyrant': 'The enemy\'s greatest war leader stands before you, a mighty foe by whose hand countless millions have been slain. You have a chance to avenge those lives and to cut the head from the enemy hosts all in one fell blow.',
    // ── Oppressors ──
    'repel-the-foe': 'The invading forces have but a tenuous presence upon the planet\'s surface. You have been ordered to exploit this weakness and rout the enemy from their drop site before they establish a permanent beachhead.',
    'dig-in': 'The enemy have landed in large numbers and are gaining momentum. Your forces stand in their path, charged with standing your ground and making them pay in blood for every yard they gain, bleeding the foe until their advance stalls altogether.',
    'loot-and-scoot': 'As the invading forces drive out from their landing zones, they seek to seize local supply caches to fuel their war effort. You must move quickly to ransack those sites you can reach in order to deny these prizes to the enemy.',
    'breakthrough': 'You have been commanded to lead the vital counteroffensive that will shatter the enemy advance entirely. If you can punch through their delaying forces, you will be able to wreak bloody havoc in their rear lines.',
    'convoy-ambush': 'The enemy are looking to ferry supplies and personnel through this area to reinforce their front lines. Target anything that could be used to transport cargo and see it reduced to smoking wreckage.',
    'sabotage-supplies': 'The enemy are looking to mount a major offensive and are amassing all the supplies they have so far captured in preparation for it. Destroy their stockpiles and you will end their big push before it even begins.',
    'lead-by-example': 'It\'s time to show your followers why you are the mightiest warlord on Armageddon. Gather your chosen forces, make sure they see you crushing the enemy beneath your iron tread, and victory is assured.',
    'ash-and-rubble': 'There is a real danger that the enemy may be victorious on this world. Your task is to render that triumph meaningless by razing everything to the ground. Let them rule over ash and rubble if they must.',
    'a-proper-challenge': 'The enemy have brought all their might to your doorstep. They believe they are about to secure a final, crushing victory, but the truth is they\'ve just brought you a proper challenge. Show them the error of their ways.',
    // ── Raiders ──
    'vanguard-recon': 'This rapidly escalating conflict offers many possibilities, but only for those who have properly gauged the lie of the land. You have been charged with that vital task.',
    'establish-contact': 'One of our agents, possessing vital information, has been cut off by enemy forces. You must locate them, extract the information, and then recover or silence the agent as you see fit.',
    'clandestine-infiltration': 'Under cover of developing hostilities, your forces must attempt to slip through the enemy\'s front lines. Those who successfully infiltrate enemy territory in this way will be in position to capitalise on the growing confusion and launch daring raids in the days to come.',
    'a-knife-in-the-dark': 'Your forces must eliminate a key enemy leader present on this front. This will destabilise their forces, spreading anarchy and confusion for you to exploit.',
    'a-thief-in-the-night': 'Our agents have located the presence of a priceless artefact in this vicinity. A significant concentration of foes stand between you and your prize as they muster for battle on another front. Eliminate them, and see to the relic\'s recovery, personally.',
    'seeds-of-destruction': 'Be it a dark ritual, a manipulation of fate, or the introduction of slow-acting biocontaminants, your forces have an opportunity to sow the seeds of a doom that will take many years to grow to fruition.',
    'erase-all-trace': 'Before you leave this planet to its fate, you must cover your tracks, so that none can stumble upon the designs you have laid here. Whether you do this by slaughtering everyone to ensure no witnesses remain, or by corralling your enemies ready for some worse fate is up to you.',
    'extraction': 'Your followers have reaped a mighty bounty on this world, but their efforts have not gone unnoticed. Now, with vengeful enemies closing in, you must extract the riches you have claimed before the foe can take them back.',
    'capture-trophies': 'The war on this world may be spiralling towards its conclusion, but your forces are otherwise engaged, ransacking secure sites and hunting down the champions of the foe. Before you depart, you will ensure you have claimed enough riches to make the fight worthwhile.',
  },

  upgrades: {
    // ── Battle Honours ──
    'kingslayer': 'Many champions and commanders have dared to challenge this warrior and all have fallen prey to their peerless martial might.',
    'fire-and-fury': 'Whether opening up with point-blank fusillades at full tilt or unleashing deadly accurate volleys at range, this warrior favours the application of overwhelming firepower.',
    'shadow-stalker': 'This warrior has learned to move unseen, haunting their prey from dark ruins or slipping through the smoke and dust of battle to evade detection.',
    'undying-duty': 'This champion and their chosen warriors will not rest while their duty remains unfulfilled, mustering one last surge of strength to strike down those that would deny them.',
    'grim-veterans': 'This warrior leads a group of battle-hardened veterans, their unwavering determination and tactical focus forged through shared experience in the fiercest war zones.',
    'wraith-of-ruin': 'This warrior employs the apocalyptic ruinscapes of Armageddon to mask their advance until they and their followers are in the ideal position to strike.',
    'swift-as-the-wind': 'Moving with preternatural swiftness and single-minded purpose, this champion and their warriors surge across the battlefield.',
    'battle-hungry': 'This warrior revels in the fury of close-quarters melee. They allow no obstacle or impediment to hold them back, their sheer bellicosity drawing their warriors roaring along in their wake.',
    'ferocious-combatant': 'This violent champion urges their followers on to ever greater heights of ferocity and aggression, leading them in carving a bloody path through the foe.',
    'breach-and-burn': 'This commander is a veteran of urban warfare. They have trained their warriors to drive the foe from cover with volleys of fire, jets of flame and hails of explosive projectiles.',
    'path-to-conquest': 'The skies are choked with ash and the battlefield churned to ruin, heaped with the dead and the dying. You have won a significant victory, but only time will tell if your efforts are enough to tip the scales of the war.',
    // ── Battle Skills ──
    'terrifying-presence': 'Fighting so long amongst such horrifying environs has left a dread mark upon this warrior, which strikes fear into their foes.',
    'tactical-redeployment': 'The most cerebral or cunning commanders employ their tactical insights to stack the odds in their armies\' favour.',
    'tempered-in-battle': 'Instincts honed, and tactics tested, this leader has become adept at outmanoeuvring and outfighting their enemies.',
    'front-line-champion': 'This warrior is found where the fighting is thickest, using their hard-won experience to guide their troops\' aim and inspire their bladework.',
    'fortunes-favoured': 'Experience alone is sometimes not enough. It takes fortitude, fortune and perhaps the hand of the gods of fate to survive.',
    'high-strategy': 'Well-laid plans and an ironclad grasp of pressing strategic goals go a long way to overcoming an enemy\'s superiority in numbers and firepower.',
    'natural-leader': 'This warrior radiates an authority and presence that inspires or dominates those around them to acts of greatness.',
    'lead-from-the-front': 'Amidst the horror and confusion of the conflict on Armageddon, dynamic war leaders can make a great difference.',
    'born-survivor': 'This warrior is a veteran campaigner who bears the scars of war\'s excoriating touch. They are an indomitable and enduring combatant indeed.',
    // ── Relics: Liberators ──
    'blade-of-sacrifice': 'This sword has been wielded by a hundred martyrs, and in the hour of need it glows with blinding radiance as it consumes the bearer\'s soul. So empowered, it carves down even the mightiest foes, at the cost of reducing its wielder to another smoking husk.',
    'strategic-laurels': 'Incorporating tactica-inload neurocircuitry and a complex data web sensory shunt, these decorative honours further augment the bearer\'s already shrewd grasp of grand strategy.',
    'the-emperors-tarot': 'The bearer owns a deck of the Emperor\'s Tarot, rumoured to have been thrice-blessed by Sebastian Thor himself. A reading from these hallowed cards can guide a true believer to victory even in their darkest hour.',
    'vortex-grenade': 'Inside this heavy sphere is technology so arcane and dangerous that its deployment is rarely sanctioned. When detonated, it tears open the veil of realspace to create a miniature warp rift that sucks anything nearby into the hellish empyrean. The warp vortex is unpredictable and can swell or move, devouring everything in its path until it finally – hopefully – dissipates and vanishes.',
    'master-crafted-armour': 'Fashioned by an armourer of sublime skill, this battle plate is proof against the most deadly weapons and dread foes of the 41st millennium.',
    // ── Relics: Oppressors ──
    'ruinator': 'This fearsome weapon emits a baleful crimson glow, discouraging all but the most foolhardy or insane from wielding it. Rumoured to be possessed of an unquenchable thirst for violence, it leaves ruin in its wake even as it feeds off the life force of those it slays.',
    'temporal-talisman': 'This trio of spheres once adorned the staff of Weirdboy Mukknog, who claimed they were a gift from Mork himself. Lost during Ghazghkull\'s first invasion of Armageddon and now recovered, they emit a phased stasis field that slows the passage of time in its vicinity, enabling the bearer to strike before their enemies\' blows can land.',
    'personal-teleporter': 'Scavenged from a damaged Ork tellyporta array found abandoned in one of Armageddon\'s war zones, this unstable device enables a group of warriors to suddenly appear in the midst of battle in a blast of green lightning.',
    'enhanced-bionics': 'Through intrusive and widespread surgery, the bearer\'s body has been extensively cyborgised. Very little of their original flesh remains, replaced by unyielding metal and rugged, self-repairing augmetics.',
    'powerfield-projector': 'This force field generator surrounds the bearer in a bubble of elastic energy. The generator is remarkable, not only for its compact size, but also for being able to rebound incoming shots, much to the short-lived shock of those who opened fire upon its owner.',
    // ── Relics: Raiders ──
    'displacer-field': 'Displacer field technologies trigger small warp jumps that physically remove the bearer from harm\'s way before dropping them back into reality nearby.',
    'disruption-orb': 'This ancient device broadcasts disruptive sonic frequencies shown to interfere with all forms of communication. These howling pulses can also be attuned to enemies, shattering their concentration and driving their battle plans from their minds.',
    'cloak-of-shadows': 'This mythic cloak was discovered amidst the warp-touched wastes of Armageddon. While its provenance is mysterious, its ability to hide the bearer from physical, technological and even psychic senses cannot be denied.',
    'maelstrom-clarion': 'Chittering with overlapping screeds of disruptive data, this sinister talisman\'s inbuilt technologies scramble teleport locks and choral beacons within a broad radius.',
    'fate-forged-weapon': 'A remarkable weapon with a storied and infamous history, this tool of fate has laid low heroes and monsters, lowly footsoldiers and mighty champions alike.',
  },

  locations: {
    'the-mannheim-gap': 'Cutting through the mountain range west of Hive Volcanus, the Mannheim Gap has been the site of countless battles, the twisted detritus of which now clog the pass. Warriors waging battle here do so between vast canyon walls, the threat of a lethal rock slide forever looming above their heads.',
    'volcanus-archipelago': 'Situated in the estuary of the Erebus River, the islands of the Volcanus Archipelago bristle with anti-air batteries and naval way stations, shielding the northern flank of Hive Volcanus.',
    'the-morpheon-line': 'A formidable network of trench lines, squat fortifications and hard points, the Morpheon Line was originally constructed to contain the Orks assailing Hive Tempestora.',
    'cerbera-base': 'The half-ruined expanse of Cerbera Base is one of only a handful of viable defensive positions within the roiling firestorms and choking smoke swathing Armageddon\'s Equatorial Jungle.',
    'victorinius-spaceport': 'One of the most crucial locations to Armageddon\'s beleaguered Imperial forces, Victorinius Spaceport provides air support across to the majority of the hive world\'s theatres.',
    'blackfire-death-pits': 'Here solid ground gives way to bubbling tar and geysers of burning promethium. Crumbling roadways and elevated watch posts span the mire, making movement extremely treacherous.',
    'eyes-of-the-emperor-observatory': 'Rising from the mountain ranges north of Hive Death Mire, the Eyes of the Emperor Observatory provides a considerable tactical advantage to those that hold it. So worthwhile is its capture that commanders hurl reinforcements into the fight for its control.',
    'titangrave': 'Formerly a staging area for the Legio Magna, Titangrave\'s twisted, irradiated ruins now play host to mobs of Orks, Mekboys\' workshops and half-completed war effigies. Those fighting in this perilous theatre would do well to unleash their most potent weapons and wargear.',
    'hive-acheron-subsprawl': 'A web of subterranean caverns, armouries, barracks and support structures, Hive Acheron\'s subsprawl has become a refuge for Human survivors, and also the site of bitter fighting between rival champions and warlords.',
  },

  briefings: {
    'liberators-1': {
      intro: 'Our fleet has established orbit around Armageddon and the time to liberate the war-torn world is nigh. The first wave of our forces must make planetfall without delay, securing landing zones and establishing beachheads so that the follow-up waves can deploy to the planet\'s surface intact.',
      outcomes: {
        2: 'Your forces have fallen upon Armageddon like a thunderbolt. Hurling the enemy back in disarray, you have swept clear a broad beachhead and heavily reinforced it, leaving you in the strongest possible position to proceed with the liberation of Armageddon.',
        1: 'You have successfully carved out a beachhead on the surface of Armageddon, albeit at a bloody cost. As fresh waves of warriors and war machines are ferried down from orbit, the war of liberation must begin in earnest.',
        0: 'The initial planetstrike has failed almost completely. You have established a handful of tenuous beachheads, but at a terrible cost and with little hope of holding them. The liberation of Armageddon now teeters upon the brink of disaster.',
      },
    },
    'liberators-2': {
      intro: 'The first stage of the liberation has been completed. Now we must maintain the pressure. Beyond preventing the enemy from retaking our landing zones, we need fresh supplies and intelligence from survivors still in hiding along the line of our advance. The war of liberation will only get harder from here on in.',
      outcomes: {
        2: 'Victory follows victory as your armies storm across the surface of Armageddon. You have torn down some of your foes\' mightiest strongholds, amassed stockpiles of materiel, and now stand primed for the last grand push. You have only to maintain your momentum and final liberation will be at hand!',
        1: 'Your armies advance steadily and relentlessly, despite your foes\' attempts to halt their progress or sever your supply lines. A number of key strategic sites across the planet are now in your hands. Meanwhile, your enemies continue to retreat, albeit often in good order. Victory lies tantalisingly just beyond the horizon.',
        0: 'Progress has stalled. Despite your best efforts, your advances have been blunted, supplies are running low and your landing zones remain under threat. It will now take some truly heroic efforts to prevent your attempted liberation from becoming a disastrous massacre.',
      },
    },
    'liberators-3': {
      intro: 'The final battle is upon us. We have this one chance to liberate Armageddon and raise our banners high over its reconquered hive spires. To do this, we will have to annihilate the foe\'s command structure, bring down their mightiest war engines, and break their spirit entirely, or else know the ignominy of defeat.',
      outcomes: {
        3: 'Your victory on Armageddon is complete. Not only have you liberated the world itself, but you have also destroyed your foes so completely that they will not threaten this world again for years to come. Congratulations on a mighty triumph.',
        2: 'Your armies have swept across Armageddon and liberated much of its surface. It is only unfortunate that – with key strategic objectives left unmet – you were unable to drive the enemy from this world entirely. It is likely many years of bloody fighting still lie ahead as a result.',
        1: 'Your final push has failed, leaving your tattered forces in possession of a few desperate holdouts surrounded by foes. However, having achieved key strategic victories you have at least paved the way for reinforcements to reinvigorate your liberation effort in the days to come.',
        0: 'Your defeat has been total. The last bloodied survivors of your once proud host flee back to the stars, leaving countless dead in their wake. Armageddon has truly fallen.',
      },
    },
    'oppressors-1': {
      intro: 'Armageddon is ours. Our armies have conquered its hives and dug in across its ashen wastes, and we will not yield to these invaders from the stars. Throw the enemy back into the void wherever you can, and scorch the land where you cannot. Make the foe regret the day they ever came to Armageddon.',
      outcomes: {
        2: 'Through a combination of stubborn determination and sheer ferocity, you have repelled almost all the invaders\' landing forces. Your banners still fly over the strongholds you swore you would defend, and what enemies have made it onto Armageddon are scattered and hunted remnants.',
        1: 'The enemy press forward on multiple fronts, but you have held them at bay and made them pay for their efforts in blood. If you can keep them pinned within their beachheads long enough to muster a counterattack, you may yet drive them from Armageddon altogether.',
        0: 'Your efforts to hold the invaders back have been almost wholly in vain. Driven like cattle, abandoning burning wrecks and fallen fortifications in your wake, you have been routed on every front. You will have to rally your scattered forces and fight back twice as hard to regain the advantage now.',
      },
    },
    'oppressors-2': {
      intro: 'The enemy continue their assault, seeking to surround our forces and push us back to the primary hives. We need to slow their advance. We will do this by punching holes in their advancing battle lines, severing their routes of supply and – where we must – destroying caches before the foe capture them.',
      outcomes: {
        2: 'Your warriors have fought back with a ferocity and cunning that does them credit. You have starved your foes of supplies, winnowed their ranks, and are now in a commanding position. It is time to land the killing blow.',
        1: 'Through a mixture of sudden raids, localised counteroffensives and calculated acts of sabotage, you have bled the enemy and slowed their advance. Behind the lines your own reserves are massing. Soon, when your preparations are complete, there will be a reckoning.',
        0: 'Disaster follows disaster as your efforts to slow the enemy advance come to nought. With your own forces now in danger of being overrun or encircled by the well-supplied and numerous foe, all you can do is fall back to the final defensive positions. There you must prepare to weather the storm that is about to break.',
      },
    },
    'oppressors-3': {
      intro: 'The war for this world has been long and bloody, but we have an opportunity to launch a counteroffensive that will shatter the enemy entirely. With our greatest warlords leading from the front and our warriors prepared to do whatever it takes to win the war, we will reclaim Armageddon once and for all.',
      outcomes: {
        3: 'After a triumph so decisive, there can be no doubt of your victory on this world. Those who came to seize it from you have been destroyed, while your own hold on the planet has only grown stronger than ever before.',
        2: 'After a successful counteroffensive, you drove the enemy into retreat and continue to harry them on every front. They were able to prevent your forces from achieving complete strategic supremacy, however, and so the war for Armageddon will grind on.',
        1: 'Your counterattack failed, leaving many of your warriors to be overrun and destroyed. You were at least able to claim some victories, enough to cover your retreat into hiding, but for now victory is beyond your grasp.',
        0: 'You have been decisively and completely defeated. Those of your warriors not heaped amongst the slain are fleeing without hope or purpose. The war for Armageddon is lost.',
      },
    },
    'raiders-1': {
      intro: 'The conflict on Armageddon offers us a unique opportunity to complete our goals without our enemies\' awareness. First, however, we need to make contact with our assets on the surface to gather intelligence while inserting forces behind enemy lines, ready to launch targeted strikes when the hour is right.',
      outcomes: {
        2: 'Distracted as they are by their ongoing war, the enemy have proven easy for you to circumnavigate or destroy piecemeal. Your forces are now in the best possible position to capitalise on this conflict for their own gain.',
        1: 'Though the effort has been perilous and – in places – costly, your forces have completed enough covert actions to set up the next stage of the plan. Well informed and ready to strike, your warriors await only the word to launch their next attacks.',
        0: 'Subtlety, it appears, is not your strong suit. Your hosts have either been detected by the enemy and driven into swift retreat, or simply caught up and slaughtered amidst the wider conflict. The situation can still be salvaged, but it will require cunning, quick action and a lot of costly bloodshed.',
      },
    },
    'raiders-2': {
      intro: 'Our forces are in position but time is running short. With fighting escalating, there will never be a better time than now to strike. Move swiftly and with purpose. Take that which we came for, lay what future groundwork is required for our designs, and ensure the enemy remain ignorant of our efforts.',
      outcomes: {
        2: 'Guile, good fortune and merciless brutality have seen you achieve all of your goals in this phase of the war. Your enemies have been powerless to stop you, none having lived long enough to raise the alarm, and you are ready and well positioned to make good your escape.',
        1: 'In a series of swift raids and brutal covert actions, you have seized vital assets that will benefit you greatly. Of course, with your forces deeply embedded in a raging war zone, there is still the question of safe extraction to consider.',
        0: 'You fought as hard as you could, but your warriors have squandered this opportunity. Assets have been lost to the foe, while your efforts at misdirection or manipulation have come to naught. It will be a struggle now to gain anything meaningful from this conflict.',
      },
    },
    'raiders-3': {
      intro: 'Our time on Armageddon is coming to an end. Delay too long and one side or the other will gain supremacy long enough to turn their full attention upon our forces. Before this can occur, we need to extract our prizes, erase any trace of our presence on this world, and make good our escape into the stars.',
      outcomes: {
        3: 'Those who fought to defend or to conquer Armageddon may believe themselves the victors, but in truth you have eclipsed them all. You emerge from this war greatly empowered, and with strategic advantages it may take your enemies years to grasp the full and terrible implications of',
        2: 'Although you were not able to seize all the assets you might have wished to on Armageddon, there is no denying your triumph. You leave this world a conqueror, with many slain foes and cunning victories in your wake.',
        1: 'To the casual observer, you have suffered a decisive defeat upon this world. Yet some of your deeds may still bear fruit in the years to come, and your enemies may come to rue your hidden victories.',
        0: 'Cut off and trapped by enemies closing in upon all sides, any hope you had of escape or success is gone. Armageddon will surely be your doom.',
      },
    },
  },
}
