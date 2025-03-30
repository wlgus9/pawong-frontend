import { ApiConfig } from '../../config/api';
import { fetchApi } from './core';
import type { ApiResponse } from './core';

interface Pet {
  id: string;
  name: string;
  breed: string;
  birthDate: string;
  weight: number;
  imageUrl?: string;
}

interface PetListResponse {
  data: Pet[];
}

export const fetchPetList = async (): Promise<ApiResponse<PetListResponse>> => {
  return fetchApi<PetListResponse>(ApiConfig.endpoints.pet.list, {
    method: 'GET',
  });
};

interface CreatePetParams {
  name: string;
  breed: string;
  birthDate: string;
  weight: number;
  imageUrl?: string;
}

export const createPet = async (params: CreatePetParams): Promise<ApiResponse> => {
  return fetchApi(ApiConfig.endpoints.pet.create, {
    method: 'POST',
    body: JSON.stringify(params),
  });
};

interface UpdatePetParams extends Partial<CreatePetParams> {
  id: string;
}

export const updatePet = async (params: UpdatePetParams): Promise<ApiResponse> => {
  const endpoint = ApiConfig.endpoints.pet.update.replace(':id', params.id);
  const { id, ...updateData } = params;

  return fetchApi(endpoint, {
    method: 'PUT',
    body: JSON.stringify(updateData),
  });
};

export const deletePet = async (petId: string): Promise<ApiResponse> => {
  const endpoint = ApiConfig.endpoints.pet.delete.replace(':id', petId);
  
  return fetchApi(endpoint, {
    method: 'DELETE',
  });
}; 