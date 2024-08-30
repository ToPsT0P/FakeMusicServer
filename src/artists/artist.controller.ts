import {Body, Controller, Get, Param, Post, Query, UploadedFile, UploadedFiles, UseInterceptors} from "@nestjs/common";
import { createArtistDto } from "./dto/create-artist.dto";
import { ArtistService } from "./artist.service";
import { FileFieldsInterceptor } from "@nestjs/platform-express";


@Controller('/artists')
export class ArtistController {
    constructor(private artistService: ArtistService) {}


    @Get("/search/:artistName")
    async getOne(@Param("artistName") artistName: string) {
        return this.artistService.getOneArtist(artistName);
    }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: "picture", maxCount: 1 }
    ]))
    createArtist(@UploadedFiles() files, @Body() dto: createArtistDto) {
        const { picture } = files;
        return this.artistService.createArtist(dto, picture[0]);
    }

    @Get()
    async getArtists() {
        return this.artistService.getAll();
    }



    @Get("/songs/:artistName")
    getAllSongs(@Param("artistName") artistName: string) {
        return this.artistService.getAllSongs(artistName);
    }
}
