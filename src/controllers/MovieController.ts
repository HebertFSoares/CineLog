import { Request, Response } from "express";
import { MovieModel } from "../models/Movies";
import Logger from "../../config/logger";

export async function createMovie(req: Request, res: Response){
  try {
    const data = req.body
    const movie = await MovieModel.create(data)
    return res.status(201).json(movie)
  } catch (e: any) {
    Logger.error(`Error no sistema: ${e.message}`)
    return res.status(500).json({ error: "Por favor, tente mais tarde!"})
  }
}

export async function FindMovieById(req:Request, res:Response) {
  try {
    const id = req.params.id
    const movie = await MovieModel.findById(id)

    if(!movie){
      return res.status(404).json({ error: "O filme não existe"})
    }

    return res.status(200).json()
  } catch (e: any) {
    return res.status(500).json({ error: "Por favor, tente mais tarde!"})
  }
}

export async function getAllMovies(req: Request, res: Response) {
  try {
    const movies = await MovieModel.find()

    return res.status(200).json(movies)
  } catch (e: any) {
    Logger.error(`Erro no sistema: ${e.message}`)
    return res.status(500).json({ error: "Por favor, tente mais tarde!"})
  }
}

export async function removeMovie(req: Request, res:Response) {
  try {
    const id = req.params.id
    const movie = await MovieModel.findById(id)

    if(!movie){
      return res.status(404).json({error: "O filme não existe"})
    }

    await movie.deleteOne()

    return res.status(200).json({msg: "Filme removido com sucesso"})
  } catch (e: any) {
    Logger.error(`Erro no sistema: ${e.message}`)
    return res.status(500).json({ error: "Por favor, tente mais tarde!"})
  }
}