export interface Driver {
  id: string;
  internal_number: number;
  first_name: string;
  last_name: string;
  middle_name?: string;
  birth_date: string;
  citizenship: string;
  rodne_cislo?: string;
  email: string;
  phone: string;
  reg_address: string;
  res_address?: string;
  status: DriverStatus;
  hire_date: string;
  fire_date?: string;
  contract_from?: string;
  contract_to?: string;
  contract_indefinite: boolean;
  work_location: 'praha' | 'kladno';
  bank_country?: string;
  bank_account?: string;
  iban?: string;
  swift?: string;
  flags?: Record<string, boolean>;
  documents?: DriverDocument[];
  created_at: string;
  updated_at: string;
}

export type DriverStatus = 'active' | 'on_leave' | 'inactive' | 'terminated';

export interface DriverDocument {
  id: string;
  driver_id: string;
  type: DocumentType;
  number?: string;
  country?: string;
  from?: string;
  to?: string;
  status: DocumentStatus;
  days_until_expiry?: number;
  created_at: string;
  updated_at: string;
}

export type DocumentType = 
  | 'passport'
  | 'visa'
  | 'residence'
  | 'licence'
  | 'a1_eu'
  | 'a1_switzerland'
  | 'declaration'
  | 'pojisteni'
  | 'cestovni_pojisteni'
  | 'drivers_licence'
  | 'adr'
  | 'chip'
  | 'kod_95'
  | 'prohlidka';

export type DocumentStatus = 'valid' | 'warning' | 'expiring_soon' | 'expired' | 'no_data';

export interface DriversResponse {
  current_page: number;
  data: Driver[];
  total: number;
  per_page: number;
  last_page: number;
}

export const DOCUMENT_LABELS: Record<DocumentType, string> = {
  passport: 'Passport',
  visa: 'Visa/Biometrics',
  residence: 'Residence',
  licence: 'Licence',
  a1_eu: 'A1 (EU)',
  a1_switzerland: 'A1 Switzerland',
  declaration: 'Declaration',
  pojisteni: 'Insurance',
  cestovni_pojisteni: 'Travel Insurance',
  drivers_licence: 'Driver\'s Licence',
  adr: 'ADR',
  chip: 'Chip (Tacho)',
  kod_95: 'Code 95',
  prohlidka: 'Medical Check'
};
