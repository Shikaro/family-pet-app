const baseUrl = import.meta.env.VITE_API_URL || "/api";

function getToken(): string | null {
  return localStorage.getItem("token");
}

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${baseUrl}${url}`, { ...options, headers });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || `Ошибка ${response.status}`);
  }

  return response.json();
}

// Auth
export async function register(name: string, email: string, password: string) {
  return request<{ token: string; family: any }>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

export async function login(email: string, password: string) {
  return request<{ token: string; family: any }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function getMe() {
  return request<{ family: any }>("/auth/me");
}

// Children
export async function addChild(name: string, age: number, gender: string) {
  return request<any>("/children", {
    method: "POST",
    body: JSON.stringify({ name, age, gender }),
  });
}

export async function getChildren() {
  return request<any[]>("/children");
}

// Pets
export async function choosePet(childId: string, type: string, name: string) {
  return request<any>("/pets/choose", {
    method: "POST",
    body: JSON.stringify({ childId, type, name }),
  });
}

export async function getPet(childId: string) {
  return request<any>(`/pets/${childId}`);
}

export async function feedPet(childId: string) {
  return request<any>(`/pets/${childId}/feed`, { method: "POST" });
}

export async function playPet(childId: string) {
  return request<any>(`/pets/${childId}/play`, { method: "POST" });
}

// Tasks
export async function initTasks() {
  return request<any>("/tasks/init", { method: "POST" });
}

export async function getTasks(childId?: string, timeOfDay?: string) {
  const params = new URLSearchParams();
  if (childId) params.set("childId", childId);
  if (timeOfDay) params.set("timeOfDay", timeOfDay);
  return request<any[]>(`/tasks?${params}`);
}

export async function completeTask(taskId: string, childId: string) {
  return request<any>(`/tasks/${taskId}/complete`, {
    method: "POST",
    body: JSON.stringify({ childId }),
  });
}

export async function getCompletions(childId: string) {
  return request<any[]>(`/tasks/completions?childId=${childId}`);
}

// Dashboard
export async function getChildDashboard(childId: string) {
  return request<any>(`/dashboard/child/${childId}`);
}

export async function getParentDashboard() {
  return request<any>(`/dashboard/parent`);
}

// Rewards / Shop
export async function getRewards() {
  return request<any[]>("/rewards");
}

export async function createReward(title: string, cost: number, emoji: string, description: string) {
  return request<any>("/rewards", {
    method: "POST",
    body: JSON.stringify({ title, cost, emoji, description }),
  });
}

export async function updateReward(id: string, data: { title?: string; cost?: number; emoji?: string; description?: string }) {
  return request<any>(`/rewards/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteReward(id: string) {
  return request<any>(`/rewards/${id}`, { method: "DELETE" });
}

export async function redeemReward(rewardId: string, childId: string) {
  return request<any>(`/rewards/${rewardId}/redeem`, {
    method: "POST",
    body: JSON.stringify({ childId }),
  });
}
