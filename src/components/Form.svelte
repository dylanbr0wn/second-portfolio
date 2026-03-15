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

<div class="max-w-5xl p-1 mx-auto flex">
  <form
    class="flex flex-col gap-3 w-1/2 text-white"
    onsubmit={(e) => { e.preventDefault(); onSubmit(); }}
  >
    <h2 class="text-4xl font-bold ">Contact Me</h2>
    <p class="text-base font-medium">
      Leave your email and a message below and il get back to you! Or find me on
      any of my socials!
    </p>
    <div class="rounded-xl border border-neutral-500/50 flex flex-col">
      <input
        required
        bind:value={email}
        type="email"
        placeholder="your email address..."
        class="text-neutral-400 bg-transparent rounded-t-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-700/50 placeholder:text-neutral-700"
      />
      <textarea
        required
        class="text-neutral-400 bg-transparent border-t rounded-b-xl border-neutral-500/50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-700/50 placeholder:text-neutral-700"
        bind:value={message}
        placeholder="something nice hopefully..."
        rows="5"
      ></textarea>
    </div>

    <button
      class="w-1/2 px-4 py-2 disabled:opacity-50 rounded-xl border border-neutral-500/50 bg-neutral-800/50 hover:bg-neutral-800 transition-colors"
      type="submit"
      disabled={submitting}>Send</button
    >
  </form>
</div>
