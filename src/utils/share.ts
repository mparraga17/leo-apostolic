// ============================================================
// share.ts — UTILIDAD DE COMPARTIR
// ============================================================
// Wrapper sobre Share nativo de React Native con haptic feedback.
// Compatible con iOS (action sheet) y Android (intent picker).
// ============================================================

import { Share, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

const APP_TAG = 'Leo Apostolic';

interface ShareOptions {
  title?: string;
  message: string;
  url?: string;
}

/**
 * Abre la share sheet del sistema para compartir un texto.
 * Devuelve true si el usuario completó el share, false si lo canceló.
 */
export async function shareText({ title, message, url }: ShareOptions): Promise<boolean> {
  // Mensaje final: incluye el contenido + firma de la app
  const fullMessage = url
    ? `${message}\n\n${url}\n\n— ${APP_TAG}`
    : `${message}\n\n— ${APP_TAG}`;

  try {
    Haptics.selectionAsync().catch(() => {});
    const result = await Share.share(
      {
        title: title ?? APP_TAG,
        message: fullMessage,
      },
      {
        dialogTitle: title ?? APP_TAG,
        // En iOS el subject lo coge la share sheet para "Mail"
        subject: title ?? APP_TAG,
      },
    );
    return result.action === Share.sharedAction;
  } catch {
    // Si falla, no rompemos la app
    return false;
  }
}
