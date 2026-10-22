import { YouthEvent, MomentItem } from '../types';

export function formatEventForWhatsApp(event: YouthEvent): string {
  const lines: string[] = [];

  lines.push(`🔥 *PROGRAM SERATĂ TINERET* 🔥`);
  lines.push(`📍 *${event.title}*`);
  lines.push(`📅 Dată: ${event.date || 'În curând'} | ⏰ Ora: ${event.startTime}`);
  lines.push(`🏛️ Locație: ${event.location}`);
  if (event.theme) lines.push(`💡 Tema: _"${event.theme}"_`);
  if (event.biblePassage) lines.push(`📖 Pasaj Biblic: *${event.biblePassage}*`);
  lines.push(``);

  lines.push(`----------------------------------------`);
  lines.push(`📋 *DESFĂȘURĂTOR PE MOMENTE (RUNDOWN)*`);
  lines.push(`----------------------------------------`);

  event.moments.forEach((m, idx) => {
    let emoji = '⏱️';
    if (m.department === 'welcome') emoji = '☕';
    if (m.department === 'games') emoji = '🎮';
    if (m.department === 'music') emoji = '🎸';
    if (m.department === 'tech') emoji = '🎛️';
    if (m.department === 'ministry') emoji = '📖';

    lines.push(`${emoji} *${m.startTime} - ${m.endTime}* | ${m.title}`);
    if (m.responsiblePerson) {
      lines.push(`   👤 Responsabil: _${m.responsiblePerson}_`);
    }

    if (m.setlist && m.setlist.length > 0) {
      lines.push(`   🎶 *Setlist Închinare:*`);
      m.setlist.forEach((song, sIdx) => {
        lines.push(`      ${sIdx + 1}. ${song.title} (${song.key || 'Ton nespecificat'})`);
      });
    }

    if (m.prayerDirection) {
      lines.push(`   🙏 *Ghid Rugăciune:* ${m.prayerDirection}`);
    }

    if (m.breakoutQuestions && m.breakoutQuestions.length > 0) {
      lines.push(`   💬 *Întrebări Grupe Mici:*`);
      m.breakoutQuestions.forEach((q, qIdx) => {
        lines.push(`      ${qIdx + 1}. ${q}`);
      });
    }

    lines.push(``);
  });

  lines.push(`----------------------------------------`);
  lines.push(`👥 *ECHIPA & SLUJITORI CONFIRMAȚI*`);
  lines.push(`----------------------------------------`);

  const confirmedMembers = event.team.filter(t => t.rsvpStatus === 'confirmed');
  const pendingMembers = event.team.filter(t => t.rsvpStatus === 'pending' || t.rsvpStatus === 'tentative');

  if (confirmedMembers.length > 0) {
    confirmedMembers.forEach(tm => {
      lines.push(`✅ *${tm.name}* - ${tm.role}`);
    });
  } else {
    lines.push(`(Nicio confirmare încă)`);
  }

  if (pendingMembers.length > 0) {
    lines.push(``);
    lines.push(`⏳ *În așteptare confirmare:*`);
    pendingMembers.forEach(tm => {
      lines.push(`❓ _${tm.name}_ (${tm.role})`);
    });
  }

  lines.push(``);
  lines.push(`Vă așteptăm cu drag! Rugați-vă pentru această seară! 🙏✨`);

  return lines.join('\n');
}

export function recalculateMomentTimes(startEventTime: string, moments: MomentItem[]): MomentItem[] {
  let [currentHour, currentMin] = startEventTime.split(':').map(Number);
  if (isNaN(currentHour)) currentHour = 18;
  if (isNaN(currentMin)) currentMin = 0;

  return moments.map((moment) => {
    const startStr = `${String(currentHour).padStart(2, '0')}:${String(currentMin).padStart(2, '0')}`;
    
    let totalMins = currentHour * 60 + currentMin + (moment.durationMinutes || 15);
    const endHour = Math.floor(totalMins / 60) % 24;
    const endMin = totalMins % 60;
    const endStr = `${String(endHour).padStart(2, '0')}:${String(endMin).padStart(2, '0')}`;

    currentHour = endHour;
    currentMin = endMin;

    return {
      ...moment,
      startTime: startStr,
      endTime: endStr,
    };
  });
}
