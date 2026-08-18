/* ============================ word packs ============================ *
 *  THE TEST every pair must pass — it is a ratio, not a yes or no.
 *
 *  Name five clues someone would actually give. FOUR OR FIVE must fit both
 *  words. One or two separating clues is the game.
 *
 *  Five fitting and none separating is unwinnable: Szarvas/Őz — erdő, agancs,
 *  barna, négylábú all fit both and the real difference is species trivia.
 *
 *  One fitting and four separating is no game at all: Medve/Oroszlán overlaps
 *  only generically (big, wild, animal) while honey, forest, mane and savanna
 *  each expose it on the first word. This is why the whole sim-2 band is gone —
 *  "further apart" is not an easier game, it is no game.
 *
 *  Kávé/Tea is the shape to aim for: hot, mug, morning, sugar, milk, café and
 *  breakfast all fit both. Only beans and leaves separate them.
 *
 *  Also barred:
 *    parent and child        Dog/Animal
 *    one word covering       Kenyér/Kifli
 *    a shared compound stem  Hagyma/Fokhagyma, Kerék/Fogaskerék
 *    two halves of a system  Key/Lock
 *    homonyms                Crane, Rák, Levél, Fogas, Mouse, House
 *
 *  sim 3 comfortable · 4 close cousins. Nothing below 3 belongs in the deck.
 * ------------------------------------------------------------------- */

