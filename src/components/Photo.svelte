<script lang="ts">
  import { crossfade } from "svelte/transition";
  import type { Snippet } from "@astrojs/svelte/svelte-shims.d.ts";
  import { store } from "../lib/store.svelte";

  let {
    title,
    id,
    nextId,
    prevId,
    children,
    fullSizeImage,
    iso,
    shutter,
    aperture,
    device,
  }: {
    title: string;
    id: string;
    nextId: string;
    prevId: string;
    children: Snippet;
    fullSizeImage?: Snippet;
    iso?: number;
    shutter?: string;
    aperture?: string;
    device?: string;
  } = $props();

  let isOpen = $state<boolean>(false);

  $effect(() => {
    if (store.selected !== null && store.selected === id) {
      isOpen = true;
    } else {
      isOpen = false;
    }
  });

  function open() {
    store.selected = id;
  }

  function close() {
    store.selected = null;
  }

  function prev() {
    store.selected = prevId;
  }

  function next() {
    store.selected = nextId;
  }

  function onKeydown(e: KeyboardEvent) {
    if (store.selected === null) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  }

  $effect(() => {
    document.body.style.overflow = store.selected !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  });

  const [send, receive] = crossfade({});

  function portal(node: HTMLElement) {
    document.body.appendChild(node);
    return {
      destroy() {
        node.remove();
      },
    };
  }
</script>

<svelte:window onkeydown={onKeydown} />

<button
  onclick={open}
  class="mb-3 block w-full cursor-zoom-in break-inside-avoid overflow-hidden rounded-xl"
>
  {@render children()}
</button>

{#if isOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    use:portal
    class="fixed inset-0 z-500 flex items-center justify-center bg-black/80 backdrop-blur-sm w-screen h-screen"
    onclick={close}
    role="dialog"
    aria-modal="true"
    tabindex="-1"
  >
    {#if prevId !== id}
      <button
        onclick={(e) => {
          e.stopPropagation();
          prev();
        }}
        class="absolute top-1/2 left-4 z-10 -translate-y-1/2 cursor-pointer p-3 text-3xl leading-none text-white/70 hover:text-white"
        aria-label="Previous"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-left"
          ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
            d="M5 12l14 0"
          /><path d="M5 12l4 4" /><path d="M5 12l4 -4" /></svg
        >
      </button>
    {/if}
    <div class="flex flex-col items-start">
      {#if fullSizeImage}
        {@render fullSizeImage()}
      {:else}
        {@render children()}
      {/if}
      <div
        class="mt-2 flex w-full justify-between font-mono text-xs text-white/50"
      >
        <span><span class="mr-1">&gt;</span>{title}</span>
        <span>
          {[device, aperture, shutter, iso ? `ISO ${iso}` : null]
            .filter(Boolean)
            .join(" | ")}
        </span>
      </div>
    </div>
    {#if nextId !== id}
      <button
        onclick={(e) => {
          e.stopPropagation();
          next();
        }}
        class="absolute top-1/2 right-4 z-10 -translate-y-1/2 cursor-pointer p-3 text-3xl leading-none text-white/70 hover:text-white"
        aria-label="Next"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right"
          ><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path
            d="M5 12l14 0"
          ></path><path d="M15 16l4 -4"></path><path d="M15 8l4 4"></path></svg
        >
      </button>
    {/if}

    <button
      onclick={close}
      class="absolute top-4 right-4 z-10 cursor-pointer p-3 text-2xl leading-none text-white/70 hover:text-white"
      aria-label="Close"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="icon icon-tabler icons-tabler-filled icon-tabler-x"
        ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
          d="M6.707 5.293l5.293 5.292l5.293 -5.292a1 1 0 0 1 1.414 1.414l-5.292 5.293l5.292 5.293a1 1 0 0 1 -1.414 1.414l-5.293 -5.292l-5.293 5.292a1 1 0 1 1 -1.414 -1.414l5.292 -5.293l-5.292 -5.293a1 1 0 0 1 1.414 -1.414"
        /></svg
      ></button
    >
  </div>
{/if}
