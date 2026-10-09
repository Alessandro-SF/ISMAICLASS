// Scheduled UFC events — bouts transcribed from ufcstats.com upcoming event pages (official UFC stats provider).
// Event venues from Wikipedia "2026 in UFC" (scheduled events table). Cards are subject to change.
// Each bout line: fighterA|fighterB|Weight class|title(T/-). Listed in card order (main event first).

export const UPCOMING_EVENTS_RAW = [
  {
    id: 'ufc-fight-night-allen-vs-duncan',
    name: 'UFC Fight Night: Allen vs. Duncan',
    date: '2026-10-10',
    venue: 'Meta Apex',
    city: 'Las Vegas, Nevada',
    country: 'United States',
    ufcstats: 'http://ufcstats.com/event-details/7f98d9d5a10fa25c',
    bouts: `
Brendan Allen|Christian Leroy Duncan|Middleweight|-
Matheus Camilo|Jai Herbert|Lightweight|-
Loopy Godinez|Ketlen Souza|Women's Strawweight|-
Andre Fili|Kai Kamaka III|Featherweight|-
Malcolm Wellmaker|Otari Tanzilovi|Bantamweight|-
Julius Walker|Gerald Meerschaert|Light Heavyweight|-
Francisco Prado|Ismael Bonfim|Lightweight|-
Niko Price|Leon Shahbazyan|Welterweight|-
Felipe Franco|Brendson Ribeiro|Light Heavyweight|-
Allen Frye Jr.|RJ Harris|Heavyweight|-
Alice Pereira|Daria Zhelezniakova|Women's Bantamweight|-
Ernesta Kareckaite|Melissa Gatto|Women's Flyweight|-
`,
  },
  {
    id: 'ufc-fight-night-buckley-vs-malott',
    name: 'UFC Fight Night: Buckley vs. Malott',
    date: '2026-10-17',
    venue: 'Rogers Place',
    city: 'Edmonton, Alberta',
    country: 'Canada',
    ufcstats: 'http://ufcstats.com/event-details/55e94a9b525dcf45',
    bouts: `
Joaquin Buckley|Mike Malott|Welterweight|-
Erin Blanchfield|Jasmine Jasudavicius|Women's Flyweight|-
Kyle Nelson|Cristian Perez|Lightweight|-
Marc-Andre Barriault|Kyle Daukaus|Middleweight|-
Louis Jourdain|Timmy Cuamba|Bantamweight|-
Mandel Nallo|Nate Landwehr|Lightweight|-
Tanner Boser|Jhonata Diniz|Heavyweight|-
Chad Anheliger|Steven Koslow|Bantamweight|-
Melissa Croden|Chelsea Chandler|Women's Bantamweight|-
Cody Chovancek|SuYoung You|Bantamweight|-
Julien Leblanc|Nick Galanti|Middleweight|-
Javad Mahjoub|Joel Faglier|Heavyweight|-
Katlyn Cerminara|Mackenzie Stiller|Women's Flyweight|-
`,
  },
  {
    id: 'ufc-333',
    name: 'UFC 333: Volkanovski vs. Evloev',
    date: '2026-10-24',
    venue: 'Etihad Arena',
    city: 'Abu Dhabi',
    country: 'United Arab Emirates',
    ufcstats: 'http://ufcstats.com/event-details/cc18abc046b382c9',
    bouts: `
Alexander Volkanovski|Movsar Evloev|Featherweight|T
Petr Yan|Merab Dvalishvili|Bantamweight|T
Lone'er Kavanagh|Ramazan Temirov|Flyweight|-
Alexander Volkov|Rizvan Kuniev|Heavyweight|-
Azamat Murzakanov|Dominick Reyes|Light Heavyweight|-
Nikita Krylov|Abdul Rakhman Yakhyaev|Light Heavyweight|-
Abus Magomedov|Cam Rowston|Middleweight|-
Grant Dawson|Nurullo Aliev|Lightweight|-
Aaron Pico|Losene Keita|Featherweight|-
`,
  },
  {
    id: 'ufc-fight-night-moicano-vs-nolan',
    name: 'UFC Fight Night: Moicano vs. Nolan',
    date: '2026-10-31',
    venue: null,
    city: 'Las Vegas, Nevada',
    country: 'United States',
    ufcstats: 'http://ufcstats.com/event-details/0a66de3a797cf73a',
    bouts: `
Renato Moicano|Tom Nolan|Lightweight|-
Nick Klein|Joe Kropschot|Middleweight|-
Lucia Szabova|Tainara Lisboa|Women's Flyweight|-
Randy Brown|Carlos Leal|Welterweight|-
Yana Santos|Luana Santos|Women's Bantamweight|-
Talita Alencar|Piera Rodriguez|Women's Strawweight|-
Rodrigo Sezinando|Theodor Berggren|Welterweight|-
Jean-Paul Lebosnoyani|Farman Hasanov|Welterweight|-
Azamat Bekoev|Andre Petroski|Middleweight|-
Julian Erosa|JeongYeong Lee|Featherweight|-
Francis Marshall|Gaston Bolanos|Featherweight|-
`,
  },
  {
    id: 'ufc-fight-night-bonfim-vs-brady',
    name: 'UFC Fight Night: Bonfim vs. Brady',
    date: '2026-11-07',
    venue: 'Meta Apex',
    city: 'Las Vegas, Nevada',
    country: 'United States',
    ufcstats: 'http://ufcstats.com/event-details/110404b505fb562c',
    bouts: `
Gabriel Bonfim|Sean Brady|Welterweight|-
Tatiana Suarez|Virna Jandiroba|Women's Strawweight|-
Mantas Kondratavicius|Wes Schultz|Middleweight|-
Billy Elekana|Lucas Fernando|Light Heavyweight|-
Austin Bashi|Lucas Brennan|Featherweight|-
Karine Silva|Gabriella Fernandes|Women's Flyweight|-
Priscila Cachoeira|Nina Milosevic|Women's Bantamweight|-
Keiichiro Nakamura|Ollie Schmid|Featherweight|-
Seokhyeon Ko|Wellington Turman|Welterweight|-
Jonny Parsons|Jose Souza|Welterweight|-
Davey Grant|Elijah Smith|Bantamweight|-
Jose Delano|Murtazali Magomedov|Featherweight|-
Gabriel Lorenco|Alvin Hines|Heavyweight|-
`,
  },
  {
    id: 'ufc-334',
    name: 'UFC 334: Gane vs. Hokit',
    date: '2026-11-14',
    venue: 'Madison Square Garden',
    city: 'New York City, New York',
    country: 'United States',
    ufcstats: 'http://ufcstats.com/event-details/402ea3b5ee233852',
    bouts: `
Ciryl Gane|Josh Hokit|Heavyweight|T
Kayla Harrison|Amanda Nunes|Women's Bantamweight|T
Caio Borralho|Yousri Belgaroui|Middleweight|-
Uros Medic|Kevin Holland|Welterweight|-
Bilal Hasan|Luis Gurule|Flyweight|-
Stephen Thompson|Charles Radtke|Welterweight|-
Drew Dober|Chris Duncan|Lightweight|-
Jim Miller|Terrance McKinney|Lightweight|-
Donte Johnson|Baisangur Susurkaev|Middleweight|-
Bia Mesquita|Macy Chiasson|Women's Bantamweight|-
Adrian Yanez|Juan Diaz|Bantamweight|-
Nazim Sadykhov|Jefferson Nascimento|Lightweight|-
`,
  },
  {
    id: 'ufc-fight-night-prochazka-vs-stirling',
    name: 'UFC Fight Night: Procházka vs. Stirling',
    date: '2026-11-21',
    venue: 'Ali Bin Hamad al-Attiyah Arena',
    city: 'Al Rayyan (Doha)',
    country: 'Qatar',
    ufcstats: 'http://ufcstats.com/event-details/cbf69fa846c7e3ee',
    bouts: `
Jiri Prochazka|Navajo Stirling|Light Heavyweight|-
Aljamain Sterling|Kevin Vallejos|Featherweight|-
Dan Hooker|Brian Ortega|Lightweight|-
Jared Cannonier|Ikram Aliskerov|Middleweight|-
Shamil Gaziev|Tallison Teixeira|Heavyweight|-
Jake Matthews|Tahir Abdullayev|Welterweight|-
Aleksandre Topuria|Santiago Luna|Bantamweight|-
Asu Almabayev|Kyoji Horiguchi|Flyweight|-
Amir Albazi|Alessandro Costa|Flyweight|-
`,
  },
  {
    id: 'ufc-fight-night-295',
    name: 'UFC Fight Night 295',
    date: '2026-11-28',
    venue: null,
    city: 'Riyadh',
    country: 'Saudi Arabia',
    wikipedia: 'https://en.wikipedia.org/wiki/UFC_Fight_Night_295',
    note: 'Venue and fight card not yet announced (per Wikipedia, Oct 8, 2026).',
    bouts: ``,
  },
  {
    id: 'ufc-335',
    name: 'UFC 335: Oliveira vs. Lopes',
    date: '2026-12-12',
    venue: 'T-Mobile Arena',
    city: 'Las Vegas, Nevada',
    country: 'United States',
    ufcstats: 'http://ufcstats.com/event-details/fa2fca260beeb9c0',
    bouts: `
Charles Oliveira|Diego Lopes|Lightweight|-
Sergei Pavlovich|Alex Pereira|Heavyweight|-
Joe Pyfer|Bo Nickal|Middleweight|-
`,
  },
]
