import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "aimstechsystem", appId: "1:526062597380:web:4a506bf795ef385b108c51", storageBucket: "aimstechsystem.firebasestorage.app", apiKey: "AIzaSyBrN3UPDcBgKb6APNxg_FITezsUKnPTBSk", authDomain: "aimstechsystem.firebaseapp.com", messagingSenderId: "526062597380", measurementId: "G-0EV3QXELN6" })), provideFirestore(() => getFirestore())
  ]
};
