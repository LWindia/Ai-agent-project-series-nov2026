/** Central editable content. Replace text here without touching layout. */

export const NAV_LINKS = [
  { id: 'projects', label: 'Projects' },
  { id: 'technology', label: 'Technology' },
  { id: 'overview', label: 'Overview' },
  { id: 'faq', label: 'FAQ' },
] as const;

/** Razorpay registration / payment page. */
export const REGISTER_URL = 'https://rzp.io/rzp/agenticai-project-nov';

/**
 * Google Apps Script web-app URL that saves the contact form into Google Sheets.
 * Set VITE_CONTACT_ENDPOINT in `.env` locally and in your hosting provider's
 * environment variables (see `.env.example`).
 */
export const CONTACT_ENDPOINT: string = import.meta.env.VITE_CONTACT_ENDPOINT ?? '';

/** WhatsApp chat button (bottom-right). Number in international format, digits only. */
export const WHATSAPP_NUMBER = '919772201449';
export const WHATSAPP_MESSAGE = "Hi! I'm interested in the AI Agent Project Series (Nov 2026). Please share the details.";

/** Program facts used in the FAQ — edit here. */
export const PROGRAM = {
  start: 'November 2026',
  recordingAccessDays: 365,
};

export const FAQS: { q: string; a: string }[] = [
  {
    q: 'When does the program start?',
    a: `The live program starts in ${PROGRAM.start}. Once you register, the exact start date, session timings and joining link are shared with you on WhatsApp and email.`,
  },
  {
    q: 'Are the sessions live or pre-recorded?',
    a: 'All sessions are conducted live and are fully hands-on. You build each AI agent step by step alongside the instructor, and you can ask questions in real time.',
  },
  {
    q: 'What if I miss a live session?',
    a: 'No problem. Every live hands-on session is recorded and uploaded to our LMS portal, so you can catch up whenever it suits you.',
  },
  {
    q: 'How long will I have access to the recordings?',
    a: `You get ${PROGRAM.recordingAccessDays} days of access to all live hands-on recordings on the LMS portal, so you can revisit any session as often as you like.`,
  },
  {
    q: 'What will I build during the program?',
    a: 'Three real-world AI agents, end to end: KubeDoctor AI for Kubernetes troubleshooting, CloudSentinel AI for AWS cloud security monitoring, and AIOps Pulse for intelligent infrastructure monitoring.',
  },
  {
    q: 'Who is this program for?',
    a: 'DevOps engineers, cloud and SRE engineers, system administrators and students who want to apply AI agents to real IT operations. Basic familiarity with Linux and Python helps you get the most out of the sessions.',
  },
  {
    q: 'How do I register?',
    a: 'Click “Register Now” to complete your enrolment through our secure payment page. If you have questions first, use the Contact Us form and our team will reach out to you on WhatsApp.',
  },
];

export type Project = {
  index: string;
  id: string;
  name: string;
  tagline: string;
  domain: string;
  description: string;
  capabilities: string[];
  accent: 'electric' | 'cyan' | 'signal';
};

export const PROJECTS: Project[] = [
  {
    index: '01',
    id: 'project-kubedoctor',
    name: 'KubeDoctor AI',
    tagline: 'AI Agent for Kubernetes Application Troubleshooting',
    domain: 'Kubernetes Operations',
    description:
      'An autonomous agent that investigates failing pods, decodes cluster events, and recommends remediation across complex Kubernetes workloads.',
    capabilities: ['Pod diagnostics', 'Event correlation', 'Remediation paths', 'Health scoring'],
    accent: 'cyan',
  },
  {
    index: '02',
    id: 'project-cloudsentinel',
    name: 'CloudSentinel AI',
    tagline: 'AI Agent for AWS Cloud Security Monitoring',
    domain: 'Cloud Security',
    description:
      'A security agent that continuously reasons over CloudTrail events, IAM posture, and resource exposure to surface real threats before they escalate.',
    capabilities: ['Threat detection', 'IAM analysis', 'CloudTrail reasoning', 'Exposure mapping'],
    accent: 'electric',
  },
  {
    index: '03',
    id: 'project-aiops',
    name: 'AIOps Pulse',
    tagline: 'AI Agent for Intelligent Infrastructure Monitoring',
    domain: 'Infrastructure Intelligence',
    description:
      'An observability agent that reads Prometheus metrics, correlates anomalies across services, and explains infrastructure behavior in plain language.',
    capabilities: ['Anomaly correlation', 'Metric reasoning', 'SLO tracking', 'Root-cause narrative'],
    accent: 'signal',
  },
];

export const WORKFLOW_STEPS = [
  {
    id: 'observe',
    label: 'Observe',
    description: 'Ingest signals from clusters, cloud events, and metrics streams.',
  },
  {
    id: 'investigate',
    label: 'Investigate',
    description: 'Correlate events across namespaces, accounts, and services.',
  },
  {
    id: 'analyze',
    label: 'Analyze',
    description: 'Reason over context to form hypotheses about root cause.',
  },
  {
    id: 'recommend',
    label: 'Recommend',
    description: 'Propose ranked remediation paths with confidence scoring.',
  },
  {
    id: 'action',
    label: 'Approved Action',
    description: 'Execute only after human approval of the proposed change.',
  },
  {
    id: 'verify',
    label: 'Verify',
    description: 'Confirm the system returned to a healthy steady state.',
  },
] as const;

export type TechGroup = {
  category: string;
  items: string[];
};

export const TECH_GROUPS: TechGroup[] = [
  { category: 'Agent Core', items: ['Python', 'LLM API', 'FastAPI'] },
  { category: 'Container Platform', items: ['Kubernetes', 'Docker', 'k3d'] },
  { category: 'Cloud & Security', items: ['AWS', 'Boto3', 'CloudTrail'] },
  { category: 'Intelligence', items: ['scikit-learn', 'Prometheus', 'Grafana'] },
];
