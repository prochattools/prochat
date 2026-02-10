import { ProductSlug } from "./types";

type GithubConfig = {
  pat: string;
  repoOwner: string;
  repoName: string;
};

type AddCollaboratorResult =
  | "ok"
  | "already"
  | { error: "not_found" | "forbidden" | "unknown"; message?: string };

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`[store] Missing required environment variable: ${name}`);
  }
  return value;
}

export function getGithubConfig(productSlug: ProductSlug): GithubConfig {
  const repoEnvName =
    productSlug === "prokit" ? "GITHUB_PROKIT_REPO" : "GITHUB_SAASKIT_REPO";
  const repo = getRequiredEnv(repoEnvName);

  const [repoOwner, repoName] = repo.split("/");
  if (!repoOwner || !repoName) {
    throw new Error(`[store] Invalid repository format in ${repoEnvName}`);
  }

  const pat =
    productSlug === "saaskit"
      ? process.env.GITHUB_SAASKIT_PAT?.trim() ||
        getRequiredEnv("GITHUB_PROKIT_PAT")
      : getRequiredEnv("GITHUB_PROKIT_PAT");

  return { pat, repoOwner, repoName };
}

export async function addCollaborator(
  productSlug: ProductSlug,
  githubUsername: string
): Promise<AddCollaboratorResult> {
  try {
    const { pat, repoOwner, repoName } = getGithubConfig(productSlug);
    const endpoint = `https://api.github.com/repos/${repoOwner}/${repoName}/collaborators/${githubUsername}`;

    const response = await fetch(endpoint, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${pat}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ permission: "pull" }),
    });

    if (response.status === 201) {
      return "ok";
    }
    if (response.status === 204) {
      return "already";
    }
    if (response.status === 404) {
      return { error: "not_found" };
    }
    if (response.status === 403) {
      return { error: "forbidden" };
    }

    const bodyText = await response.text();
    console.error("[store] GitHub collaborator API error", {
      productSlug,
      status: response.status,
      body: bodyText,
    });
    return { error: "unknown", message: `GitHub API status ${response.status}` };
  } catch (error) {
    console.error("[store] Failed to add GitHub collaborator", error);
    return { error: "unknown", message: "Request failed" };
  }
}
