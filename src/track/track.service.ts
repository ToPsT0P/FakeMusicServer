import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Track, TrackDocument } from "./schemas/track.schema";
import { Model, ObjectId } from "mongoose";
import { CreateTrackDto } from "./dto/create-track.dto";
import { FileService, FileType } from "../file/file.service";
import * as ffmpeg from 'fluent-ffmpeg';
import * as path from 'path';

@Injectable()
export class TrackService {
    constructor(
        @InjectModel(Track.name) private TrackModel: Model<TrackDocument>,
        private fileService: FileService
    ) {
        ffmpeg.setFfprobePath('C:\\ProgramData\\chocolatey\\lib\\ffmpeg\\tools\\ffmpeg\\bin\\ffprobe.exe');
    }

    async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
        const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
        const absoluteAudioPath = path.resolve(__dirname, '..', '..', 'dist', 'static', audioPath);
        const duration = await this.getAudioDuration(absoluteAudioPath);

        const track = await this.TrackModel.create({
            ...dto,
            duration,
            listens: 0,
            audio: audioPath,
            picture: picturePath
        });
        return track;
    }

    async getAudioDuration(filePath: string): Promise<number> {
        return new Promise((resolve, reject) => {
            ffmpeg.ffprobe(filePath, (err, metadata) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(metadata.format.duration);
                }
            });
        });
    }

    async getAll(count = 10, offset = 0): Promise<Track[]> {
        const tracks = await this.TrackModel.find().skip(offset).limit(count);
        return tracks;
    }

    async getOne(id: ObjectId): Promise<Track> {
        const track = await this.TrackModel.findById(id).populate("comments");
        return track;
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const track = await this.TrackModel.findByIdAndDelete(id);
        return track.id;
    }

    async listen(id: ObjectId) {
        const track = await this.TrackModel.findById(id);
        track.listens += 1;
        track.save();
    }

    async search(query: string): Promise<Track[]> {
        const tracks = this.TrackModel.find({
            name: { $regex: new RegExp(query, "i") },
        });

        return tracks;
    }
}
