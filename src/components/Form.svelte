<script>
  const FORMSPARK_ACTION_URL = "https://submit-form.com/oQFYg1zW";

  let message = $state("");
  let email = $state("");
  let submitting = $state(false);

  async function onSubmit() {
    try {
      submitting = true;
      await fetch(FORMSPARK_ACTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          message,
          email,
        }),
      });
      message = "";
      alert("Success! Il get back to you soon!");
    } finally {
      submitting = false;
    }
  }
</script>

<div class="mx-auto mt-20 flex max-w-5xl p-1">
  <form
    class="mx-auto flex w-full flex-col items-center gap-4 px-3 text-white md:w-1/2 md:px-0"
    onsubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}
  >
    <h2 class="text-4xl font-bold">Contact Me</h2>
    <p class="text-base font-medium">
      Leave your email and a message below and il get back to you! Or find me on
      any of my socials!
    </p>
    <div class="flex w-full flex-col rounded-xl border border-neutral-500/50">
      <input
        required
        bind:value={email}
        type="email"
        placeholder="your email address..."
        class="w-full rounded-t-xl bg-transparent px-4 py-2 text-neutral-400 placeholder:text-neutral-700 focus:ring-2 focus:ring-neutral-700/50 focus:outline-none"
      />
      <textarea
        required
        class="w-full rounded-b-xl border-t border-neutral-500/50 bg-transparent px-4 py-2 text-neutral-400 placeholder:text-neutral-700 focus:ring-2 focus:ring-neutral-700/50 focus:outline-none"
        bind:value={message}
        placeholder="something nice hopefully..."
        rows="5"
      ></textarea>
    </div>

    <button
      class="w-1/2 rounded-xl border border-neutral-500/50 bg-neutral-800/50 px-4 py-2 transition-colors hover:bg-neutral-800 disabled:opacity-50"
      type="submit"
      disabled={submitting}>Send</button
    >
  </form>
</div>
