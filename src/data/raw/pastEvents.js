// Completed UFC events — transcribed from ufcstats.com event pages (official UFC stats provider).
// Each bout line: result|fighterA|fighterB|KD A-B|Sig. Str A-B|TD A-B|Sub att A-B|Weight class|title(T/-)|bonus(F=FOTN,P=POTN,-)|method|method detail|round|time
// result: W = fighterA defeated fighterB, D = draw, NC = no contest. Bouts listed in card order (main event first).
// Event metadata (venue, attendance) from Wikipedia "2026 in UFC".

export const PAST_EVENTS_RAW = [
  {
    id: 'ufc-fight-night-gamrot-vs-salkilld',
    name: 'UFC Fight Night: Gamrot vs. Salkilld',
    date: '2026-08-08',
    venue: 'Meta Apex',
    city: 'Las Vegas, Nevada',
    country: 'United States',
    ufcstats: 'http://ufcstats.com/event-details/495add4fbede0a44',
    bouts: `
W|Quillan Salkilld|Mateusz Gamrot|0-0|10-3|1-0|1-2|Lightweight|-|P|SUB|Rear Naked Choke|1|4:25
W|Diego Ferreira|Billy Quarantillo|0-0|116-73|4-1|0-0|Lightweight|-|F|U-DEC||3|5:00
W|Yadier del Valle|Darren Elkins|1-0|5-0|0-0|0-0|Featherweight|-|-|KO/TKO|Punch|1|0:35
W|Alexia Thainara|Amanda Lemos|0-0|81-56|2-0|0-0|Women's Strawweight|-|-|U-DEC||3|5:00
W|Ty Miller|Billy Ray Goff|2-0|133-25|0-0|0-0|Welterweight|-|P|KO/TKO|Punches|3|0:15
W|Steven Asplund|Guilherme Pat|2-1|66-45|0-0|1-0|Heavyweight|-|-|U-DEC||3|5:00
W|Diyar Nurgozhay|Bruno Lopes|2-0|48-14|0-1|0-0|Light Heavyweight|-|-|KO/TKO|Punches|1|4:59
W|Jose Montanha|Louie Sutherland|0-0|2-3|1-0|1-0|Heavyweight|-|-|SUB|Neck Crank|1|1:50
W|Manoel Sousa|Richie Miranda|1-0|67-46|1-1|0-0|Lightweight|-|-|U-DEC||3|5:00
W|Miles Johns|Gianni Vazquez|1-0|12-7|0-0|0-0|Featherweight|-|-|KO/TKO|Punch|1|3:09
W|Juliana Miller|Ravena Oliveira|0-0|24-7|2-0|1-0|Women's Flyweight|-|-|SUB|Rear Naked Choke|2|1:38
W|Carol Foro|Gigi Canuto|0-0|106-56|0-4|0-1|Women's Strawweight|-|-|U-DEC||3|5:00
`,
  },
  {
    id: 'ufc-330',
    name: 'UFC 330: Makhachev vs. Machado Garry',
    date: '2026-08-15',
    venue: 'Xfinity Mobile Arena',
    city: 'Philadelphia, Pennsylvania',
    country: 'United States',
    attendance: 19236,
    ufcstats: 'http://ufcstats.com/event-details/b96619b3acd7d9da',
    bouts: `
W|Islam Makhachev|Ian Machado Garry|1-0|22-29|7-0|0-0|Welterweight|T|-|U-DEC||5|5:00
W|Mackenzie Dern|Gillian Robertson|0-0|65-49|4-1|1-0|Women's Strawweight|T|-|U-DEC||5|5:00
W|Jalin Turner|Kaue Fernandes|1-0|9-2|0-0|0-0|Lightweight|-|P|KO/TKO|Punches|1|0:39
W|Dustin Stoltzfus|Mansur Abdul-Malik|0-0|43-34|2-1|1-0|Middleweight|-|P|SUB|Rear Naked Choke|2|4:25
W|Esteban Ribovics|Edson Barboza|0-0|63-30|0-0|0-0|Lightweight|-|-|KO/TKO|Punches|2|1:32
W|Chidi Njokuani|Joel Alvarez|0-0|155-74|0-0|0-0|Welterweight|-|-|U-DEC||3|5:00
W|Charles Johnson|Eduardo Chapolin|0-1|66-55|0-1|1-0|Catch Weight|-|P|SUB|Twister|3|1:36
W|Donte Johnson|Eric McConico|1-0|11-6|0-0|0-0|Middleweight|-|-|KO/TKO|Punch|1|1:38
W|Tresean Gore|Vicente Luque|0-0|65-46|0-0|1-1|Middleweight|-|-|U-DEC||3|5:00
W|Lucas Fernando|Rafael Tobias|2-0|69-13|0-1|0-0|Light Heavyweight|-|-|KO/TKO|Knee|3|1:10
W|Neil Magny|Ramiz Brahimaj|0-0|24-7|0-1|1-0|Welterweight|-|-|KO/TKO|Punches|2|3:20
W|Jeremiah Wells|Myktybek Orolbai|0-0|16-26|1-4|1-0|Welterweight|-|P|SUB|Guillotine Choke|3|1:24
`,
  },
  {
    id: 'ufc-fight-night-hernandez-vs-rodrigues',
    name: 'UFC Fight Night: Hernandez vs. Rodrigues',
    date: '2026-08-22',
    venue: 'Golden 1 Center',
    city: 'Sacramento, California',
    country: 'United States',
    attendance: 16867,
    ufcstats: 'http://ufcstats.com/event-details/a0a69dc9914ef6e1',
    bouts: `
W|Gregory Rodrigues|Anthony Hernandez|3-0|174-90|0-3|0-0|Middleweight|-|F|U-DEC||5|5:00
W|Vitor Petrino|Serghei Spivac|0-0|64-23|4-0|0-0|Heavyweight|-|-|U-DEC||3|5:00
W|Reinier de Ridder|Roman Dolidze|0-0|71-1|0-0|0-0|Light Heavyweight|-|-|KO/TKO|Punches|1|4:01
W|MarQuel Mederos|Mason Jones|1-0|73-77|0-1|0-0|Lightweight|-|P|KO/TKO|Punches|2|2:07
W|Carli Judice|Jeisla Chaves|1-0|16-10|0-0|0-0|Women's Flyweight|-|P|KO/TKO|Kick|1|1:39
W|Anthony Wint|Terrance Chatman|0-0|5-1|1-0|1-1|Heavyweight|-|-|SUB|Arm Triangle|1|4:29
W|Jamall Emmers|Lerryan Douglas|1-0|17-14|0-0|0-0|Featherweight|-|-|KO/TKO|Punch|1|3:38
W|Shamil Gaziev|Kennedy Nzechukwu|1-0|2-3|0-0|0-0|Heavyweight|-|-|KO/TKO|Punch|1|1:20
W|Chris Padilla|Nasrat Haqparast|1-0|125-71|1-0|1-0|Lightweight|-|-|SUB|Arm Triangle|3|4:59
W|Marcio Barbosa|Ryan Kuse|1-0|11-5|0-0|0-0|Featherweight|-|-|KO/TKO|Punch|1|2:47
W|Stan Dorsainvil|Gauge Young|0-0|123-137|2-3|0-0|Lightweight|-|-|U-DEC||3|5:00
W|Jackson McVey|Wes Schultz|1-0|38-24|0-1|0-1|Middleweight|-|-|KO/TKO|Knee|1|4:13
W|Shanelle Dyer|Elise Reed|0-0|136-49|1-0|0-0|Women's Strawweight|-|-|KO/TKO|Punches|3|1:42
`,
  },
  {
    id: 'ufc-fight-night-nurmagomedov-vs-song',
    name: 'UFC Fight Night: Nurmagomedov vs. Song',
    date: '2026-08-29',
    venue: 'Shanghai Oriental Sports Center',
    city: 'Shanghai',
    country: 'China',
    attendance: 16188,
    ufcstats: 'http://ufcstats.com/event-details/9d61d8cb1c354867',
    bouts: `
W|Song Yadong|Umar Nurmagomedov|1-0|11-13|0-1|1-0|Bantamweight|-|P|KO/TKO|Punch|2|1:48
W|Denise Gomes|Yan Xiaonan|1-0|18-19|0-0|0-0|Women's Strawweight|-|-|KO/TKO|Elbow|1|4:49
W|Kai Asakura|Aoriqileng|1-0|27-14|0-0|0-0|Bantamweight|-|-|KO/TKO|Punches|2|0:34
W|Sumudaerji|Alex Perez|0-0|41-10|0-4|0-0|Flyweight|-|-|U-DEC||3|5:00
W|Liu Ce|Levi Rodrigues Jr.|2-0|59-28|0-0|0-0|Light Heavyweight|-|F|KO/TKO|Punch|1|4:26
W|Bilal Hasan|Nilson Rojas|1-0|53-33|1-0|0-0|Flyweight|-|P|KO/TKO|Punch|2|2:28
W|Andre Lima|Namsrai Batbayar|0-0|47-51|0-0|1-0|Flyweight|-|-|SUB|Guillotine Choke|3|3:03
W|Rei Tsuruya|Kevin Borjas|0-0|39-0|2-0|1-0|Flyweight|-|-|SUB|Rear Naked Choke|1|4:14
W|Sean Woodson|Jack Jenkins|0-0|58-43|0-0|0-1|Featherweight|-|-|S-DEC||3|5:00
W|Francesco Nuzzi|Xiao Long|1-0|11-4|0-0|0-0|Bantamweight|-|-|KO/TKO|Punches|1|1:00
W|Hector Santiago|Lawrence Lui|1-0|30-32|0-0|0-0|Bantamweight|-|-|KO/TKO|Punch|2|0:53
W|Julia Polastri|Xiong Jingnan|1-0|16-16|0-0|0-0|Women's Strawweight|-|-|KO/TKO|Kick|1|3:06
W|Cam Nelson|Ding Meng|0-0|41-39|4-0|0-0|Welterweight|-|-|U-DEC||3|5:00
`,
  },
  {
    id: 'ufc-fight-night-hooker-vs-parnasse',
    name: 'UFC Fight Night: Hooker vs. Parnasse',
    date: '2026-09-05',
    venue: 'Accor Arena',
    city: 'Paris',
    country: 'France',
    attendance: 15687,
    ufcstats: 'http://ufcstats.com/event-details/2144954270be834d',
    bouts: `
W|Salahdine Parnasse|Dan Hooker|1-0|12-14|0-0|0-0|Lightweight|-|P|KO/TKO|Punch|1|2:35
W|Axel Sola|Fares Ziam|1-0|9-7|0-0|0-0|Lightweight|-|P|KO/TKO|Punch|1|1:40
W|Michael Page|Nursulton Ruziboev|0-0|12-8|0-2|1-0|Middleweight|-|-|U-DEC||3|5:00
W|Daniil Donchenko|Punahele Soriano|1-0|83-15|0-4|0-1|Welterweight|-|-|U-DEC||3|5:00
W|Kurtis Campbell|Trevor Peek|0-0|44-12|13-0|1-0|Featherweight|-|-|SUB|Rear Naked Choke|3|3:07
W|Losene Keita|Muhammad Naimov|2-0|18-4|0-0|0-0|Featherweight|-|P|KO/TKO|Punch|1|2:54
W|Felipe Lima|Morgan Charriere|0-0|112-36|2-0|0-1|Featherweight|-|-|U-DEC||3|5:00
W|Mario Pinto|Ryan Spann|0-0|48-13|6-0|0-1|Heavyweight|-|P|KO/TKO|Punches|2|0:55
W|Modestas Bukauskas|Oumar Sy|1-0|22-39|0-3|0-1|Light Heavyweight|-|-|KO/TKO|Knee|2|3:57
W|Pavel Andrusca|Nathaniel Wood|0-1|50-28|4-0|1-0|Featherweight|-|-|U-DEC||3|5:00
W|Fabia Sintes|Michael Aljarouj|0-0|28-10|3-0|3-1|Flyweight|-|-|U-DEC||3|5:00
W|Nora Cornolle|Klaudia Sygula|0-0|34-23|4-0|1-0|Women's Bantamweight|-|-|U-DEC||3|5:00
W|Matthieu Duclos|Luis Felipe Dias|1-0|18-22|0-0|0-0|Middleweight|-|-|KO/TKO|Punch|1|4:35
W|Delphine Benouaich|Sofia Montenegro|1-0|146-72|0-0|1-0|Women's Strawweight|-|-|SUB|Rear Naked Choke|2|4:22
`,
  },
  {
    id: 'ufc-fight-night-silva-vs-delgado',
    name: 'UFC Fight Night: Silva vs. Delgado',
    date: '2026-09-12',
    venue: 'Desert Diamond Arena',
    city: 'Glendale, Arizona',
    country: 'United States',
    attendance: 16928,
    ufcstats: 'http://ufcstats.com/event-details/638cfec7ec559d6e',
    bouts: `
W|Jean Silva|Jose Delgado|1-0|39-40|1-0|1-0|Featherweight|-|P|SUB|Rear Naked Choke|3|2:57
W|Brandon Moreno|Joseph Morales|0-0|67-71|2-1|0-0|Flyweight|-|-|S-DEC||3|5:00
W|Tommy McMillen|Marwan Rahiki|1-1|89-79|5-1|3-0|Featherweight|-|F|U-DEC||3|5:00
W|Alexa Grasso|Manon Fiorot|1-0|80-72|0-0|0-0|Women's Flyweight|-|-|U-DEC||3|5:00
W|Curtis Blaydes|Waldo Cortes Acosta|0-0|24-28|4-0|0-0|Heavyweight|-|-|U-DEC||3|5:00
W|David Martinez|Dan Ige|0-0|52-27|1-0|0-0|Bantamweight|-|-|U-DEC||3|5:00
W|Tim Elliott|Edgar Chairez|0-0|64-58|5-0|0-1|Catch Weight|-|-|U-DEC||3|5:00
W|Ignacio Bahamondes|Muslim Salikhov|0-0|78-42|0-3|0-0|Welterweight|-|-|U-DEC||3|5:00
W|Yousri Belgaroui|Djorden Santos|1-0|46-16|0-0|0-0|Middleweight|-|-|KO/TKO|Punch|1|4:25
W|Tommy Gantt|Drakkar Klose|0-0|56-15|2-0|1-0|Lightweight|-|-|SUB|Triangle Choke|3|2:46
W|Rongzhu|Rafa Garcia|0-0|109-73|0-1|0-0|Lightweight|-|-|U-DEC||3|5:00
W|Sean King III|Jessie Rosas|0-0|7-3|1-0|0-0|Featherweight|-|P|KO/TKO|Slam|1|0:36
W|Regina Tarin|JJ Aldrich|0-0|77-63|0-0|0-0|Women's Flyweight|-|-|U-DEC||3|5:00
`,
  },
  {
    id: 'ufc-331',
    name: 'UFC 331: Van vs. Pantoja 2',
    date: '2026-09-19',
    venue: 'Crypto.com Arena',
    city: 'Los Angeles, California',
    country: 'United States',
    attendance: 19357,
    ufcstats: 'http://ufcstats.com/event-details/8a0a35e7c74bebcc',
    bouts: `
W|Joshua Van|Alexandre Pantoja|1-0|181-147|0-5|1-0|Flyweight|T|F|U-DEC||5|5:00
W|Arman Tsarukyan|Mauricio Ruffy|1-0|8-4|1-0|0-0|Lightweight|-|P|KO/TKO|Elbow|1|4:56
W|Patricio Pitbull|Dooho Choi|1-0|38-20|0-0|0-0|Featherweight|-|-|KO/TKO|Punches|1|3:28
W|Sean Sharaf|Gable Steveson|1-0|3-1|0-0|0-0|Heavyweight|-|-|KO/TKO|Punch|1|0:12
W|Alonzo Menifield|Iwo Baraniewski|0-0|62-67|1-1|0-0|Light Heavyweight|-|-|S-DEC||3|5:00
W|Marlon Vera|Charles Jourdain|3-0|72-83|3-0|0-0|Bantamweight|-|-|KO/TKO|Punch|3|2:02
W|Robelis Despaigne|Tai Tuivasa|0-0|30-31|2-1|0-0|Heavyweight|-|-|S-DEC||3|5:00
W|Michael Aswell Jr.|JooSang Yoo|0-0|70-46|0-1|0-0|Featherweight|-|-|S-DEC||3|5:00
W|Ryan Gandra|Ozzy Diaz|1-0|16-3|0-0|0-0|Middleweight|-|-|KO/TKO|Punch|1|2:04
W|Edmen Shahbazyan|Brunno Ferreira|1-0|61-32|1-0|0-0|Middleweight|-|-|U-DEC||3|5:00
W|Casey O'Neill|Eduarda Moura|0-0|1-3|0-0|1-1|Women's Flyweight|-|P|SUB|Armbar|1|3:22
W|Joanderson Brito|Giga Chikadze|0-0|20-7|0-0|0-0|Featherweight|-|-|KO/TKO|Punches|1|1:57
`,
  },
  {
    id: 'ufc-fight-night-rosas-jr-vs-barcelos',
    name: 'UFC Fight Night: Rosas Jr. vs. Barcelos',
    date: '2026-09-26',
    venue: 'Meta Apex',
    city: 'Las Vegas, Nevada',
    country: 'United States',
    ufcstats: 'http://ufcstats.com/event-details/7e654edcddd71550',
    bouts: `
W|Raul Rosas Jr.|Raoni Barcelos|0-0|113-127|1-9|0-5|Bantamweight|-|F|KO/TKO||5|1:38
W|Ailin Perez|Norma Dumont|0-0|37-46|1-1|0-0|Women's Bantamweight|-|-|U-DEC||3|5:00
W|Luis Hernandez|Sedriques Dumas|0-0|3-0|1-0|2-0|Light Heavyweight|-|P|SUB|Guillotine Choke|1|0:57
W|Ilimbek Akylbek|Mahammadali Osmanli|0-0|6-6|1-0|0-0|Bantamweight|-|-|DQ||1|2:19
W|Tina Black|Melissa Amaya|2-0|50-22|0-0|0-0|Women's Strawweight|-|-|KO/TKO|Punches|2|3:19
W|Brady Hiestand|Rinya Nakamura|0-0|26-29|0-1|2-0|Bantamweight|-|-|SUB|Rear Naked Choke|2|4:07
W|Rodolfo Vieira|Robert Bryczek|0-0|24-37|2-0|0-0|Middleweight|-|-|U-DEC||3|5:00
W|Christian Edwards|Rodolfo Bellato|1-1|59-30|0-0|0-0|Light Heavyweight|-|-|KO/TKO|Punch|3|1:47
W|Elves Brener|Josiah Harrell|1-0|25-9|0-2|0-0|Lightweight|-|-|KO/TKO|Punch|1|4:14
W|Montel Jackson|Ricky Simon|2-0|31-13|0-2|1-0|Bantamweight|-|-|KO/TKO|Punch|2|2:39
W|Alatengheili|John Castaneda|0-0|28-55|3-0|0-2|Bantamweight|-|-|S-DEC||3|5:00
W|Yazmin Jauregui|Vanessa Demopoulos|0-0|34-7|1-0|0-0|Women's Strawweight|-|P|KO/TKO|Punches|1|1:02
`,
  },
  {
    id: 'ufc-332',
    name: 'UFC 332: Silva vs. Wang',
    date: '2026-10-03',
    venue: 'Delta Center',
    city: 'Salt Lake City, Utah',
    country: 'United States',
    attendance: 16492,
    ufcstats: 'http://ufcstats.com/event-details/ad3fdba28a7540cf',
    bouts: `
W|Natalia Silva|Wang Cong|1-0|109-98|3-0|0-0|Women's Flyweight|T|-|U-DEC||5|5:00
W|Payton Talbott|Deiveson Figueiredo|2-0|25-5|0-0|0-0|Bantamweight|-|-|KO/TKO|Punches|1|2:09
W|Esteban Ribovics|King Green|3-0|35-27|0-0|0-0|Lightweight|-|-|KO/TKO|Punch|1|4:08
W|Roberto Soldic|Khaos Williams|0-0|94-27|3-0|0-0|Welterweight|-|-|U-DEC||3|5:00
W|Roman Kopylov|Ateba Gautier|1-0|19-7|0-0|0-0|Middleweight|-|P|KO/TKO|Punches|1|3:12
W|Imanol Rodriguez|Alden Coria|1-0|20-4|1-0|0-0|Flyweight|-|P|KO/TKO|Kick|1|3:11
W|Damian Pinas|Andrey Pulyaev|1-0|5-4|0-0|0-0|Middleweight|-|P|KO/TKO|Punch|1|1:15
W|Marcus McGhee|Anthony Romero|2-0|34-13|0-1|0-0|Featherweight|-|-|KO/TKO|Punches|1|4:58
W|Anthony Wint|Lucas Armand|1-0|12-1|0-0|0-0|Heavyweight|-|-|KO/TKO|Punches|1|0:23
W|Johnny Walker|Mick Parkin|1-0|23-11|0-0|0-0|Heavyweight|-|P|KO/TKO|Knee|1|3:35
W|Jacobe Smith|Bruce Whitehead|0-0|11-4|1-0|0-0|Welterweight|-|-|KO/TKO|Punches|1|1:32
W|Alexander Hernandez|Rafael Dos Anjos|2-0|36-26|0-0|0-0|Lightweight|-|-|KO/TKO|Punch|2|3:12
W|Ismail Naurdiev|Marvin Vettori|0-0|74-76|3-0|1-0|Middleweight|-|-|U-DEC||3|5:00
W|Eric Nolan|Court McGee|1-0|121-98|0-0|0-0|Welterweight|-|-|KO/TKO|Punch|3|3:26
`,
  },
]
