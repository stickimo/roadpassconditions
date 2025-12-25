const PASSES = [
  {
    id: 'monarch',
    name: 'Monarch Pass',
    route_label: 'US 50',
    elevation_ft: 11312,
    lat: 38.4966636,
    lon: -106.3255801,
    state: 'CO',
    aliases: ['monarch-pass'],
  },

  {
    id: 'eisenhower',
    name: 'Eisenhower/Johnson Tunnel',
    route_label: 'I-70',
    elevation_ft: 11158,
    lat: 39.679,
    lon: -105.9249,
    state: 'CO',
    aliases: ['eisenhower-tunnel', 'johnson-tunnel', 'ejmt'],
  },
  
  {
    id: 'vail',
    name: 'Vail Pass',
    route_label: 'I-70',
    elevation_ft: 10666,
    lat: 39.5305,
    lon: -106.2172,
    state: 'CO',
    aliases: ['vail-pass'],
  },
  
  {
    id: 'loveland',
    name: 'Loveland Pass',
    route_label: 'US 6',
    elevation_ft: 11992,
    lat: 39.6636,
    lon: -105.8792,
    state: 'CO',
    aliases: ['loveland-pass'],
  },
  
  {
    id: 'berthoud',
    name: 'Berthoud Pass',
    route_label: 'US 40',
    elevation_ft: 11315,
    lat: 39.7983,
    lon: -105.7778,
    state: 'CO',
    aliases: ['berthoud-pass'],
  },
  
  {
    id: 'rabbit-ears',
    name: 'Rabbit Ears Pass',
    route_label: 'US 40',
    elevation_ft: 9426,
    lat: 40.3847,
    lon: -106.6117,
    state: 'CO',
    aliases: ['rabbit-ears-pass'],
  },
  
  {
    id: 'monarch',
    name: 'Monarch Pass',
    route_label: 'US 50',
    elevation_ft: 11312,
    lat: 38.4967,
    lon: -106.3256,
    state: 'CO',
    aliases: ['monarch-pass'],
  },
  
  {
    id: 'wolf-creek',
    name: 'Wolf Creek Pass',
    route_label: 'US 160',
    elevation_ft: 10857,
    lat: 37.4832,
    lon: -106.8021,
    state: 'CO',
    aliases: ['wolf-creek-pass'],
  },
  
  {
    id: 'red-mountain',
    name: 'Red Mountain Pass',
    route_label: 'US 550',
    elevation_ft: 11018,
    lat: 37.8989,
    lon: -107.712,
    state: 'CO',
    aliases: ['red-mountain-pass', 'million-dollar-highway'],
  },
  
  {
    id: 'molas',
    name: 'Molas Pass',
    route_label: 'US 550',
    elevation_ft: 10910,
    lat: 37.7378,
    lon: -107.6981,
    state: 'CO',
    aliases: ['molas-pass', 'million-dollar-highway'],
  },
  {
    id: 'hoosier',
    name: 'Hoosier Pass',
    route_label: 'CO 9',
    elevation_ft: 11541,
    lat: 39.3617,
    lon: -106.0625,
    state: 'CO',
    aliases: ['hoosier-pass'],
  },
  
  {
    id: 'fremont',
    name: 'Fremont Pass',
    route_label: 'CO 91',
    elevation_ft: 11318,
    lat: 39.3664,
    lon: -106.1867,
    state: 'CO',
    aliases: ['fremont-pass', 'climax-pass'],
  },
  
  {
    id: 'kenosha',
    name: 'Kenosha Pass',
    route_label: 'US 285',
    elevation_ft: 10001,
    lat: 39.4128,
    lon: -105.7575,
    state: 'CO',
    aliases: ['kenosha-pass'],
  },
  
  {
    id: 'wilkerson',
    name: 'Wilkerson Pass',
    route_label: 'US 24',
    elevation_ft: 9507,
    lat: 39.038,
    lon: -105.5256,
    state: 'CO',
    aliases: ['wilkerson-pass'],
  },
  
  {
    id: 'ute',
    name: 'Ute Pass',
    route_label: 'US 24',
    elevation_ft: 9165,
    lat: 38.9142,
    lon: -105.1275,
    state: 'CO',
    aliases: ['ute-pass'],
  },
  
  {
    id: 'independence',
    name: 'Independence Pass',
    route_label: 'CO 82',
    elevation_ft: 12095,
    lat: 39.1089,
    lon: -106.5639,
    state: 'CO',
    aliases: ['independence-pass', 'hunter-pass'],
  },
  
  {
    id: 'trail-ridge',
    name: 'Trail Ridge Road',
    route_label: 'US 34',
    elevation_ft: 12183,
    lat: 40.4284,
    lon: -105.759,
    state: 'CO',
    aliases: ['trail-ridge-road', 'rmnp-high-point'],
  },
  
  {
    id: 'coal-bank',
    name: 'Coal Bank Pass',
    route_label: 'US 550',
    elevation_ft: 10640,
    lat: 37.7006,
    lon: -107.777,
    state: 'CO',
    aliases: ['coal-bank-pass', 'million-dollar-highway'],
  },
  
  {
    id: 'cameron',
    name: 'Cameron Pass',
    route_label: 'CO 14',
    elevation_ft: 10276,
    lat: 40.5208,
    lon: -105.8925,
    state: 'CO',
    aliases: ['cameron-pass', 'poudre-canyon-highway'],
  },
  
  {
    id: 'lizard-head',
    name: 'Lizard Head Pass',
    route_label: 'CO 145',
    elevation_ft: 10222,
    lat: 37.8111,
    lon: -107.9062,
    state: 'CO',
    aliases: ['lizard-head-pass'],
  },
  {
    id: 'tennessee',
    name: 'Tennessee Pass',
    route_label: 'US 24',
    elevation_ft: 10424,
    lat: 39.3621,
    lon: -106.3104,
    state: 'CO',
    aliases: ['tennessee-pass'],
  },
  
  {
    id: 'mcclure',
    name: 'McClure Pass',
    route_label: 'CO 133',
    elevation_ft: 8755,
    lat: 39.1292,
    lon: -107.2861,
    state: 'CO',
    aliases: ['mcclure-pass'],
  },
  
  {
    id: 'la-veta',
    name: 'La Veta Pass',
    route_label: 'US 160',
    elevation_ft: 9413,
    lat: 37.6256,
    lon: -105.2003,
    state: 'CO',
    aliases: ['la-veta-pass', 'north-la-veta-pass'],
  },
  
  {
    id: 'raton',
    name: 'Raton Pass',
    route_label: 'I-25',
    elevation_ft: 7834,
    lat: 36.9922,
    lon: -104.4853,
    state: 'CO',
    aliases: ['raton-pass', 'us-85'],
  },
  
  {
    id: 'gore',
    name: 'Gore Pass',
    route_label: 'CO 134',
    elevation_ft: 9527,
    lat: 40.0758,
    lon: -106.5609,
    state: 'CO',
    aliases: ['gore-pass'],
  },
  
  {
    id: 'poncha',
    name: 'Poncha Pass',
    route_label: 'US 285',
    elevation_ft: 9010,
    lat: 38.4225,
    lon: -106.0847,
    state: 'CO',
    aliases: ['poncha-pass'],
  },
  
  {
    id: 'donner',
    name: 'Donner Summit',
    route_label: 'I-80',
    elevation_ft: 7239,
    lat: 39.3391,
    lon: -120.3439,
    state: 'CA',
    aliases: ['donner-summit', 'donner-pass'],
  },
  
  {
    id: 'tejon',
    name: 'Tejon Pass',
    route_label: 'I-5',
    elevation_ft: 4144,
    lat: 34.8147,
    lon: -118.8839,
    state: 'CA',
    aliases: ['tejon-pass', 'the-grapevine'],
  },
  
  {
    id: 'echo',
    name: 'Echo Summit',
    route_label: 'US 50',
    elevation_ft: 7377,
    lat: 38.8129,
    lon: -120.0302,
    state: 'CA',
    aliases: ['echo-summit', 'johnson-pass'],
  },
  
  {
    id: 'cajon',
    name: 'Cajon Pass',
    route_label: 'I-15',
    elevation_ft: 3776,
    lat: 34.3483,
    lon: -117.445,
    state: 'CA',
    aliases: ['cajon-pass', 'sr-138'],
  },
  {
    id: 'tioga',
    name: 'Tioga Pass',
    route_label: 'SR 120',
    elevation_ft: 9943,
    lat: 37.911,
    lon: -119.2571,
    state: 'CA',
    aliases: ['tioga-pass', 'yosemite-east-gate'],
  },
  
  {
    id: 'sonora',
    name: 'Sonora Pass',
    route_label: 'SR 108',
    elevation_ft: 9624,
    lat: 38.3283,
    lon: -119.6371,
    state: 'CA',
    aliases: ['sonora-pass'],
  },
  
  {
    id: 'tehachapi',
    name: 'Tehachapi Pass',
    route_label: 'SR 58',
    elevation_ft: 4064,
    lat: 35.1025,
    lon: -118.2878,
    state: 'CA',
    aliases: ['tehachapi-pass'],
  },
  
  {
    id: 'carson',
    name: 'Carson Pass',
    route_label: 'SR 88',
    elevation_ft: 8574,
    lat: 38.6938,
    lon: -119.9916,
    state: 'CA',
    aliases: ['carson-pass'],
  },
  
  {
    id: 'san-marcos',
    name: 'San Marcos Pass',
    route_label: 'SR 154',
    elevation_ft: 2225,
    lat: 34.4983,
    lon: -119.8243,
    state: 'CA',
    aliases: ['san-marcos-pass'],
  },
  
  {
    id: 'cuesta',
    name: 'Cuesta Grade',
    route_label: 'US 101',
    elevation_ft: 1522,
    lat: 35.3522,
    lon: -120.6319,
    state: 'CA',
    aliases: ['cuesta-grade', 'cuesta-pass'],
  },
  
  {
    id: 'sepulveda',
    name: 'Sepulveda Pass',
    route_label: 'I-405',
    elevation_ft: 1130,
    lat: 34.1167,
    lon: -118.4772,
    state: 'CA',
    aliases: ['sepulveda-pass', 'the-405-pass'],
  },
  
  {
    id: 'siskiyou',
    name: 'Siskiyou Summit',
    route_label: 'I-5',
    elevation_ft: 4310,
    lat: 42.0535,
    lon: -122.6072,
    state: 'CA',
    aliases: ['siskiyou-summit', 'siskiyou-pass'],
  },
  
  {
    id: 'pacheco',
    name: 'Pacheco Pass',
    route_label: 'SR 152',
    elevation_ft: 1368,
    lat: 37.0674,
    lon: -121.2227,
    state: 'CA',
    aliases: ['pacheco-pass'],
  },
  
  {
    id: 'walker',
    name: 'Walker Pass',
    route_label: 'SR 178',
    elevation_ft: 5250,
    lat: 35.6631,
    lon: -118.0264,
    state: 'CA',
    aliases: ['walker-pass'],
  },
  {
    id: 'ebbetts',
    name: 'Ebbetts Pass',
    route_label: 'SR 4',
    elevation_ft: 8730,
    lat: 38.5446,
    lon: -119.8118,
    state: 'CA',
    aliases: ['ebbetts-pass'],
  },
  
  {
    id: 'fredonyer',
    name: 'Fredonyer Pass',
    route_label: 'SR 36',
    elevation_ft: 5751,
    lat: 40.3644,
    lon: -120.8669,
    state: 'CA',
    aliases: ['fredonyer-pass'],
  },
  
  {
    id: 'yuba',
    name: 'Yuba Pass',
    route_label: 'SR 49',
    elevation_ft: 6701,
    lat: 39.6177,
    lon: -120.5891,
    state: 'CA',
    aliases: ['yuba-pass'],
  },
  
  {
    id: 'luther',
    name: 'Luther Pass',
    route_label: 'SR 89',
    elevation_ft: 7740,
    lat: 38.7869,
    lon: -119.9469,
    state: 'CA',
    aliases: ['luther-pass'],
  },
  
  {
    id: 'sherwin',
    name: 'Sherwin Summit',
    route_label: 'US 395',
    elevation_ft: 7000,
    lat: 37.5619,
    lon: -118.6635,
    state: 'CA',
    aliases: ['sherwin-summit'],
  },
  
  {
    id: 'newhall',
    name: 'Newhall Pass',
    route_label: 'SR 14',
    elevation_ft: 1750,
    lat: 34.3547,
    lon: -118.5209,
    state: 'CA',
    aliases: ['newhall-pass', 'fremont-pass'],
  },
  
  {
    id: 'snoqualmie',
    name: 'Snoqualmie Pass',
    route_label: 'I-90',
    elevation_ft: 3022,
    lat: 47.4243,
    lon: -121.4132,
    state: 'WA',
    aliases: ['snoqualmie-pass', 'hyak'],
  },
  
  {
    id: 'stevens',
    name: 'Stevens Pass',
    route_label: 'US 2',
    elevation_ft: 4061,
    lat: 47.7451,
    lon: -121.0881,
    state: 'WA',
    aliases: ['stevens-pass'],
  },
  
  {
    id: 'white',
    name: 'White Pass',
    route_label: 'US 12',
    elevation_ft: 4501,
    lat: 46.6385,
    lon: -121.3917,
    state: 'WA',
    aliases: ['white-pass'],
  },
  
  {
    id: 'blewett',
    name: 'Blewett Pass',
    route_label: 'US 97',
    elevation_ft: 4124,
    lat: 47.334,
    lon: -120.5786,
    state: 'WA',
    aliases: ['blewett-pass', 'swauk-pass'],
  },
  
  {
    id: 'satus',
    name: 'Satus Pass',
    route_label: 'US 97',
    elevation_ft: 3107,
    lat: 45.9866,
    lon: -120.6483,
    state: 'WA',
    aliases: ['satus-pass'],
  },
  
  {
    id: 'chinook',
    name: 'Chinook Pass',
    route_label: 'SR 410',
    elevation_ft: 5430,
    lat: 46.8717,
    lon: -121.5155,
    state: 'WA',
    aliases: ['chinook-pass', 'stephen-mather-parkway'],
  },
  
  {
    id: 'cayuse',
    name: 'Cayuse Pass',
    route_label: 'SR 123',
    elevation_ft: 4675,
    lat: 46.8671,
    lon: -121.5387,
    state: 'WA',
    aliases: ['cayuse-pass'],
  },
  
  {
    id: 'sherman-wa',
    name: 'Sherman Pass',
    route_label: 'SR 20',
    elevation_ft: 5575,
    lat: 48.6067,
    lon: -118.4719,
    state: 'WA',
    aliases: ['sherman-pass'],
  },
  
  {
    id: 'washington',
    name: 'Washington Pass',
    route_label: 'SR 20',
    elevation_ft: 5477,
    lat: 48.5262,
    lon: -120.6477,
    state: 'WA',
    aliases: ['washington-pass', 'north-cascades-highway'],
  },
  
  {
    id: 'rainy',
    name: 'Rainy Pass',
    route_label: 'SR 20',
    elevation_ft: 4875,
    lat: 48.5186,
    lon: -120.7351,
    state: 'WA',
    aliases: ['rainy-pass', 'north-cascades-highway'],
  },
  
  {
    id: 'loup-loup',
    name: 'Loup Loup Pass',
    route_label: 'SR 20',
    elevation_ft: 4020,
    lat: 48.3888,
    lon: -119.9125,
    state: 'WA',
    aliases: ['loup-loup-pass'],
  },
  
  {
    id: 'wauconda',
    name: 'Wauconda Pass',
    route_label: 'SR 20',
    elevation_ft: 4310,
    lat: 48.7243,
    lon: -118.9482,
    state: 'WA',
    aliases: ['wauconda-pass'],
  },
  
  {
    id: 'disautel',
    name: 'Disautel Pass',
    route_label: 'SR 155',
    elevation_ft: 3252,
    lat: 48.2425,
    lon: -119.1672,
    state: 'WA',
    aliases: ['disautel-pass'],
  },
  
  {
    id: 'manastash',
    name: 'Manastash Ridge',
    route_label: 'I-82',
    elevation_ft: 2675,
    lat: 46.855,
    lon: -120.443,
    state: 'WA',
    aliases: ['manastash-ridge', 'umtanum-ridge'],
  },
  
  {
    id: 'mt-baker',
    name: 'Mt. Baker Highway',
    route_label: 'SR 542',
    elevation_ft: 5140,
    lat: 48.8573,
    lon: -121.6705,
    state: 'WA',
    aliases: ['mt-baker-highway', 'artist-point'],
  },
  
  {
    id: 'siskiyou-or',
    name: 'Siskiyou Summit',
    route_label: 'I-5',
    elevation_ft: 4310,
    lat: 42.0535,
    lon: -122.6072,
    state: 'OR',
    aliases: ['siskiyou-summit', 'siskiyou-pass'],
  },
  
  {
    id: 'government-camp',
    name: 'Government Camp',
    route_label: 'US 26',
    elevation_ft: 3891,
    lat: 45.3031,
    lon: -121.7513,
    state: 'OR',
    aliases: ['government-camp', 'mt-hood-pass'],
  },
  
  {
    id: 'santiam',
    name: 'Santiam Pass',
    route_label: 'US 20',
    elevation_ft: 4817,
    lat: 44.4021,
    lon: -121.8514,
    state: 'OR',
    aliases: ['santiam-pass'],
  },
  
  {
    id: 'meacham',
    name: 'Meacham Pass',
    route_label: 'I-84',
    elevation_ft: 3920,
    lat: 45.5133,
    lon: -118.4239,
    state: 'OR',
    aliases: ['meacham-pass', 'blue-mountain-summit'],
  },
  
  {
    id: 'willamette',
    name: 'Willamette Pass',
    route_label: 'OR 58',
    elevation_ft: 5128,
    lat: 43.6004,
    lon: -122.0381,
    state: 'OR',
    aliases: ['willamette-pass'],
  },
  
  {
    id: 'deadman',
    name: 'Deadman Pass',
    route_label: 'I-84',
    elevation_ft: 3619,
    lat: 45.6264,
    lon: -118.5283,
    state: 'OR',
    aliases: ['deadman-pass', 'emigrant-hill'],
  },
  
  {
    id: 'cabbage',
    name: 'Cabbage Hill',
    route_label: 'I-84',
    elevation_ft: 3300,
    lat: 45.5947,
    lon: -118.5833,
    state: 'OR',
    aliases: ['cabbage-hill', 'the-cabbage'],
  },
  
  {
    id: 'wapinitia',
    name: 'Wapinitia Pass',
    route_label: 'US 26',
    elevation_ft: 3944,
    lat: 45.163,
    lon: -121.705,
    state: 'OR',
    aliases: ['wapinitia-pass'],
  },
  
  {
    id: 'mckenzie',
    name: 'McKenzie Pass',
    route_label: 'OR 242',
    elevation_ft: 5325,
    lat: 44.2609,
    lon: -121.8106,
    state: 'OR',
    aliases: ['mckenzie-pass'],
  },
  
  {
    id: 'sexton',
    name: 'Sexton Mountain',
    route_label: 'I-5',
    elevation_ft: 1956,
    lat: 42.5936,
    lon: -123.3328,
    state: 'OR',
    aliases: ['sexton-mountain', 'sexton-pass'],
  },
  
  {
    id: 'parleys',
    name: 'Parleys Summit',
    route_label: 'I-80',
    elevation_ft: 7120,
    lat: 40.76,
    lon: -111.63,
    state: 'UT',
    aliases: ['parleys-summit', 'parleys-canyon'],
  },
  
  {
    id: 'soldier',
    name: 'Soldier Summit',
    route_label: 'US 6',
    elevation_ft: 7477,
    lat: 39.9144,
    lon: -111.0267,
    state: 'UT',
    aliases: ['soldier-summit'],
  },
  
  {
    id: 'sardine',
    name: 'Sardine Canyon',
    route_label: 'US 89',
    elevation_ft: 5910,
    lat: 41.5272,
    lon: -111.9702,
    state: 'UT',
    aliases: ['sardine-canyon', 'wellsville-canyon'],
  },
  
  {
    id: 'daniels',
    name: "Daniel's Summit",
    route_label: 'US 40',
    elevation_ft: 8020,
    lat: 40.2974,
    lon: -111.0247,
    state: 'UT',
    aliases: ['daniels-summit'],
  },
  
  {
    id: 'logan',
    name: 'Logan Canyon',
    route_label: 'US 89',
    elevation_ft: 7800,
    lat: 41.8902,
    lon: -111.6057,
    state: 'UT',
    aliases: ['logan-canyon', 'bear-lake-summit'],
  },
  
  {
    id: 'wolf-creek-ut',
    name: 'Wolf Creek Summit',
    route_label: 'SR 35',
    elevation_ft: 9480,
    lat: 40.4852,
    lon: -110.9981,
    state: 'UT',
    aliases: ['wolf-creek-summit'],
  },
  
  {
    id: 'dixie',
    name: 'Dixie Summit',
    route_label: 'SR 14',
    elevation_ft: 9917,
    lat: 37.6436,
    lon: -112.4419,
    state: 'UT',
    aliases: ['dixie-summit', 'cedar-breaks'],
  },
  
  {
    id: 'mirror-lake',
    name: 'Mirror Lake Summit',
    route_label: 'SR 150',
    elevation_ft: 10715,
    lat: 40.7186,
    lon: -110.8756,
    state: 'UT',
    aliases: ['mirror-lake-summit', 'bald-mountain-pass'],
  },
  
  {
    id: 'guardsman',
    name: 'Guardsman Pass',
    route_label: 'SR 190',
    elevation_ft: 9717,
    lat: 40.6074,
    lon: -111.5367,
    state: 'UT',
    aliases: ['guardsman-pass'],
  },
  
  {
    id: 'teton',
    name: 'Teton Pass',
    route_label: 'WY 22',
    elevation_ft: 8431,
    lat: 43.4967,
    lon: -110.9553,
    state: 'WY',
    aliases: ['teton-pass', 'wilson-hill'],
  },
  
  {
    id: 'togwotee',
    name: 'Togwotee Pass',
    route_label: 'US 26',
    elevation_ft: 9658,
    lat: 43.7533,
    lon: -110.0683,
    state: 'WY',
    aliases: ['togwotee-pass'],
  },
  
  {
    id: 'beartooth',
    name: 'Beartooth Pass',
    route_label: 'US 212',
    elevation_ft: 10947,
    lat: 44.9702,
    lon: -109.4607,
    state: 'WY',
    aliases: ['beartooth-pass', 'beartooth-highway'],
  },
  
  {
    id: 'sherman-wy',
    name: 'Sherman Hill',
    route_label: 'I-80',
    elevation_ft: 8640,
    lat: 41.2361,
    lon: -105.435,
    state: 'WY',
    aliases: ['sherman-hill', 'london-summit'],
  },
  
  {
    id: 'snowy-range',
    name: 'Snowy Range Pass',
    route_label: 'WY 130',
    elevation_ft: 10847,
    lat: 41.34,
    lon: -106.31,
    state: 'WY',
    aliases: ['snowy-range-pass', 'libby-flats'],
  },
  
  {
    id: 'south',
    name: 'South Pass',
    route_label: 'WY 28',
    elevation_ft: 7412,
    lat: 42.3522,
    lon: -108.8911,
    state: 'WY',
    aliases: ['south-pass'],
  },
  
  {
    id: 'powder-river',
    name: 'Powder River Pass',
    route_label: 'US 16',
    elevation_ft: 9666,
    lat: 44.1378,
    lon: -106.9536,
    state: 'WY',
    aliases: ['powder-river-pass', 'big-horns-pass'],
  },
  
  {
    id: 'granite',
    name: 'Granite Pass',
    route_label: 'US 14',
    elevation_ft: 9033,
    lat: 44.6433,
    lon: -107.4589,
    state: 'WY',
    aliases: ['granite-pass'],
  },
  
  {
    id: 'salt-river',
    name: 'Salt River Pass',
    route_label: 'US 89',
    elevation_ft: 7610,
    lat: 42.4433,
    lon: -110.8711,
    state: 'WY',
    aliases: ['salt-river-pass'],
  },
  
  {
    id: 'sundance',
    name: 'Sundance Pass',
    route_label: 'I-90',
    elevation_ft: 4960,
    lat: 44.401,
    lon: -104.417,
    state: 'WY',
    aliases: ['sundance-pass'],
  },
  
  {
    id: 'kancamagus',
    name: 'Kancamagus Pass',
    route_label: 'NH 112',
    elevation_ft: 2855,
    lat: 44.0542,
    lon: -71.5147,
    state: 'NH',
    aliases: ['kancamagus-pass', 'the-kanc'],
  },
  
  {
    id: 'franconia',
    name: 'Franconia Notch',
    route_label: 'I-93',
    elevation_ft: 2046,
    lat: 44.15,
    lon: -71.6833,
    state: 'NH',
    aliases: ['franconia-notch', 'the-notch'],
  },
  
  {
    id: 'pinkham',
    name: 'Pinkham Notch',
    route_label: 'NH 16',
    elevation_ft: 2032,
    lat: 44.2625,
    lon: -71.2536,
    state: 'NH',
    aliases: ['pinkham-notch'],
  },
  
  {
    id: 'crawford',
    name: 'Crawford Notch',
    route_label: 'US 302',
    elevation_ft: 2026,
    lat: 44.2181,
    lon: -71.4081,
    state: 'NH',
    aliases: ['crawford-notch'],
  },
  
  {
    id: 'hunter-mountain',
    name: 'Hunter Mountain Gap',
    route_label: 'NY 23A',
    elevation_ft: 2210,
    lat: 42.2139,
    lon: -74.2269,
    state: 'NY',
    aliases: ['hunter-mountain-gap', 'stony-clove-notch'],
  },
  
  {
    id: 'smugglers',
    name: "Smugglers' Notch",
    route_label: 'VT 108',
    elevation_ft: 2170,
    lat: 44.5558,
    lon: -72.7933,
    state: 'VT',
    aliases: ['smugglers-notch', 'the-smuggs'],
  },
  
  {
    id: 'sherburne',
    name: 'Sherburne Pass',
    route_label: 'US 4',
    elevation_ft: 2180,
    lat: 43.6644,
    lon: -72.8336,
    state: 'VT',
    aliases: ['sherburne-pass', 'killington-pass'],
  },
  
  {
    id: 'atigun',
    name: 'Atigun Pass',
    route_label: 'AK 11',
    elevation_ft: 4739,
    lat: 68.1294,
    lon: -149.4758,
    state: 'AK',
    aliases: ['atigun-pass', 'brooks-range-pass'],
  },
  
  {
    id: 'logan-mt',
    name: 'Logan Pass',
    route_label: 'US 2',
    elevation_ft: 6646,
    lat: 48.6966,
    lon: -113.7179,
    state: 'MT',
    aliases: ['logan-pass', 'going-to-the-sun-road'],
  },
  
  {
    id: 'marias',
    name: 'Marias Pass',
    route_label: 'US 2',
    elevation_ft: 5213,
    lat: 48.3183,
    lon: -113.3552,
    state: 'MT',
    aliases: ['marias-pass', 'roosevelt-memorial'],
  },
  
  {
    id: 'mauna-kea',
    name: 'Mauna Kea Road',
    route_label: 'Access Rd',
    elevation_ft: 13796,
    lat: 19.8206,
    lon: -155.4681,
    state: 'HI',
    aliases: ['mauna-kea-road', 'summit-road'],
  },
  
  {
    id: 'altamont',
    name: 'Altamont Pass',
    route_label: 'I-580',
    elevation_ft: 741,
    lat: 37.7458,
    lon: -121.6583,
    state: 'CA',
    aliases: ['altamont-pass', 'livermore-pass'],
  },
  
  {
    id: 'pacheco-historic',
    name: 'Pacheco Pass',
    route_label: 'SR 152',
    elevation_ft: 1368,
    lat: 37.0674,
    lon: -121.2227,
    state: 'CA',
    aliases: ['pacheco-pass', 'blood-alley'],
  },
  
  {
    id: 'mullan',
    name: 'Mullan Pass',
    route_label: 'US 12',
    elevation_ft: 5902,
    lat: 46.6369,
    lon: -112.3089,
    state: 'MT',
    aliases: ['mullan-pass'],
  },
  
  {
    id: 'monida',
    name: 'Monida Pass',
    route_label: 'I-15',
    elevation_ft: 6820,
    lat: 44.5594,
    lon: -112.3108,
    state: 'MT',
    aliases: ['monida-pass'],
  },
  
  {
    id: 'lookout',
    name: 'Lookout Pass',
    route_label: 'I-90',
    elevation_ft: 4710,
    lat: 47.4561,
    lon: -115.6967,
    state: 'MT',
    aliases: ['lookout-pass', 'st-regis-pass'],
  },
  
  {
    id: 'lolo',
    name: 'Lolo Pass',
    route_label: 'US 12',
    elevation_ft: 5233,
    lat: 46.6358,
    lon: -114.5786,
    state: 'MT',
    aliases: ['lolo-pass', 'lewis-and-clark-pass'],
  },
  
  
  
];

