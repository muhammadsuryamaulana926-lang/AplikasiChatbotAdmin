import { API_CONFIG } from '../config/api-config';

const API_URL = API_CONFIG.BACKEND_URL;

export async function loginApi(data) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Login gagal");
  }

  return res.json();
}

export async function getUsers() {
  try {
    const res = await fetch(`${API_URL}/api/users`);
    const data = await res.json();
    console.log('getUsers response:', data);
    return data;
  } catch (error) {
    console.error('getUsers error:', error);
    return { success: false, users: [] };
  }
}

export async function addUser(data) {
  const res = await fetch(`${API_URL}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateUser(id, data) {
  const res = await fetch(`${API_URL}/api/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteUser(id) {
  const res = await fetch(`${API_URL}/api/users/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

export async function toggleUserStatus(id, status) {
  const res = await fetch(`${API_URL}/api/users/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return res.json();
}

// Chat History APIs
export async function getChatHistory() {
  try {
    const res = await fetch(`${API_URL}/api/chat-history`);
    const data = await res.json();
    console.log('getChatHistory response:', data);
    return data;
  } catch (error) {
    console.error('getChatHistory error:', error);
    return [];
  }
}

export async function getChatMessages(chatHistoryId) {
  try {
    const res = await fetch(`${API_URL}/api/chat-history/${chatHistoryId}/messages`);
    const data = await res.json();
    console.log('getChatMessages response:', data);
    return data;
  } catch (error) {
    console.error('getChatMessages error:', error);
    return [];
  }
}

export async function deleteChatHistory(id) {
  const res = await fetch(`${API_URL}/api/chat-history/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

// Database Import from API
export async function previewApiData(data) {
  const res = await fetch(`${API_URL}/api/databases/preview-api`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function importDatabaseFromApi(data) {
  const res = await fetch(`${API_URL}/api/databases/import-from-api`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
