# Network Error Troubleshooting Guide

## ✅ What We Fixed

1. **CORS Configuration** - Updated server to properly handle cross-origin requests
2. **API Error Interceptor** - Added detailed error logging to identify connection issues
3. **Request Timeout** - Set 30-second timeout to catch hanging requests
4. **Environment Configuration** - Added comprehensive comments explaining API URL setup

## 🔍 Common Network Errors & Solutions

### Error: `AxiosError: Network Error`

**Cause:** The app can't reach the server at `http://localhost:5000/api`

**Solution:** Use the correct API URL for your setup:

#### For iOS Simulator (Mac):
```typescript
// In client/config/env.ts
API_URL: "http://localhost:5000/api"
```

#### For Android Emulator:
```typescript
// In client/config/env.ts
API_URL: "http://10.0.2.2:5000/api"
```
⚠️ Android emulator cannot access `localhost` directly. Use `10.0.2.2` instead.

#### For Physical Device or Expo Go:
1. Find your machine's IP address:
   ```powershell
   ipconfig
   ```
2. Look for "IPv4 Address" (usually 192.168.x.x or 10.x.x.x)

3. Update env.ts:
   ```typescript
   // In client/config/env.ts
   API_URL: "http://192.168.1.100:5000/api"  // Replace with your IP
   ```

## 🧪 Testing Connection

### Option 1: Check Server is Running
```powershell
# Windows - Check if port 5000 is listening
netstat -ano | findstr :5000

# Should show: TCP    0.0.0.0:5000    LISTENING
```

### Option 2: Test API Endpoint
```powershell
# From your machine
curl http://localhost:5000/api

# Expected response:
# {"success":true,"message":"video Notes AI API Running"}
```

### Option 3: From Expo App
The app will now show detailed error messages. Check:
1. Home screen "Generate Notes" button
2. Upload screen "Generate Notes" button

Watch for error messages that will show:
- `Cannot connect to server at http://localhost:5000/api`
- Network connection details
- Specific error codes

## 🛠️ Server Configuration

**Backend is running at:**
- ✅ Port: 5000
- ✅ CORS: Enabled for cross-origin requests
- ✅ Timeout: 30 seconds per request
- ✅ MongoDB: Connected
- ✅ Gemini API: Configured

## 📋 Checklist

- [ ] Server running: `npm start` in `server/` folder
- [ ] Correct API_URL in `client/config/env.ts`
- [ ] App is on same network as server (for physical devices)
- [ ] Firewall not blocking port 5000
- [ ] Browser can access `http://localhost:5000/api` (test in browser)

## 🚀 Next Steps

1. **Update client/config/env.ts** with your setup's API URL
2. **Restart the Expo app** (reload/restart)
3. **Try generating notes** - error messages will be more descriptive
4. **Check browser console** for detailed error logs

## 📱 For Different Environments

| Environment | API_URL | Notes |
|------------|---------|-------|
| iOS Simulator (Mac) | `http://localhost:5000/api` | Direct localhost access |
| Android Emulator | `http://10.0.2.2:5000/api` | Special alias for host machine |
| Physical Device (WiFi) | `http://192.168.1.X:5000/api` | Use your machine's local IP |
| Expo Go (Phone) | `http://192.168.1.X:5000/api` | Use your machine's local IP |
| Web (Browser) | `http://localhost:5000/api` | Direct localhost access |

## 💡 Debugging Tips

If you still see network errors:

1. **Check server logs** - Look for errors in the terminal where `npm start` runs
2. **Verify connectivity** - Ping your machine from the device
3. **Disable firewall temporarily** - Test if Windows Firewall is blocking
4. **Check ports** - Make sure nothing else is using port 5000
5. **Use browser first** - Test the API in browser before testing in app

