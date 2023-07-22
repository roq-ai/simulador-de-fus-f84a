interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Game Tester'],
  customerRoles: ['Game Player'],
  tenantRoles: ['Game Tester', 'Game Developer', 'Game Administrator'],
  tenantName: 'Organization',
  applicationName: 'Simulador de Fusca',
  addOns: ['chat', 'notifications'],
};
