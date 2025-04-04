// src/api/client.ts
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public errors?: Record<string, string[]>
  ) {
    // Get the first error message from the response
    const firstError = errors ? Object.values(errors)[0]?.[0] : message;
    super(firstError || 'An unknown error occurred');
    
    this.name = 'ApiError';
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}


export const fetchApi = async <T>(
  endpoint: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'| 'PATCH';
    body?: Record<string, unknown>;
    params?: Record<string, any>;
  } = {}
): Promise<T> => {
  const { method = 'GET', body, params = {} } = options;

  // Process query parameters for GET requests
  const processedParams = method === 'GET' 
    ? Object.fromEntries(
        Object.entries(params)
          .filter(([_, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, Array.isArray(value) ? value.join(',') : value])
      )
    : {};

  const queryString = method === 'GET' 
    ? `?${new URLSearchParams(processedParams).toString()}`
    : '';

  const url = `${import.meta.env.VITE_Base_URL}/${endpoint}${queryString}`;
 
  
  const token = localStorage.getItem('Tutortoken');

  const headers = new Headers({
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  if (method !== 'GET' && body) {
    headers.set('Content-Type','application/json');
  }

  const response = await fetch(url, {
    method,
    headers,
    body: method !== 'GET' ? (typeof body === 'string' ? body : JSON.stringify(body || params))  : undefined,
  });
  console.log('Request body:', method !== 'GET' 
    ? JSON.stringify(body || params)
    
  : undefined
);
  if (!response.ok) {
    const errorData = await response.json();
    throw new ApiError(
      response.status,
      errorData.message || 'API Error',
      errorData.errors
    );
  }

  return response.json();
};
