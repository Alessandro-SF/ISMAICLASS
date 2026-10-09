// Fighter bios and photos transcribed from official ufc.com athlete pages (retrieved Oct 2026).
// Line: name (as on ufcstats)|nickname|place of birth|country|photo URL (ufc.com og:image)|ufc.com slug|most recent fight on ufc.com (opponent;YYYY-MM-DD;result;method)
// Empty field = not listed on ufc.com. Result/method are filled only where verified in Wikipedia "2026 in UFC" title-fight table.
export const FIGHTER_BIOS_RAW = `
Islam Makhachev||Dagestan, Russia|Russia|https://ufc.com/images/2025-01/7/MAKHACHEV_ISLAM_BELT_01-18.png|islam-makhachev|
Ian Machado Garry|The Future|Dublin, Ireland|Ireland|https://ufc.com/images/2026-08/MACHADO_GARRY_IAN_08-15.png|ian-machado-garry|
Alexander Volkanovski|The Great|Wollongong, Australia|Australia|https://ufc.com/images/2026-01/VOLKANOVSKI_ALEXANDER_BELT_01-31.png|alexander-volkanovski|Diego Lopes;2026-01-31;W;Decision (unanimous), R5 5:00 — UFC 325
Quillan Salkilld||Pinjarra, Australia|Australia|https://ufc.com/images/2026-08/SALKILLD_QUILLAN_08-08.png|quillan-salkilld|
Mateusz Gamrot|Gamer|Bielsko-Biała, Poland|Poland|https://ufc.com/images/2026-08/GAMROT_MATEUSZ_08-08.png|mateusz-gamrot|
Diego Ferreira||Terra Nova, Brazil|Brazil|https://ufc.com/images/2026-08/FERREIRA_DIEGO_08-08.png|diego-ferreira|
Billy Quarantillo||Buffalo, United States|United States|https://ufc.com/images/2026-08/QUARANTILLO_BILLY_08-08.png|billy-quarantillo|
Mackenzie Dern||United States|United States|https://ufc.com/images/2026-08/DERN_MACKENZIE_BELT_08-15.png|mackenzie-dern|
Gillian Robertson|The Savage|Niagara Falls, Canada|Canada|https://ufc.com/images/2026-08/ROBERTSON_GILLIAN_08-15.png|gillian-robertson|
Gregory Rodrigues|Robocop|Brazil|Brazil|https://ufc.com/images/2026-08/RODRIGUES_GREGORY_08-22.png|gregory-rodrigues|
Anthony Hernandez|Fluffy|Oakland, United States|United States|https://ufc.com/images/2026-08/HERNANDEZ_ANTHONY_08-22.png|anthony-hernandez|
Vitor Petrino||Santa Luzia, Brazil|Brazil|https://ufc.com/images/2026-08/PETRINO_VITOR_08-22.png|vitor-petrino|
Serghei Spivac|Polar Bear|Moldova|Moldova|https://ufc.com/images/2026-08/SPIVAC_SERGHEI_08-22.png|serghei-spivac|
Song Yadong|Kung Fu Kid|Heilongjiang, China|China|https://ufc.com/images/2026-08/YADONG_SONG_08-29.png|song-yadong|
Umar Nurmagomedov||Republic of Dagestan, Russia|Russia|https://ufc.com/images/2026-08/NURMAGOMEDOV_UMAR_08-29.png|umar-nurmagomedov|
Denise Gomes|Dee|Santana do Livramento, Brazil|Brazil|https://ufc.com/images/2026-08/GOMES_DENISE_08-29.png|denise-gomes|
Yan Xiaonan||Liaoning, China|China|https://ufc.com/images/2026-08/XIAONAN_YAN_08-29.png|yan-xiaonan|
Salahdine Parnasse|Lion of Atlas|Aubervilliers, France|France|https://ufc.com/images/2026-09/PARNASSE_SALAHDINE_09-05.png|salahdine-parnasse|
Dan Hooker|The Hangman|Auckland, New Zealand|New Zealand|https://ufc.com/images/2026-09/HOOKER_DAN_09-05.png|dan-hooker|
Axel Sola||Nice, France|France|https://ufc.com/images/2026-09/SOLA_AXEL_09-05.png|axel-sola|
Fares Ziam|The Smile Killer|Vénissieux, France|France|https://ufc.com/images/2026-09/ZIAM_FARES_09-05.png|fares-ziam|
Jean Silva|Lord|Foz do Iguaçu, Brazil|Brazil|https://ufc.com/images/2026-09/SILVA_JEAN_09-12.png|jean-silva|
Jose Delgado||Yuma, United States|United States|https://ufc.com/images/2026-09/DELGADO_JOSE_MIGUEL_09-12.png|jose-miguel-delgado|
Brandon Moreno|The Assassin Baby|Tijuana, Mexico|Mexico|https://ufc.com/images/2026-09/MORENO_BRANDON_09-12.png|brandon-moreno|
Joseph Morales|Bopo|Clovis, United States|United States|https://ufc.com/images/2026-09/MORALES_JOSEPH_09-12.png|joseph-morales|
Joshua Van|The Fearless|Hakha, Myanmar|Myanmar|https://ufc.com/images/2026-09/VAN_JOSHUA_09-19.png|joshua-van|
Alexandre Pantoja|The Cannibal|Brazil|Brazil|https://ufc.com/images/2026-09/PANTOJA_ALEXANDRE_09-19.png|alexandre-pantoja|
Arman Tsarukyan|Ahalkalakets|Georgia|Georgia|https://ufc.com/images/2026-09/TSARUKYAN_ARMAN_09-19.png|arman-tsarukyan|
Mauricio Ruffy||State of São Paulo, Brazil|Brazil|https://ufc.com/images/2026-09/RUFFY_MAURICIO_09-19.png|mauricio-ruffy|
Raul Rosas Jr.|El Niño Problema|Clovis, United States|United States|https://ufc.com/images/2026-09/ROSAS_JR_RAUL_09-26.png|raul-rosas-jr|
Raoni Barcelos||State of Rio de Janeiro, Brazil|Brazil|https://ufc.com/images/2026-09/BARCELOS_RAONI_09-26.png|raoni-barcelos|
Ailin Perez|Fiona|Buenos Aires (CABA), Argentina|Argentina|https://ufc.com/images/2026-09/PEREZ_AILIN_09-26.png|ailin-perez|
Norma Dumont|The Immortal|Belo Horizonte, Brazil|Brazil|https://ufc.com/images/2026-09/DUMONT_NORMA_09-26.png|norma-dumont|
Natalia Silva||Timóteo, Brazil|Brazil|https://ufc.com/images/2026-10/SILVA_NATALIA_BELT.png|natalia-silva|
Wang Cong|The Joker|Liaoning, China|China|https://ufc.com/images/2026-10/CONG_WANG_10-03.png|wang-cong|
Payton Talbott||Las Vegas, United States|United States|https://ufc.com/images/2026-10/TALBOTT_PAYTON_10-03.png|payton-talbott|
Deiveson Figueiredo|Deus da Guerra|Soure, Brazil|Brazil|https://ufc.com/images/2026-10/FIGUEIREDO_DEIVESON_10-03.png|deiveson-figueiredo|
Brendan Allen|All In|Beaufort, United States|United States|https://ufc.com/images/2026-10/ALLEN_BRENDAN_10-10.png|brendan-allen|Edmen Shahbazyan;2026-06-06;;
Christian Leroy Duncan|CLD|United Kingdom|United Kingdom|https://ufc.com/images/2026-10/DUNCAN_CHRISTIAN_LEROY_10-10.png|christian-leroy-duncan|Jared Cannonier;2026-07-18;;
Matheus Camilo|Jaguar|Rio Branco, Brazil|Brazil|https://ufc.com/images/2026-10/CAMILO_MATHEUS_10-10.png|matheus-camilo|Nazim Sadykhov;2026-06-27;;
Jai Herbert|Black Country Banger|Wolverhampton, England|United Kingdom|https://ufc.com/images/2026-10/HERBERT_JAI_10-10.png|jai-herbert|Mandel Nallo;2026-04-18;;
Joaquin Buckley|New Mansa|United States|United States|https://ufc.com/images/2026-05/BUCKLEY_JOAQUIN_05-09.png|joaquin-buckley|Sean Brady;2026-05-09;;
Mike Malott|Proper|Cleveland, United States|United States|https://ufc.com/images/2026-04/MALOTT_MIKE_04-18.png|mike-malott|Gilbert Burns;2026-04-18;;
Erin Blanchfield|Cold Blooded|United States|United States|https://ufc.com/images/2025-11/BLANCHFIELD_ERIN_11-15.png|erin-blanchfield|Tracy Cortez;2025-11-15;;
Jasmine Jasudavicius||St. Catharines, Canada|Canada|https://ufc.com/images/2026-04/JASUDAVICIUS_JASMINE_04-18.png|jasmine-jasudavicius|Karine Silva;2026-04-18;;
Movsar Evloev||Ingushetia, Russia|Russia|https://ufc.com/images/2026-03/EVLOEV_MOVSAR_03-21.png|movsar-evloev|Lerone Murphy;2026-03-21;;
Petr Yan|No Mercy|Krasnoyarsk Krai, Russia|Russia|https://ufc.com/images/2025-12/YAN_PETR_BELT.png|petr-yan|Merab Dvalishvili;2025-12-06;;
Merab Dvalishvili|The Machine|Tbilisi, Georgia|Georgia|https://ufc.com/images/2024-09/DVALISHVILI_MERAB_CG_09-14.png|merab-dvalishvili|Petr Yan;2025-12-06;;
Renato Moicano||Brasília, Brazil|Brazil|https://ufc.com/images/2026-04/MOICANO_RENATO_04-04.png|renato-moicano|Chris Duncan;2026-04-04;;
Tom Nolan|Big Train|Australia|Australia|https://ufc.com/images/2026-06/NOLAN_TOM_06-06.png|tom-nolan|Fares Ziam;2026-06-06;;
Nick Klein|Blue Collar|Plymouth, United States|United States|https://ufc.com/images/2025-07/KLEIN_NICK_08-02.png|nick-klein|Andrey Pulyaev;2025-08-02;;
Gabriel Bonfim|Marretinha|Brasília, Brazil|Brazil|https://ufc.com/images/2026-06/BONFIM_GABRIEL_06-06.png|gabriel-bonfim|Belal Muhammad;2026-06-06;;
Sean Brady||Philadelphia, United States|United States|https://ufc.com/images/2026-05/BRADY_SEAN_05-09.png|sean-brady|Joaquin Buckley;2026-05-09;;
Tatiana Suarez||Bellflower, United States|United States|https://ufc.com/images/2026-04/SUAREZ_TATIANA_04-11.png|tatiana-suarez|Loopy Godinez;2026-04-11;;
Virna Jandiroba|Carcará|State of Bahia, Brazil|Brazil|https://ufc.com/images/2026-04/JANDIROBA_VIRNA_04-04.png|virna-jandiroba|Tabatha Ricci;2026-04-04;;
Ciryl Gane|Bon Gamin|La Roche-sur-Yon, France|France|https://ufc.com/images/2026-06/GANE_CIRYL_BELT_01-22.png|ciryl-gane|Alex Pereira;2026-06-14;W;TKO (punches), R2 1:27 — UFC Freedom 250
Josh Hokit||Bakersfield, United States|United States|https://ufc.com/images/2026-06/HOKIT_JOSH_06-14.png|josh-hokit|Derrick Lewis;2026-06-14;;
Kayla Harrison||Middletown, United States|United States|https://ufc.com/images/2025-06/HARRISON_KAYLA_BELTMOCK.png|kayla-harrison|Julianna Peña;2025-06-07;;
Amanda Nunes|The Lioness|Brazil|Brazil|https://ufc.com/images/2025-12/NUNES_AMANDA.png|amanda-nunes|Irene Aldana;2023-06-10;;
Jiri Prochazka||Hostěradice, Czechia|Czechia|https://ufc.com/images/2026-04/PROCHAZKA_JIRI_04-11.png|jiri-prochazka|Carlos Ulberg;2026-04-11;L;KO (punches), R1 3:45 — UFC 327
Navajo Stirling||Upper Hutt, New Zealand|New Zealand|https://ufc.com/images/2026-07/STIRLING_NAVAJO_08-01.png|navajo-stirling|Jan Blachowicz;2026-08-01;;
Aljamain Sterling|Funk Master|United States|United States|https://ufc.com/images/2026-04/STERLING_ALJAMAIN_04-25.png|aljamain-sterling|Youssef Zalal;2026-04-25;;
Kevin Vallejos|El Chino|Mar del Plata, Argentina|Argentina|https://ufc.com/images/2025-12/VALLEJOS_KEVIN_12-13.png|kevin-vallejos|Josh Emmett;2026-03-14;;
Charles Oliveira|Do Bronxs|State of São Paulo, Brazil|Brazil|https://ufc.com/images/2026-03/OLIVEIRA_CHARLES_BMFMOCK.png|charles-oliveira|Max Holloway;2026-03-07;;
Diego Lopes||Manaus, Brazil|Brazil|https://ufc.com/images/2026-06/LOPES_DIEGO_06-14.png|diego-lopes|Steve Garcia;2026-06-14;;
Sergei Pavlovich||Russia|Russia|https://ufc.com/images/2026-05/PAVLOVICH_SERGEI_05-30.png|sergei-pavlovich|Tallison Teixeira;2026-05-30;;
Alex Pereira|Poatan|São Bernardo do Campo, Brazil|Brazil|https://ufc.com/images/2025-10/PEREIRA_ALEX_10-04.png|alex-pereira|Ciryl Gane;2026-06-14;L;TKO (punches), R2 1:27 — UFC Freedom 250
`
