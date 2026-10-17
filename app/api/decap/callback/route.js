// Step 2 of the Decap CMS GitHub login: swap GitHub's code for a token and hand it back
// to the CMS window that opened this popup (Decap's postMessage handshake).
import { NextResponse } from "next/server";

// JSON inside an inline <script>: escape "<" so a value can never close the tag.
const ESCAPED_LT = String.fromCharCode(92) + "u003c"; // backslash + "u003c", the JSON escape for "<"
const js = (v) => JSON.stringify(v).split("<").join(ESCAPED_LT);

function reply(origin, status, content) {
  const message = `authorization:github:${status}:${JSON.stringify(content)}`;
  const html = `<!doctype html><html><body><script>
(function () {
  var origin = ${js(origin)};
  function receive(e) {
    if (e.origin !== origin) return;
    window.opener.postMessage(${js(message)}, origin);
    window.removeEventListener("message", receive, false);
  }
  window.addEventListener("message", receive, false);
  window.opener.postMessage("authorizing:github", origin);
})();
</script></body></html>`;
  const res = new NextResponse(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
  res.cookies.delete({ name: "decap_oauth_state", path: "/api/decap" });
  return res;
}

export async function GET(request) {
  const url = new URL(request.url);
  const origin = url.origin;
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const expected = request.headers.get("cookie")?.match(/(?:^|;\s*)decap_oauth_state=([^;]+)/)?.[1];

  if (!code || !state || state !== expected) {
    return reply(origin, "error", { message: "Login expired or was tampered with — please try again." });
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: `${origin}/api/decap/callback`,
    }),
  });
  const data = await tokenRes.json();

  if (!data.access_token) {
    return reply(origin, "error", { message: data.error_description || "GitHub did not return a token." });
  }
  return reply(origin, "success", { token: data.access_token, provider: "github" });
}
