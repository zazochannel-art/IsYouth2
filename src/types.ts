export type Department = 'music' | 'tech' | 'hospitality' | 'ministry' | 'general';

export type RsvpStatus = 'confirmed' | 'tentative' | 'declined' | 'pending';

export type EventStatus = 'draft' | 'published' | 'completed';

export interface SongAttachment {
  id: string;
  name: string;
  type: 'chords' | 'sheet' | 'audio' | 'link';
  url: string;
}

export interface SongItem {
  id: string;
  title: string;
  artist?: string;
  key: string;
  tempo?: string;
  attachments: SongAttachment[];
}

export interface MomentItem {
  id: string;
  title: string;
  startTime: string; // e.g. "18:00"
  endTime: string;   // e.g. "18:15"
  durationMinutes: number;
  responsiblePerson: string;
  department: Department | 'welcome' | 'games' | 'general';
  details: string;
  resources: string[];
  
  // Custom moment specific details
  setlist?: SongItem[];
  activityType?: string; // Icebreaker, Joc de echipă, Trivia
  materialsNeeded?: string[];
  breakoutQuestions?: string[];
  prayerDirection?: string;
  speakerName?: string;
  biblePassage?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: Department;
  avatar?: string;
  phone?: string;
  rsvpStatus: RsvpStatus;
  notes?: string;
}

export interface PreEventCheckitem {
  id: string;
  title: string;
  completed: boolean;
  department: Department;
  responsible?: string;
}

export interface LiveQuestion {
  id: string;
  type: 'question' | 'prayer_request';
  content: string;
  authorAlias: string;
  timestamp: string;
  upvotes: number;
  isAnswered: boolean;
  isBookmarked: boolean;
}

export interface PostEventMetrics {
  totalAttendance: number;
  firstTimeVisitors: number;
  volunteersInvolved: number;
  volunteersNeeded: number;
  objectivesMet: boolean;
  proNotes: string;
  contraNotes: string;
  lessonsLearned: string;
  savedPrayerMotives: string[];
}

export interface YouthEvent {
  id: string;
  title: string;
  date: string;
  startTime: string;
  location: string;
  theme: string;
  biblePassage: string;
  status: EventStatus;
  isTemplate?: boolean;
  moments: MomentItem[];
  team: TeamMember[];
  preChecklist: PreEventCheckitem[];
  liveQuestions: LiveQuestion[];
  metrics: PostEventMetrics;
}

export interface PrayerBankEntry {
  id: string;
  content: string;
  dateAdded: string;
  eventTitle: string;
  status: 'active' | 'answered' | 'archived';
  notes?: string;
}
