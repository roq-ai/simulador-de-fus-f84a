const mapping: Record<string, string> = {
  'game-levels': 'game_level',
  'game-progresses': 'game_progress',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
