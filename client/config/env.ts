/**
 * API Configuration for Vid2Note
 * 
 * IMPORTANT: Choose the correct API_URL based on your setup:
 * 
 * 1. iOS Simulator (on Mac):
 *    Use: http://localhost:5000/api
 * 
 * 2. Android Emulator:
 *    Use: http://10.0.2.2:5000/api
 *    (10.0.2.2 is the special alias for localhost from Android emulator)
 * 
 * 3. Physical iOS/Android Device:
 *    1. Open Command Prompt (Windows)
 *    2. Run: ipconfig
 *    3. Find "IPv4 Address" (usually starts with 192.168.x.x or 10.x.x.x)
 *    4. Use: http://YOUR_IP_ADDRESS:5000/api
 *    Example: http://192.168.1.100:5000/api
 * 
 * 4. Expo Go App (on phone):
 *    Use the machine's local IP address
 *    Find it: ipconfig -> IPv4 Address
 */

const ENV = {
    // Change this based on your environment (see instructions above)
    // API_URL: "http://localhost:5000/api",
    
    // For Android Emulator, uncomment:
    // API_URL: "http://10.0.2.2:5000/api",
    
    // For Physical Device/Expo Go, replace 192.168.1.100 with your machine's IP:
    API_URL: "http://192.168.1.75:5000/api",
};

export default ENV;