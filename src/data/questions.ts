import { DiscoveryQuestion } from '../types';

export const questions: DiscoveryQuestion[] = [
  {
    id: 1,
    question: 'When you have free time, what pulls you in?',
    subtext: "Don't overthink it — go with your gut.",
    options: [
      { label: 'Figuring out how things work or building something', pathways: ['tech', 'health'] },
      { label: 'Organizing, planning, or leading a group',            pathways: ['business', 'social'] },
      { label: 'Making things — drawing, writing, filming, designing', pathways: ['creative'] },
      { label: 'Helping people or solving a problem that affects others', pathways: ['social', 'health'] },
    ],
  },
  {
    id: 2,
    question: 'In a group project, you naturally become the person who…',
    subtext: 'Think about what you actually do, not what you think you should do.',
    options: [
      { label: 'Researches and finds the best solution',    pathways: ['tech', 'health'] },
      { label: 'Takes charge and keeps everyone on track',  pathways: ['business'] },
      { label: 'Makes the presentation look amazing',       pathways: ['creative'] },
      { label: "Makes sure everyone's voice is heard",      pathways: ['social'] },
    ],
  },
  {
    id: 3,
    question: 'Which of these problems would you most want to solve?',
    subtext: 'Imagine you had unlimited resources.',
    options: [
      { label: 'Build technology that makes life easier',               pathways: ['tech'] },
      { label: 'Create a business that changes an industry',            pathways: ['business'] },
      { label: 'Tell stories that shift how people see the world',      pathways: ['creative'] },
      { label: 'Cure a disease or make healthcare accessible',          pathways: ['health'] },
      { label: 'Fix a broken system — education, justice, inequality',  pathways: ['social'] },
    ],
  },
  {
    id: 4,
    question: 'What does a dream workday look like?',
    subtext: 'Close your eyes for a second. Where are you?',
    options: [
      { label: 'At a computer, deep in a problem, headphones on',               pathways: ['tech'] },
      { label: 'In meetings, pitching ideas, making deals happen',              pathways: ['business'] },
      { label: 'In a studio, on set, or surrounded by creative tools',          pathways: ['creative'] },
      { label: 'In a lab, hospital, or out in the field',                       pathways: ['health'] },
      { label: 'In a community, running a program, talking to real people',     pathways: ['social'] },
    ],
  },
  {
    id: 5,
    question: 'Which sentence feels most like you?',
    subtext: "Not what sounds impressive — what feels true.",
    options: [
      { label: 'I love learning how systems work and making them better',  pathways: ['tech', 'health'] },
      { label: 'I want to build something of my own someday',              pathways: ['business'] },
      { label: 'I express myself best through what I create',              pathways: ['creative'] },
      { label: "I can't rest when I see unfairness in the world",          pathways: ['social'] },
    ],
  },
  {
    id: 6,
    question: 'If someone gave you a grant right now, what would you do?',
    subtext: 'No wrong answers. This is your money.',
    options: [
      { label: 'Build an app or tool that solves a real problem',              pathways: ['tech'] },
      { label: 'Start a business or social enterprise',                        pathways: ['business'] },
      { label: 'Fund a creative project — film, exhibition, magazine',         pathways: ['creative'] },
      { label: 'Fund medical research or a health initiative',                 pathways: ['health'] },
      { label: 'Launch a community program or advocacy campaign',              pathways: ['social'] },
    ],
  },
];
