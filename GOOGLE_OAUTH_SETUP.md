# Google OAuth Setup Guide - Family Business Hub

## 🔐 **Setting Up Google Authentication**

This guide will walk you through setting up Google OAuth 2.0 authentication for your Family Business Hub, allowing users to sign in with their Google accounts.

## 📋 **Prerequisites**

- Google account
- Google Cloud Console access
- Your website domain (or localhost for testing)

## 🚀 **Step-by-Step Setup**

### **Step 1: Create a Google Cloud Project**

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**
2. **Click "New Project"** or select existing project
3. **Enter project name**: `Family Business Hub` (or your preferred name)
4. **Click "Create"**

### **Step 2: Enable Google Identity Services**

1. **Navigate to APIs & Services → Library**
2. **Search for "Google Identity"**
3. **Click "Google Identity Services API"**
4. **Click "Enable"**

### **Step 3: Configure OAuth Consent Screen**

1. **Go to APIs & Services → OAuth consent screen**
2. **Choose "External" user type** (unless you have Google Workspace)
3. **Fill out the required information**:
   - **App name**: `Family Business Hub`
   - **User support email**: Your email address
   - **Developer contact email**: Your email address
   - **App domain**: Your website domain (e.g., `familybusinesshub.com`)
   - **Authorized domains**: Add your domain
4. **Add scopes** (if prompted):
   - `openid`
   - `email`
   - `profile`
5. **Save and continue**

### **Step 4: Create OAuth Credentials**

1. **Go to APIs & Services → Credentials**
2. **Click "Create Credentials" → OAuth client ID**
3. **Choose "Web application"**
4. **Configure the details**:
   - **Name**: `Family Business Hub Web Client`
   - **Authorized JavaScript origins**:
     - For testing: `http://localhost:3000`, `http://127.0.0.1:3000`
     - For production: `https://yourdomain.com`
     - For GitHub Pages: `https://yourusername.github.io`
   - **Authorized redirect URIs**:
     - For testing: `http://localhost:3000/login.html`
     - For production: `https://yourdomain.com/login.html`
     - For GitHub Pages: `https://yourusername.github.io/family-business-hub/login.html`
5. **Click "Create"**
6. **Copy the Client ID** (looks like: `123456789-abcdefg.apps.googleusercontent.com`)

### **Step 5: Configure Your Application**

1. **Open your `login.html` file**
2. **Find the AUTH_CONFIG section**
3. **Replace the Google Client ID**:

```javascript
const AUTH_CONFIG = {
    // ... other settings ...
    
    // Google OAuth Settings
    googleClientId: 'YOUR_ACTUAL_CLIENT_ID.apps.googleusercontent.com', // Replace this
    enableGoogleAuth: true,
    autoCreateGoogleUsers: true,
    
    // ... other settings ...
};
```

### **Step 6: Test the Setup**

1. **Open your `login.html` file** in a browser
2. **Click the "Google" button**
3. **You should see the Google sign-in popup**
4. **Sign in with your Google account**
5. **You should be redirected to the main application**

## ⚙️ **Configuration Options**

You can customize the Google authentication behavior in your `AUTH_CONFIG`:

```javascript
const AUTH_CONFIG = {
    // Google OAuth Settings
    googleClientId: 'your-client-id.apps.googleusercontent.com',
    enableGoogleAuth: true,              // Enable/disable Google authentication
    autoCreateGoogleUsers: true,         // Automatically create accounts for Google users
    
    // If autoCreateGoogleUsers is true:
    defaultUserRole: 'member',           // Default role for new Google users
    requireAdminApproval: false,         // Require admin approval for Google users
    
    // If autoCreateGoogleUsers is false:
    // Users must create an account first, then can link Google
};
```

## 🔧 **Configuration Scenarios**

### **Scenario 1: Open Registration (Recommended)**

```javascript
googleClientId: 'your-client-id.apps.googleusercontent.com',
enableGoogleAuth: true,
autoCreateGoogleUsers: true,
defaultUserRole: 'member',
requireAdminApproval: false
```

**Result**: Anyone with a Google account can sign in and get immediate access.

