import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Artist, ArtistSchema } from "./schemas/artist.schema";
import { ArtistController } from "./artist.controller";
import { ArtistService } from "./artist.service";
import {FileModule} from "../file/file.module";
import {TrackModule} from "../track/track.module";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }]),
        FileModule,
        TrackModule,
    ],
    controllers: [ArtistController],
    providers: [ArtistService],
})
export class ArtistModule {}