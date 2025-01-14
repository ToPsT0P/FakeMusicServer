import {Module} from "@nestjs/common";
import {AlbumService} from "./album.service";
import {AlbumController} from "./album.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {Album, AlbumSchema} from "./schemas/album.schema";


@Module({
    imports: [
        MongooseModule.forFeature([{name: Album.name, schema: AlbumSchema}])
    ],
    controllers: [AlbumController],
    providers: [AlbumService],
})


export class AlbumModule {

}