export function getPasses() {
  return PASSES.slice();
}

export function getPrimaryPass() {
  return PASSES[0];
}

export function getPassById(id) {
  if (!id) return null;
  const normalized = String(id).trim().toLowerCase();
  return PASSES.find((pass) => {
    if (pass.id.toLowerCase() === normalized) return true;
    return (pass.aliases || []).some((alias) => alias.toLowerCase() === normalized);
  }) || null;
}

export function getStates() {
  const states = PASSES.map((pass) => pass.state).filter(Boolean);
  return Array.from(new Set(states)).sort();
}

export function getPassesByState(state) {
  if (!state) return [];
  const normalized = String(state).trim().toUpperCase();
  return PASSES.filter((pass) => pass.state === normalized).sort((a, b) => a.name.localeCompare(b.name));
}

const STATE_LABELS = {
  AK: 'Alaska',
  CA: 'California',
  CO: 'Colorado',
  HI: 'Hawaii',
  ID: 'Idaho',
  MT: 'Montana',
  NH: 'New Hampshire',
  NY: 'New York',
  OR: 'Oregon',
  UT: 'Utah',
  VT: 'Vermont',
  WA: 'Washington',
  WY: 'Wyoming',
};

export function getStateLabel(state) {
  if (!state) return '';
  const normalized = String(state).trim().toUpperCase();
  return STATE_LABELS[normalized] || normalized;
}
