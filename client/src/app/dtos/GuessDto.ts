export interface GuessDto {
    success: string,
    message: string,
    id: string,
    date: string,
    imagepath: string,
    guess: string
}

export interface GuessDtoHistory{
    guess: GuessDto,
    image: File,
}