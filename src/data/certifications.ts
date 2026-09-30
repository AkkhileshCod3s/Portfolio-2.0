export interface Certification {
  badge: string;
  type?: string;
  date: string;
  title: string;
  provider: string;
  description: string;
  tags: string[];
  credentialUrl?: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    badge: 'BID Specialization',
    type: 'Specialization',
    date: 'Nov 1, 2025',
    title: 'Natural Disaster and Climate Change Risk Assessment (Specialization)',
    provider: 'Banco Interamericano de Desarrollo (BID) / Coursera',
    description:
      '3-course Specialization program on formulating, executing, and overseeing infrastructure projects with disaster risk analysis, quantitative & qualitative modeling, and climate resilience.',
    tags: ['Disaster Risk in Infrastructure', 'Quantitative & Qualitative Analysis', 'Climate Adaptation', 'Governance'],
    credentialUrl: 'https://www.coursera.org/account/accomplishments/specialization/Z56ABJ16V1RA',
  },
  {
    badge: 'Univ of Maryland',
    date: 'Jul 27, 2026',
    title: 'Cybersecurity for Everyone',
    provider: 'University of Maryland, College Park / Coursera',
    description:
      'Authorized by University of Maryland, College Park, exploring cybersecurity principles, threat landscape analysis, networking defense, and policy implementation.',
    tags: ['Cybersecurity Foundations', 'Network Security', 'Threat Analysis', 'Security Policy'],
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/QEVMZQ11G8WL',
  },
  {
    badge: 'DeepLearning.AI',
    date: 'Nov 1, 2025',
    title: 'AI and Disaster Management',
    provider: 'DeepLearning.AI / Coursera',
    description:
      'Authorized by DeepLearning.AI, covering practical applications of Artificial Intelligence and Machine Learning in disaster risk prediction, resource allocation, and crisis response.',
    tags: ['Artificial Intelligence', 'Machine Learning', 'Disaster Management', 'Predictive Modeling'],
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/2L3N3DGM0ZHS',
  },
  {
    badge: 'BID Academy',
    date: 'Nov 1, 2025',
    title: 'Decision Making and Governance of Natural Disaster Risk',
    provider: 'Banco Interamericano de Desarrollo (BID) / Coursera',
    description:
      'Authorized by Banco Interamericano de Desarrollo (BID INDES Academy), focusing on institutional governance, policy design, and strategic decision-making in disaster risk management.',
    tags: ['Governance', 'Decision Making', 'Risk Policy', 'Disaster Resilience'],
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/DPZ23PL03JMH',
  },
  {
    badge: 'BID Academy',
    date: 'Nov 1, 2025',
    title: 'Qualitative and Quantitative Analysis of Disaster Risk',
    provider: 'Banco Interamericano de Desarrollo (BID) / Coursera',
    description:
      'Authorized by Banco Interamericano de Desarrollo (BID INDES Academy), demonstrating competence in quantitative calculation methods and qualitative risk analysis frameworks.',
    tags: ['Quantitative Risk Analysis', 'Qualitative Risk Modeling', 'Data Evaluation', 'Risk Assessment'],
    // TODO: add link
    credentialUrl: undefined,
  },
];
