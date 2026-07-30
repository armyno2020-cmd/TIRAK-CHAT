export class NotificationService {
  private static lastNotifiedMessageAt: number = Date.now();

  public static async requestPermission(): Promise<boolean> {
    if (!("Notification" in window)) {
      console.warn("This browser does not support desktop notification");
      return false;
    }

    if (Notification.permission === "granted") {
      return true;
    }

    if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission();
      return permission === "granted";
    }

    return false;
  }

  public static notifyNewMessage(
    title: string,
    body: string,
    messageAt: number,
  ) {
    if (messageAt <= this.lastNotifiedMessageAt) return;

    this.lastNotifiedMessageAt = messageAt;

    if (Notification.permission === "granted") {
      new Notification(title, {
        body,
        icon: "/vite.svg",
      });
      this.playNotificationSound();
    }
  }

  public static playNotificationSound() {
    try {
      const ctx = new (
        window.AudioContext || (window as any).webkitAudioContext
      )();

      // Tone 1: E5 (659.25Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(659.25, ctx.currentTime);
      gain1.gain.setValueAtTime(0.2, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.15);

      // Tone 2: B5 (987.77Hz) - plays 80ms later for a pleasant double chime
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(987.77, ctx.currentTime + 0.08);
      gain2.gain.setValueAtTime(0.25, ctx.currentTime + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(ctx.currentTime + 0.08);
      osc2.stop(ctx.currentTime + 0.35);
    } catch (e) {
      console.warn("Audio play failed", e);
    }
  }

  public static playIncomingCallRingtone(): () => void {
    try {
      const ctx = new (
        window.AudioContext || (window as any).webkitAudioContext
      )();
      let isPlaying = true;

      const playRingtonePulse = () => {
        if (!isPlaying) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      };

      playRingtonePulse();
      const interval = setInterval(playRingtonePulse, 2000);

      return () => {
        isPlaying = false;
        clearInterval(interval);
        try {
          ctx.close();
        } catch (e) {}
      };
    } catch (e) {
      return () => {};
    }
  }
}
