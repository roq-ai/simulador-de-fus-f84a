import axios from 'axios';
import queryString from 'query-string';
import { GameLevelInterface, GameLevelGetQueryInterface } from 'interfaces/game-level';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getGameLevels = async (
  query?: GameLevelGetQueryInterface,
): Promise<PaginatedInterface<GameLevelInterface>> => {
  const response = await axios.get('/api/game-levels', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createGameLevel = async (gameLevel: GameLevelInterface) => {
  const response = await axios.post('/api/game-levels', gameLevel);
  return response.data;
};

export const updateGameLevelById = async (id: string, gameLevel: GameLevelInterface) => {
  const response = await axios.put(`/api/game-levels/${id}`, gameLevel);
  return response.data;
};

export const getGameLevelById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/game-levels/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteGameLevelById = async (id: string) => {
  const response = await axios.delete(`/api/game-levels/${id}`);
  return response.data;
};
