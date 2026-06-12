export interface GitHubRepo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
}

export async function fetchGitHubRepos(username: string = "Zomiccc", limit: number = 6): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=${limit}`, {
      next: { revalidate: 3600 },
    } as RequestInit);
    if (!res.ok) throw new Error("GitHub API error");
    const data = await res.json();
    return data.map((repo: GitHubRepo) => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      html_url: repo.html_url,
    }));
  } catch {
    return [];
  }
}

export const fallbackRepos: GitHubRepo[] = [
  {
    name: "Tandoor",
    description: "Enterprise restaurant management platform with POS, delivery, CRM, and AI forecasting.",
    language: "TypeScript",
    stargazers_count: 0,
    html_url: "https://github.com/Zomiccc",
  },
  {
    name: "InDrive-Clone",
    description: "Ride-hailing platform with real-time tracking and driver/rider apps.",
    language: "TypeScript",
    stargazers_count: 0,
    html_url: "https://github.com/Zomiccc",
  },
  {
    name: "Helmet-Detection",
    description: "Real-time AI system for helmet compliance detection.",
    language: "Python",
    stargazers_count: 0,
    html_url: "https://github.com/Zomiccc",
  },
  {
    name: "License-Plate-Recognition",
    description: "Automatic vehicle license plate detection and text recognition.",
    language: "Python",
    stargazers_count: 0,
    html_url: "https://github.com/Zomiccc",
  },
  {
    name: "Sign-Language-Recognition",
    description: "Real-time sign language gesture recognition to text.",
    language: "Python",
    stargazers_count: 0,
    html_url: "https://github.com/Zomiccc",
  },
  {
    name: "Crypto-Arbitrage-Bot",
    description: "Automated crypto arbitrage trading bot.",
    language: "Python",
    stargazers_count: 0,
    html_url: "https://github.com/Zomiccc",
  },
];
