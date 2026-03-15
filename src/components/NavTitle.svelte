<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  let y = $state(0);
  let sectionOffsets = $state<Record<string, number>>({
    none: 0,
  });

  onMount(() => {
    const titles = document.querySelectorAll("h2.svelte-title");
    for (const el of titles) {
      if (!parent) continue;
      sectionOffsets[el.id] = el.getBoundingClientRect().top + window.scrollY;
    }
    // sort sections by offset
    sectionOffsets = Object.fromEntries(
      Object.entries(sectionOffsets).sort((a, b) => a[1] - b[1]),
    );
  });

  let curSection = $state<string>("none");
  let direction = $state(10);

  function onScroll() {
    for (const section in sectionOffsets) {
      if (window.scrollY + 100 >= sectionOffsets[section]) {
        if (curSection !== section) {
          direction = window.scrollY > y ? 10 : -10;
          curSection = section;
        }
      }
    }
  }

  $effect(() => {
    if (curSection === "") return;
    if (curSection === "none") {
      window.history.replaceState({}, "Dylan Brown", `/`);
      return;
    }
    window.history.replaceState({}, "Software | Dylan Brown", `#${curSection}`);
  });
</script>

<a
  href="/{curSection ? `#${curSection}` : ''}"
  class="font-bold text-neutral-300 transition-colors before:pointer-events-none before:absolute before:left-0 before:top-0 before:h-full before:w-1/2 before:rounded-xl before:bg-linear-to-r before:from-cyan-100/50 before:to-cyan-100/0 before:opacity-0 before:blur-lg before:transition-opacity before:duration-500 hover:text-white hover:before:opacity-20"
>
  dylanbrown.space
  <span class="relative">
    {#if curSection != "none"}
      <span
        in:fly={{ y: direction }}
        out:fly={{ y: direction }}
        class="absolute font-normal italic text-neutral-600">#{curSection}</span
      >
    {/if}
  </span>
</a>
<svelte:window on:scroll={onScroll} />
