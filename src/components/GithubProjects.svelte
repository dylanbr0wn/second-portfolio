<script lang="ts">
  import type { GithubProject } from "../lib/github";

  let { projects }: { projects: GithubProject[] } = $props();

  const langColorLookup: Record<string, string> = {
    Rust: "#dea584",
    TypeScript: "#2b7489",
    JavaScript: "#f1e05a",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Astro: "#ff5a01",
  };
</script>

<div class="mt-10 flex flex-wrap gap-5 lg:flex-nowrap">
  {#each projects as project (project.id)}
    <a
      target="_blank"
      rel="noreferrer"
      href={project.html_url}
      class="z-20 flex w-full flex-col justify-between rounded-xl border border-neutral-700/50 text-left text-white transition-all hover:border-neutral-700 hover:bg-neutral-800/50"
    >
      <h2 class="border-b border-neutral-700/50 px-4 py-2 text-xl font-black">
        {project.name}
      </h2>
      <p class="p-3 text-base font-medium">{project.description}</p>
      <div class="flex items-center gap-5 p-3 text-xs">
        <div class="flex items-center gap-2">
          <div
            style="background-color: {langColorLookup[project.languages[0]]};"
            class="h-4 w-4 rounded-full"
          ></div>
          {project.languages[0]}
        </div>

        <div class="flex items-center gap-2">
          <div
            style="background-color: {langColorLookup[project.languages[1]]};"
            class="h-4 w-4 rounded-full"
          ></div>
          {project.languages[1]}
        </div>
      </div>
    </a>
  {/each}
</div>
