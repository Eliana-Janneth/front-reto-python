import { ref } from 'vue';
import { VulnerabilityService } from '@api/vulnerabilities/service';
import type { Vulnerability, ApiResponse } from '@api/vulnerabilities/types';

export function useVulnerabilities() {
  const data = ref<Vulnerability[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const total = ref(0);

  const fetchVulnerabilities = async () => {
    try {
      loading.value = true;
      const response = await VulnerabilityService.getAll();
      data.value = response.vulnerabilities;
      total.value = response.total_vulnerabilities;
    } catch (err) {
      error.value = (err as Error).message || 'Failed to fetch data';
    } finally {
      loading.value = false;
    }
  };

  return {
    data,
    total,
    loading,
    error,
    fetchVulnerabilities,
  };
}

export function useVulnerabilitiesDetails() {
  const data = ref<Vulnerability | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchVulnerabilityDetails = async (cve_id: string) => {
    try {
      loading.value = true;
      const response = await VulnerabilityService.getVulnerabilityDetail(cve_id);
      data.value = response;
    } catch (err) {
      error.value = (err as Error).message || 'Failed to fetch data';
    } finally {
      loading.value = false;
    }
  };

  return {
    data,
    loading,
    error,
    fetchVulnerabilityDetails,
  };
}

export function useVulnerabilitiesFixed() {
  const data = ref<Vulnerability[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const total = ref(0);

  const fetchVulnerabilitiesFixed = async () => {
    try {
      loading.value = true;
      const response = await VulnerabilityService.getVulnerabilityFixed();
      data.value = response.data;
      total.value = response.total_non_fixed;
    } catch (err) {
      error.value = (err as Error).message || 'Failed to fetch data';
    } finally {
      loading.value = false;
    }
  };

  return {
    data,
    total,
    loading,
    error,
    fetchVulnerabilitiesFixed,
  };
}