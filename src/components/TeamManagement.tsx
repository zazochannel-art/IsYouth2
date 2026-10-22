import React, { useState } from 'react';
import { YouthEvent, TeamMember, Department, RsvpStatus } from '../types';
import { 
  Users, CheckCircle2, HelpCircle, XCircle, Clock, Plus, Trash2, 
  UserPlus, Music, Shield, Coffee, BookOpen, Send, Phone, Edit2
} from 'lucide-react';

interface TeamManagementProps {
  event: YouthEvent;
  onUpdateEvent: (updated: YouthEvent) => void;
}

export const TeamManagement: React.FC<TeamManagementProps> = ({
  event,
  onUpdateEvent
}) => {
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('');
  const [newMemberDept, setNewMemberDept] = useState<Department>('music');
  const [newMemberPhone, setNewMemberPhone] = useState('');

  const [notificationLog, setNotificationLog] = useState<string | null>(null);

  const handleRsvpChange = (memberId: string, status: RsvpStatus) => {
    const updatedTeam = event.team.map(tm => {
      if (tm.id === memberId) {
        return { ...tm, rsvpStatus: status };
      }
      return tm;
    });
    onUpdateEvent({ ...event, team: updatedTeam });
  };

  const handleDeleteMember = (memberId: string) => {
    const updatedTeam = event.team.filter(tm => tm.id !== memberId);
    onUpdateEvent({ ...event, team: updatedTeam });
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim() || !newMemberRole.trim()) return;

    const newTm: TeamMember = {
      id: `tm-${Date.now()}`,
      name: newMemberName.trim(),
      role: newMemberRole.trim(),
      department: newMemberDept,
      rsvpStatus: 'pending',
      phone: newMemberPhone.trim() || undefined
    };

    onUpdateEvent({ ...event, team: [...event.team, newTm] });

    setNotificationLog(`Alertă trimisă automat către ${newMemberName}: Adăugat în echipa de ${newMemberDept} pentru ${event.title}!`);
    setTimeout(() => setNotificationLog(null), 5000);

    setNewMemberName('');
    setNewMemberRole('');
    setNewMemberPhone('');
    setIsAddingMember(false);
  };

  // Group members by department
  const departmentsList: { key: Department; title: string; icon: React.ReactNode; desc: string }[] = [
    { 
      key: 'music', 
      title: 'Muzică / Închinare', 
      icon: <Music className="w-4 h-4 text-indigo-400" />,
      desc: 'Lider închinare, soliști, instrumentiști'
    },
    { 
      key: 'tech', 
      title: 'Media & Tehnic', 
      icon: <Shield className="w-4 h-4 text-cyan-400" />,
      desc: 'Sunetist, proiecție versuri/slide-uri, lumini, transmisiune live'
    },
    { 
      key: 'hospitality', 
      title: 'Organizare & Ospitalitate', 
      icon: <Coffee className="w-4 h-4 text-amber-400" />,
      desc: 'Echipa de la ușă (Welcome), echipa pentru ceai/cafea, coordonator jocuri'
    },
    { 
      key: 'ministry', 
      title: 'Slujire / Trecători', 
      icon: <BookOpen className="w-4 h-4 text-purple-400" />,
      desc: 'Lider de program (MC), rugăciune, vorbitor, lideri grupuri mici'
    }
  ];

  // Stats
  const totalCount = event.team.length;
  const confirmedCount = event.team.filter(t => t.rsvpStatus === 'confirmed').length;
  const tentativeCount = event.team.filter(t => t.rsvpStatus === 'tentative').length;
  const declinedCount = event.team.filter(t => t.rsvpStatus === 'declined').length;
  const pendingCount = event.team.filter(t => t.rsvpStatus === 'pending').length;

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Stats */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-display font-extrabold text-white flex items-center gap-2">
              <Users className="w-6 h-6 text-indigo-400" />
              <span>Managementul Echipei, Rolurilor & Confirmărilor</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Atribuire clară pe departamente ("Cine, Ce și Unde") și sistem automat de verificare a prezenței.
            </p>
          </div>

          <button
            onClick={() => setIsAddingMember(true)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 transition-all self-start md:self-center"
          >
            <UserPlus className="w-4 h-4" />
            <span>Adaugă Voluntar / Slujitor</span>
          </button>
        </div>

        {/* Real-time notification alert simulator */}
        {notificationLog && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between animate-fadeIn">
            <span className="flex items-center gap-2">
              <Send className="w-4 h-4 text-emerald-400" />
              {notificationLog}
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">Notificare WhatsApp Trimisă</span>
          </div>
        )}

        {/* Scorecard pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs font-medium">
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Confirmați
            </span>
            <span className="font-mono text-base font-bold text-emerald-400">{confirmedCount} / {totalCount}</span>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-amber-400" /> Incerți
            </span>
            <span className="font-mono text-base font-bold text-amber-400">{tentativeCount}</span>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-rose-400" /> Nu pot veni
            </span>
            <span className="font-mono text-base font-bold text-rose-400">{declinedCount}</span>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" /> În așteptare
            </span>
            <span className="font-mono text-base font-bold text-slate-300">{pendingCount}</span>
          </div>
        </div>
      </div>

      {/* Form to Add Member Modal */}
      {isAddingMember && (
        <form onSubmit={handleAddMember} className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-5 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-indigo-400" />
              <span>Adaugă Membru Nou în Echipă</span>
            </h3>
            <button
              type="button"
              onClick={() => setIsAddingMember(false)}
              className="text-slate-400 hover:text-white text-xs"
            >
              Închide
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block text-slate-400 font-medium mb-1">Nume & Prenume *</label>
              <input
                type="text"
                required
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                placeholder="ex: Mihai Popa"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Rol / Funcție Specifică *</label>
              <input
                type="text"
                required
                value={newMemberRole}
                onChange={(e) => setNewMemberRole(e.target.value)}
                placeholder="ex: Sunetist / Solist 2"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Departament</label>
              <select
                value={newMemberDept}
                onChange={(e) => setNewMemberDept(e.target.value as Department)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="music">Muzică / Închinare</option>
                <option value="tech">Media & Tehnic</option>
                <option value="hospitality">Organizare & Ospitalitate</option>
                <option value="ministry">Slujire / Trecători</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Telefon / WhatsApp (opțional)</label>
              <input
                type="text"
                value={newMemberPhone}
                onChange={(e) => setNewMemberPhone(e.target.value)}
                placeholder="ex: +40 722 000 111"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddingMember(false)}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
            >
              Anulează
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-500"
            >
              Salvează Membru
            </button>
          </div>
        </form>
      )}

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {departmentsList.map(dept => {
          const deptMembers = event.team.filter(t => t.department === dept.key);

          return (
            <div key={dept.key} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div>
                  <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                    {dept.icon}
                    <span>{dept.title}</span>
                  </h3>
                  <p className="text-[11px] text-slate-400">{dept.desc}</p>
                </div>
                <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                  {deptMembers.length} voluntari
                </span>
              </div>

              {deptMembers.length > 0 ? (
                <div className="space-y-3">
                  {deptMembers.map(member => {
                    return (
                      <div
                        key={member.id}
                        className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-xs text-white">{member.name}</span>
                            {member.phone && (
                              <span className="text-[10px] text-slate-500 flex items-center gap-1 font-mono">
                                <Phone className="w-3 h-3 text-slate-600" />
                                {member.phone}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">{member.role}</p>
                          {member.notes && (
                            <p className="text-[10px] text-amber-400/90 italic mt-1 bg-amber-500/10 p-1 rounded border border-amber-500/20">
                              Note: {member.notes}
                            </p>
                          )}
                        </div>

                        {/* Status selector buttons */}
                        <div className="flex items-center gap-1 shrink-0 bg-slate-900 p-1 rounded-lg border border-slate-800">
                          <button
                            onClick={() => handleRsvpChange(member.id, 'confirmed')}
                            className={`p-1.5 rounded text-[11px] font-semibold transition-all flex items-center gap-1 ${
                              member.rsvpStatus === 'confirmed'
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : 'text-slate-400 hover:text-emerald-400'
                            }`}
                            title="Confirmat"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Confirm</span>
                          </button>

                          <button
                            onClick={() => handleRsvpChange(member.id, 'tentative')}
                            className={`p-1.5 rounded text-[11px] font-semibold transition-all flex items-center gap-1 ${
                              member.rsvpStatus === 'tentative'
                                ? 'bg-amber-600 text-white shadow-sm'
                                : 'text-slate-400 hover:text-amber-400'
                            }`}
                            title="Incert"
                          >
                            <HelpCircle className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Incert</span>
                          </button>

                          <button
                            onClick={() => handleRsvpChange(member.id, 'declined')}
                            className={`p-1.5 rounded text-[11px] font-semibold transition-all flex items-center gap-1 ${
                              member.rsvpStatus === 'declined'
                                ? 'bg-rose-600 text-white shadow-sm'
                                : 'text-slate-400 hover:text-rose-400'
                            }`}
                            title="Nu pot ajunge"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Absent</span>
                          </button>

                          <button
                            onClick={() => handleDeleteMember(member.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-400 ml-1"
                            title="Șterge membru"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6 text-xs text-slate-500 border border-dashed border-slate-800 rounded-xl">
                  Niciun slujitor înregistrat în acest departament încă.
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
