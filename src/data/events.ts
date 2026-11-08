export type CampusEvent = { id: number; title: string; date: string; place: string; seats: number }

export const events: CampusEvent[] = [
  { id: 1, title: 'React study night', date: '2026-11-12', place: 'Room 302', seats: 20 },
  { id: 2, title: 'Git and GitHub workshop', date: '2026-11-14', place: 'Library hall', seats: 15 },
  { id: 3, title: 'Figma for developers', date: '2026-11-18', place: 'Lab 204', seats: 12 },
  { id: 4, title: 'Career talk with alumni', date: '2026-11-20', place: 'Main hall', seats: 3 },
  { id: 5, title: 'Hackathon info session', date: '2026-11-25', place: 'Room 110', seats: 30 },
]
