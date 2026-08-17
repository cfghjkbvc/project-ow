/* ============================== strings ============================== */

const STR = {
  en: {
    sub: "One phone · pass it around", title: "Odd Word",
    howTo: "How to play", rulesTitle: "How to play",
    recap: "The night so far", recapEmpty: "No finished rounds yet.", seeNight: "The night so far",
    swipeRoles: "Swipe through the deck", prevRole: "Previous role", nextRole: "Next role",
    startsHere: "Starts",
    yourWord: "Your word", noWordPlate: "Guess the word", jesterPlate: "Get voted out",
    lbl_holds: "Holds", lbl_knows: "Knows", lbl_wins: "Wins by", lbl_watch: "Watch out",
    exampleTitle: "A round, played out", exA: "Coffee", exB: "Tea",
    peek: "Remind me", peekWho: "Who forgot their word?",
    peekWarn: "The whole table sees whose card this is. Hand the phone over before you look.",
    peekedN: (n) => `looked ${n}×`,
    s1: "The deal", s1b: "The phone goes round and everyone reads one word. Most of you share the same word. One or two hold something close but different — and nobody is told which they are.",
    s2: "The clues", s2b: "Starting with whoever the app names, each of you says one word about your own word. Vague enough to survive if you're the odd one, specific enough to prove you belong if you aren't.",
    s3: "The vote", s3b: "Talk it over, then vote someone out by a show of hands and tap their name. If nobody can agree, tap No one out and go round again.",
    s4: "Winning", s4b: "Civilians win once every impostor is out. The impostors win the moment they equal the number of civilians left.",
    theRoles: "The roles",
    d_civilian: "Holds the common word — and isn't told that it's the common one.",
    d_undercover: "Holds a different word, and isn't told that either. Half the fun is not knowing.",
    d_mrwhite: "Holds no word at all. If voted out, gets one guess at the common word and wins alone if it lands.",
    d_jester: "Holds the common word but wins alone by getting voted out. Act suspicious.",
    d_accomplice: "Sees both words and knows one impostor. Wins with them — if they survive.",

    h_civilian: "The word most of you share.",
    k_civilian: "Nothing. Not even that you're a civilian.",
    w_civilian: "Voting out every impostor.",
    x_civilian: "A clue that fits your word a little too neatly.",

    h_undercover: "A word close to the common one — but you are never told it's the odd one.",
    k_undercover: "Nothing. You might not be the impostor at all.",
    w_undercover: "Surviving until the impostors match the civilians left.",
    x_undercover: "Agreeing enthusiastically with a clue you don't understand.",

    h_mrwhite: "Nothing at all. No word, no hint.",
    k_mrwhite: "That you have no word. You are the only one who knows their own role for certain.",
    w_mrwhite: "Naming the common word after being voted out. That wins the round outright.",
    x_mrwhite: "Guessing early. Being voted out late means more clues to work from.",

    h_jester: "The common word, same as most of the table.",
    k_jester: "That you're the Jester.",
    w_jester: "Getting yourself voted out. Nothing else scores.",
    x_jester: "Being so obvious that nobody bothers voting for you.",

    h_accomplice: "The common word — and you are shown the impostor's word too.",
    k_accomplice: "Which player holds the odd word.",
    w_accomplice: "The impostors winning, and only if you are still in at the end.",
    x_accomplice: "Defending them so hard you go down with them.",

    ex1: (a, b) => `The pair is ${a} and ${b}. Most of you hold ${a}. One holds ${b} — and doesn't know it.`,
    ex2: (n) => `${n} says “morning”. Fits both. Safe, and tells nobody anything.`,
    ex3: (n) => `${n} says “beans”. Only one of the two has beans.`,
    ex4: (n) => `${n} says “leaves”. Everyone turns and looks at ${n}.`,
    ex5: (n, b) => `${n} was holding ${b} the whole time and never knew.`,
    houseRule: "The one rule that matters", houseRuleBody: "Never say the word itself, and never repeat a clue someone has already used.",
    close: "Close",
    tabTable: "Table", tabRound: "Round", tabScores: "Scores",
    atTable: (n, m) => `Playing tonight · ${n} of ${m}`, addName: "Add a name",
    rememberNote: "Everyone stays on the list. Untick whoever isn't here tonight.",
    language: "Language", haptics: "Vibration", on: "On", off: "Off",
    hapticsUnsupported: "This browser has no vibration. Safari on iPhone never supports it.",
    rolesInPlay: "Roles in play",
    p_classic: "Classic", p_white: "Mr White", p_wild: "Wild",
    pn_classic: "Impostors only. Everyone else shares one word.",
    pn_white: "Adds one player with no word at all.",
    pn_wild: "Adds a Jester and an Accomplice once the table is big enough.",
    r_civilian: "Civilian", r_undercover: "Impostor", r_mrwhite: "Mr White", r_jester: "Jester", r_accomplice: "Accomplice",
    c_civilian: "The Chorus", c_undercover: "The Stranger", c_blank: "The Blank", c_fool: "The Fool", c_shadow: "The Shadow",
    at: (n) => `at ${n}+`,
    impostors: "Impostors", wordGap: "Word gap",
    g_wide: "Wide", g_mixed: "Mixed", g_tight: "Tight",
    gh_wide: "Words sit further apart. Easier to spot the odd one.",
    gh_mixed: "Everything in the active packs.",
    gh_tight: "Close cousins only. An impostor has room to hide.",
    onVote: "On a vote", showSide: "Show their side", sayNothing: "Say nothing",
    sayNote: "Saying nothing makes rounds much longer and much harder.",
    packs: "Packs", managePacks: "Manage packs",
    activePairs: (n) => `${n} pairs in play`,
    session: (n) => `This session · ${n} rounds`,
    noScores: "Nothing yet. Play a round and points land here.",
    clearScores: "Clear the scoreboard",
    dealRound: "Deal the round", fourMin: "Four players minimum", noPairs: "No pairs in the active packs",
    dealing: "Dealing", holdPress: "Cover the screen. Press and hold.", letGo: "Let go and pass it on.",
    passTo: (n) => `Pass to ${n}`, everyoneHas: "Everyone has a card", backOne: "Back one card",
    redeal: "Different pair", redealTitle: "Throw this pair away?",
    redealBody: "Everyone gets new words and new roles. The pair won't come back tonight.",
    dealNo: "Deal", left: (n) => `${n} left`, speaksFirst: "Speaks first",
    tapVote: "Tap whoever the table votes out", endGame: "End game",
    noOneOut: "No one out", undo: "Undo last vote",
    voteOut: (n) => `Vote out ${n}?`,
    voteWarn: "Their word stays secret. Only their side is revealed.",
    voteSealed: "Nothing about them will be revealed.",
    voteBtn: "Vote out", cancel: "Cancel",
    endWarn: "The round is discarded. Session points are kept.",
    endBtn: "End the game",
    votedOut: "Voted out", sealed: "Sealed",
    jesterNote: "That was exactly the plan. The Fool takes the round.",
    keepPlaying: "Keep playing", turnOver: "Turn the words over", whiteGuesses: "Mr White guesses",
    whiteOne: "Mr White · one guess", whatWord: "What word did everyone else hold?",
    nameIt: "Name it and you take the round on your own.", typeWord: "Type the word", lockIn: "Lock it in",
    whiteGuessed: "Mr White guessed", theWordWas: "The word was",
    closeEnough: "Close enough by the app's reckoning — but the table rules.",
    notMatch: "Not a match by the app's reckoning — but the table rules.",
    tableYes: "Table says correct", tableNo: "Table says no",
    b_civilians: "The Chorus holds", b_impostors: "The Strangers take it",
    b_mrwhite: "Mr White names it", b_jester: "The Fool wins alone",
    mostHeld: "Most of you held", impHeld: "Impostors held",
    whoWas: "Who was who · session points", dealAnother: "Deal another round", backTable: "Back to the table",
    retire: "Retire this pair", retired: "Retired",
    newPack: "New pack", packName: "Pack name", builtIn: "Built in",
    pairsN: (n) => `${n} pairs`, edit: "Edit", done: "Done",
    wordA: "First word", wordB: "Second word", similarity: "How similar",
    addPair: "Add pair", noPairsYet: "No pairs yet. Add the first one below.",
    deletePack: "Delete pack", sharePack: "Share pack", copied: "Link copied",
    importTitle: (n) => `Import "${n}"?`, importBody: (n) => `${n} pairs. It will be saved on this phone.`,
    importBtn: "Import", importBad: "That link could not be read.",
    retiredPairs: (n) => `Retired pairs · ${n}`, restoreAll: "Bring them all back",
    simHint: "A pair only works if one everyday word fits one and not the other.",
    dupe: "That pair is already in this pack.", bothWords: "Both words are needed.",
  },
  hu: {
    sub: "Egy telefon · add körbe", title: "Odd Word",
    howTo: "Játékszabály", rulesTitle: "Játékszabály",
    recap: "Az este eddig", recapEmpty: "Még nincs befejezett kör.", seeNight: "Az este eddig",
    swipeRoles: "Húzd oldalra a lapokat", prevRole: "Előző szerep", nextRole: "Következő szerep",
    startsHere: "Kezd",
    yourWord: "A te szavad", noWordPlate: "Találd ki a szót", jesterPlate: "Szavaztasd ki magad",
    lbl_holds: "Nála", lbl_knows: "Tudja", lbl_wins: "Így nyer", lbl_watch: "Vigyázz",
    exampleTitle: "Egy kör, lejátszva", exA: "Kávé", exB: "Tea",
    peek: "Emlékeztető", peekWho: "Ki felejtette el a szavát?",
    peekWarn: "Az egész asztal látja, kinek a lapja. Előbb add oda a telefont.",
    peekedN: (n) => `${n}× nézte`,
    s1: "Az osztás", s1b: "A telefon körbemegy, és mindenki elolvas egy szót. A többségnél ugyanaz a szó van. Egynél-kettőnél valami közeli, de más — és senki sem tudja magáról, melyik ő.",
    s2: "A tippek", s2b: "Azzal kezdve, akit az app kiír, mindenki mond egy szót a sajátjára. Elég ködöset, hogy megúszd, ha te vagy a kakukktojás, és elég konkrétat, hogy elhiggyék, ha nem.",
    s3: "A szavazás", s3b: "Megbeszélitek, aztán kézfeltartással kiszavaztok valakit, és koppintotok a nevére. Ha nincs egyetértés, nyomd meg a Nincs kiszavazás gombot, és jöhet egy újabb kör.",
    s4: "A győzelem", s4b: "A civilek akkor nyernek, ha minden beépülő kiesett. A beépülők abban a pillanatban, amikor annyian maradnak, mint a civilek.",
    theRoles: "A szerepek",
    d_civilian: "Nála a közös szó van — de nem tudja, hogy az a közös.",
    d_undercover: "Nála más szó van, és ezt ő sem tudja. A móka fele pont ez.",
    d_mrwhite: "Egyáltalán nincs szava. Ha kiszavazzák, egyszer tippelhet a közös szóra, és ha eltalálja, egyedül nyer.",
    d_jester: "Nála a közös szó van, de akkor nyer egyedül, ha kiszavazzák. Viselkedj gyanúsan.",
    d_accomplice: "Mindkét szót látja, és tudja, ki a beépülő. Vele nyer — ha életben marad.",

    h_civilian: "A szó, ami a többségnél van.",
    k_civilian: "Semmit. Még azt sem, hogy ő civil.",
    w_civilian: "Ha minden beépülőt kiszavaztok.",
    x_civilian: "Az olyan tipp, ami túl pontosan illik a te szavadra.",

    h_undercover: "Egy szó, ami közel van a közöshez — de senki nem mondja meg, hogy épp ő a kakukktojás.",
    k_undercover: "Semmit. Lehet, hogy nem is te vagy a beépülő.",
    w_undercover: "Ha annál többen maradnak beépülők, mint civilek.",
    x_undercover: "Ha nagy lelkesedéssel rábólogatsz egy tippre, amit nem értesz.",

    h_mrwhite: "Semmit. Se szó, se támpont.",
    k_mrwhite: "Hogy nincs szava. Ő az egyetlen, aki biztosan tudja a saját szerepét.",
    w_mrwhite: "Ha kiszavazás után kitalálja a közös szót. Az azonnal megnyeri a kört.",
    x_mrwhite: "A korai tipp. Minél később esel ki, annál több tippet hallottál.",

    h_jester: "A közös szó, ugyanaz, mint a többieknél.",
    k_jester: "Hogy ő a Bolond.",
    w_jester: "Ha kiszavazzák. Más nem ér pontot.",
    x_jester: "Ha olyan feltűnő vagy, hogy senki nem szavaz rád.",

    h_accomplice: "A közös szó — és megmutatjuk a beépülő szavát is.",
    k_accomplice: "Hogy melyik játékosnál van a más szó.",
    w_accomplice: "Ha a beépülők nyernek — de csak akkor, ha ő is bent van a végén.",
    x_accomplice: "Ha olyan hevesen véded, hogy vele buksz.",

    ex1: (a, b) => `A páros: ${a} és ${b}. A többségnél ${a} van. Egynél ${b} — és ő sem tudja.`,
    ex2: (n) => `${n} azt mondja: „reggel”. Mindkettőre illik. Biztonságos, de nem mond semmit.`,
    ex3: (n) => `${n} azt mondja: „bab”. A kettő közül csak az egyiknek van babja.`,
    ex4: (n) => `${n} azt mondja: „levél”. Mindenki ${n} felé fordul.`,
    ex5: (n, b) => `${n}-nál egész idő alatt ${b} volt, és fogalma sem volt róla.`,
    houseRule: "Az egyetlen fontos szabály", houseRuleBody: "Magát a szót soha ne mondd ki, és ne ismételj meg olyan tippet, ami már elhangzott.",
    close: "Bezár",
    tabTable: "Asztal", tabRound: "Kör", tabScores: "Pontok",
    atTable: (n, m) => `Ma játszik · ${n} / ${m}`, addName: "Név hozzáadása",
    rememberNote: "Mindenki a listán marad. Vedd ki a pipát, aki ma nincs itt.",
    language: "Nyelv", haptics: "Rezgés", on: "Be", off: "Ki",
    hapticsUnsupported: "Ez a böngésző nem tud rezegni. Az iPhone Safari soha nem támogatja.",
    rolesInPlay: "Szerepek",
    p_classic: "Klasszikus", p_white: "Mr. White", p_wild: "Vad",
    pn_classic: "Csak beépülők. Mindenki más ugyanazt a szót kapja.",
    pn_white: "Egy játékos egyáltalán nem kap szót.",
    pn_wild: "Nagyobb asztalnál Bolond és Bűntárs is bekerül.",
    r_civilian: "Civil", r_undercover: "Beépülő", r_mrwhite: "Mr. White", r_jester: "Bolond", r_accomplice: "Bűntárs",
    c_civilian: "A Kórus", c_undercover: "Az Idegen", c_blank: "Az Üres Lap", c_fool: "A Bolond", c_shadow: "Az Árnyék",
    at: (n) => `${n} főtől`,
    impostors: "Beépülők", wordGap: "Szótávolság",
    g_wide: "Távoli", g_mixed: "Vegyes", g_tight: "Közeli",
    gh_wide: "A szavak távolabb esnek egymástól. Könnyebb kiszúrni a kakukktojást.",
    gh_mixed: "Minden, ami az aktív paklikban van.",
    gh_tight: "Csak a közeli rokonok. A beépülőnek van hol elbújnia.",
    onVote: "Szavazás után", showSide: "Mutasd az oldalát", sayNothing: "Ne áruld el",
    sayNote: "Így a körök sokkal hosszabbak és nehezebbek lesznek.",
    packs: "Paklik", managePacks: "Paklik kezelése",
    activePairs: (n) => `${n} páros játékban`,
    session: (n) => `Ez a menet · ${n} kör`,
    noScores: "Még semmi. Játssz egy kört, és ide kerülnek a pontok.",
    clearScores: "Pontok törlése",
    dealRound: "Osztás", fourMin: "Legalább négy játékos kell", noPairs: "Nincs páros az aktív paklikban",
    dealing: "Osztás", holdPress: "Takard el a kijelzőt. Nyomd és tartsd.", letGo: "Engedd el, és add tovább.",
    passTo: (n) => `Tovább: ${n}`, everyoneHas: "Mindenkinél van lap", backOne: "Egy lappal vissza",
    redeal: "Másik páros", redealTitle: "Eldobod ezt a párost?",
    redealBody: "Mindenki új szót és új szerepet kap. Ez a páros ma már nem jön vissza.",
    dealNo: "Osztás", left: (n) => `${n} maradt`, speaksFirst: "Ő kezd",
    tapVote: "Koppints arra, akit az asztal kiszavaz", endGame: "Játék vége",
    noOneOut: "Nincs kiszavazás", undo: "Szavazás visszavonása",
    voteOut: (n) => `Kiszavazod: ${n}?`,
    voteWarn: "A szava titok marad. Csak az oldala derül ki.",
    voteSealed: "Semmi nem derül ki róla.",
    voteBtn: "Kiszavazás", cancel: "Mégse",
    endWarn: "A kör elveszik. A pontok megmaradnak.",
    endBtn: "Játék befejezése",
    votedOut: "Kiszavazva", sealed: "Titok marad",
    jesterNote: "Pontosan ez volt a terv. A Bolond viszi a kört.",
    keepPlaying: "Játék tovább", turnOver: "Szavak felfedése", whiteGuesses: "Mr. White tippel",
    whiteOne: "Mr. White · egy tipp", whatWord: "Milyen szó volt a többieknél?",
    nameIt: "Ha eltalálod, egyedül nyered a kört.", typeWord: "Írd be a szót", lockIn: "Véglegesítés",
    whiteGuessed: "Mr. White tippje", theWordWas: "A szó ez volt",
    closeEnough: "Az app szerint elég közeli — de az asztal dönt.",
    notMatch: "Az app szerint nem talált — de az asztal dönt.",
    tableYes: "Az asztal szerint jó", tableNo: "Az asztal szerint nem",
    b_civilians: "A Kórus tartja magát", b_impostors: "Az Idegenek viszik",
    b_mrwhite: "Mr. White eltalálta", b_jester: "A Bolond egyedül nyer",
    mostHeld: "A többségnél ez volt", impHeld: "A beépülőknél",
    whoWas: "Ki kicsoda volt · pontok", dealAnother: "Új kör", backTable: "Vissza az asztalhoz",
    retire: "Ezt a párost dobd ki", retired: "Kidobva",
    newPack: "Új pakli", packName: "Pakli neve", builtIn: "Beépített",
    pairsN: (n) => `${n} páros`, edit: "Szerkesztés", done: "Kész",
    wordA: "Első szó", wordB: "Második szó", similarity: "Mennyire hasonló",
    addPair: "Páros hozzáadása", noPairsYet: "Még nincs páros. Add hozzá az elsőt alább.",
    deletePack: "Pakli törlése", sharePack: "Pakli megosztása", copied: "Link a vágólapon",
    importTitle: (n) => `Importálod: „${n}”?`, importBody: (n) => `${n} páros. A telefonra mentjük.`,
    importBtn: "Importálás", importBad: "Ez a link nem olvasható.",
    retiredPairs: (n) => `Kidobott párosok · ${n}`, restoreAll: "Mind visszaállítása",
    simHint: "A páros csak akkor jó, ha van olyan hétköznapi szó, ami az egyikre illik, a másikra nem.",
    dupe: "Ez a páros már szerepel a pakliban.", bothWords: "Mindkét szó kell.",
  },
};

