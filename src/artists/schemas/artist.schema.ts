import * as mongoose from "mongoose"
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Track} from "../../track/schemas/track.schema";


export type ArtistDocument = Artist & Document;


@Schema()
export class Artist {

    @Prop()
    name: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: "Track"}]})
    tracks: Track[]

    @Prop()
    biography: string;

    @Prop()
    picture: string;

}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
