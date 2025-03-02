import { ref } from 'vue';
import { VulnerabilityService } from '@api/vulnerabilities/service';
import type { FixedVulnerability, Vulnerability, VulnerabilityCategory, VulnerabilitySummary } from '@api/vulnerabilities/types';

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

export function useVulnerabilitiesSummary() {

  const high = ref<VulnerabilityCategory>();
  const medium = ref<VulnerabilityCategory>();
  const low = ref<VulnerabilityCategory>();
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchVulnerabilitiesSummary = async () => {
    try {
      loading.value = true;
      const response = await VulnerabilityService.getVulenrabilitySummary();

      high.value = {
        total: response.HIGH.total,
        vulnerabilities: response.HIGH.vulnerabilities
      }
      medium.value = {
        total: response.MEDIUM.total,
        vulnerabilities: response.MEDIUM.vulnerabilities
      }
      low.value = {
        total: response.LOW.total,
        vulnerabilities: response.LOW.vulnerabilities
      }

      error.value = null;
    } catch (err) {
      error.value = (err as Error).message || 'Failed to fetch vulnerabilities summary';
      high.value = undefined;
      medium.value = undefined;
      low.value = undefined;
    } finally {
      loading.value = false;
    };
  }
    return {
      high,
      medium,
      low,
      loading,
      error,
      fetchVulnerabilitiesSummary,
    
  }
}

export function useVulnerabilitiesUpdate() {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const updateVulnerability = async (vulnerability: Vulnerability) => {
    try {
      loading.value = true;
      await VulnerabilityService.updateVulnerability(vulnerability);
      error.value = null;
    } catch (err) {
      error.value = (err as Error).message || 'Failed to update vulnerability';
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    updateVulnerability,
  };
}

export function useVulnerabilitiesFixedPost() {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const postVulnerabilityFixed = async (vulnerabilities: FixedVulnerability[]) => {
    try {
      loading.value = true;
      await VulnerabilityService.postVulnerabilityFixed(vulnerabilities);
      error.value = null;
    } catch (err) {
      error.value = (err as Error).message || 'Failed to post vulnerability';
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    postVulnerabilityFixed,
  };
}