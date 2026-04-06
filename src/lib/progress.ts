"use client";

const FAMILY_ID_KEY = "baby-learn-family-id";

export function getFamilyId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(FAMILY_ID_KEY);
}

export function setFamilyId(id: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(FAMILY_ID_KEY, id);
  }
}

export async function saveProgress(
  module: string,
  lessonId: string,
  stars: number,
  completed: boolean
) {
  const familyId = getFamilyId();
  if (!familyId) return null;

  try {
    const res = await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ familyId, module, lessonId, stars, completed }),
    });
    return await res.json();
  } catch {
    // Save to localStorage as fallback
    const key = `progress-${module}-${lessonId}`;
    localStorage.setItem(key, JSON.stringify({ stars, completed }));
    return null;
  }
}

export async function loadProgress(familyId: string) {
  try {
    const res = await fetch(`/api/progress?familyId=${familyId}`);
    const data = await res.json();
    return data.progress || [];
  } catch {
    return [];
  }
}

export function getTotalStars(): number {
  if (typeof window === "undefined") return 0;
  const stars = localStorage.getItem("baby-learn-total-stars");
  return stars ? parseInt(stars, 10) : 0;
}

export function addStars(count: number) {
  if (typeof window === "undefined") return;
  const current = getTotalStars();
  localStorage.setItem("baby-learn-total-stars", String(current + count));
}
