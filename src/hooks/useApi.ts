type Request = {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: object;
  headers?: HeadersInit;
};

const baseUrl = "https://painel.ongoldtech.com/api/tests/public";

export async function useApi<T>({
  endpoint,
  method = "GET",
  body,
  headers,
}: Request): Promise<T> {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...(body && method !== "GET" ? { body: JSON.stringify(body) } : {}),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized");
    }

    if (response.status === 403) {
      throw new Error("Forbidden");
    }

    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}
