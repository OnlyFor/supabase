import { useQuery } from '@tanstack/react-query'
import { get } from 'data/fetchers'
import { analyticsKeys } from './keys'

type WarehouseCollectionsVariables = {
  projectRef: string
}

export async function getWarehouseCollections(
  { projectRef }: WarehouseCollectionsVariables,
  signal?: AbortSignal
) {
  if (!projectRef || projectRef === 'undefined') {
    throw new Error('projectRef is required')
  }

  const response = await get(`/platform/projects/{ref}/analytics/warehouse/collections`, {
    params: { path: { ref: projectRef } },
    signal,
  })

  return response.data
}

export type WarehouseCollectionsData = Awaited<ReturnType<typeof getWarehouseCollections>>

export const useWarehouseCollectionsQuery = (
  { projectRef }: WarehouseCollectionsVariables,
  { enabled }: { enabled: boolean }
) =>
  useQuery(
    analyticsKeys.warehouseCollections(projectRef),
    ({ signal }) => getWarehouseCollections({ projectRef }, signal),
    {
      enabled: !!projectRef || enabled,
    }
  )
