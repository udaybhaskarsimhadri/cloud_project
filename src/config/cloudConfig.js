// AdventureX Cloud Architecture Configuration (AWS Ready)
// Centralized configuration for future Amazon Web Services cloud deployment.
// All endpoints, ARNs, bucket identifiers, and table names are abstracted here.

const ENV = import.meta.env || {};

export const CLOUD_CONFIG = {
  // AWS Core Region
  region: ENV.VITE_AWS_REGION || 'ap-south-1', // Mumbai Region (Low Latency for Indian Expeditions)
  environment: ENV.MODE || 'production',
  isDev: Boolean(ENV.DEV),

  // API Gateway & Edge Distribution
  api: {
    baseUrl: ENV.VITE_API_BASE_URL || 'https://api.adventurex.in/v1',
    timeoutMs: 10000,
    retryAttempts: 3,
    endpoints: {
      auth: '/auth',
      adventures: '/adventures',
      bookings: '/bookings',
      payments: '/payments',
      reviews: '/reviews',
      community: '/community',
      notifications: '/notifications',
      ai: '/ai/completion',
      organizer: '/organizer',
      admin: '/admin'
    }
  },

  // Amazon CloudFront CDN
  cloudFront: {
    domain: ENV.VITE_CLOUDFRONT_DOMAIN || 'https://d123456abcdef8.cloudfront.net',
    mediaPrefix: '/media/expeditions/',
    avatarPrefix: '/media/avatars/'
  },

  // Amazon Simple Storage Service (S3)
  s3: {
    bucketName: ENV.VITE_S3_BUCKET_NAME || 'adventurex-media-prod-ap-south-1',
    presignedUrlExpirySeconds: 900, // 15 mins
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
    maxUploadSizeBytes: 10 * 1024 * 1024 // 10MB
  },

  // Amazon Cognito User Pools & Identity
  cognito: {
    userPoolId: ENV.VITE_COGNITO_USER_POOL_ID || 'ap-south-1_AdvxPool2026',
    appClientId: ENV.VITE_COGNITO_APP_CLIENT_ID || '4abcdefghij1234567890klmno',
    identityPoolId: ENV.VITE_COGNITO_IDENTITY_POOL_ID || 'ap-south-1:12345678-abcd-1234-abcd-1234567890ab',
    authFlow: 'USER_SRP_AUTH',
    tokenExpiryHours: 24
  },

  // Amazon DynamoDB Multi-Table Schema
  dynamoDB: {
    tables: {
      adventures: 'AdventureX_Adventures_Prod',
      bookings: 'AdventureX_Bookings_Prod',
      users: 'AdventureX_Users_Prod',
      reviews: 'AdventureX_Reviews_Prod',
      posts: 'AdventureX_CommunityPosts_Prod',
      notifications: 'AdventureX_Notifications_Prod',
      loyalty: 'AdventureX_Loyalty_Prod',
      events: 'AdventureX_Events_Prod'
    }
  },

  // Amazon Simple Email Service (SES) & SNS
  messaging: {
    sesSenderEmail: 'no-reply@adventurex.in',
    supportEmail: 'expeditions@adventurex.in',
    snsAlertTopicArn: 'arn:aws:sns:ap-south-1:123456789012:AdventureX_Alerts'
  },

  // Amazon Bedrock Generative AI
  bedrock: {
    modelId: 'anthropic.claude-3-5-haiku-20241022-v1:0',
    maxTokens: 1024,
    temperature: 0.7
  },

  // Amazon CloudWatch & X-Ray Observability
  observability: {
    logGroupName: '/aws/lambda/AdventureX_Services',
    metricsNamespace: 'AdventureX/Expeditions',
    sampleRate: 0.1
  },

  // AWS Secrets Manager
  secrets: {
    paymentGatewaySecretArn: 'arn:aws:secretsmanager:ap-south-1:123456789012:secret:AdventureX/PaymentGatewayKeys-X7yZ'
  },

  // Local Cache & Mock Simulation Settings
  clientSettings: {
    cacheTTLMinutes: 15,
    mockNetworkLatencyMs: 180, // Realistic snappy cloud latency
    enableOfflineCache: true,
    autoRetry: true
  }
};

export default CLOUD_CONFIG;
