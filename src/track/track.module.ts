import {Module} from "@nestjs/common";
import {TrackController} from "./track.controller";
import {TrackService} from "./track.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Track, TrackSchema} from "./schemas/track.schema";
import {FileModule} from "../file/file.module";


@Module({
    imports: [
        MongooseModule.forFeature([{name: Track.name, schema: TrackSchema}]),
        FileModule
    ],
    controllers: [TrackController],
    providers: [TrackService],
    exports: [MongooseModule],
})

export class TrackModule {

}