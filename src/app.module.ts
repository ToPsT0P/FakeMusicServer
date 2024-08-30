import { Module } from "@nestjs/common";
import { TrackModule } from "./track/track.module";
import { MongooseModule } from "@nestjs/mongoose";
import { AlbumModule } from "./album/album.module";
import { FileModule } from "./file/file.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";
import { ArtistModule } from "./artists/artist.module";

@Module({
    imports: [
        ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static'), serveRoot: "/static" }),
        TrackModule,
        AlbumModule,
        ArtistModule,
        FileModule,
        MongooseModule.forRoot('mongodb+srv://admin:admin@tracksinfo.b69p4ye.mongodb.net/?retryWrites=true&w=majority&appName=TracksInfo')
    ]
})
export class AppModule {}
