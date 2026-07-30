export type HapticFeedbackType =
  | "light"
  | "medium"
  | "heavy"
  | "success"
  | "warning"
  | "error";

/**
 * Triggers device haptic feedback if supported by the browser (e.g., Android devices).
 * Note: iOS Safari currently does not support the Vibration API for web apps.
 */
export const triggerHaptic = (type: HapticFeedbackType = "light") => {
  if (typeof navigator === "undefined" || !navigator.vibrate) {
    return;
  }

  try {
    switch (type) {
      case "light":
        navigator.vibrate(10);
        break;
      case "medium":
        navigator.vibrate(15);
        break;
      case "heavy":
        navigator.vibrate(20);
        break;
      case "success":
        navigator.vibrate([10, 60, 20]);
        break;
      case "warning":
        navigator.vibrate([20, 60, 10]);
        break;
      case "error":
        navigator.vibrate([10, 40, 10, 40, 20]);
        break;
      default:
        navigator.vibrate(10);
    }
  } catch (error) {
    console.warn("Haptic feedback failed", error);
  }
};

/**
 * Initializes global haptic feedback for all standard interactive elements.
 * Call this once in the root component (e.g., App.tsx).
 */
export const initGlobalHaptics = () => {
  if (typeof window === "undefined") return () => {};

  const handlePointerDown = (e: PointerEvent) => {
    const target = e.target as HTMLElement;
    // Don't trigger if it's not a left click or primary touch
    if (e.pointerType === "mouse" && e.button !== 0) return;

    // Find closest interactive element
    const interactive = target.closest(
      'button, a, input[type="button"], input[type="submit"], [role="button"], [role="tab"], [role="switch"], [role="checkbox"], .glass-button-primary, .glass-button-secondary, .hover-lift'
    );

    if (interactive) {
      // Determine type based on element classes or attributes
      let type: HapticFeedbackType = "light";

      if (
        interactive.classList.contains("glass-button-primary") ||
        interactive.getAttribute("data-haptic") === "medium"
      ) {
        type = "medium";
      } else if (
        interactive.getAttribute("data-haptic") === "heavy"
      ) {
        type = "heavy";
      } else if (
        interactive.getAttribute("data-haptic") === "success"
      ) {
        type = "success";
      }

      triggerHaptic(type);
    }
  };

  window.addEventListener("pointerdown", handlePointerDown, { passive: true });

  return () => {
    window.removeEventListener("pointerdown", handlePointerDown);
  };
};
