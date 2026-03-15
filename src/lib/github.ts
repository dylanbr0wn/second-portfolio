import { getSecret } from "astro:env/server";
import { z } from "astro/zod";

const GithubRepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  html_url: z.url(),
  description: z.string().nullable(),
  languages_url: z.url(),
});

export const GithubProjectSchema = GithubRepoSchema.omit({
  languages_url: true,
}).extend({
  languages: z.array(z.string()),
});

export type GithubProject = z.infer<typeof GithubProjectSchema>;

const headers = () => ({
  Authorization: `Bearer ${getSecret("GITHUB_TOKEN")}`,
});

const projs = ["victoria-weather", "grid", "shotclock", "mlti"];

async function getProjectWithLanguage(
  repo: z.infer<typeof GithubRepoSchema>,
): Promise<GithubProject> {
  const langRes = await fetch(repo.languages_url, { headers: headers() });
  const languages = Object.keys(await langRes.json());
  return GithubProjectSchema.parse({ ...repo, languages });
}

export async function getGithubProjects(): Promise<GithubProject[]> {
  const res = await fetch(
    "https://api.github.com/users/dylanbr0wn/repos?sort=pushed",
    { headers: headers() },
  );
  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }
  const raw: unknown[] = await res.json();
  const repos = raw
    .map((r) => GithubRepoSchema.safeParse(r))
    .filter((r) => r.success)
    .map((r) => r.data)
    .filter((r) => projs.includes(r.name));

  return Promise.all(repos.map(getProjectWithLanguage));
}
