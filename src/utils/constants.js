// Everything this site claims about me lives here, once. The page metadata, the
// web manifest and the CV in public/posts/readme.md all read from this file, so
// a fact can't be stated two different ways in two different places.

// First job on the CV — Junior Developer, September 2006. Month is 0-based.
export const CAREER_START = new Date(2006, 8);

export const NAME = "Iker Garitaonandia";

// Used by both the page title and the manifest name. The CV describes me as a
// "professional software developer", so that is the one wording.
export const ROLE = "Software Developer";
export const SITE_TITLE = `${NAME} | ${ROLE}`;

/**
 * Completed years since CAREER_START.
 *
 * Derived rather than written down, because a hardcoded number goes stale every
 * birthday of the career — which is how the metadata came to say "+15" while
 * the CV said "+18". Evaluated when the site is built; a rebuild refreshes it.
 *
 * @param {Date} [now] - The moment to count up to. Defaults to today.
 * @return {number} - Whole years of experience.
 */
export function getExperienceYears(now = new Date()) {
  const years = now.getFullYear() - CAREER_START.getFullYear();
  const beforeAnniversary =
    now.getMonth() < CAREER_START.getMonth() ||
    (now.getMonth() === CAREER_START.getMonth() &&
      now.getDate() < CAREER_START.getDate());

  return beforeAnniversary ? years - 1 : years;
}

export const EXPERIENCE_YEARS = getExperienceYears();

export const DESCRIPTION = `Professional software developer with +${EXPERIENCE_YEARS} years of experience helping companies achieve digital transformation.`;

export const KEYWORDS = [
  "Software developer",
  "Engineer",
  "Web developer",
  "JavaScript",
  "Frontend",
  "HTML",
  "CSS",
];

export const THEME_COLOR = "#0E5389";

export const APP_ICONS = [
  { src: "/wp/icon16.png", sizes: "16x16" },
  { src: "/wp/icon64.png", sizes: "64x64" },
  { src: "/wp/icon192.png", sizes: "192x192" },
  { src: "/wp/icon256.png", sizes: "256x256" },
];

// The avatar the desktop README icon shows. The OpenGraph card uses the same
// one so a link preview and the site show the same face.
export const GRAVATAR =
  "https://gravatar.com/avatar/0d6431f3ce241c8c688dfd7831b511c8?s=200";
export const GRAVATAR_CG =
  "https://gravatar.com/avatar/459ef62b512b99129e128c2bc6541278193b3b894e2ea44329a9d3f797d79d98?size=200";
