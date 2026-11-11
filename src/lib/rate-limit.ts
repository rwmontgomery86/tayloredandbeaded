// Best-effort per-IP throttle. In-memory state is per server instance.
export function createRateLimiter(
  limit: number,
  windowMs: number,
): (req: Request) => boolean {
  const recentRequests = new Map<string, number[]>();

  return (req: Request): boolean => {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    if (!ip) return false;
    const now = Date.now();
    const stamps = (recentRequests.get(ip) ?? []).filter(
      (t) => now - t < windowMs,
    );
    if (stamps.length >= limit) return true;
    stamps.push(now);
    recentRequests.set(ip, stamps);
    if (recentRequests.size > 5000) recentRequests.clear(); // memory backstop
    return false;
  };
}
