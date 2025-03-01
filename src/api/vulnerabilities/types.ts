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
