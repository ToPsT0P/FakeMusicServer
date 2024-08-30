import {ConflictException, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Artist, ArtistDocument} from "./schemas/artist.schema";
import {FileService, FileType} from "../file/file.service";
import {createArtistDto} from "./dto/create-artist.dto";
import {Track, TrackDocument} from "../track/schemas/track.schema";


@Injectable()
export class ArtistService {

    constructor(
        @InjectModel(Artist.name) private ArtistModel: Model<ArtistDocument>,
        @InjectModel(Track.name) private TrackModel: Model<TrackDocument>,
        private fileService: FileService) {}

    async createArtist(dto: createArtistDto, picture): Promise<Artist> {
        const { name, biography } = dto;

        const existingArtist = await this.ArtistModel.findOne({ name });
        if (existingArtist) {
            throw new ConflictException('An artist with this name already exists');
        }

        const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
        const artist = new this.ArtistModel({
            name,
            biography,
            picture: picturePath
        });

        return artist.save();
    }


    async getAll(){
        const artists = await this.ArtistModel.find() //.skip(offset).limit(count);
        return artists;
    }

    async getOneArtist(name : string){
        const artist = await this.ArtistModel.findOne({name})
        return artist

    }

    async getAllSongs(artistName: string) {
        const tracks = await  this.TrackModel.find({artist: artistName})
        return tracks;
    }
}