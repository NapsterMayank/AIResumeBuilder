import type { AxiosResponse } from 'axios';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export interface QueryParams {
  sort?: string;
  limit?: number;
  skip?: number;
  fields?: string | string[];
}

export interface EntityClient<T> {
  list(
    sort?: string,
    limit?: number,
    skip?: number,
    fields?: string | string[]
  ): Promise<T[]>;

  filter(
    query: Record<string, unknown>,
    sort?: string,
    limit?: number,
    skip?: number,
    fields?: string | string[]
  ): Promise<T[]>;

  get(id: string): Promise<T>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  bulkCreate(data: Partial<T>[]): Promise<T[]>;
  importEntities(file: File): Promise<unknown>;
}

export function createEntity<T>(
  appId: string,
  entityName: string
): EntityClient<T> {
  if (typeof entityName !== 'string' || entityName === 'then' || entityName.startsWith('_')) {
    throw new Error(`Invalid entity name: ${entityName}`);
  }

  const basePath = `/projectdb/${appId}/entities/${entityName}`;

  return {
    async list(sort, limit, skip, fields) {
      const params: QueryParams = {};
      if (sort)   params.sort   = sort;
      if (limit)  params.limit  = limit;
      if (skip)   params.skip   = skip;
      if (fields) params.fields = fields;
      const resp: AxiosResponse<T[]> = await api.get(basePath, { params });
      return resp.data;
    },

    async filter(query, sort, limit, skip, fields) {
      const params: Record<string, unknown> = { q: JSON.stringify(query) };
      if (sort)   params.sort   = sort;
      if (limit)  params.limit  = limit;
      if (skip)   params.skip   = skip;
      if (fields) params.fields = Array.isArray(fields) ? fields.join(',') : fields;
      const resp: AxiosResponse<T[]> = await api.get(basePath, { params });
      return resp.data;
    },

    async get(id) {
      const resp: AxiosResponse<T> = await api.get(`${basePath}/${id}`);
      return resp.data;
    },

    async create(data) {
      const resp: AxiosResponse<T> = await api.post(basePath, data);
      return resp.data;
    },

    async update(id, data) {
      const resp: AxiosResponse<T> = await api.put(`${basePath}/${id}`, data);
      return resp.data;
    },

    async delete(id) {
      await api.delete(`${basePath}/${id}`);
    },

    async deleteMany(ids) {
      await api.delete(basePath, { data: ids });
    },

    async bulkCreate(data) {
      const resp: AxiosResponse<T[]> = await api.post(`${basePath}/bulk`, data);
      return resp.data;
    },

    async importEntities(file) {
      const form = new FormData();
      form.append('file', file, file.name);
      const resp = await api.post(`${basePath}/import`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return resp.data;
    },
  };
}