let L = "en";
let HAP = true;

export const setLang = (v) => { L = v; };
export const setHaptics = (v) => { HAP = v !== false; };
export const getLang = () => L;
const t = (k, ...a) => {
  const v = STR[L][k] ?? STR.en[k] ?? k;
  return typeof v === "function" ? v(...a) : v;
};
/* Haptics.

   Two reasons the old durations were never felt: a phone's vibration motor
   needs roughly 20ms just to spin up, so anything under that is silent, and
   the old values were 8-14ms. Everything below is at or above the threshold.

   The second reason is iOS: Safari does not implement navigator.vibrate at
   all, on any version. There is no shim worth shipping, so the setting is
   disabled and labelled rather than left looking broken. */
export const HAPTICS_SUPPORTED =
  typeof navigator !== "undefined" && typeof navigator.vibrate === "function";

export const HAP_PATTERN = {
  tick: 20,                      // toggles, dots, small confirmations
  tap: 32,                       // primary buttons, passing the phone
  ready: [18, 45, 55],           // the hold registered — you may let go
  vote: [45, 40, 45],            // consequential, irreversible
  win: [40, 55, 40, 55, 95],     // the round is over
};

const buzz = (p) => {
  try {
    if (!HAP || !HAPTICS_SUPPORTED) return;
    navigator.vibrate(typeof p === "string" ? HAP_PATTERN[p] ?? HAP_PATTERN.tick : p);
  } catch (_) {}
};

/* Civilian and impostor MUST read identically. You are not told which side
   you are on — that uncertainty is the whole game, and it is why civilians
   hedge too. Only Mr White, the Jester and the Accomplice know, because
   they cannot play their role without knowing. */
const NOTES = {
  en: {
    mrwhite: "No word this round. Listen, bluff, and work out what the others are holding.",
    jester: "You are the Fool. You win alone if the table votes you out.",
    accomplice: (w) => `holds “${w}”. Nudge the talk that way and you both win — but only if you survive.`,
    undercover: "Say one word about it on your turn. Someone here holds a different word.",
    civilian: "Say one word about it on your turn. Someone here holds a different word.",
  },
  hu: {
    mrwhite: "Ebben a körben nincs szavad. Figyelj, blöffölj, és találd ki, mi van a többieknél.",
    jester: "Te vagy a Bolond. Egyedül nyersz, ha kiszavaznak.",
    accomplice: (w) => `nála „${w}” van. Vezesd oda a beszélgetést, és együtt nyertek — de csak ha bent maradsz.`,
    undercover: "A körödben mondj rá egy szót. Valakinél más szó van.",
    civilian: "A körödben mondj rá egy szót. Valakinél más szó van.",
  },
};



export { STR, t, buzz, NOTES };
