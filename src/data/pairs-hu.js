/* The Hungarian deck is a single curated tier — the tea/coffee sweet spot —
   rather than a range of difficulties. Every pair carries the axis that
   separates the two words, which is the whole test: if you cannot name the
   axis, the pair does not belong here.

   Because there is only one tier, sim is 3 throughout and the Word gap control
   hides itself unless an English pack is also active.

   Do not re-add, these were all considered and rejected:
     collapse into one Hungarian word   sofa/couch, turtle/tortoise, scissors,
                                        fog/mist, pillow, telescope, rabbit
     ambiguous in Hungarian             zsámoly, orgona, csatorna, festő, villa,
                                        motor, galéria, roller
     the compound states the answer     vízilabda, napszemüveg, sziget/félsziget,
                                        fejhallgató/fülhallgató
     needs expert knowledge             krokodil/aligátor, béka/varangy,
                                        gepárd/leopárd, sas/ölyv, polip/tintahal,
                                        pillangó/moly, vulkán/gejzír
     nothing separates them             kolbász/szalámi, lekvár/dzsem,
                                        fagylalt/jégkrém, eső/zápor
     too abstract                       árnyék/tükörkép, szivárvány/délibáb,
                                        nap/hold

   Under observation, play them and decide: Sör/Cider, Smoothie/Milkshake,
   Hostel, Kajakozás/Kenuzás, Furulya/Klarinét, Jóga/Pilates, Kupa, Ajtó/Kapu,
   Karóra/Falióra. */
