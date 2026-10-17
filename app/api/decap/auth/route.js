// Step 1 of the Decap CMS GitHub login: send the editor to GitHub's consent screen.
// Needs GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET from a GitHub OAuth App whose callback URL
// is https://<site>/api/decap/callback.
import { NextResponse } from "next/server";

export async function GET(request) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return new NextResponse("CMS login is not configured: set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET.", { status: 500 });
  }

  const origin = new URL(request.url).origin;
  const state = crypto.randomUUID();
  const authorize = new URL("https://github.com/login/oauth/authorize");
  authorize.searchParams.set("client_id", clientId);
  authorize.searchParams.set("redirect_uri", `${origin}/api/decap/callback`);
  authorize.searchParams.set("scope", "repo,user");
  authorize.searchParams.set("state", state);

  const res = NextResponse.redirect(authorize);
  res.cookies.set("decap_oauth_state", state, { httpOnly: true, secure: true, sameSite: "lax", path: "/api/decap", maxAge: 600 });
  return res;
}
