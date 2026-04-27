export const GET_SECURE = {
  name: 'Get Secure NZ',
  legalName: 'Get Secure Ltd',
  url: 'https://getsecure.co.nz',
  phoneDisplay: '+64 27 699 9901',
  phoneHref: 'tel:+64276999901',
  email: 'chris@getsecure.co.nz',
  serviceArea: 'Auckland',
  proofPoints: [
    'Auckland-based security installers',
    '15+ years industry experience',
    'Free site visits for quote jobs',
    '3-year product warranty',
    '5-year workmanship warranty',
  ],
  services: ['CCTV', 'alarms', 'intercoms', 'networking'],
} as const

export const AUCKLAND_AREAS = [
  'West Auckland',
  'South Auckland',
  'Central Auckland',
  'North Shore',
  'East Auckland',
] as const
