// frontend/src/data/apiaries.server.ts
export type ApiaryCard = {
  id: string;
  name: string;
  hiveCount: number;
  imageUrl: string;
  status: 'healthy' | 'attention' | 'critical';
};

/**
 * Devuelve tarjetas mock (flujo local)
 */
export async function listApiaryCards(): Promise<ApiaryCard[]> {
  return [
    {
      id: 'apiary-azul',
      name: "Azul's bees",
      hiveCount: 4, // coincide con hives/alerts del mock
      imageUrl: '/images/apiary-hero.jpg', // asegúrate que exista
      status: 'attention',
    },
  ];
}
