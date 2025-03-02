export interface Vulnerability {
  cve_id: string;
  description: string;
  fixed: boolean;
  source_identifier: string;
  published: string;
  last_modified: string;
  vuln_status: string;
  metrics: any[]
}

export interface ApiResponse<T> {
  total_vulnerabilities: number;
  vulnerabilities: T;
}

export interface ApiResponseFixed<T> {
  total_non_fixed: number;
  data: T;
}

export interface VulnerabilitySummary {
  id: number;
  severity: string;
  access_vector: string;
  exploitability: string;
  impact: string;
  access_complexity: string;
  authentication: string;
  vulnerability: Vulnerability;
  source_identifier: string;
}

export interface VulnerabilityCategory {
  total: number;
  vulnerabilities: VulnerabilitySummary[];
}

export interface ApiResponseSummary {
  HIGH: VulnerabilityCategory;
  MEDIUM: VulnerabilityCategory;
  LOW: VulnerabilityCategory;
}

export interface FixedVulnerability {
  cve_id: string;
  fixed: boolean;
}