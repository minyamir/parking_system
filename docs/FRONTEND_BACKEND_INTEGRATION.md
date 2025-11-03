# Frontend-Backend Integration Guide

## Setup & Configuration

### 1. Environment Variables
Create `.env.local` in your frontend project:
\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_API_URL_PRODUCTION=https://parkmini.vercel.app
\`\`\`

### 2. API Client Setup
Create a reusable API client in `lib/api-client.ts`:
\`\`\`typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function apiCall(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  const response = await fetch(\`\${API_URL}/api\${endpoint}\`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    throw new Error(\`API Error: \${response.statusText}\`)
  }

  return response.json()
}
\`\`\`

## Integration Examples

### Login Integration
\`\`\`typescript
// In your login form component
const handleLogin = async (email: string, password: string) => {
  const response = await apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

  localStorage.setItem('token', response.token)
  localStorage.setItem('user', JSON.stringify(response.user))
  // Redirect to dashboard
}
\`\`\`

### Fetching Parking Spaces
\`\`\`typescript
// In useEffect or server component
const spaces = await apiCall('/parking-spaces?status=available&level=1')
setParkingSpaces(spaces.spaces)
\`\`\`

### Creating Reservation
\`\`\`typescript
const handleReserve = async (spaceId: string, duration: number) => {
  const response = await apiCall('/reservations', {
    method: 'POST',
    body: JSON.stringify({
      spaceId,
      userId: user.id,
      duration,
      level: 1,
    }),
  })

  // Update UI
  showSuccessMessage('Space reserved!')
}
\`\`\`

## Data Flow Diagram

\`\`\`
User Interface
     ↓
  (Request)
     ↓
Frontend (React Component)
     ↓
  (apiCall)
     ↓
Next.js API Route (/api/endpoint)
     ↓
Backend Logic (Validation, Processing)
     ↓
Database Query
     ↓
Response Back Through Stack
\`\`\`

## Real-time Updates Strategy

### Option 1: Polling (Simple)
\`\`\`typescript
useEffect(() => {
  const interval = setInterval(() => {
    fetchParkingSpaces()
  }, 5000) // Refresh every 5 seconds

  return () => clearInterval(interval)
}, [])
\`\`\`

### Option 2: WebSocket (Advanced)
\`\`\`typescript
const ws = new WebSocket('wss://parkmini.com/ws')

ws.onmessage = (event) => {
  const data = JSON.parse(event.data)
  setParkingSpaces(data.spaces)
}
\`\`\`

## Error Handling

\`\`\`typescript
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(\`\${API_URL}/api\${endpoint}\`, options)
    
    if (response.status === 401) {
      // Token expired, redirect to login
      localStorage.removeItem('token')
      window.location.href = '/login'
    }

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }

    return response.json()
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}
\`\`\`

## Testing API Endpoints

Using curl or Postman:

\`\`\`bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@parkmini.com","password":"demo123"}'

# Get parking spaces
curl http://localhost:3000/api/parking-spaces?status=available

# Create reservation
curl -X POST http://localhost:3000/api/reservations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"spaceId":"A1","userId":"user-123","duration":2,"level":1}'