### **Scenario 2: Moderated Registration**

```javascript
googleClientId: 'your-client-id.apps.googleusercontent.com',
enableGoogleAuth: true,
autoCreateGoogleUsers: true,
defaultUserRole: 'viewer',
requireAdminApproval: true
```

**Result**: Google users can sign up, but need admin approval before accessing the platform.

### **Scenario 3: Invite-Only**

```javascript
googleClientId: 'your-client-id.apps.googleusercontent.com',
enableGoogleAuth: true,
autoCreateGoogleUsers: false,
requireAdminApproval: false
```

**Result**: Only users who already have accounts can use Google to sign in.

## 🛡️ **Security Best Practices**

### **1. Domain Verification**

- Always verify your domain in Google Cloud Console
- Only add trusted domains to authorized origins

### **2. Client ID Protection**

- Your Client ID is public, but keep your Client Secret private
- Never expose Client Secret in frontend code

### **3. User Data Handling**

- Only request necessary scopes (email, profile)
- Store minimal user data from Google
- Comply with Google's User Data Policy

### **4. Testing vs Production**

- Use separate OAuth clients for testing and production
- Different domains for different environments

## 📱 **User Experience Features**

### **Auto-Account Creation**

When a user signs in with Google for the first time:

1. **Account created automatically** with Google profile info
2. **Email verified** (since Google verifies emails)
3. **Profile picture** imported from Google
4. **Business name** defaults to "{FirstName}'s Business"

### **Existing User Login**

When a user with an existing account signs in with Google:

1. **Matches by email address**
2. **Links Google account** to existing profile
3. **Updates profile picture** from Google
4. **Maintains existing role and permissions**

### **Error Handling**

- Clear error messages for configuration issues
- Fallback to email/password if Google fails
- Helpful instructions for users

## 🚨 **Troubleshooting**

### **"Google authentication is not configured"**

- Check that your Client ID is set correctly
- Ensure it ends with `.apps.googleusercontent.com`
- Verify the Client ID in Google Cloud Console

### **"Origin not allowed"**

- Add your domain to "Authorized JavaScript origins"
- Include both `http://` and `https://` versions if needed
- For GitHub Pages: `https://yourusername.github.io`

### **"Popup blocked"**

- Modern browsers may block popups
- Users need to allow popups for your domain
- Consider using redirect flow instead of popup

### **"Invalid client ID"**

- Double-check the Client ID is copied correctly
- Ensure no extra spaces or characters
- Verify the project is active in Google Cloud Console

## 🔄 **Advanced Features**

### **Custom Button Styling**

The Google button automatically updates its text to "Continue with Google" when properly configured.

### **User Profile Integration**

Google users get:

- ✅ Profile picture from Google
- ✅ Verified email address
- ✅ First and last name
- ✅ Automatic account linking

### **Admin Management**

Admins can:

- See which users signed up via Google
- Manage Google user permissions
- View Google profile pictures in user management

## 📞 **Support**

### **Google Support**

- [Google Identity Documentation](https://developers.google.com/identity)
- [OAuth 2.0 Troubleshooting](https://developers.google.com/identity/oauth2/web/guides/troubleshooting)

### **Common Issues**

1. **Testing on localhost**: Use `http://localhost:3000` not `127.0.0.1`
2. **GitHub Pages**: Use the full GitHub Pages URL
3. **Domain changes**: Update authorized origins when deploying

## ✅ **Quick Checklist**

Before going live, ensure:

- [ ] Google Cloud project created
- [ ] OAuth consent screen configured
- [ ] Client ID created and configured
- [ ] Authorized origins include your domain
- [ ] Client ID added to `login.html`
- [ ] Google authentication tested
- [ ] Error handling verified
- [ ] User account creation tested

## 🎯 **Next Steps**

Once Google OAuth is working:

1. **Test with multiple Google accounts**
2. **Deploy to your production domain**
3. **Update authorized origins for production**
4. **Train users on the new login flow**
5. **Monitor authentication logs**

Your Family Business Hub now supports secure, professional Google authentication! 🚀
