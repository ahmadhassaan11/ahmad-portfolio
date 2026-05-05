/**
 * Work history — typed structured data, not prose. Edit this file to add or
 * update a role. Most-recent-first ordering is enforced at render time.
 *
 * `end: null` = present. Dates are YYYY-MM strings.
 */

export interface ExperienceEntry {
  company: string;
  role: string;
  start: string; // YYYY-MM
  end: string | null; // YYYY-MM or null for present
  summary: string;
  url?: string;
}

export const experience: ExperienceEntry[] = [
  {
    company: "Advaita Bioinformatics",
    role: "Software Engineer",
    start: "2025-04",
    end: null,
    summary: "Building iScanGuide, a single-cell and spatial genomics analysis platform.",
    url: "https://advaitabio.com",
  },
  {
    company: "MPN Soft",
    role: "Software Engineer",
    start: "2024-01",
    end: "2025-03",
    summary: "Led ERP/CRM development and Vue.js frontend architecture across multiple products.",
  },
  {
    company: "Breu Technologies",
    role: "Software Engineer",
    start: "2022-10",
    end: "2024-01",
    summary:
      "Full-stack development with React/Svelte; CI/CD pipelines; data visualization dashboards.",
  },
  // TODO: Ahmad — fold older roles in here in the same shape, oldest last.
];
