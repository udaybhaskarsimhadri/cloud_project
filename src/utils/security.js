// AdventureX Security & Authorization Utilities
// Prepares AWS Cognito Token validation, RBAC (Role-Based Access Control), and session management.

export const ROLES = {
  TRAVELER: 'traveler',
  ORGANIZER: 'organizer',
  ADMIN: 'admin'
};

export const PERMISSIONS = {
  CREATE_BOOKING: 'booking:create',
  MANAGE_BOOKING: 'booking:manage',
  CREATE_ADVENTURE: 'adventure:create',
  EDIT_ADVENTURE: 'adventure:edit',
  MODERATE_REVIEWS: 'reviews:moderate',
  ACCESS_ADMIN_PANEL: 'admin:access',
  VIEW_ORGANIZER_REVENUE: 'revenue:view'
};

const ROLE_PERMISSIONS_MAP = {
  [ROLES.TRAVELER]: [
    PERMISSIONS.CREATE_BOOKING,
    PERMISSIONS.MANAGE_BOOKING
  ],
  [ROLES.ORGANIZER]: [
    PERMISSIONS.CREATE_ADVENTURE,
    PERMISSIONS.EDIT_ADVENTURE,
    PERMISSIONS.VIEW_ORGANIZER_REVENUE
  ],
  [ROLES.ADMIN]: [
    PERMISSIONS.CREATE_BOOKING,
    PERMISSIONS.MANAGE_BOOKING,
    PERMISSIONS.CREATE_ADVENTURE,
    PERMISSIONS.EDIT_ADVENTURE,
    PERMISSIONS.MODERATE_REVIEWS,
    PERMISSIONS.ACCESS_ADMIN_PANEL,
    PERMISSIONS.VIEW_ORGANIZER_REVENUE
  ]
};

export const security = {
  /**
   * Check if user possesses required role
   */
  hasRole(user, requiredRole) {
    if (!user || !user.role) return false;
    if (user.role === ROLES.ADMIN) return true; // Super admin has all privileges
    return user.role.toLowerCase() === requiredRole.toLowerCase();
  },

  /**
   * Check if user possesses required permission
   */
  hasPermission(user, permission) {
    if (!user || !user.role) return false;
    const userPermissions = ROLE_PERMISSIONS_MAP[user.role.toLowerCase()] || [];
    return userPermissions.includes(permission);
  },

  /**
   * Generates mock Cognito Access Token for future API Gateway Authorization
   */
  generateMockCognitoToken(user) {
    const header = btoa(JSON.stringify({ alg: 'RS256', typ: 'JWT', kid: 'aws-cognito-2026' }));
    const payload = btoa(
      JSON.stringify({
        sub: user.id || 'usr-mock-sub',
        email: user.email,
        'cognito:groups': [user.role || 'traveler'],
        name: user.name,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 86400, // 24 hours
        iss: 'https://cognito-idp.ap-south-1.amazonaws.com/ap-south-1_AdvxPool2026'
      })
    );
    return `${header}.${payload}.MOCK_COGNITO_SIGNATURE`;
  },

  /**
   * Validates token expiration
   */
  isTokenExpired(token) {
    if (!token) return true;
    try {
      const parts = token.split('.');
      if (parts.length < 2) return true;
      const payload = JSON.parse(atob(parts[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }
};

export default security;
