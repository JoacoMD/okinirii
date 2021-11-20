import axios from "axios"
import { Anime } from "../../interfaces/anime"
import { Picture } from "../../interfaces/picture"

interface Result {
    request_hash: string
    request_cached: boolean
    request_cache_expiry: number
}

interface DescriptionItem {
    mal_id: number
    type: string
    name: string
    url: string
}

export interface ResultTop extends Result {
    top: Anime[];
}

export interface ResultPictures extends Result {
    pictures: Picture[]
}

export interface ResultAnime extends Result {
    mal_id: number
    url: string
    image_url: string
    trailer_url: string
    title: string
    title_english: string
    title_japanese: string
    title_synonyms: string
    type: string
    source: string
    episodes: number
    status: string
    airing: boolean
    aired: string
    duration: string
    rating: string
    score: number
    scored_by: number
    rank: number
    popularity: number
    members: number
    favorites: number
    synopsis: string
    background: string
    premiered: string
    broadcast: string 
    related: any
    producers: DescriptionItem[]
    studios: DescriptionItem[]
    genres: DescriptionItem[]
    explicit_genres: DescriptionItem[]
    demographics: any[]
    themes: any[]
    opening_themes: any[]
    ending_themes: any[]
}

const ANIME_API_URL = 'https://api.jikan.moe/v3' 

export const fetchTopAnimes = (page: number = 1) => {
    return axios.get<ResultTop>(`${ANIME_API_URL}/top/anime/${page}`)
}

export const fetchAnime = (id: number) => {
    return axios.get<ResultAnime>(`${ANIME_API_URL}/anime/${id}`)
}

export const fetchAnimePictures = (id: number) => {
    return axios.get<ResultPictures>(`${ANIME_API_URL}/anime/${id}/pictures`)
}

export const fetchAnimeNews = (id: number) => {
    return axios.get<ResultAnime>(`${ANIME_API_URL}/anime/${id}/news`)
}