import { YouthEvent, PrayerBankEntry } from './types';

export const INITIAL_EVENTS: YouthEvent[] = [
  {
    id: 'evt-2026-10-02',
    title: 'Seara de Tineret: Identitate & Scop în Hristos',
    date: '2026-10-02',
    startTime: '18:00',
    location: 'Biserica Betel - Sala Tineret (Corp B)',
    theme: 'Cine ești când nu te vede nimeni?',
    biblePassage: 'Efeseni 2:1-10 & 1 Petru 2:9',
    status: 'published',
    isTemplate: false,
    moments: [
      {
        id: 'm-1',
        title: 'Warm-up / Întâmpinare',
        startTime: '18:00',
        endTime: '18:15',
        durationMinutes: 15,
        responsiblePerson: 'Andrei V. (Welcome) & Radu K. (Tehnic)',
        department: 'welcome',
        details: 'Preluarea participanților la ușă, ceai, cafea, gustări și muzică de fundal relaxantă. Verificare sunet, lumini și proiecție.',
        resources: ['Ceai, Cafea, Păroase/Biscuiți', 'Verificare sunet & microfoane', 'Playlist Fundal Spotify']
      },
      {
        id: 'm-2',
        title: 'Deschidere & Anunțuri',
        startTime: '18:15',
        endTime: '18:25',
        durationMinutes: 10,
        responsiblePerson: 'David M. & Elena S. (MC / Host)',
        department: 'ministry',
        details: 'Urare călduroasă de bun venit, introducerea temei serii, regula anonimatului la Q&A și anunțurile administrative (Tabăra de Toamnă, Reuniunea de rugăciune).',
        resources: ['Slide-uri Anunțuri PPT', 'Microfon Wireless MC']
      },
      {
        id: 'm-3',
        title: 'Joc / Activitate cu Tinerii',
        startTime: '18:25',
        endTime: '18:40',
        durationMinutes: 15,
        responsiblePerson: 'Matei C. (Coordonator Jocuri)',
        department: 'games',
        details: 'Joc interactiv de spart gheața pe echipe rapide: "Adevăr sau Mit Despre Identitate". Câștigătorii primesc vouchere la cafenea.',
        activityType: 'Icebreaker & Trivia Interactiv',
        materialsNeeded: ['Proiector & Slide Trivia', 'Cartonașe Roșu/Verde (60 bucăți)', 'Premii cafea'],
        resources: ['Trivia_Identitate_v1.pptx', 'Lista Echipamente Joc']
      },
      {
        id: 'm-4',
        title: 'Laudă și Închinare',
        startTime: '18:40',
        endTime: '19:10',
        durationMinutes: 30,
        responsiblePerson: 'Echipa Betel Worship (Lider: Marius Ionescu)',
        department: 'music',
        details: 'Bloc de închinare focalizat pe măreția și harul lui Dumnezeu. Trecere de la laudă plină de bucurie la închinare profundă.',
        resources: ['Prezentare Versuri Proiecție', 'Setlist Acorduri PDF', 'Ghid Audio MP3'],
        setlist: [
          {
            id: 'song-1',
            title: 'Cât de Mare ești (How Great Is Our God)',
            artist: 'Bethel / Chris Tomlin',
            key: 'G dur',
            tempo: '74 BPM',
            attachments: [
              { id: 'att-1', name: 'Acorduri Chitară/Pian', type: 'chords', url: '#' },
              { id: 'att-2', name: 'Partitură Voce', type: 'sheet', url: '#' }
            ]
          },
          {
            id: 'song-2',
            title: 'Nu e Nume mai Presus (What A Beautiful Name)',
            artist: 'Hillsong Worship',
            key: 'D dur',
            tempo: '68 BPM',
            attachments: [
              { id: 'att-3', name: 'Acorduri & Structură', type: 'chords', url: '#' },
              { id: 'att-4', name: 'Ghid Audio In-Ear', type: 'audio', url: '#' }
            ]
          },
          {
            id: 'song-3',
            title: 'Iubire Fără Limită (Reckless Love)',
            artist: 'Cory Asbury',
            key: 'F#m / A dur',
            tempo: '82 BPM',
            attachments: [
              { id: 'att-5', name: 'Acorduri & Bridge', type: 'chords', url: '#' }
            ]
          }
        ]
      },
      {
        id: 'm-5',
        title: 'Îndemn la Rugăciune',
        startTime: '19:10',
        endTime: '19:20',
        durationMinutes: 10,
        responsiblePerson: 'Pastor Asistent Dan R.',
        department: 'ministry',
        details: 'Moment de rugăciune pe perechi pentru licee, universități, profesori și motive personale de luptă spirituală.',
        prayerDirection: 'Rugăciune pe perechi: 1. Curaj de a trăi curat în licee/facultate; 2. Tineri care încă nu-L cunosc pe Hristos.',
        resources: ['Slide Motive Rugăciune', 'Muzică fundal claviatură']
      },
      {
        id: 'm-6',
        title: 'Mesajul Biblic de Bază',
        startTime: '19:20',
        endTime: '19:50',
        durationMinutes: 30,
        responsiblePerson: 'Predicator Invitat: Alex Todorescu',
        speakerName: 'Alex Todorescu',
        biblePassage: 'Efeseni 2:1-10',
        department: 'ministry',
        details: 'Mesaj biblic practic: Cum să trecem de la o credință de fațadă / rețele sociale la o identitate ancorată în harul lui Dumnezeu.',
        resources: ['Schiță Mesaj PDF', 'Prezentare Slide-uri Proiecție', 'Note Predicator']
      },
      {
        id: 'm-7',
        title: 'Discuții în Grupuri Mici (Breakout Groups)',
        startTime: '19:50',
        endTime: '20:15',
        durationMinutes: 25,
        responsiblePerson: '10 Lideri de Grup (Coordonator: Cristina M.)',
        department: 'ministry',
        details: 'Impartirea tinerilor pe 8-10 grupe mici de discuție. Fiecare lider accesează ghidul direct pe telefonul mobil.',
        breakoutQuestions: [
          'Care este diferența dintre cum te vezi tu însuți și cum te vede Dumnezeu în Efeseni 2:10?',
          'În ce domenii din viață simți cea mai mare presiune de a purta o "mască" în fața celorlalți?',
          'Ce pas concret poți face în această săptămână pentru a-ți întări identitatea în Hristos (rugăciune, citit Biblie, mărturisire)?',
          'Rugați-vă unii pentru alții timp de 5 minute pentru victorie în luptele personale.'
        ],
        resources: ['Ghid Discuție Mobil (Link / WhatsApp)', 'Listă Repartizare Grupe']
      }
    ],
    team: [
      {
        id: 't-1',
        name: 'Marius Ionescu',
        role: 'Lider Închinare & Chitară',
        department: 'music',
        rsvpStatus: 'confirmed',
        phone: '+40 722 111 222'
      },
      {
        id: 't-2',
        name: 'Ana-Maria Popa',
        role: 'Solistă / Voce 2',
        department: 'music',
        rsvpStatus: 'confirmed',
        phone: '+40 722 333 444'
      },
      {
        id: 't-3',
        name: 'Daniel Nistor',
        role: 'Pianist / Clape',
        department: 'music',
        rsvpStatus: 'tentative',
        notes: 'Așteaptă confirmarea schimbului de tură de la muncă'
      },
      {
        id: 't-4',
        name: 'Radu Kovacs',
        role: 'Sunetist Principal',
        department: 'tech',
        rsvpStatus: 'confirmed',
        phone: '+40 733 555 666'
      },
      {
        id: 't-5',
        name: 'Bogdan Ciobanu',
        role: 'Proiecție Versuri & Lumini',
        department: 'tech',
        rsvpStatus: 'confirmed'
      },
      {
        id: 't-6',
        name: 'Andrei Vasile',
        role: 'Lider Echipa Welcome & Ceai',
        department: 'hospitality',
        rsvpStatus: 'confirmed'
      },
      {
        id: 't-7',
        name: 'David & Elena',
        role: 'Lideri Program (MC / Host)',
        department: 'ministry',
        rsvpStatus: 'confirmed'
      },
      {
        id: 't-8',
        name: 'Alex Todorescu',
        role: 'Vorbitor / Predicator Invitat',
        department: 'ministry',
        rsvpStatus: 'confirmed'
      },
      {
        id: 't-9',
        name: 'Cristina M.',
        role: 'Coordonator Lideri Grupuri Mici',
        department: 'ministry',
        rsvpStatus: 'confirmed'
      }
    ],
    preChecklist: [
      { id: 'ck-1', title: 'Microfoane testate, frecvențe reglate & baterii noi', completed: true, department: 'tech', responsible: 'Radu K.' },
      { id: 'ck-2', title: 'Prezentare PPT / Slide-uri de închinare și anunțuri încărcate', completed: true, department: 'tech', responsible: 'Bogdan C.' },
      { id: 'ck-3', title: 'Proiecție video & ecran verificare funcțională', completed: true, department: 'tech', responsible: 'Bogdan C.' },
      { id: 'ck-4', title: 'Băuturi calde (ceai, cafea) & gustări pregătite în zona de bun venit', completed: false, department: 'hospitality', responsible: 'Andrei V.' },
      { id: 'ck-5', title: 'Rechizite & cartonașe pentru jocul de tineret pregătite', completed: true, department: 'hospitality', responsible: 'Matei C.' },
      { id: 'ck-6', title: 'Ghidul de discuție pentru grupuri mici trimis pe grupul de WhatsApp al liderilor', completed: true, department: 'ministry', responsible: 'Cristina M.' },
      { id: 'ck-7', title: 'Sistem de sunet & monitoare reglate cu echipa de închinare', completed: true, department: 'music', responsible: 'Marius I.' }
    ],
    liveQuestions: [
      {
        id: 'q-1',
        type: 'question',
        content: 'Cum poți să știi sigur că un vis sau un scop pe care îl ai vine de la Dumnezeu și nu din orgoliul tău?',
        authorAlias: 'Tânăr Licean',
        timestamp: '19:35',
        upvotes: 12,
        isAnswered: true,
        isBookmarked: true
      },
      {
        id: 'q-2',
        type: 'prayer_request',
        content: 'Rugați-vă pentru tatăl meu care trece printr-o operație dificilă mâine dimineață.',
        authorAlias: 'Anonim',
        timestamp: '19:40',
        upvotes: 18,
        isAnswered: false,
        isBookmarked: true
      },
      {
        id: 'q-3',
        type: 'question',
        content: 'Ce faci când prietenii tăi apropiați din liceu încep să te izoleze pentru că nu mai mergi la petrecerile lor?',
        authorAlias: 'Anonim 11',
        timestamp: '19:45',
        upvotes: 8,
        isAnswered: false,
        isBookmarked: false
      }
    ],
    metrics: {
      totalAttendance: 68,
      firstTimeVisitors: 9,
      volunteersInvolved: 14,
      volunteersNeeded: 16,
      objectivesMet: true,
      proNotes: 'A fost o atmosferă extraordinară la închinare. Piesa "Cât de Mare ești" a creat un moment profund. Tinerii au fost foarte deschiși la grupurile mici.',
      contraNotes: 'Sunetul pe monitoarele de la chitară a avut mici microfonii la început. Trebuie să începem probele de sunet mai devreme cu 15 minute.',
      lessonsLearned: 'Trimiteți ghidul de discuție liderilor cu o zi înainte pe WhatsApp pentru ca aceștia să aibă timp să-l parcurgă.',
      savedPrayerMotives: [
        'Vindecare și reușită la operația tatălui unuia dintre tineri',
        'Pace și înțelepciune pentru liceenii care se simt izolați de colegi',
        'Mântuirea celor 9 oaspeți noi veniți pentru prima dată'
      ]
    }
  },
  {
    id: 'evt-2026-09-25',
    title: 'Seara de Tineret: Prietenii Sanatoase & Relatii',
    date: '2026-09-25',
    startTime: '18:00',
    location: 'Biserica Betel - Sala Tineret',
    theme: 'Cum alegi oamenii care îți modelează viitorul?',
    biblePassage: 'Proverbe 13:20 & 1 Corinteni 15:33',
    status: 'completed',
    isTemplate: false,
    moments: [
      {
        id: 'm21',
        title: 'Warm-up / Întâmpinare',
        startTime: '18:00',
        endTime: '18:15',
        durationMinutes: 15,
        responsiblePerson: 'Echipa Welcome',
        department: 'welcome',
        details: 'Primire participanți',
        resources: []
      },
      {
        id: 'm22',
        title: 'Laudă și Închinare',
        startTime: '18:15',
        endTime: '18:50',
        durationMinutes: 35,
        responsiblePerson: 'Betel Worship',
        department: 'music',
        details: 'Bloc de 4 piese',
        resources: []
      }
    ],
    team: [],
    preChecklist: [],
    liveQuestions: [],
    metrics: {
      totalAttendance: 74,
      firstTimeVisitors: 12,
      volunteersInvolved: 15,
      volunteersNeeded: 15,
      objectivesMet: true,
      proNotes: 'Record de prezență pentru luna septembrie.',
      contraNotes: 'Cafeaua s-a terminat prea repede.',
      lessonsLearned: 'Pregătiți 2 ibrice mari de cafea pentru warm-up.',
      savedPrayerMotives: []
    }
  }
];

