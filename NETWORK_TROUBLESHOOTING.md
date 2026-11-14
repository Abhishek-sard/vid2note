# Network Error Troubleshooting Guide

## 🔍 Common Network Errors & Solutions

### Error: `AxiosError: Network Error`

**Cause:** The app can't reach the API server. The client picks a default address for the platform:

| Setup | Default API host |
|---|---|
| Android emulator | `10.0.2.2` |
| Expo Go on a physical device | The host running Expo |
| iOS simulator or web | `localhost` |

To use a different address, set `EXPO_PUBLIC_API_URL` before starting Expo, for example:

```powershell
$env:EXPO_PUBLIC_API_URL = "http://192.168.1.100:5000/api"
npm start
```

Replace `192.168.1.100` with the computer's current LAN IPv4 address when using a physical device. The device and computer must be on the same network.
If Expo is started with `--tunnel`, the Expo host may not be the API server. Set `EXPO_PUBLIC_API_URL` to the computer's LAN address instead. For a custom Android development or production build, rebuild the app after changing its network settings.

## 🧪 Testing Connection

### Check the server is running

```powershell
npm start
```

Run that in the `server` directory. The server listens on port 5000.

### Test the API endpoint

```powershell
Invoke-RestMethod http://localhost:5000/
```

The root endpoint should return a JSON message indicating the API is running.

For a physical device, open `http://<computer-LAN-IP>:5000/` in the device browser. If it does not load, check that Windows Firewall permits inbound TCP traffic on port 5000 for the Private network profile. The Android app is configured to allow HTTP for this local development API; use HTTPS and disable cleartext traffic before shipping a production server.

## 📋 Checklist

- [ ] Server running in `server/` on port 5000
- [ ] Client and server are on the same network when using a physical device
- [ ] App is on same network as server (for physical devices)
- [ ] Windows Firewall permits inbound connections to port 5000
- [ ] If using a custom address, `EXPO_PUBLIC_API_URL` is set and Expo has been restarted
