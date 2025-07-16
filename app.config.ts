export default {
  expo: {
    name: 'Cherry Studio',
    slug: 'cherry-studio',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './src/assets/images/favicon.png',
    scheme: 'cherry-studio',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    entryPoint: './src/app.js',
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
      // output: 'static',
      favicon: './src/assets/images/favicon.png'
    },
    plugins: [
      ['expo-build-properties', { 
        ios: { deploymentTarget: '15.5' },
        android: {
          enableProguardInReleaseBuilds: false,
          enableShrinkResourcesInReleaseBuilds: false
        }
      }],
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
      'expo-sqlite',
      [
        'expo-document-picker',
        {
          iCloudContainerEnvironment: 'Production'
        }
      ],
      [
        'expo-image-picker',
        {
          photosPermission: 'The app accesses your photos to let you share them with your friends.'
        }
      ],
      [
        'expo-camera',
        {
          cameraPermission: 'Allow Cherry Studio App to access your camera',
          // microphonePermission: 'Allow Cherry Studio App to access your microphone',
          recordAudioAndroid: true
        }
      ]
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true
    },
    extra: {
      eas: {
        projectId: '6a3ba99f-bfbb-4302-b551-bebe0c8edb17'
      }
    }
  }
}
