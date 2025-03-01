import httpClient from '../httpClient';
import type { Vulnerability, ApiResponse, ApiResponseFixed } from './types';

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
  }
};