export const CORE_HU = [
  // étel
  { a: "Pizza", b: "Hamburger", sim: 3 },                    // forma, hogyan eszed
  { a: "Hamburger", b: "Szendvics", sim: 3 },                // meleg vs. hideg
  { a: "Palacsinta", b: "Gofri", sim: 3 },                   // felszín
  { a: "Fánk", b: "Muffin", sim: 3 },                        // olajban vs. sütőben
  { a: "Rántotta", b: "Tükörtojás", sim: 3 },                // felverve vs. egészben
  { a: "Alma", b: "Körte", sim: 3 },                         // alak
  { a: "Eper", b: "Málna", sim: 3 },                         // méret, mag
  { a: "Citrom", b: "Lime", sim: 3 },                        // szín, méret
  { a: "Leves", b: "Pörkölt", sim: 3 },                      // mennyi lé
  { a: "Sült krumpli", b: "Chips", sim: 3 },                 // frissen sült vs. csomagolt
  { a: "Croissant", b: "Briós", sim: 3 },                    // réteges vs. puha
  { a: "Sajt", b: "Túró", sim: 3 },                          // érlelés
  { a: "Vaj", b: "Margarin", sim: 3 },                       // állati vs. növényi
  { a: "Csokoládé", b: "Cukorka", sim: 3 },                  // olvad-e
  { a: "Méz", b: "Lekvár", sim: 3 },                         // eredet
  { a: "Só", b: "Bors", sim: 3 },                            // szín, mennyiség
  { a: "Ketchup", b: "Mustár", sim: 3 },                     // szín, csípősség
  // ital
  { a: "Tea", b: "Kávé", sim: 3 },                           // szín, keserűség, rituálé
  { a: "Cappuccino", b: "Latte", sim: 3 },                   // hab aránya
  { a: "Tej", b: "Tejszín", sim: 3 },                        // zsírtartalom
  { a: "Joghurt", b: "Kefir", sim: 3 },                      // kanalazod vagy iszod
  { a: "Bor", b: "Pezsgő", sim: 3 },                         // szénsav
  { a: "Sör", b: "Cider", sim: 3 },                          // alapanyag, édesség
  { a: "Vodka", b: "Gin", sim: 3 },                          // íz
  { a: "Limonádé", b: "Szörp", sim: 3 },                     // friss vs. sűrítmény
  { a: "Smoothie", b: "Milkshake", sim: 3 },                 // gyümölcs vs. jégkrém
  // állat
  { a: "Kutya", b: "Macska", sim: 3 },                       // viselkedés
  { a: "Kutya", b: "Farkas", sim: 3 },                       // szelíd vs. vad
  { a: "Macska", b: "Tigris", sim: 3 },                      // méret
  { a: "Cápa", b: "Delfin", sim: 3 },                        // félelem vs. szeretet
  { a: "Medve", b: "Panda", sim: 3 },                        // szín, mit eszik
  { a: "Kecske", b: "Birka", sim: 3 },                       // gyapjú, szarv
  { a: "Ló", b: "Szamár", sim: 3 },                          // méret, hang
  { a: "Ló", b: "Zebra", sim: 3 },                           // csíkok, lovagolható-e
  { a: "Zsiráf", b: "Teve", sim: 3 },                        // nyak vs. púp
  { a: "Méh", b: "Darázs", sim: 3 },                         // mézet készít-e
  { a: "Tyúk", b: "Kacsa", sim: 3 },                         // víz, hang
  { a: "Egér", b: "Patkány", sim: 3 },                       // méret
  // helyszín
  { a: "Mozi", b: "Színház", sim: 3 },                       // élő vs. felvett
  { a: "Hegy", b: "Domb", sim: 3 },                          // magasság
  { a: "Folyó", b: "Patak", sim: 3 },                        // szélesség
  { a: "Tenger", b: "Tó", sim: 3 },                          // sósság, hullám
  { a: "Erdő", b: "Dzsungel", sim: 3 },                      // klíma
  { a: "Város", b: "Falu", sim: 3 },                         // méret
  { a: "Könyvtár", b: "Könyvesbolt", sim: 3 },               // visszaviszed-e
  { a: "Kórház", b: "Rendelő", sim: 3 },                     // fekvő vs. járó beteg
  { a: "Park", b: "Kert", sim: 3 },                          // köz vs. privát
  { a: "Vár", b: "Kastély", sim: 3 },                        // védmű vs. luxus
  { a: "Étterem", b: "Büfé", sim: 3 },                       // felszolgálás
  { a: "Bár", b: "Kocsma", sim: 3 },                         // elegancia, mit rendelsz
  { a: "Templom", b: "Kápolna", sim: 3 },                    // méret
  { a: "Strand", b: "Uszoda", sim: 3 },                      // szabadtér vs. fedett
  { a: "Repülőtér", b: "Vasútállomás", sim: 3 },             // közlekedési mód
  { a: "Pékség", b: "Kávézó", sim: 3 },                      // leülsz-e
  { a: "Barlang", b: "Bánya", sim: 3 },                      // természetes vs. ásott
  { a: "Szálloda", b: "Hostel", sim: 3 },                    // saját szoba
  { a: "Híd", b: "Alagút", sim: 3 },                         // fölött vs. alatt
  { a: "Lift", b: "Mozgólépcső", sim: 3 },                   // szakaszos vs. folyamatos
  // sport
  { a: "Síelés", b: "Snowboardozás", sim: 3 },               // egy vs. két deszka
  { a: "Tenisz", b: "Tollaslabda", sim: 3 },                 // mit ütnek
  { a: "Foci", b: "Rögbi", sim: 3 },                         // labda alakja, kéz vs. láb
  { a: "Kosárlabda", b: "Röplabda", sim: 3 },                // háló vs. gyűrű
  { a: "Úszás", b: "Műugrás", sim: 3 },                      // hossz vs. beugrás
  { a: "Boksz", b: "Kickbox", sim: 3 },                      // láb
  { a: "Birkózás", b: "Judo", sim: 3 },                      // ruha, fogás
  { a: "Kajakozás", b: "Kenuzás", sim: 3 },                  // lapát, testhelyzet
  { a: "Vitorlázás", b: "Szörfözés", sim: 3 },               // méret, egyedül vagy csapatban
  { a: "Íjászat", b: "Darts", sim: 3 },                      // távolság, kültér vs. beltér
  { a: "Futás", b: "Gyaloglás", sim: 3 },                    // talajkontaktus
  { a: "Jóga", b: "Pilates", sim: 3 },                       // légzés vs. gépek
  // hangszer
  { a: "Gitár", b: "Ukulele", sim: 3 },                      // méret, húrok száma
  { a: "Trombita", b: "Szaxofon", sim: 3 },                  // fúvóka vs. nád
  { a: "Hegedű", b: "Cselló", sim: 3 },                      // méret, hogyan tartod
  { a: "Zongora", b: "Szintetizátor", sim: 3 },              // áram, súly
  { a: "Furulya", b: "Klarinét", sim: 3 },                   // ki játszik rajta
  // tárgy
  { a: "Toll", b: "Ceruza", sim: 3 },                        // törölhető-e
  { a: "Bögre", b: "Csésze", sim: 3 },                       // méret, mit iszol belőle
  { a: "Tükör", b: "Ablak", sim: 3 },                        // átlátszó vs. visszaver
  { a: "Könyv", b: "Magazin", sim: 3 },                      // kép aránya, eldobod-e
  { a: "Hátizsák", b: "Bőrönd", sim: 3 },                    // hogyan viszed
  { a: "Pléd", b: "Paplan", sim: 3 },                        // vastagság
  { a: "Lámpa", b: "Csillár", sim: 3 },                      // asztal vs. plafon
  { a: "Gyertya", b: "Zseblámpa", sim: 3 },                  // láng vs. áram
  { a: "Karóra", b: "Falióra", sim: 3 },                     // hordod-e magaddal
  { a: "Kontaktlencse", b: "Szemüveg", sim: 3 },             // szemen vs. orron
  { a: "Gyűrű", b: "Karkötő", sim: 3 },                      // testrész
  { a: "Kupa", b: "Érem", sim: 3 },                          // polcra vs. nyakba
  { a: "Ajtó", b: "Kapu", sim: 3 },                          // méret, kültér vs. beltér
  { a: "Sál", b: "Kendő", sim: 3 },                          // forma
  { a: "Kabát", b: "Zakó", sim: 3 },                         // meleg vs. elegancia
  { a: "Csizma", b: "Bakancs", sim: 3 },                     // szár, fűző
  { a: "Fésű", b: "Hajkefe", sim: 3 },                       // fogak vs. sörték
  { a: "Szappan", b: "Sampon", sim: 3 },                     // mit tisztít
  { a: "Csavarhúzó", b: "Fúró", sim: 3 },                    // kézi vs. elektromos
  // tech
  { a: "iPhone", b: "Android", sim: 3 },                     // ki gyártja, ár
  { a: "Telefon", b: "Tablet", sim: 3 },                     // méret, zsebbe fér-e
  { a: "Laptop", b: "Asztali gép", sim: 3 },                 // hordozható-e
  { a: "Monitor", b: "Tévé", sim: 3 },                       // ki elé ülsz
  { a: "Netflix", b: "YouTube", sim: 3 },                    // fizetsz-e, ki készíti
  { a: "Instagram", b: "TikTok", sim: 3 },                   // kép vs. videó
  { a: "WhatsApp", b: "Messenger", sim: 3 },                 // ki a tulaj, telefonszám
  { a: "PlayStation", b: "Xbox", sim: 3 },                   // gyártó, kontroller
  { a: "Chrome", b: "Firefox", sim: 3 },                     // ki fejleszti
  { a: "Zoom", b: "Teams", sim: 3 },                         // munkahely vs. bárki
  { a: "Wifi", b: "Bluetooth", sim: 3 },                     // távolság, mire használod
  { a: "Facebook", b: "LinkedIn", sim: 3 },                  // magán vs. munka
  // szakma
  { a: "Orvos", b: "Nővér", sim: 3 },                        // dönt vs. ellát
  { a: "Tűzoltó", b: "Rendőr", sim: 3 },                     // tűz vs. bűn
  { a: "Szakács", b: "Pék", sim: 3 },                        // mikor kel fel
  { a: "Borbély", b: "Fodrász", sim: 3 },                    // szakáll
  { a: "Ügyvéd", b: "Bíró", sim: 3 },                        // védi vs. dönt
  { a: "Énekes", b: "Rapper", sim: 3 },                      // dallam vs. ritmus
  { a: "Színész", b: "Humorista", sim: 3 },                  // szerep vs. önmaga
  { a: "Pilóta", b: "Stewardess", sim: 3 },                  // vezet vs. kiszolgál
  { a: "Író", b: "Újságíró", sim: 3 },                       // fikció vs. tény
  { a: "Mérnök", b: "Építész", sim: 3 },                     // működés vs. forma
  { a: "Ács", b: "Kőműves", sim: 3 },                        // fa vs. tégla
  { a: "Vízvezeték-szerelő", b: "Villanyszerelő", sim: 3 },  // víz vs. áram
  { a: "Sportoló", b: "Edző", sim: 3 },                      // játszik vs. utasít
  { a: "Kém", b: "Nyomozó", sim: 3 },                        // állam vs. bűnügy
  { a: "Király", b: "Császár", sim: 3 },                     // ország vs. birodalom
  { a: "Lovag", b: "Szamuráj", sim: 3 },                     // Európa vs. Japán
  { a: "Fotós", b: "Operatőr", sim: 3 },                     // álló vs. mozgó kép
  // média és pop
  { a: "Star Wars", b: "Dűne", sim: 3 },                // hangulat, közönség
  { a: "Harry Potter", b: "A Gyűrűk Ura", sim: 3 },          // mágia iskolában vs. úton
  { a: "Marvel", b: "DC", sim: 3 },                          // hangvétel, karakterek
  { a: "Batman", b: "Pókember", sim: 3 },                    // felnőtt vs. kamasz
  { a: "Titanic", b: "Avatar", sim: 3 },                     // valóság vs. sci-fi
  { a: "Jégvarázs", b: "Aranyhaj", sim: 3 },                 // tél vs. haj
  { a: "Toy Story", b: "Shrek", sim: 3 },                    // játék vs. mese
  { a: "Simpsons", b: "Family Guy", sim: 3 },                // sárga vs. fehér, korhatár
  // természet, közlekedés, ünnep
  { a: "Eső", b: "Hó", sim: 3 },                             // hőmérséklet
  { a: "Villám", b: "Mennydörgés", sim: 3 },                 // látod vs. hallod
  { a: "Rózsa", b: "Tulipán", sim: 3 },                      // tövis, mikor virágzik
  { a: "Napraforgó", b: "Margaréta", sim: 3 },               // méret, hol nő
  { a: "Vonat", b: "Busz", sim: 3 },                         // sín, menetidő
  { a: "Villamos", b: "Trolibusz", sim: 3 },                 // sín vs. gumi
  { a: "Karácsony", b: "Szilveszter", sim: 3 },              // család vs. barátok
  { a: "Halloween", b: "Farsang", sim: 3 },                  // október vs. február
];
