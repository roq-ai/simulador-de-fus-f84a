import axios from 'axios';
import queryString from 'query-string';
import { GameProgressInterface, GameProgressGetQueryInterface } from 'interfaces/game-progress';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getGameProgresses = async (
  query?: GameProgressGetQueryInterface,
): Promise<PaginatedInterface<GameProgressInterface>> => {
  const response = await axios.get('/api/game-progresses', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createGameProgress = async (gameProgress: GameProgressInterface) => {
  const response = await axios.post('/api/game-progresses', gameProgress);
  return response.data;
};

export const updateGameProgressById = async (id: string, gameProgress: GameProgressInterface) => {
  const response = await axios.put(`/api/game-progresses/${id}`, gameProgress);
  return response.data;
};

export const getGameProgressById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/game-progresses/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteGameProgressById = async (id: string) => {
  const response = await axios.delete(`/api/game-progresses/${id}`);
  return response.data;
};
