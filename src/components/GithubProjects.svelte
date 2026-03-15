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

<div class="flex gap-5 mt-10 flex-wrap lg:flex-nowrap">
  {#each projects as project (project.id)}
    <a
      target="_blank"
      rel="noreferrer"
      href={project.html_url}
      class="flex flex-col justify-between w-full text-white z-20 text-left rounded-xl border-neutral-700/50 border hover:border-neutral-700 hover:bg-neutral-800/50 transition-all"
    >
      <h2 class="text-xl font-black px-4 py-2 border-b border-neutral-700/50">
        {project.name}
      </h2>
      <p class="text-base font-medium p-3">{project.description}</p>
      <div class="flex items-center gap-5 text-xs p-3 ">
        <div class="flex items-center gap-2">
          <div
            style="background-color: {langColorLookup[project.languages[0]]};"
            class="rounded-full h-4 w-4"
          ></div>
          {project.languages[0]}
        </div>

        <div class="flex items-center gap-2">
          <div
            style="background-color: {langColorLookup[project.languages[1]]};"
            class="rounded-full h-4 w-4"
          ></div>
          {project.languages[1]}
        </div>
      </div>
    </a>
  {/each}
</div>