export const TEMPLATE_EVENTS: YouthEvent[] = [
  {
    id: 'tmpl-standard-youth-night',
    title: 'Șablon Standard: Seara de Tineret (18:00 - 20:15)',
    date: '',
    startTime: '18:00',
    location: 'Sala Tineret',
    theme: 'Tema Noului Eveniment',
    biblePassage: 'Pasaj Biblic',
    status: 'draft',
    isTemplate: true,
    moments: [
      {
        id: 'tm-1',
        title: 'Warm-up / Întâmpinare',
        startTime: '18:00',
        endTime: '18:15',
        durationMinutes: 15,
        responsiblePerson: 'Echipa de Primire & Tehnic',
        department: 'welcome',
        details: 'Ceai, cafea, gustări & Muzică de fundal. Verificare sunet/lumini.',
        resources: ['Păroase, Cafea', 'Playlist Spotify']
      },
      {
        id: 'tm-2',
        title: 'Deschidere & Anunțuri',
        startTime: '18:15',
        endTime: '18:25',
        durationMinutes: 10,
        responsiblePerson: 'Lider de Program (MC / Host)',
        department: 'ministry',
        details: 'Urare de bun venit, introducere tema, reguli & anunțuri.',
        resources: ['Slide-uri Anunțuri']
      },
      {
        id: 'tm-3',
        title: 'Joc / Activitate cu Tinerii',
        startTime: '18:25',
        endTime: '18:40',
        durationMinutes: 15,
        responsiblePerson: 'Coordonator Jocuri',
        department: 'games',
        details: 'Icebreaker, joc de echipă sau trivia interactiv.',
        activityType: 'Icebreaker',
        materialsNeeded: ['Accesorii joc', 'Proiector'],
        resources: []
      },
      {
        id: 'tm-4',
        title: 'Laudă și Închinare',
        startTime: '18:40',
        endTime: '19:10',
        durationMinutes: 30,
        responsiblePerson: 'Lider de Închinare & Echipa',
        department: 'music',
        details: 'Setlist de 3-4 piese cu acorduri și ghid audio.',
        resources: ['Setlist Acorduri'],
        setlist: []
      },
      {
        id: 'tm-5',
        title: 'Îndemn la Rugăciune',
        startTime: '19:10',
        endTime: '19:20',
        durationMinutes: 10,
        responsiblePerson: 'Responsabil Rugăciune',
        department: 'ministry',
        details: 'Rugăciune comună sau pe perechi pentru nevoi specifice.',
        prayerDirection: 'Misiune, licee, universități',
        resources: []
      },
      {
        id: 'tm-6',
        title: 'Mesajul Biblic de Bază',
        startTime: '19:20',
        endTime: '19:50',
        durationMinutes: 30,
        responsiblePerson: 'Predicator / Invitat',
        department: 'ministry',
        details: 'Mesaj biblic ancorat în versetul cheie.',
        resources: ['Schiță PPT/PDF']
      },
      {
        id: 'tm-7',
        title: 'Discuții în Grupuri Mici (Breakout Groups)',
        startTime: '19:50',
        endTime: '20:15',
        durationMinutes: 25,
        responsiblePerson: 'Lideri de Grup',
        department: 'ministry',
        details: '3-4 întrebări bazate pe mesajul biblic accesibile pe telefon.',
        breakoutQuestions: [
          'Întrebarea 1: Cum rezonezi cu mesajul de deschidere?',
          'Întrebarea 2: Ce îți spune versetul cheie?',
          'Întrebarea 3: Ce pas practic vei face în această săptămână?'
        ],
        resources: ['Ghid Discuție Mobil']
      }
    ],
    team: [],
    preChecklist: [
      { id: 'tck-1', title: 'Microfoane testate & baterii pline', completed: false, department: 'tech' },
      { id: 'tck-2', title: 'Prezentare proiecție & versuri încărcate', completed: false, department: 'tech' },
      { id: 'tck-3', title: 'Ceai / Cafea pregătite', completed: false, department: 'hospitality' },
      { id: 'tck-4', title: 'Ghid discuție trimis pe WhatsApp', completed: false, department: 'ministry' }
    ],
    liveQuestions: [],
    metrics: {
      totalAttendance: 0,
      firstTimeVisitors: 0,
      volunteersInvolved: 0,
      volunteersNeeded: 12,
      objectivesMet: false,
      proNotes: '',
      contraNotes: '',
      lessonsLearned: '',
      savedPrayerMotives: []
    }
  }
];

export const INITIAL_PRAYER_BANK: PrayerBankEntry[] = [
  {
    id: 'prb-1',
    content: 'Vindecare și reușită la operația tatălui unuia dintre tineri',
    dateAdded: '2026-10-02',
    eventTitle: 'Seara de Tineret: Identitate & Scop în Hristos',
    status: 'active',
    notes: 'Urmărire pe grupul de lideri joia viitoare.'
  },
  {
    id: 'prb-2',
    content: 'Pace și înțelepciune pentru liceenii care se simt izolați de colegi la școală',
    dateAdded: '2026-10-02',
    eventTitle: 'Seara de Tineret: Identitate & Scop în Hristos',
    status: 'active'
  },
  {
    id: 'prb-3',
    content: 'Mântuirea și integrarea celor 9 oaspeți noi veniți pentru prima dată',
    dateAdded: '2026-10-02',
    eventTitle: 'Seara de Tineret: Identitate & Scop în Hristos',
    status: 'active'
  }
];