export const CORE_EN = [
  { a: "Coffee", b: "Tea", sim: 3 }, { a: "Wine", b: "Beer", sim: 3 },
  { a: "Whisky", b: "Rum", sim: 4 }, { a: "Champagne", b: "Cider", sim: 3 },
  { a: "Juice", b: "Smoothie", sim: 4 }, { a: "Sandwich", b: "Wrap", sim: 4 },
  { a: "Cake", b: "Bread", sim: 3 }, { a: "Pancake", b: "Waffle", sim: 4 },
  { a: "Cookie", b: "Cracker", sim: 4 }, { a: "Ice cream", b: "Yogurt", sim: 3 },
  { a: "Chocolate", b: "Caramel", sim: 3 }, { a: "Honey", b: "Syrup", sim: 4 },
  { a: "Soup", b: "Stew", sim: 4 }, { a: "Curry", b: "Goulash", sim: 4 },
  { a: "Rice", b: "Pasta", sim: 3 }, { a: "Butter", b: "Cheese", sim: 3 },
  { a: "Egg", b: "Milk", sim: 3 }, { a: "Steak", b: "Bacon", sim: 3 },
  { a: "Sausage", b: "Salami", sim: 4 }, { a: "Salt", b: "Sugar", sim: 4 },
  { a: "Ketchup", b: "Mustard", sim: 4 }, { a: "Pepper", b: "Chilli", sim: 4 },
  { a: "Garlic", b: "Ginger", sim: 4 }, { a: "Mushroom", b: "Onion", sim: 3 },
  { a: "Olive", b: "Grape", sim: 4 }, { a: "Apple", b: "Pear", sim: 4 },
  { a: "Lemon", b: "Lime", sim: 4 }, { a: "Watermelon", b: "Pumpkin", sim: 3 },
  { a: "Popcorn", b: "Chips", sim: 4 }, { a: "Dog", b: "Wolf", sim: 4 },
  { a: "Cat", b: "Tiger", sim: 3 }, { a: "Horse", b: "Donkey", sim: 4 },
  { a: "Deer", b: "Goat", sim: 4 }, { a: "Sheep", b: "Cow", sim: 4 },
  { a: "Pig", b: "Boar", sim: 4 }, { a: "Rabbit", b: "Squirrel", sim: 3 },
  { a: "Mouse", b: "Rat", sim: 4 }, { a: "Hedgehog", b: "Mole", sim: 4 },
  { a: "Elephant", b: "Rhino", sim: 4 }, { a: "Frog", b: "Toad", sim: 4 },
  { a: "Snake", b: "Worm", sim: 3 }, { a: "Turtle", b: "Snail", sim: 4 },
  { a: "Bee", b: "Wasp", sim: 4 }, { a: "Butterfly", b: "Dragonfly", sim: 4 },
  { a: "Butterfly", b: "Moth", sim: 4 }, { a: "Mosquito", b: "Fly", sim: 4 },
  { a: "Owl", b: "Bat", sim: 3 }, { a: "Chicken", b: "Duck", sim: 4 },
  { a: "Sparrow", b: "Pigeon", sim: 4 }, { a: "Shark", b: "Dolphin", sim: 3 },
  { a: "Penguin", b: "Seal", sim: 3 }, { a: "Ocean", b: "Lake", sim: 4 },
  { a: "River", b: "Canal", sim: 4 }, { a: "Beach", b: "Desert", sim: 3 },
  { a: "Desert", b: "Tundra", sim: 4 }, { a: "Mountain", b: "Hill", sim: 4 },
  { a: "Forest", b: "Jungle", sim: 4 }, { a: "Island", b: "Peninsula", sim: 4 },
  { a: "Cave", b: "Well", sim: 3 }, { a: "Volcano", b: "Geyser", sim: 4 },
  { a: "City", b: "Village", sim: 4 }, { a: "Bridge", b: "Tunnel", sim: 3 },
  { a: "Park", b: "Garden", sim: 4 }, { a: "Lighthouse", b: "Windmill", sim: 3 },
  { a: "Fountain", b: "Waterfall", sim: 4 }, { a: "Market", b: "Mall", sim: 4 },
  { a: "Bakery", b: "Butcher", sim: 4 }, { a: "Bar", b: "Café", sim: 3 },
  { a: "Restaurant", b: "Canteen", sim: 4 }, { a: "Hotel", b: "Hostel", sim: 4 },
  { a: "Campsite", b: "Cottage", sim: 4 }, { a: "Museum", b: "Library", sim: 3 },
  { a: "Cinema", b: "Theatre", sim: 4 }, { a: "Pool", b: "Beach", sim: 4 },
  { a: "Monastery", b: "Palace", sim: 4 }, { a: "Cemetery", b: "Chapel", sim: 3 },
  { a: "Pharmacy", b: "Post office", sim: 3 }, { a: "Airport", b: "Station", sim: 4 },
  { a: "Harbour", b: "Airport", sim: 3 }, { a: "Attic", b: "Basement", sim: 4 },
  { a: "Kitchen", b: "Bathroom", sim: 3 }, { a: "Chair", b: "Sofa", sim: 3 },
  { a: "Table", b: "Shelf", sim: 3 }, { a: "Passport", b: "Licence", sim: 4 },
  { a: "Pillow", b: "Mattress", sim: 4 }, { a: "Blanket", b: "Towel", sim: 3 },
  { a: "Curtain", b: "Carpet", sim: 3 }, { a: "Pen", b: "Pencil", sim: 4 },
  { a: "Notebook", b: "Book", sim: 4 }, { a: "Newspaper", b: "Letter", sim: 3 },
  { a: "Envelope", b: "Postcard", sim: 4 }, { a: "Ticket", b: "Receipt", sim: 4 },
  { a: "Map", b: "Compass", sim: 3 }, { a: "Clock", b: "Watch", sim: 4 },
  { a: "Calendar", b: "Diary", sim: 4 }, { a: "Mirror", b: "Window", sim: 3 },
  { a: "Candle", b: "Lamp", sim: 3 }, { a: "Flashlight", b: "Match", sim: 4 },
  { a: "Fridge", b: "Oven", sim: 3 }, { a: "Fan", b: "Radiator", sim: 3 },
  { a: "Phone", b: "Radio", sim: 3 }, { a: "Camera", b: "Telescope", sim: 3 },
  { a: "Fork", b: "Spoon", sim: 4 }, { a: "Plate", b: "Bowl", sim: 4 },
  { a: "Glass", b: "Mug", sim: 4 }, { a: "Bottle", b: "Jar", sim: 4 },
  { a: "Knife", b: "Scissors", sim: 4 }, { a: "Hammer", b: "Axe", sim: 4 },
  { a: "Needle", b: "Nail", sim: 4 }, { a: "Rope", b: "Chain", sim: 4 },
  { a: "Bucket", b: "Basket", sim: 4 }, { a: "Ladder", b: "Stairs", sim: 4 },
  { a: "Broom", b: "Mop", sim: 4 }, { a: "Sponge", b: "Brush", sim: 4 },
  { a: "Soap", b: "Toothpaste", sim: 3 }, { a: "Backpack", b: "Suitcase", sim: 4 },
  { a: "Ring", b: "Bracelet", sim: 4 }, { a: "Necklace", b: "Earring", sim: 4 },
  { a: "Sock", b: "Glove", sim: 4 }, { a: "Scarf", b: "Tie", sim: 3 },
  { a: "Boots", b: "Sandals", sim: 4 }, { a: "Hat", b: "Helmet", sim: 4 },
  { a: "Guitar", b: "Violin", sim: 4 }, { a: "Violin", b: "Cello", sim: 4 },
  { a: "Piano", b: "Harp", sim: 3 }, { a: "Trumpet", b: "Flute", sim: 4 },
  { a: "Drum", b: "Bell", sim: 3 }, { a: "Whistle", b: "Siren", sim: 4 },
  { a: "Coin", b: "Stamp", sim: 3 }, { a: "Balloon", b: "Kite", sim: 4 },
  { a: "Wheel", b: "Gear", sim: 4 }, { a: "Anchor", b: "Sail", sim: 3 },
  { a: "Snowman", b: "Scarecrow", sim: 4 }, { a: "Bicycle", b: "Motorcycle", sim: 4 },
  { a: "Bus", b: "Train", sim: 4 }, { a: "Taxi", b: "Ambulance", sim: 3 },
  { a: "Tractor", b: "Digger", sim: 4 }, { a: "Doctor", b: "Nurse", sim: 4 },
  { a: "Vet", b: "Dentist", sim: 4 }, { a: "Teacher", b: "Coach", sim: 3 },
  { a: "Chef", b: "Baker", sim: 4 }, { a: "Waiter", b: "Cashier", sim: 4 },
  { a: "Police", b: "Soldier", sim: 3 }, { a: "Firefighter", b: "Lifeguard", sim: 4 },
  { a: "Lawyer", b: "Judge", sim: 4 }, { a: "Priest", b: "Monk", sim: 4 },
  { a: "Scientist", b: "Inventor", sim: 4 }, { a: "Journalist", b: "Detective", sim: 4 },
  { a: "Plumber", b: "Electrician", sim: 4 }, { a: "Farmer", b: "Fisherman", sim: 4 },
  { a: "Driver", b: "Courier", sim: 4 }, { a: "Tailor", b: "Shoemaker", sim: 4 },
  { a: "Actor", b: "Singer", sim: 3 }, { a: "Magician", b: "Clown", sim: 3 },
  { a: "Pilot", b: "Captain", sim: 4 }, { a: "Barber", b: "Beautician", sim: 4 },
  { a: "Guard", b: "Referee", sim: 3 }, { a: "Wedding", b: "Funeral", sim: 3 },
  { a: "Birthday", b: "Christmas", sim: 3 }, { a: "Easter", b: "Carnival", sim: 4 },
  { a: "Graduation", b: "Exam", sim: 4 }, { a: "Concert", b: "Festival", sim: 4 },
  { a: "Parade", b: "Protest", sim: 4 }, { a: "Auction", b: "Lottery", sim: 4 },
  { a: "Holiday", b: "Weekend", sim: 4 }, { a: "Vacation", b: "Retirement", sim: 3 },
  { a: "Summer", b: "Winter", sim: 4 }, { a: "Morning", b: "Evening", sim: 4 },
  { a: "Snow", b: "Sand", sim: 3 }, { a: "Rain", b: "Fog", sim: 3 },
  { a: "Storm", b: "Earthquake", sim: 3 }, { a: "Wind", b: "Thunder", sim: 3 },
  { a: "Rainbow", b: "Sunset", sim: 3 }, { a: "Fire", b: "Lightning", sim: 3 },
  { a: "Shadow", b: "Reflection", sim: 4 }, { a: "Silence", b: "Darkness", sim: 3 },
  { a: "Secret", b: "Lie", sim: 4 }, { a: "Promise", b: "Threat", sim: 3 },
  { a: "Fear", b: "Anger", sim: 4 }, { a: "Love", b: "Friendship", sim: 4 },
  { a: "Dream", b: "Memory", sim: 4 }, { a: "Luck", b: "Talent", sim: 3 },
  { a: "Miracle", b: "Coincidence", sim: 4 }, { a: "Football", b: "Basketball", sim: 3 },
  { a: "Handball", b: "Water polo", sim: 4 }, { a: "Volleyball", b: "Tennis", sim: 4 },
  { a: "Tennis", b: "Badminton", sim: 4 }, { a: "Golf", b: "Cricket", sim: 3 },
  { a: "Rugby", b: "Hockey", sim: 4 }, { a: "Marathon", b: "Triathlon", sim: 4 },
  { a: "Skiing", b: "Skating", sim: 4 }, { a: "Surfing", b: "Sailing", sim: 4 },
  { a: "Climbing", b: "Diving", sim: 3 }, { a: "Cycling", b: "Rowing", sim: 3 },
  { a: "Boxing", b: "Wrestling", sim: 4 }, { a: "Karate", b: "Fencing", sim: 4 },
  { a: "Gymnastics", b: "Ballet", sim: 4 }, { a: "Fishing", b: "Hunting", sim: 4 },
  { a: "Chess", b: "Poker", sim: 3 }, { a: "Cards", b: "Dominoes", sim: 4 },
  { a: "Darts", b: "Bowling", sim: 4 }, { a: "Crossword", b: "Sudoku", sim: 4 },
  { a: "Ghost", b: "Angel", sim: 3 }, { a: "Witch", b: "Vampire", sim: 3 },
  { a: "Zombie", b: "Mummy", sim: 4 }, { a: "Dragon", b: "Dinosaur", sim: 4 },
  { a: "Wizard", b: "Knight", sim: 3 }, { a: "Mermaid", b: "Fairy", sim: 4 },
  { a: "Giant", b: "Dwarf", sim: 4 }, { a: "Superhero", b: "Spy", sim: 3 },
  { a: "Santa", b: "Clown", sim: 3 }, { a: "Circus", b: "Funfair", sim: 4 },
  { a: "Puppet", b: "Statue", sim: 4 }, { a: "Mask", b: "Costume", sim: 4 },
  // tech
  { a: "Laptop", b: "Tablet", sim: 4 }, { a: "Headphones", b: "Earbuds", sim: 4 },
  { a: "Charger", b: "Powerbank", sim: 4 }, { a: "Keyboard", b: "Monitor", sim: 3 },
  { a: "Email", b: "Text message", sim: 4 }, { a: "Password", b: "PIN", sim: 4 },
  { a: "Wifi", b: "Bluetooth", sim: 4 }, { a: "Selfie", b: "Portrait", sim: 4 },
  { a: "Printer", b: "Scanner", sim: 3 }, { a: "Drone", b: "Helicopter", sim: 3 },
  { a: "Playlist", b: "Mixtape", sim: 4 }, { a: "Podcast", b: "Audiobook", sim: 4 },
  // music
  { a: "Punk", b: "Grunge", sim: 4 }, { a: "Jazz", b: "Blues", sim: 4 },
  { a: "Techno", b: "Trance", sim: 4 }, { a: "Opera", b: "Musical", sim: 4 },
  { a: "Choir", b: "Orchestra", sim: 4 }, { a: "Reggae", b: "Ska", sim: 4 },
  // brands
  { a: "Coca-Cola", b: "Pepsi", sim: 4 }, { a: "Nike", b: "Adidas", sim: 4 },
  { a: "Netflix", b: "YouTube", sim: 4 }, { a: "Facebook", b: "Instagram", sim: 4 },
  { a: "McDonald's", b: "Burger King", sim: 4 }, { a: "IKEA", b: "Jysk", sim: 4 },
  { a: "Lego", b: "Playmobil", sim: 4 },
];
