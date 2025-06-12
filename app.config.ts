export default {
  expo: {
    name: 'cherry-studio-app',
    slug: 'cherry-studio',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './src/assets/images/favicon.png',
    scheme: 'cherry-studio',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.anonymous.cherrystudio'
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './src/assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff'
      },
      package: 'com.anonymous.cherrystudio'
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './src/assets/images/favicon.png'
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './src/assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff'
        }
      ],
      'expo-localization',
      'expo-asset',
      'expo-font',
      'expo-web-browser',
      'expo-sqlite'
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      eas: {
        projectId: '6a3ba99f-bfbb-4302-b551-bebe0c8edb17'
      }
    }
  }
}
