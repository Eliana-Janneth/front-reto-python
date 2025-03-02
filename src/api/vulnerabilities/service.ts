import httpClient from '../httpClient';
import type { Vulnerability, ApiResponse, ApiResponseFixed, VulnerabilitySummary, ApiResponseSummary, FixedVulnerability } from './types';

export const VulnerabilityService = {
  async getAll(): Promise<ApiResponse<Vulnerability[]>> {
    const response = await httpClient.get('/vulnerability/',);
    return response.data.data;
  },

  async getVulnerabilityFixed(): Promise<ApiResponseFixed<Vulnerability[]>> {
    const response = await httpClient.get(`/vulnerabilityList/`);
    return response.data
  },

  async getVulnerabilityDetail(cve_id: string): Promise<Vulnerability> {
    const response = await httpClient.get(`/vulnerabilityDetail/${cve_id}/`);
    return response.data.data
  },

  async getVulenrabilitySummary(): Promise<ApiResponseSummary> {
    const response = await httpClient.get(`/vulnerabiltySummary/`);
    return response.data.data
  },

  async postVulnerabilityFixed(vulnerabilities: FixedVulnerability[]) {
    const response = await httpClient.post(`/vulnerabilityList/`, ...vulnerabilities);
    return response.data
  },

  async updateVulnerability(vulnerabilities: Vulnerability) {
    const response = await httpClient.put(`/vulnerabilityDetail/${vulnerabilities.cve_id}/`, vulnerabilities);
    return response.data
  }
}